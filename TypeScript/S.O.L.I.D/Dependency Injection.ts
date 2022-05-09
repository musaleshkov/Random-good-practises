/*
    Dependency Injection is a software design concept that allows a service to be used/injected
    in a way that is completely independent of any client consumption. ... 
    Dependency injection separates the creation of a client's dependencies from the client's behavior,
    which allows program designs to be loosely coupled.
*/

// Constructor Injection 
public constructor(private readonly logger: ILogger)    { }

// Property Injection 
public set logger(logger: ILogger)  {
    this._logger = logger;
}
// Method Injection 
public sayName(logger: ILogger): void {
    logger.log(this.name);
}

writer: IMessageWriter = new ConsoleMessageWriter(); // creating a writer 

const salution: ISalution = new Salution(writer);// injecting it as dependancy 

salution.Exclaim();// using it

export class Salution {
    private readonly writer: IMessageWritter;

    public Salution(writer: IMessageWritter){ // injecting it as dependyncy
        if(write=== null || writer === undefined){
            throw new Error("Writter cannot be undefined");
            }
            this.writer = writer;
    }

    public void Exclaim() {
        this.writer.write("hello world"); // using it
    }

}
