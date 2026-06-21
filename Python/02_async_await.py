"""
Async/await in Python (introduced in Python 3.5) uses asyncio,
which is fundamentally different from JavaScript's event loop.
Python's coroutines must be explicitly scheduled on an event loop,
while JS Promises run automatically.

Key difference: Python uses `async def` + `await` within an asyncio event loop.
"""

import asyncio
from typing import Dict


async def get_fruit(name: str) -> str:
    """Simulate an async I/O operation (like a DB query or API call)."""
    fruits: Dict[str, str] = {
        "pineapple": "🍍",
        "peach": "🍑",
        "strawberry": "🍓",
    }

    # Simulate I/O delay (non-blocking!)
    await asyncio.sleep(0.1)

    if name not in fruits:
        raise ValueError(f"Unknown fruit: {name}")

    return fruits[name]


async def make_smoothie() -> str:
    """BEST PRACTICE: Run independent async tasks concurrently with asyncio.gather() (like Promise.all)."""
    pineapple, strawberry = await asyncio.gather(
        get_fruit("pineapple"),
        get_fruit("strawberry"),
    )
    return f"{pineapple} + {strawberry}"


async def make_smoothie_sequential() -> str:
    """ANIT-PATTERN: Sequential awaits - each must finish before next starts."""
    pineapple = await get_fruit("pineapple")
    strawberry = await get_fruit("strawberry")
    return f"{pineapple} + {strawberry}"


async def error_handling_example() -> None:
    """Python error handling with async/await."""
    print("\n--- Error handling ---")
    try:
        result = await get_fruit("durian")
        print(f"Got: {result}")
    except ValueError as e:
        print(f"Error: {e}")


async def race_example() -> None:
    """asyncio.wait(..., return_when=FIRST_COMPLETED) is like Promise.race()."""
    print("\n--- Race (first completed wins) ---")

    async def slow_fruit():
        await asyncio.sleep(0.3)
        return "🐌 slow"

    async def fast_fruit():
        await asyncio.sleep(0.05)
        return "🚀 fast"

    done, pending = await asyncio.wait(
        [slow_fruit(), fast_fruit()],
        return_when=asyncio.FIRST_COMPLETED,
    )
    for task in done:
        print(f"  Winner: {task.result()}")

    # Cancel pending tasks (important!)
    for task in pending:
        task.cancel()


async def main() -> None:
    print("=== Python Async/Await ===\n")

    # Basic await
    fruit = await get_fruit("peach")
    print(f"Got: {fruit}")

    # Concurrent (gather = Promise.all)
    print("\n--- Concurrent (gather) ---")
    smoothie = await make_smoothie()
    print(f"Smoothie: {smoothie}")

    # Sequential (anti-pattern demonstration)
    print("\n--- Sequential (anti-pattern) ---")
    smoothie2 = await make_smoothie_sequential()
    print(f"Smoothie: {smoothie2}")

    await error_handling_example()
    await race_example()

    # Task creation (like creating a Promise that runs immediately)
    print("\n--- Tasks (background execution) ---")
    task = asyncio.create_task(get_fruit("peach"))
    print("Task created, doing other work...")
    await asyncio.sleep(0.05)
    result = await task
    print(f"Task result: {result}")


if __name__ == "__main__":
    # asyncio.run() is the entry point (Python 3.7+)
    asyncio.run(main())