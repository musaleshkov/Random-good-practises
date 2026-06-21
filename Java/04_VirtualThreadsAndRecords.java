/*
    Java 21+ introduced Virtual Threads (Project Loom) and Java 14+
    introduced Records — two of the most significant modern Java features.

    VIRTUAL THREADS:
    - Lightweight threads managed by the JVM (not OS threads!)
    - Millions of virtual threads vs thousands of platform threads
    - Created via Thread.ofVirtual() or Executors.newVirtualThreadPerTaskExecutor()
    - Perfect for I/O-bound workloads (HTTP servers, DB queries)

    RECORDS (Java 14+, finalized in 16):
    - Immutable data carriers — no boilerplate!
    - Auto-generates: constructor, getters, equals(), hashCode(), toString()
    - Can implement interfaces
    - Pattern matching with instanceof (Java 16+) and switch (Java 21+)
*/

import java.util.concurrent.*;
import java.util.List;
import java.util.stream.IntStream;

public class VirtualThreadsAndRecords {

    // ======================================================
    // RECORDS — Immutable data carriers
    // ======================================================

    // Before: verbose POJO
    static class OldStyleUser {
        private final String name;
        private final int age;

        OldStyleUser(String name, int age) {
            this.name = name;
            this.age = age;
        }
        public String getName() { return name; }
        public int getAge() { return age; }
        // + equals, hashCode, toString (another 30 lines!)
        @Override public String toString() {
            return "OldStyleUser[name=" + name + ", age=" + age + "]";
        }
    }

    // After: ONE LINE!
    record User(String name, int age) { }

    // Records can have custom methods
    record Point(int x, int y) {
        // Compact constructor (validation)
        Point {
            if (x < 0 || y < 0) {
                throw new IllegalArgumentException("Coordinates must be non-negative");
            }
        }

        public Point translate(int dx, int dy) {
            return new Point(x + dx, y + dy); // Returns NEW instance (immutable!)
        }
    }

    // Records implementing interfaces
    interface Shape {
        double area();
    }

    record Rectangle(double width, double height) implements Shape {
        public double area() { return width * height; }
    }

    record Circle(double radius) implements Shape {
        public double area() { return Math.PI * radius * radius; }
    }

    static void recordsExample() {
        System.out.println("=== Records (Immutable Data) ===\n");

        System.out.println("--- Auto-generated methods ---");
        var user = new User("Alice", 30);
        System.out.println("  " + user);
        System.out.println("  name: " + user.name()); // Accessor (not getName!)
        System.out.println("  age: " + user.age());
        System.out.println("  equals copy: " + user.equals(new User("Alice", 30)));

        System.out.println("\n--- Compact constructor (validation) ---");
        var p1 = new Point(5, 10);
        var p2 = p1.translate(3, -2); // Returns NEW Point
        System.out.println("  p1: " + p1);
        System.out.println("  p2: " + p2);

        System.out.println("\n--- Records + Interfaces (polymorphism) ---");
        List<Shape> shapes = List.of(
            new Rectangle(10, 5),
            new Circle(7)
        );
        shapes.forEach(s ->
            System.out.printf("  %s area: %.2f%n", s, s.area())
        );

        // Pattern matching with switch (Java 21+)
        System.out.println("\n--- Pattern matching switch ---");
        shapes.forEach(s -> {
            String description = switch (s) {
                case Rectangle r -> "Rectangle " + r.width() + "×" + r.height();
                case Circle c -> "Circle r=" + c.radius();
                default -> "Unknown shape";
            };
            System.out.println("  " + description);
        });
    }

    // ======================================================
    // VIRTUAL THREADS
    // ======================================================

    static void virtualThreadsExample() throws Exception {
        System.out.println("\n=== Virtual Threads ===\n");

        // Creating a single virtual thread
        System.out.println("--- Single virtual thread ---");
        Thread vThread = Thread.ofVirtual()
            .name("virtual-worker")
            .start(() -> System.out.println("  Running in virtual thread!"));
        vThread.join();

        // Mass concurrency: 100 tasks on virtual threads
        System.out.println("\n--- Mass concurrency (100 virtual threads) ---");
        long start = System.currentTimeMillis();
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            var futures = IntStream.range(0, 100)
                .mapToObj(i -> executor.submit(() -> {
                    // Simulate I/O (DB query, HTTP call, etc.)
                    Thread.sleep(50);
                    return "Task " + i + " done";
                }))
                .toList();

            // Wait for all and count
            long completed = futures.stream()
                .filter(f -> {
                    try { f.get(); return true; }
                    catch (Exception e) { return false; }
                })
                .count();
            System.out.printf("  Completed %d tasks in %dms%n",
                completed, System.currentTimeMillis() - start);
        }

        // Comparison: platform threads vs virtual threads
        System.out.println("\n--- Platform Threads (for comparison) ---");
        long pStart = System.currentTimeMillis();
        try (var executor = Executors.newFixedThreadPool(10)) {
            var futures = IntStream.range(0, 100)
                .mapToObj(i -> executor.submit(() -> {
                    Thread.sleep(50);
                    return "Task " + i;
                }))
                .toList();
            futures.forEach(f -> { try { f.get(); } catch (Exception e) {} });
        }
        System.out.printf("  Platform threads: %dms (pool of 10)%n",
            System.currentTimeMillis() - pStart);
    }

    public static void main(String[] args) throws Exception {
        recordsExample();
        virtualThreadsExample();
    }
}