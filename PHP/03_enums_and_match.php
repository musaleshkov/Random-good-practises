<?php
/*
    PHP 8.1+ introduced native Enums (backed and pure)
    and the match expression — powerful features that replace
    constants and verbose switch statements.

    ENUMS:
    - Pure enums: enum { case A; case B; }
    - Backed enums: enum { case A = 'a'; case B = 'b'; }
    - Can implement interfaces, use traits, have methods
    - Can't extend classes (they are final)

    MATCH (PHP 8.0+):
    - Expression-based (returns a value!)
    - Strict comparison (=== not ==)
    - Exhaustive (throws UnhandledMatchError if no match)
*/

echo "=== PHP Enums ===\n\n";

// Pure enum
enum Status {
    case Draft;
    case Published;
    case Archived;
}

// Backed enum with methods
enum Color: string {
    case Red = '#FF0000';
    case Green = '#00FF00';
    case Blue = '#0000FF';

    public function label(): string {
        return match ($this) {
            self::Red => 'Red',
            self::Green => 'Green',
            self::Blue => 'Blue',
        };
    }

    public function brightness(): string {
        return match ($this) {
            self::Red, self::Green => 'Bright',
            self::Blue => 'Dark',
        };
    }
}

// Int-backed enum with computations
enum Size: int {
    case Small = 1;
    case Medium = 2;
    case Large = 3;

    public function multiplier(): float {
        return match ($this) {
            self::Small => 1.0,
            self::Medium => 1.5,
            self::Large => 2.0,
        };
    }
}

// Enum implementing an interface
interface Describable {
    public function describe(): string;
}

enum Priority: int implements Describable {
    case Low = 0;
    case Medium = 1;
    case High = 2;
    case Critical = 3;

    public function describe(): string {
        return match ($this) {
            self::Low => 'When you have time',
            self::Medium => 'This sprint',
            self::High => 'Today',
            self::Critical => 'Drop everything!',
        };
    }
}

// Usage
echo "--- Backed Enum with methods ---\n";
foreach (Color::cases() as $color) {
    printf("  %s (%s) - %s\n", $color->label(), $color->value, $color->brightness());
}

echo "\n--- Int-backed Enum ---\n";
$basePrice = 100.0;
foreach (Size::cases() as $size) {
    printf("  %s (×%.1f) = \$%.2f\n", $size->name, $size->multiplier(), $basePrice * $size->multiplier());
}

echo "\n--- Enum with Interface ---\n";
$priority = Priority::High;
printf("  %s: %s (value: %d)\n", $priority->name, $priority->describe(), $priority->value);

// ======================================================
// MATCH EXPRESSION (PHP 8.0+)
// ======================================================
echo "\n=== PHP Match Expression ===\n\n";

// Simple match (returns value, exhaustive!)
function getEmoji(string $fruit): string {
    return match ($fruit) {
        'apple' => '🍎',
        'banana' => '🍌',
        'orange' => '🍊',
        default => '❓',
    };
}

echo "--- Basic match ---\n";
echo "  apple = " . getEmoji('apple') . "\n";
echo "  kiwi = " . getEmoji('kiwi') . "\n";

// Match with complex expressions
echo "\n--- Match with conditions ---\n";
function classify(int $score): string {
    return match (true) {
        $score >= 90 => '🏆 Excellent',
        $score >= 80 => '👍 Good',
        $score >= 70 => '📖 Average',
        $score >= 60 => '⚠️ Passing',
        default => '❌ Failing',
    };
}
printf("  Score 95: %s\n", classify(95));
printf("  Score 72: %s\n", classify(72));
printf("  Score 45: %s\n", classify(45));

// Match with array destructuring
echo "\n--- Match + Array destructuring ---\n";
function getHttpMessage(int $code): string {
    return match ($code) {
        200 => 'OK',
        201 => 'Created',
        301 => 'Moved Permanently',
        400 => 'Bad Request',
        404 => 'Not Found',
        500 => 'Internal Server Error',
        default => sprintf('Unknown status: %d', $code),
    };
}
printf("  200: %s\n", getHttpMessage(200));
printf("  418: %s\n", getHttpMessage(418));