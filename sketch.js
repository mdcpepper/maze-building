var cols, rows;
var w               = 40;
var grid            = [];
var cellsMined      = 0;
var steps           = 0;
var stack           = [];
var showGrid        = false;
var showBreadcrumbs = true;
var current;
var pick;

function setup() {
	createCanvas(1200, 600);
	frameRate(10);

	cols = floor(width / w);
	rows = floor(height / w);

	pick = loadImage('pick.png');

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	current = grid[floor(random(0, grid.length))];
}

function draw() {
	background(51);

	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	current.visited = true;

	if (current.visited && stack.length > 0) {
		current.highlight();
	}

	var next = current.checkNeighbors();
	if (next) {
		next.visited = true;

		stack.push(current);
		current.stacked = true;

		removeWalls(current, next);

		current = next;
		cellsMined++;
	} else if (stack.length > 0) {
		current = stack.pop();
		current.stacked = false;
	}

	cellsLeft = (grid.length - (cellsMined + 1));

	if (cellsLeft) {
		steps++;
	}

	document.getElementById('stack-size').textContent  = stack.length;
	document.getElementById('cells-mined').textContent = cellsMined + 1;
	document.getElementById('cells-left').textContent  = cellsLeft;
	document.getElementById('steps-taken').textContent = steps;
}

function index(i, j) {
	if (i < 0 || j < 0 || i > cols -1 || j > rows -1) {
		return -1;
	}

	return i + j * cols;
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	var y = a.j - b.j;

	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}
