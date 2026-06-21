# Random Good Practices

A collection of good software development practices demonstrated across **6 languages**,
showing the progression from novice ("noob") → intermediate ("advanced") → expert ("pro") code patterns,
and comparing language-specific idioms.

## 📁 Project Structure 

```
Random-good-practises/
├── README.md                            # This file
├── tsconfig.json                        # TypeScript strict mode config
├── .editorconfig                        # Cross-editor consistency
├── .prettierrc                          # Code formatting
├── .eslintrc.json                       # JS/TS linting rules
├── .github/workflows/ci.yml             # CI pipeline (all 6 languages)
├── JavaScript/                          # JS best practices
│   ├── 1-logic/                         # Guard clauses & early returns
│   ├── 2-variable-manipulation/         # Naming, destructuring, reduce
│   ├── 3-async/                         # Callback hell → Promises → modular async/await
│   ├── 4-fat-functions/                 # SRP: splitting validation from business logic
│   ├── 5-react-state-update/            # React useState: stale closures → functional updater
│   ├── 6-react-use-effect/              # React useEffect: dependency arrays → useMemo
│   ├── 7-react-lists/                   # React lists: mutation → immutable updates → derived state
│   └── 8-custom-hooks.js                # useDebounce, usePrevious, useLocalStorage, useAsync
├── TypeScript/                          # TS concepts & patterns
│   ├── foreach,filter,map.ts            # Generic implementations of array methods
│   ├── generics.ts                      # From `any` to typed generics
│   ├── namespace.ts                     # Logical grouping with namespaces
│   ├── overloading.ts                   # Function overload signatures
│   ├── overriding.ts                    # Class inheritance & method overriding
│   ├── design-patterns.ts               # Observer, Builder, Singleton, Factory, Strategy
│   ├── Async await promise actions/     # Promise creation, error handling, concurrency, event loop
│   ├── OOP/                             # Object-Oriented Programming in depth
│   │   ├── 01. Principles/              # Encapsulation, Abstraction, Polymorphism, Inheritance
│   │   ├── 02. Fundamentals/            # Objects vs Classes vs Constructors
│   │   ├── 03. Encapsulation/           # Immutability & validation with getters/setters
│   │   ├── 04. Statics/                 # Static properties & methods
│   │   ├── 05. Inheritance/            # Dealership model (Vehicle → Car, Airplane)
│   │   ├── 06. Abstraction/            # Abstract contracts with interfaces
│   │   ├── 07. Polymorphism/           # Polymorphic vehicle behaviors
│   │   └── 08. Generics/               # Generic Cup\<T\> pattern
│   └── S.O.L.I.D/                       # SOLID principles + Dependency Injection
├── Java/                                # Java equivalents
│   ├── 01_Generics.java                 # Raw types vs List\<T\>, wildcards, bounded types
│   ├── 02_Streams.java                  # Stream API (map/filter/reduce), grouping, parallel streams
│   ├── 03_CompletableFuture.java        # Async: allOf/anyOf, thenCombine, exceptionally
│   └── 04_VirtualThreadsAndRecords.java  # Java 21 Virtual Threads + Records + Pattern Matching
├── Python/                              # Pythonic equivalents
│   ├── 01_list_comprehensions.py        # List/dict/set comprehensions, generators, itertools.groupby
│   ├── 02_async_await.py               # asyncio.gather(), asyncio.wait(), create_task()
│   └── 03_context_managers_and_decorators.py  # with statement, @contextmanager, @retry, class decorators
├── Go/                                  # Go's approach to concurrency & interfaces
│   ├── 01_goroutines_channels.go        # Goroutines, channels, select, sync.WaitGroup, error handling
│   ├── 02_interfaces.go                 # Structural typing, interface composition, type assertions
│   └── 03_context_and_embedding.go      # Context cancellation/deadlines, struct embedding
├── PHP/                                 # PHP features
│   ├── 01_array_functions.php           # array_map/filter/reduce, arrow functions, array_column
│   ├── 02_generators_traits.php         # Generators (yield), memory efficiency, traits, conflict resolution
│   └── 03_enums_and_match.php           # PHP 8.1 Enums, match expression, enum methods
└── __tests__/                           # Test suites
    ├── go/
    │   └── interfaces_test.go           # Shape interface tests (3 tests)
    ├── javascript/
    │   └── 1-logic.test.js              # Guard clause tests (5 tests)
    └── python/
        └── test_list_comprehensions.py  # Module import validation
```

