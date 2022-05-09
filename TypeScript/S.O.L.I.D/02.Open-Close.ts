/*
    According to the open-closed principle,
    software entities should be open for extension
    but closed for modification.
*/

interface Shape {
	getArea(): number;
}

class Rectangle implements Shape {
	public width: number;
	public height: number;
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
	public getArea() {
		return this.width * this.height;
	}
}
class Circle implements Shape {
	public radius: number;
	constructor(radius: number) {
		this.radius = radius;
	}
	public getArea() {
		return this.radius * Math.PI;
	}
}
function calculateAreasOfMultipleShapes(shapes: Shape[]) {
	return shapes.reduce((calculatedArea, shape) => {
		return calculatedArea + shape.getArea();
	}, 0);
}
