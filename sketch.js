var cols, rows;
var w               = 40;
var grid            = [];
var cellsMined      = 0;
var steps           = 0;
var workers         = 1;
var stacks          = [];
var showGrid        = false;
var showBreadcrumbs = true;
var currents        = [];
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

	for (var i = 0; i < workers; i++) {
		currents[i] = grid[floor(random(0, grid.length))];
	}

	for (var i = 0; i < workers; i++) {
		stacks[i] = [];
	}
}

function draw() {
	background(51);

	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	for (var i = 0; i < workers; i++) {

		currents[i].visited = true;

		if (currents[i].visited && stacks[i].length > 0) {
			currents[i].highlight();
		}

		var next = currents[i].checkNeighbors();
		if (next) {
			next.visited = true;

			stacks[i].push(currents[i]);
			currents[i].stacked = true;

			removeWalls(currents[i], next);

			currents[i] = next;
			cellsMined++;
		} else if (stacks[i].length > 0) {
			currents[i] = stacks[i].pop();
			currents[i].stacked = false;
		}

	}

	// cellsLeft = (grid.length - (cellsMined + 1));
	//
	// if (cellsLeft) {
	// 	steps++;
	// }
	//
	// // document.getElementById('stack-size').textContent  = stack.length;
	// document.getElementById('cells-mined').textContent = cellsMined + 1;
	// document.getElementById('cells-left').textContent  = cellsLeft;
	// document.getElementById('steps-taken').textContent = steps;
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
