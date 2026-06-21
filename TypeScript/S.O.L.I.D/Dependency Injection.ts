/*
    Dependency Injection is a software design concept that allows a service to be used/injected
    in a way that is completely independent of any client consumption.
    Dependency injection separates the creation of a client's dependencies from the client's behavior,
    which allows program designs to be loosely coupled.
*/

// --- Interfaces ---
interface ILogger {
    log(message: string): void;
}

interface IMessageWriter {
    write(message: string): void;
}

// --- Implementations ---
class ConsoleLogger implements ILogger {
    log(message: string): void {
        console.log(message);
    }
}

class ConsoleMessageWriter implements IMessageWriter {
    write(message: string): void {
        console.log(message);
    }
}

// --- Constructor Injection ---
// The dependency is injected via the constructor (most common approach)
class Salution {
    private readonly writer: IMessageWriter;

    constructor(writer: IMessageWriter) {
        if (writer === null || writer === undefined) {
            throw new Error("Writer cannot be undefined");
        }
        this.writer = writer;
    }

    exclaim(): void {
        this.writer.write("hello world");
    }
}

// --- Property Injection ---
// The dependency is injected via a setter property
class PropertyInjectedService {
    private _logger!: ILogger;

    set logger(logger: ILogger) {
        this._logger = logger;
    }

    sayName(): void {
        this._logger.log(this.constructor.name);
    }
}

// --- Method Injection ---
// The dependency is passed directly to the method that needs it
class MethodInjectedService {
    sayName(logger: ILogger, name: string): void {
        logger.log(name);
    }
}

// --- Usage ---
const writer: IMessageWriter = new ConsoleMessageWriter();  // creating the dependency
const greeting: Salution = new Salution(writer);             // injecting it via constructor
greeting.exclaim();                                           // "hello world"

// Property injection
const propService = new PropertyInjectedService();
propService.logger = new ConsoleLogger();
propService.sayName();

// Method injection
const methodService = new MethodInjectedService();
methodService.sayName(new ConsoleLogger(), "MethodInjectedService");

export {};