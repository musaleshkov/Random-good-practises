<?php
/*
    PHP Generators and Traits demonstrate two unique language features:

    GENERATORS (PHP 5.5+):
    - yield keyword creates iterators without writing Iterator interface
    - Memory efficient: values are generated on-the-fly, not stored in memory
    - yield from: delegates to another generator (like JS yield*)
    - Equivalent to Python generators and JS function*

    TRAITS (PHP 5.4+):
    - Horizontal code reuse (PHP doesn't have multiple inheritance)
    - Like Rust traits or TypeScript mixins, but compile-time composed
    - Supports abstract methods, static methods, properties
    - Conflict resolution with `insteadof` and `as` keywords
*/

echo "=== PHP Generators (lazy evaluation) ===\n\n";

// Generator: range without storing all values in memory
function myRange(int $from, int $to, int $step = 1): Generator {
    for ($i = $from; $i <= $to; $i += $step) {
        yield $i;
    }
}

echo "--- Basic Generator ---\n";
$gen = myRange(1, 5);
foreach ($gen as $value) {
    echo "  $value\n";
}

// Memory comparison: generator vs array
echo "\n--- Memory Comparison ---\n";
$startMemory = memory_get_usage();
$bigGenerator = myRange(1, 1000000);
$genMemory = memory_get_usage() - $startMemory;

$startMemory = memory_get_usage();
$bigArray = range(1, 1000000);
$arrMemory = memory_get_usage() - $startMemory;

printf("  Generator memory: %d bytes\n", $genMemory);
printf("  Array memory:     %d bytes\n", $arrMemory);

// yield from (delegation — like JS yield*)
echo "\n--- yield from (delegation) ---\n";
function allFruits(): Generator {
    yield from ['🍍', '🍑'];      // Delegates to array
    yield from myRange(1, 3);      // Delegates to another generator
    yield '🍓';                     // Direct yield
}
foreach (allFruits() as $item) {
    echo "  $item\n";
}

// Generator with keys
echo "\n--- Generator with keys ---\n";
$fruitGen = (function(): Generator {
    yield 'pineapple' => '🍍';
    yield 'peach' => '🍑';
    yield 'strawberry' => '🍓';
})();
foreach ($fruitGen as $key => $value) {
    echo "  $key = $value\n";
}

// ============================================================
// TRAITS (PHP's multiple inheritance solution)
// ============================================================
echo "\n=== PHP Traits (horizontal code reuse) ===\n\n";

trait Logger {
    public function log(string $message): void {
        echo "[LOG] $message\n";
    }
}

trait Timestampable {
    private \DateTimeImmutable $createdAt;

    public function initializeTimestamp(): void {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getCreatedAt(): \DateTimeImmutable {
        return $this->createdAt;
    }
}

trait Identifiable {
    abstract public function getType(): string;

    public function identify(): string {
        return sprintf('%s@%s', $this->getType(), spl_object_hash($this));
    }
}

// Multiple traits used together
class User {
    use Logger, Timestampable, Identifiable;

    public function __construct(
        public readonly string $name
    ) {
        $this->initializeTimestamp();
        $this->log("User '$name' created");
    }

    public function getType(): string {
        return 'User';
    }
}

class Product {
    use Logger, Timestampable, Identifiable;

    public function __construct(
        public readonly string $name,
        public readonly float $price
    ) {
        $this->initializeTimestamp();
        $this->log("Product '$name' added");
    }

    public function getType(): string {
        return 'Product';
    }
}

// Usage
$user = new User('Alice');
echo "  ID: " . $user->identify() . "\n";
echo "  Created: " . $user->getCreatedAt()->format('Y-m-d H:i:s') . "\n";

$product = new Product('Laptop', 999.99);
echo "  ID: " . $product->identify() . "\n";
echo "  Created: " . $product->getCreatedAt()->format('Y-m-d H:i:s') . "\n";

// Trait conflict resolution
echo "\n--- Trait conflict resolution ---\n";
trait A {
    public function greet(): string { return 'Hello from A'; }
}
trait B {
    public function greet(): string { return 'Hello from B'; }
}

class Conflicting {
    use A, B {
        A::greet insteadof B;     // Use A's version
        B::greet as greetFromB;   // Alias B's version
    }
}

$c = new Conflicting();
echo "  " . $c->greet() . "\n";
echo "  " . $c->greetFromB() . "\n";