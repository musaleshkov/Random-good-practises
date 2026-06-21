import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "Python"))

# Minimal test - verifies the module runs without errors
def test_import():
    """Verify the module can be imported without errors."""
    try:
        exec(open(os.path.join(os.path.dirname(__file__), "..", "..", "Python", "01_list_comprehensions.py")).read())
        assert True
    except Exception as e:
        assert False, f"Import failed: {e}"

if __name__ == "__main__":
    test_import()
    print("✓ Python list comprehensions module loads successfully")