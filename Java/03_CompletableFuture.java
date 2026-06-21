/*
    CompletableFuture (Java 8+) is Java's approach to asynchronous programming,
    similar to JavaScript Promises and C# Tasks.

    Key concepts:
    - thenApply() → like .then() / map
    - thenAccept() → terminal operation (like .then() with consumer)
    - thenCombine() → like Promise.all with 2 inputs
    - allOf() → like Promise.all
    - anyOf() → like Promise.race
    - exceptionally() → like .catch()
    - supplyAsync() → creates a CF that runs asynchronously
*/

import java.util.concurrent.*;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

public class CompletableFutureExample {

    // Simulates an async I/O operation
    static CompletableFuture<String> getFruit(String name) {
        return CompletableFuture.supplyAsync(() -> {
            Map<String, String> fruits = Map.of(
                "pineapple", "🍍",
                "peach", "🍑",
                "strawberry", "🍓"
            );

            // Simulate async work
            try { Thread.sleep(100); } catch (InterruptedException e) {}

            if (!fruits.containsKey(name)) {
                throw new IllegalArgumentException("Unknown fruit: " + name);
            }
            return fruits.get(name);
        });
    }

    public static void main(String[] args) throws Exception {
        System.out.println("=== Java CompletableFuture (async/await) ===\n");

        // Basic async call
        System.out.println("--- Basic async ---");
        CompletableFuture<String> future = getFruit("peach");
        future.thenAccept(fruit -> System.out.println("  Got: " + fruit));
        future.join(); // Wait for completion (like await)

        // Chaining (like .then().then())
        System.out.println("\n--- Chaining ---");
        getFruit("pineapple")
            .thenApply(fruit -> "Got fruit: " + fruit)
            .thenAccept(System.out::println)
            .join();

        // Concurrent execution (like Promise.all)
        System.out.println("\n--- Concurrent (allOf = Promise.all) ---");
        CompletableFuture<String> f1 = getFruit("peach");
        CompletableFuture<String> f2 = getFruit("strawberry");

        CompletableFuture<Void> allFruits = CompletableFuture.allOf(f1, f2);
        allFruits.join();

        System.out.println("  Smoothie: " + f1.get() + " + " + f2.get());

        // Combining results (thenCombine)
        System.out.println("\n--- Combine (thenCombine) ---");
        String smoothie = getFruit("pineapple")
            .thenCombine(getFruit("strawberry"),
                (a, b) -> a + " + " + b)
            .join();
        System.out.println("  Combined: " + smoothie);

        // Error handling (like .catch())
        System.out.println("\n--- Error handling (exceptionally) ---");
        getFruit("durian")
            .exceptionally(ex -> {
                System.out.println("  Error: " + ex.getCause().getMessage());
                return "🚫";
            })
            .thenAccept(result -> {
                if (!result.equals("🚫")) {
                    System.out.println("  Got: " + result);
                }
            })
            .join();

        // Race condition (anyOf = Promise.race)
        System.out.println("\n--- Race (anyOf = Promise.race) ---");
        AtomicInteger counter = new AtomicInteger(0);
        CompletableFuture<String> fast = CompletableFuture.supplyAsync(() -> {
            sleep(50);
            counter.incrementAndGet();
            return "🚀 fast (finished " + counter.get() + "st)";
        });
        CompletableFuture<String> slow = CompletableFuture.supplyAsync(() -> {
            sleep(300);
            counter.incrementAndGet();
            return "🐌 slow (finished " + counter.get() + "st)";
        });

        Object winner = CompletableFuture.anyOf(fast, slow).join();
        System.out.println("  Winner: " + winner);

        // runAsync vs supplyAsync
        System.out.println("\n--- runAsync (no return) vs supplyAsync ---");
        CompletableFuture.runAsync(() ->
            System.out.println("  Side effect only, no return value")
        ).join();
    }

    static void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) {}
    }
}