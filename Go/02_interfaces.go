package main

import (
	"fmt"
	"math"
)

/*
	Go interfaces are structurally typed (like TypeScript),
	meaning a type automatically satisfies an interface if it has
	the required methods — no explicit `implements` keyword needed.

	This is Go's answer to polymorphism, and it's fundamentally different
	from C#/Java's nominal typing.
*/

// === Interface definition ===
type Shape interface {
	Area() float64
	Perimeter() float64
}

// === Rectangle implements Shape (implicitly!) ===
type Rectangle struct {
	Width  float64
	Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
	return 2 * (r.Width + r.Height)
}

// === Circle implements Shape (implicitly!) ===
type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
	return 2 * math.Pi * c.Radius
}

// === Polymorphic function: works with ANY Shape ===
func describeShape(s Shape) {
	fmt.Printf("  Area: %.2f, Perimeter: %.2f\n", s.Area(), s.Perimeter())
}

func totalArea(shapes []Shape) float64 {
	total := 0.0
	for _, s := range shapes {
		total += s.Area()
	}
	return total
}

// === Empty interface (like `any` in TypeScript) ===
func printAnything(v interface{}) {
	fmt.Printf("  Value: %v, Type: %T\n", v, v)
}

// === Interface composition ===
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

// ReadWriter composes Reader + Writer (no method duplication!)
type ReadWriter interface {
	Reader
	Writer
}

// === Type assertion (like `as` in TypeScript) ===
func typeAssertionExample(shapes []Shape) {
	fmt.Println("\n=== Type Assertion ===")
	for _, s := range shapes {
		// Type switch (pattern matching)
		switch v := s.(type) {
		case Rectangle:
			fmt.Printf("  Rectangle: %v×%v\n", v.Width, v.Height)
		case Circle:
			fmt.Printf("  Circle: radius=%v\n", v.Radius)
		default:
			fmt.Println("  Unknown shape")
		}
	}
}

func main() {
	fmt.Println("=== Go Interfaces (Structural Typing) ===\n")

	rect := Rectangle{Width: 10, Height: 5}
	circle := Circle{Radius: 7}

	fmt.Println("--- Individual shapes ---")
	describeShape(rect)
	describeShape(circle)

	fmt.Println("\n--- Polymorphic collection ---")
	shapes := []Shape{rect, circle}
	fmt.Printf("  Total area: %.2f\n", totalArea(shapes))

	fmt.Println("\n--- Empty interface (any) ---")
	printAnything(42)
	printAnything("hello")
	printAnything(rect)

	fmt.Println("\n--- Interface composition ---")
	// ReadWriter = Reader + Writer combined

	typeAssertionExample(shapes)
}