## 🎯 Concepts Covered (Cross-Language Comparison)

| Concept | JavaScript | TypeScript | Java | Python | Go | PHP |
|---|---|---|---|---|---|---|
| Early returns / guard clauses | ✅ 1-logic | | | | | |
| Descriptive naming | ✅ 2-variable | | | | | |
| Destructuring defaults | ✅ 2-variable | | | | | |
| Async/await | ✅ 3-async | ✅ | ✅ CompletableFuture | ✅ asyncio | | |
| Single Responsibility | ✅ 4-fat-fns | ✅ S.O.L.I.D | | | | |
| React state patterns | ✅ 5,6,7 | | | | | |
| Generics | | ✅ generics.ts | ✅ List\<T\> | | | |
| Map/Filter/Reduce | | ✅ foreach...ts | ✅ Stream API | ✅ comprehensions | | ✅ array_* |
| OOP Principles | | ✅ OOP/01 | | | | |
| SOLID | | ✅ S.O.L.I.D | | | | |
| Dependency Injection | | ✅ S.O.L.I.D | | | | |
| Design Patterns | | ✅ design-patterns.ts | | | | |
| Custom Hooks | ✅ 8-custom-hooks | | | | | |
| Event loop / microtasks | | ✅ Async... | | | | |
| Concurrency model | Callbacks/Promises | Promises | CompletableFuture | Coroutines | Goroutines+Channels | |
| Error handling | try/catch | try/catch | try/catch | try/catch | Explicit returns | try/catch |
| Interfaces/Traits | | ✅ interfaces | ✅ interfaces | | ✅ structural | ✅ traits |
| Generators (lazy eval) | | | | ✅ generators | | ✅ yield |
| Lazy streams | | | ✅ Streams | ✅ generators | | ✅ generators |
| Context managers | | | | ✅ with statement | ✅ context.Context | |
| Decorators | | | | ✅ @decorator | | |
| Virtual Threads | | | ✅ Java 21 | | ✅ goroutines | |
| Records/Data Classes | | | ✅ records | ✅ @dataclass | | |
| Enums | | ✅ enums | | | | ✅ PHP 8.1 |
| Match / Pattern matching | | | ✅ switch (21+) | ✅ match | | ✅ match (8.0) |
| Struct Embedding | | | | | ✅ embedding | |
| Memory safety | GC | GC | GC | GC | GC | GC |

## 🚀 Getting Started

### JavaScript examples (Node.js)
```bash
node "JavaScript/1-logic/3-pro.js"
```

### Running tests
```bash
# JavaScript
node "__tests__/javascript/1-logic.test.js"

# Python
python "__tests__/python/test_list_comprehensions.py"
```

### TypeScript examples
```bash
npx ts-node "TypeScript/generics.ts"
```

### Java examples
```bash
javac "Java/01_Generics.java" && java GenericsExample
```

### Python examples
```bash
python "Python/01_list_comprehensions.py"
```

### Go examples
```bash
go run "Go/01_goroutines_channels.go"
```

### PHP examples
```bash
php "PHP/01_array_functions.php"
```

### Tooling
-  `tsconfig.json` with full strict mode
-  `.editorconfig` for cross-editor consistency
-  `.prettierrc` for auto-formatting
-  `.eslintrc.json` for JS/TS linting
-  GitHub Actions CI pipeline (ESLint + TypeScript check + tests for all 6 languages)


## 🧪 Future Roadmap

- [ ] Add more test files (Java JUnit, Go tests, PHP PHPUnit)
- [ ] Merge React projects into a single monorepo
- [ ] Add Kotlin examples (coroutines, data classes)
- [ ] Add Dart examples (async/await, streams, mixins)
