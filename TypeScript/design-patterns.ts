/*
  Common design patterns implemented in TypeScript — demonstrating
  how TypeScript's type system makes these patterns more robust.
*/

// ==============================================
// PATTERN 1: Observer / Pub-Sub
// ==============================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (data: any) => void;

class EventEmitter {
  private listeners: Map<string, Set<Listener>> = new Map();

  on(event: string, listener: Listener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off(event: string, listener: Listener): void {
    this.listeners.get(event)?.delete(listener);
  }

  emit(event: string, data: unknown): void {
    this.listeners.get(event)?.forEach((listener) => listener(data));
  }
}

// ==============================================
// PATTERN 2: Builder
// ==============================================
class RequestBuilder {
  private url: string = "";
  private method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
  private headers: Record<string, string> = {};
  private body: unknown = null;

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setMethod(method: "GET" | "POST" | "PUT" | "DELETE"): this {
    this.method = method;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(body: unknown): this {
    this.body = body;
    return this;
  }

  build(): RequestConfig {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      body: this.body,
    };
  }
}

interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
}

// ==============================================
// PATTERN 3: Singleton
// ==============================================
class Config {
  private static instance: Config;
  private settings: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  set(key: string, value: string): void {
    this.settings.set(key, value);
  }

  get(key: string): string | undefined {
    return this.settings.get(key);
  }
}

// ==============================================
// PATTERN 4: Factory
// ==============================================
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console] ${message}`);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    // In real code: write to file
    console.log(`[File] ${message}`);
  }
}

type LoggerType = "console" | "file";

class LoggerFactory {
  static create(type: LoggerType): Logger {
    switch (type) {
      case "console":
        return new ConsoleLogger();
      case "file":
        return new FileLogger();
    }
  }
}

// ==============================================
// PATTERN 5: Strategy
// ==============================================
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

class AscendingSort implements SortStrategy<number> {
  sort(data: number[]): number[] {
    return [...data].sort((a, b) => a - b);
  }
}

class DescendingSort implements SortStrategy<number> {
  sort(data: number[]): number[] {
    return [...data].sort((a, b) => b - a);
  }
}

class NumberSorter {
  constructor(private strategy: SortStrategy<number>) {}

  setStrategy(strategy: SortStrategy<number>): void {
    this.strategy = strategy;
  }

  execute(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// ==============================================
// Usage Examples
// ==============================================
function demonstratePatterns(): void {
  console.log("=== Design Patterns in TypeScript ===\n");

  // Observer
  console.log("--- Observer (EventEmitter) ---");
  const emitter = new EventEmitter();
  emitter.on("userLogin", (data: { userId: string; timestamp: Date }) =>
    console.log(`  User ${data.userId} logged in at ${data.timestamp.toISOString()}`)
  );
  emitter.emit("userLogin", { userId: "user123", timestamp: new Date() });

  // Builder
  console.log("\n--- Builder ---");
  const config = new RequestBuilder()
    .setUrl("https://api.example.com/users")
    .setMethod("POST")
    .setHeader("Content-Type", "application/json")
    .setBody({ name: "Alice" })
    .build();
  console.log(`  ${config.method} ${config.url}`);

  // Singleton
  console.log("\n--- Singleton ---");
  const c1 = Config.getInstance();
  const c2 = Config.getInstance();
  c1.set("theme", "dark");
  console.log(`  Same instance? ${c1 === c2}`);
  console.log(`  Theme: ${c2.get("theme")}`);

  // Factory
  console.log("\n--- Factory ---");
  const consoleLogger = LoggerFactory.create("console");
  consoleLogger.log("Factory created a ConsoleLogger");

  // Strategy
  console.log("\n--- Strategy ---");
  const numbers = [5, 2, 8, 1, 9];
  const sorter = new NumberSorter(new AscendingSort());
  console.log(`  Ascending: ${sorter.execute(numbers)}`);
  sorter.setStrategy(new DescendingSort());
  console.log(`  Descending: ${sorter.execute(numbers)}`);
}

demonstratePatterns();

export {};