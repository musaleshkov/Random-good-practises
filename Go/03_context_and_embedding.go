package main

import (
	"context"
	"fmt"
	"time"
)

/*
	Go Context package provides cancellation, deadlines, and
	request-scoped values — critical for production Go servers.

	Go Embedding provides composition over inheritance.
	Unlike Java/C# inheritance, Go encourages embedding structs
	and interfaces for code reuse (no "extends" keyword).
*/

// === CONTEXT: Cancellation ===
func worker(ctx context.Context, id int) {
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("  Worker %d: cancelled (%v)\n", id, ctx.Err())
			return
		default:
			fmt.Printf("  Worker %d: working...\n", id)
			time.Sleep(100 * time.Millisecond)
		}
	}
}

func contextCancellationExample() {
	fmt.Println("=== Context Cancellation ===")

	ctx, cancel := context.WithCancel(context.Background())

	go worker(ctx, 1)
	go worker(ctx, 2)

	time.Sleep(250 * time.Millisecond)
	cancel() // Signal all workers to stop
	time.Sleep(50 * time.Millisecond)
}

// === CONTEXT: Timeout ===
func contextTimeoutExample() {
	fmt.Println("\n=== Context Timeout ===")

	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()

	select {
	case <-time.After(500 * time.Millisecond):
		fmt.Println("  Operation completed")
	case <-ctx.Done():
		fmt.Printf("  Timeout: %v\n", ctx.Err())
	}
}

// === CONTEXT: WithValue ===
type contextKey string

const requestIDKey contextKey = "requestID"

func contextValueExample() {
	fmt.Println("\n=== Context WithValue ===")

	ctx := context.WithValue(context.Background(), requestIDKey, "req-12345")

	if reqID, ok := ctx.Value(requestIDKey).(string); ok {
		fmt.Printf("  Request ID: %s\n", reqID)
	}
}

// ============================================
// EMBEDDING (Composition over Inheritance)
// ============================================

// Base struct
type Animal struct {
	Name string
}

func (a Animal) Speak() string {
	return "..."
}

func (a Animal) Identify() string {
	return fmt.Sprintf("I am %s", a.Name)
}

// Dog EMBEDS Animal (not extends!)
type Dog struct {
	Animal // Embedded struct — Dog "is-a" Animal
	Breed  string
}

// Override Speak (method overriding via embedding)
func (d Dog) Speak() string {
	return "Woof!"
}

func (d Dog) Fetch() string {
	return fmt.Sprintf("%s fetches the ball!", d.Name)
}

// Interface
type Speaker interface {
	Speak() string
	Identify() string
}

func embeddingExample() {
	fmt.Println("\n=== Struct Embedding (Composition) ===")

	dog := Dog{
		Animal: Animal{Name: "Buddy"},
		Breed:  "Golden Retriever",
	}

	// Promoted methods (Animal.Identify is accessible directly)
	fmt.Printf("  %s\n", dog.Identify())
	fmt.Printf("  Speak: %s\n", dog.Speak())
	fmt.Printf("  %s\n", dog.Fetch())

	// Can pass Dog wherever Animal is expected
	var s Speaker = dog
	fmt.Printf("  Interface: %s says %s\n", s.Identify(), s.Speak())
}

// === Interface Embedding ===
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

// ReadWriter embeds Reader + Writer interfaces
type ReadWriter interface {
	Reader
	Writer
}

func interfaceEmbeddingExample() {
	fmt.Println("\n=== Interface Embedding ===")
	fmt.Println("  ReadWriter = Reader + Writer (composed interface)")
}

func main() {
	contextCancellationExample()
	contextTimeoutExample()
	contextValueExample()
	embeddingExample()
	interfaceEmbeddingExample()
}