/*
    Java Generics provide compile-time type safety, similar to C# and TypeScript.
    Key features:
    - Type erasure: Generic types are removed at runtime (unlike C# reified generics)
    - Wildcards: ? extends T (covariant) and ? super T (contravariant)
    - Bounded type parameters: <T extends Comparable<T>>
*/

import java.util.ArrayList;
import java.util.List;

public class GenericsExample {

    // ❌ WITHOUT generics — raw types, no type safety
    static void rawTypeExample() {
        System.out.println("=== Raw Types (no generics) ===");

        @SuppressWarnings({"rawtypes", "unchecked"})
        List list = new ArrayList();
        list.add(100);
        list.add(200);
        list.add("Hello"); // No compile error!
        System.out.println("  Raw list: " + list);

        // Dangerous: need to cast, ClassCastException if wrong type
        Integer first = (Integer) list.get(0);
        System.out.println("  First (casted): " + first);
    }

    // ✅ WITH generics — compile-time safety
    static void genericExample() {
        System.out.println("\n=== With Generics ===");

        List<Integer> numbers = new ArrayList<>();
        numbers.add(100);
        numbers.add(200);
        // numbers.add("Hello"); // COMPILE ERROR!
        numbers.add(300);
        System.out.println("  Numbers: " + numbers);

        List<String> strings = new ArrayList<>();
        strings.add("Hello");
        strings.add("World");
        System.out.println("  Strings: " + strings);
    }

    // Generic class
    static class Repository<T> {
        private final List<T> items = new ArrayList<>();

        public void add(T item) {
            items.add(item);
        }

        public T find(int index) {
            if (index >= 0 && index < items.size()) {
                return items.get(index);
            }
            return null;
        }

        public List<T> getAll() {
            return items;
        }
    }

    // Bounded type parameter
    static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }

    // Wildcard: accepts List of any subtype of Number
    static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    static void advancedGenerics() {
        System.out.println("\n=== Advanced Generics ===");

        // Repository usage
        Repository<String> repo = new Repository<>();
        repo.add("Alice");
        repo.add("Bob");
        System.out.println("  Repo items: " + repo.getAll());
        System.out.println("  Found: " + repo.find(0));

        // Bounded type
        System.out.println("  Max of 10, 20: " + max(10, 20));
        System.out.println("  Max of 'a', 'z': " + max('a', 'z'));

        // Wildcard
        List<Integer> intList = List.of(1, 2, 3, 4, 5);
        List<Double> doubleList = List.of(1.5, 2.5, 3.5);
        System.out.println("  Sum intList: " + sumOfList(intList));
        System.out.println("  Sum doubleList: " + sumOfList(doubleList));
    }

    public static void main(String[] args) {
        rawTypeExample();
        genericExample();
        advancedGenerics();
    }
}