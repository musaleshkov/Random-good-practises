package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

/*
	Goroutines and Channels are Go's approach to concurrency,
	fundamentally different from JavaScript's async/await and
	Python's asyncio. Key concepts:

	- Goroutines: lightweight threads (not OS threads) — like
	  starting a function with `go` keyword
	- Channels: typed conduits for communication between goroutines.
	  "Don't communicate by sharing memory; share memory by communicating."
	- Select: like a switch statement for channels — wait on multiple
	  channel operations
	- sync.WaitGroup: wait for a collection of goroutines to finish
*/

// === Basic Goroutine ===
func basicGoroutine() {
	fmt.Println("=== Basic Goroutine ===")

	// Start a goroutine (runs concurrently)
	go func() {
		fmt.Println("  Hello from goroutine!")
	}()

	// The main goroutine needs to wait, otherwise the program exits
	time.Sleep(50 * time.Millisecond)
	fmt.Println("  Hello from main!")
}

// === Channels (Promise-like communication) ===
func getFruit(name string, ch chan<- string) {
	fruits := map[string]string{
		"pineapple":  "🍍",
		"peach":      "🍑",
		"strawberry": "🍓",
	}

	// Simulate async I/O
	time.Sleep(100 * time.Millisecond)

	if emoji, ok := fruits[name]; ok {
		ch <- emoji // Send result to channel
	} else {
		ch <- fmt.Sprintf("ERROR: unknown fruit: %s", name)
	}
}

func channelExample() {
	fmt.Println("\n=== Channels (like Promises) ===")

	ch := make(chan string)

	go getFruit("peach", ch)

	fruit := <-ch // Receive from channel (blocks until value arrives)
	fmt.Printf("  Got: %s\n", fruit)
}

// === Concurrency with channels (like Promise.all) ===
func concurrentExample() {
	fmt.Println("\n=== Concurrent (like Promise.all) ===")

	fruits := []string{"pineapple", "strawberry", "peach"}
	ch := make(chan string, len(fruits)) // Buffered channel

	// Launch multiple goroutines
	for _, name := range fruits {
		go getFruit(name, ch)
	}

	// Collect all results
	var results []string
	for i := 0; i < len(fruits); i++ {
		results = append(results, <-ch)
	}

	fmt.Printf("  Smoothie: %v\n", results)
}

// === Select (like Promise.race) ===
func selectExample() {
	fmt.Println("\n=== Select (like Promise.race) ===")

	slowCh := make(chan string)
	fastCh := make(chan string)

	go func() {
		time.Sleep(300 * time.Millisecond)
		slowCh <- "🐌 slow"
	}()
	go func() {
		time.Sleep(50 * time.Millisecond)
		fastCh <- "🚀 fast"
	}()

	// Wait for whichever channel returns first
	select {
	case result := <-fastCh:
		fmt.Printf("  Winner: %s\n", result)
	case result := <-slowCh:
		fmt.Printf("  Winner: %s\n", result)
	case <-time.After(500 * time.Millisecond):
		fmt.Println("  Timeout!")
	}
}

// === Error handling pattern (Go's approach: no try/catch) ===
func getFruitWithError(name string) (string, error) {
	fruits := map[string]string{
		"pineapple":  "🍍",
		"peach":      "🍑",
		"strawberry": "🍓",
	}

	time.Sleep(50 * time.Millisecond)

	if emoji, ok := fruits[name]; ok {
		return emoji, nil // nil = no error
	}
	return "", errors.New("unknown fruit: " + name)
}

func errorHandlingExample() {
	fmt.Println("\n=== Error Handling (no try/catch) ===")

	result, err := getFruitWithError("durian")
	if err != nil {
		fmt.Printf("  Error: %v\n", err)
		return
	}
	fmt.Printf("  Got: %s\n", result)
}

// === sync.WaitGroup (wait for all goroutines) ===
func waitGroupExample() {
	fmt.Println("\n=== sync.WaitGroup ===")

	var wg sync.WaitGroup
	fruits := []string{"peach", "strawberry", "pineapple"}

	for _, name := range fruits {
		wg.Add(1) // Increment counter
		go func(f string) {
			defer wg.Done() // Decrement counter when done
			result, _ := getFruitWithError(f)
			fmt.Printf("  %s = %s\n", f, result)
		}(name)
	}

	wg.Wait() // Block until counter reaches 0
	fmt.Println("  All fruits fetched!")
}

func main() {
	basicGoroutine()
	channelExample()
	concurrentExample()
	selectExample()
	errorHandlingExample()
	waitGroupExample()
}