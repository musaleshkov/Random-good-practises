package main

import (
	"testing"
)

type Shape interface {
	Area() float64
}

type Rectangle struct {
	Width  float64
	Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return 3.14159 * c.Radius * c.Radius
}

func TestRectangleArea(t *testing.T) {
	r := Rectangle{Width: 10, Height: 5}
	expected := 50.0
	if r.Area() != expected {
		t.Errorf("Rectangle area = %f, want %f", r.Area(), expected)
	}
}

func TestCircleArea(t *testing.T) {
	c := Circle{Radius: 7}
	expected := 3.14159 * 7 * 7
	if c.Area() != expected {
		t.Errorf("Circle area = %f, want %f", c.Area(), expected)
	}
}

func TestShapeInterface(t *testing.T) {
	shapes := []Shape{
		Rectangle{Width: 10, Height: 5},
		Circle{Radius: 7},
	}

	total := 0.0
	for _, s := range shapes {
		total += s.Area()
	}

	expectedRect := 50.0
	expectedCircle := 3.14159 * 7 * 7
	expected := expectedRect + expectedCircle

	if total != expected {
		t.Errorf("Total area = %f, want %f", total, expected)
	}
}