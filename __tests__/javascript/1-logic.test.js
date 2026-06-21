const assert = require("assert");

// Inline test runner (no external deps needed for basic tests)
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

// Import the pro version (best practice)
function numberToAccountingString(number) {
  if (number == null) return;
  if (number < 0) return `(${Math.abs(number)})`;
  return number.toString();
}

console.log("1-logic: Guard Clauses & Early Returns");
test("returns undefined for null input", () => {
  assert.strictEqual(numberToAccountingString(null), undefined);
});

test("returns undefined for undefined input", () => {
  assert.strictEqual(numberToAccountingString(undefined), undefined);
});

test("returns string for zero", () => {
  assert.strictEqual(numberToAccountingString(0), "0");
});

test("wraps negative numbers in parentheses", () => {
  assert.strictEqual(numberToAccountingString(-5), "(5)");
});

test("returns string representation for positive numbers", () => {
  assert.strictEqual(numberToAccountingString(10), "10");
});
