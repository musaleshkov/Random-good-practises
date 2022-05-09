/*
    The core of the dependency inversion principle is 
    that high-level modules should not depend on the low-level modules.
    Instead, both of them should depend on abstractions.
*/
interface Person {
	introduceSelf(): void;
}
class Engineer implements Person {
	public introduceSelf() {
		console.log("I am an engineer");
	}
}
class Musician implements Person {
	public introduceSelf() {
		console.log("I am a musician");
	}
}
/*   
    The above behavior is elementary and academic, but it is not always the case.
    If the introduction was more complicated, we might want to create separate classes just for that.
*/

interface IntroductionService {
	introduce(): void;
}
class EngineerIntroductionService implements IntroductionService {
	public introduce() {
		console.log("I am an engineer");
	}
}
class Engineer implements Person {
	private introductionService = new EngineerIntroductionService();
	public introduceSelf() {
		this.introductionService.introduce();
	}
}
/*  
    Unfortunately, the above code breaks the dependency inversion principle.
    It says that we should invert the dependencies of the  Engineer and the  EngineerIntroductionService.
*/

class Engineer implements Person {
	public introductionService: EngineerIntroductionService;

	constructor(introductionService: IntroductionService) {
		this.introductionService = introductionService;
	}

	public introduceSelf() {
		this.introductionService.introduce();
	}
}
const engineer = new Engineer(new EngineerIntroductionService());
//   The benefit of the above is that we don’t need subclasses for the Engineer and the Musician.

class Person {
	public introductionService: IntroductionService;

	constructor(introductionService: IntroductionService) {
		this.introductionService = introductionService;
	}
	public introduceSelf() {
		this.introductionService.introduce();
	}
}
const engineer = new Person(new EngineerIntroductionService());
const musician = new Person(new MusicianIntroductionService());
