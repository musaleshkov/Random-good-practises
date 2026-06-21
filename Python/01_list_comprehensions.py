"""
Python list comprehensions are the idiomatic equivalent of JavaScript's
map/filter, but they're more concise and often more readable.

Python also has built-in map() and filter() functions, but
list/dict/set comprehensions are generally preferred.
"""

from dataclasses import dataclass
from typing import List


@dataclass
class Product:
    id: int
    name: str
    price: float
    quantity: int
    category: str


products: List[Product] = [
    Product(1, "Laptop", 1200.0, 5, "Electronics"),
    Product(2, "Mouse", 25.0, 50, "Electronics"),
    Product(3, "Desk", 350.0, 10, "Furniture"),
    Product(4, "Chair", 200.0, 15, "Furniture"),
    Product(5, "Monitor", 400.0, 8, "Electronics"),
]


def main() -> None:
    print("=== Python List Comprehensions (vs JS map/filter) ===\n")

    # MAP equivalent: list comprehension
    print("--- MAP ---")
    names = [p.name.upper() for p in products]
    print(f"  {names}")

    # FILTER equivalent: list comprehension with if
    print("\n--- FILTER ---")
    electronics = [p for p in products if p.category == "Electronics"]
    for p in electronics:
        print(f"  {p.name} - ${p.price:.2f}")

    # MAP + FILTER combined
    print("\n--- MAP + FILTER (combined) ---")
    discounted = [
        (p.name, p.price * 0.9)
        for p in products
        if p.category == "Electronics" and p.quantity > 6
    ]
    for name, price in discounted:
        print(f"  {name} - ${price:.2f} (discounted)")

    # REDUCE equivalent: sum() with generator expression
    print("\n--- REDUCE (sum) ---")
    total_value = sum(p.price * p.quantity for p in products)
    print(f"  Total inventory value: ${total_value:.2f}")

    # DICT comprehension (unique to Python!)
    print("\n--- DICT COMPREHENSION ---")
    price_lookup = {p.name: p.price for p in products if p.price > 100}
    print(f"  {price_lookup}")

    # SET comprehension
    print("\n--- SET COMPREHENSION ---")
    categories = {p.category for p in products}
    print(f"  Categories: {categories}")

    # GENERATOR expression (lazy, memory-efficient for huge datasets)
    print("\n--- GENERATOR (lazy evaluation) ---")
    expensive_names = (p.name for p in products if p.price > 300)
    print(f"  Generator: {expensive_names}")  # <generator object>
    print(f"  Evaluated: {list(expensive_names)}")  # ['Laptop', 'Desk', 'Monitor']

    # GROUP BY: using itertools.groupby
    from itertools import groupby
    print("\n--- GROUP BY ---")
    sorted_products = sorted(products, key=lambda p: p.category)
    for category, group in groupby(sorted_products, key=lambda p: p.category):
        group_list = list(group)
        avg_price = sum(p.price for p in group_list) / len(group_list)
        print(f"  {category}: {len(group_list)} products, avg price: ${avg_price:.2f}")


if __name__ == "__main__":
    main()