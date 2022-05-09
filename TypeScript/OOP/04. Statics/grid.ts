class Grid {
  // All grids will have a single origin
  public static origin = { x: 0, y: 0 };

  public calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  }
}

let grid = new Grid();
console.log(grid.calculateDistanceFromOrigin({ x: 10, y: 10 }));
