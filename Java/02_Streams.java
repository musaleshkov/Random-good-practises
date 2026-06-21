/*
    Java Stream API (introduced in Java 8) provides a functional approach
    to processing collections — equivalent to JavaScript's map/filter/reduce.
    
    Key operations:
    - map() → transforms elements (like JS map)
    - filter() → keeps matching elements (like JS filter)
    - reduce() → aggregates values (like JS reduce)
    - collect() → gathers results into a collection
    - sorted(), distinct(), limit(), skip()
*/

import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

public class StreamsExample {

    static class Product {
        int id;
        String name;
        double price;
        int quantity;
        String category;

        Product(int id, String name, double price, int quantity, String category) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
            this.category = category;
        }

        @Override
        public String toString() {
            return String.format("%s ($%.2f, qty: %d)", name, price, quantity);
        }
    }

    static final List<Product> products = Arrays.asList(
        new Product(1, "Laptop", 1200.0, 5, "Electronics"),
        new Product(2, "Mouse", 25.0, 50, "Electronics"),
        new Product(3, "Desk", 350.0, 10, "Furniture"),
        new Product(4, "Chair", 200.0, 15, "Furniture"),
        new Product(5, "Monitor", 400.0, 8, "Electronics")
    );

    public static void main(String[] args) {
        System.out.println("=== Java Stream API (map/filter/reduce) ===\n");

        // MAP equivalent: map()
        System.out.println("--- MAP (map) ---");
        List<String> names = products.stream()
            .map(p -> p.name.toUpperCase())
            .collect(toList());
        System.out.println("  " + names);

        // FILTER equivalent: filter()
        System.out.println("\n--- FILTER (filter) ---");
        products.stream()
            .filter(p -> p.category.equals("Electronics"))
            .forEach(p -> System.out.printf("  %s - $%.2f%n", p.name, p.price));

        // REDUCE equivalent: reduce() and sum()
        System.out.println("\n--- REDUCE (reduce/sum) ---");
        double totalValue = products.stream()
            .mapToDouble(p -> p.price * p.quantity)
            .sum();
        System.out.printf("  Total inventory value: $%.2f%n", totalValue);

        // CHAINING
        System.out.println("\n--- CHAINING ---");
        List<String> discounted = products.stream()
            .filter(p -> p.category.equals("Electronics") && p.quantity > 6)
            .map(p -> String.format("%s - $%.2f (was $%.2f)",
                p.name, p.price * 0.9, p.price))
            .sorted()
            .collect(toList());
        discounted.forEach(s -> System.out.println("  " + s));

        // GROUP BY
        System.out.println("\n--- GROUP BY ---");
        Map<String, List<Product>> grouped = products.stream()
            .collect(groupingBy(p -> p.category));
        grouped.forEach((category, prods) -> {
            double avg = prods.stream().mapToDouble(p -> p.price).average().orElse(0);
            System.out.printf("  %s: %d products, avg price: $%.2f%n",
                category, prods.size(), avg);
        });

        // PARALLEL stream (multi-threaded, for large datasets)
        System.out.println("\n--- PARALLEL STREAM ---");
        double parallelSum = products.parallelStream()
            .mapToDouble(p -> p.price)
            .sum();
        System.out.printf("  Parallel sum of prices: $%.2f%n", parallelSum);

        // OPTIONAL (instead of null checks)
        System.out.println("\n--- OPTIONAL (no null!) ---");
        products.stream()
            .filter(p -> p.price > 1000)
            .findFirst()
            .ifPresent(p -> System.out.println("  Most expensive: " + p.name));

        String notFound = products.stream()
            .filter(p -> p.price > 5000)
            .map(p -> p.name)
            .findFirst()
            .orElse("None over $5000");
        System.out.println("  Over $5000: " + notFound);
    }
}