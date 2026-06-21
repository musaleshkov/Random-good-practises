"""
Python Context Managers and Decorators are two of Python's most
idiomatic patterns — they have no direct equivalent in most other languages.

CONTEXT MANAGERS (with statement):
- Automatically handle setup/teardown (like try/finally)
- Used for: files, locks, DB connections, temp directories
- Can be class-based (__enter__/__exit__) or generator-based (@contextmanager)

DECORATORS:
- Functions that wrap other functions to add behavior
- @staticmethod, @property, @classmethod are built-in
- Custom decorators for: logging, timing, caching, auth
"""

import time
from contextlib import contextmanager, redirect_stdout
from functools import wraps
import io

# ======================================================
# CONTEXT MANAGERS
# ======================================================

# Class-based context manager
class DatabaseConnection:
    """Simulates a database connection that must be opened/closed."""

    def __init__(self, uri: str):
        self.uri = uri
        self.connected = False

    def __enter__(self):
        self.connected = True
        print(f"  [DB] Connected to {self.uri}")
        return self  # returned value bound to `as` variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connected = False
        print(f"  [DB] Connection closed")
        # Return False = propagate exceptions, True = suppress
        return False

    def query(self, sql: str) -> list[str]:
        if not self.connected:
            raise RuntimeError("Not connected!")
        return [f"result for: {sql}"]


# Generator-based context manager (simpler!)
@contextmanager
def timed_operation(name: str):
    """Context manager that times an operation."""
    print(f"  [{name}] Starting...")
    start = time.perf_counter()
    try:
        yield  # Control returns to the `with` block
    finally:
        elapsed = time.perf_counter() - start
        print(f"  [{name}] Done in {elapsed:.4f}s")


def context_manager_examples():
    print("=== Python Context Managers ===\n")

    # Class-based
    print("--- Class-based ---")
    with DatabaseConnection("postgres://localhost/mydb") as db:
        results = db.query("SELECT * FROM users")
        print(f"  Results: {results}")
    print(f"  (Connection still open? {db.connected})\n")

    # Generator-based
    print("--- Generator-based ---")
    with timed_operation("data processing"):
        time.sleep(0.05)
        total = sum(range(1000))


# ======================================================
# DECORATORS
# ======================================================

# Decorator with no arguments
def log_calls(func):
    @wraps(func)  # Preserves original function's metadata
    def wrapper(*args, **kwargs):
        print(f"  Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"  {func.__name__} returned {result}")
        return result
    return wrapper


# Decorator WITH arguments
def retry(max_attempts: int = 3, delay: float = 0.1):
    """Retry decorator: retries a function on failure."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    if attempt < max_attempts:
                        print(f"    Attempt {attempt} failed, retrying in {delay}s...")
                        time.sleep(delay)
            raise last_error  # type: ignore
        return wrapper
    return decorator


@log_calls
def add(a: int, b: int) -> int:
    return a + b


@retry(max_attempts=3, delay=0.05)
def unreliable_operation(succeed_on_attempt: int):
    """Fails until the specified attempt."""
    unreliable_operation.attempt += 1
    if unreliable_operation.attempt < succeed_on_attempt:
        raise RuntimeError(f"Failed on attempt {unreliable_operation.attempt}")
    return f"Success on attempt {unreliable_operation.attempt}"
unreliable_operation.attempt = 0  # type: ignore


# Class decorator
def add_greeting(cls):
    """Class decorator: adds a method to the class."""
    cls.greet = lambda self: f"Hello, I'm {self.name}!"
    return cls


def decorator_examples():
    print("\n=== Python Decorators ===\n")

    # Simple decorator
    print("--- @log_calls ---")
    result = add(3, 5)

    # Decorator with arguments
    print("\n--- @retry ---")
    try:
        result = unreliable_operation(succeed_on_attempt=3)
        print(f"  Result: {result}")
    except RuntimeError as e:
        print(f"  Final error: {e}")

    # Class decorator
    print("\n--- Class decorator ---")

    @add_greeting
    class Person:
        def __init__(self, name: str):
            self.name = name

    p = Person("Alice")
    print(f"  {p.greet()}")


if __name__ == "__main__":
    context_manager_examples()
    decorator_examples()