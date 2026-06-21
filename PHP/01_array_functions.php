<?php
/*
    PHP's array functions provide a rich set of tools equivalent to
    JavaScript's map/filter/reduce. PHP arrays are actually ordered maps
    (similar to JavaScript's Map + Array combined).

    Key functions:
    - array_map()     → like JS map
    - array_filter()  → like JS filter
    - array_reduce()  → like JS reduce
    - Arrow functions (PHP 7.4+) → fn($x) => $x * 2 (like JS arrow functions)
*/

class Product {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly float $price,
        public readonly int $quantity,
        public readonly string $category,
    ) {}
}

$products = [
    new Product(1, 'Laptop', 1200.0, 5, 'Electronics'),
    new Product(2, 'Mouse', 25.0, 50, 'Electronics'),
    new Product(3, 'Desk', 350.0, 10, 'Furniture'),
    new Product(4, 'Chair', 200.0, 15, 'Furniture'),
    new Product(5, 'Monitor', 400.0, 8, 'Electronics'),
];

echo "=== PHP Array Functions (map/filter/reduce) ===\n\n";

// MAP equivalent: array_map()
echo "--- MAP (array_map) ---\n";
$names = array_map(
    fn(Product $p): string => strtoupper($p->name),
    $products
);
echo "  " . implode(', ', $names) . "\n";

// FILTER equivalent: array_filter()
echo "\n--- FILTER (array_filter) ---\n";
$electronics = array_filter(
    $products,
    fn(Product $p): bool => $p->category === 'Electronics'
);
foreach ($electronics as $p) {
    printf("  %s - \$%.2f\n", $p->name, $p->price);
}

// REDUCE equivalent: array_reduce()
echo "\n--- REDUCE (array_reduce) ---\n";
$totalValue = array_reduce(
    $products,
    fn(float $carry, Product $p): float => $carry + ($p->price * $p->quantity),
    0.0
);
printf("  Total inventory value: \$%.2f\n", $totalValue);

// CHAINING (PHP doesn't have fluent arrays, but you can nest calls)
echo "\n--- CHAINING (nested calls) ---\n";
$discounted = array_map(
    fn(Product $p): string => sprintf('%s - $%.2f (discounted)', $p->name, $p->price * 0.9),
    array_filter(
        $products,
        fn(Product $p): bool => $p->category === 'Electronics' && $p->quantity > 6
    )
);
foreach ($discounted as $item) {
    echo "  $item\n";
}

// ARRAY COLUMN (extract a column — unique to PHP)
echo "\n--- array_column ---\n";
$prices = array_column($products, 'price', 'name');
print_r($prices);

// ARRAY UNIQUE / ARRAY VALUES
echo "\n--- array_unique ---\n";
$categories = array_unique(array_column($products, 'category'));
echo "  Categories: " . implode(', ', $categories) . "\n";

// PHP 8.1+ array_is_list
echo "\n--- array_is_list ---\n";
echo "  Is indexed array? " . (array_is_list($products) ? 'yes' : 'no') . "\n";