// Common custom React hooks that demonstrate composition patterns.
// These hooks solve real problems: debouncing, previous state, local storage, and more.

// ==============================================
// useDebounce — delays value update until pause
// ==============================================
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ==============================================
// usePrevious — track previous value
// ==============================================
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// ==============================================
// useLocalStorage — persist state to localStorage
// ==============================================
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// ==============================================
// useToggle — simple boolean toggle
// ==============================================
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

// ==============================================
// useAsync — handle async operations with loading/error states
// ==============================================
function useAsync(asyncFunction, immediate = false) {
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (...params) => {
      setStatus("pending");
      setValue(null);
      setError(null);
      return asyncFunction(...params)
        .then((response) => {
          setValue(response);
          setStatus("success");
          return response;
        })
        .catch((err) => {
          setError(err);
          setStatus("error");
          throw err;
        });
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { execute, status, value, error, isLoading: status === "pending" };
}

// Usage examples (uncomment in a React component):
//
// function SearchComponent() {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 300);
//   const { execute, value: results, isLoading } = useAsync(fetchResults);
//
//   useEffect(() => {
//     if (debouncedQuery) execute(debouncedQuery);
//   }, [debouncedQuery, execute]);
//
//   return (
//     <div>
//       <input value={query} onChange={(e) => setQuery(e.target.value)} />
//       {isLoading && <p>Searching...</p>}
//       {results && <ResultsList data={results} />}
//     </div>
//   );
// }

module.exports = {
  useDebounce,
  usePrevious,
  useLocalStorage,
  useToggle,
  useAsync,
};
