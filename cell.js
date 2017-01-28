function Cell(i, j) {
	this.i      = i;
	this.j      = j;
	this.walls  = [true, true, true, true];
	this.visited = false;
	this.stacked = false;

	this.checkNeighbors = function() {
		var neighbors = [];
		var top       = grid[index(i, j-1)];
		var right     = grid[index(i+1, j)];
		var bottom    = grid[index(i, j+1)];
		var left      = grid[index(i-1, j)];

		if (top && !top.visited) {
			neighbors.push(top);
		}

		if (right && !right.visited) {
			neighbors.push(right);
		}

		if (bottom && !bottom.visited) {
			neighbors.push(bottom);
		}

		if (left && !left.visited) {
			neighbors.push(left);
		}

		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));

			return neighbors[r];
		} else {
			return undefined;
		}
	}

	this.show = function() {
		var x = this.i * w;
		var y = this.j * w;

		var drawLines = (showGrid || this.visited);

		stroke(200);

		if (drawLines && this.walls[0]) {
			line(x, y, x + w, y);
		}

		if (drawLines && this.walls[1]) {
			line(x + w, y, x + w, y + w);
		}

		if (drawLines && this.walls[2]) {
			line(x + w, y + w, x, y + w);
		}

		if (drawLines && this.walls[3]) {
			line(x, y + w, x, y);
		}

		if (this.visited) {
			noStroke();
			fill(255, 255, 255, 15);
			rect(x, y, w, w);
		}

		if (this.stacked && showBreadcrumbs) {
			// add a breadcrumb
			noStroke();
			fill(255, 255, 0, 150);
			rect(x + w/2 -1, y + w/2 -1, 2, 2);
		}

	}

	this.highlight = function() {
		var x = this.i*w;
		var y = this.j*w;
		var pickSize = w * 0.8;
		// noStroke();
		// fill(0, 255, 0, 150);
		// rect(x, y, w, w);

		image(pick, x + (w - pickSize)/2, y + (w - pickSize)/2, pickSize, pickSize);
	}
}
