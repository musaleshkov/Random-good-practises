/* 
    A class should have one and only one reason to change,
    meaning that a class should have only one job.
*/

/* 
    Cohesion is used to indicate the degree to which a class has a single,
    well-focused purpose. Coupling is all about how classes interact with each other, 
    on the other hand cohesion focuses on how single class is designed.
    Single Responsibility principle aims at creating highly cohesive classes.
*/
class Statistics {
	public computeSalesStatistics() {
		// ...
	}
	public generateReport() {
		// ...
	}
}
// should become
class Statistics {
	public computeSalesStatistics() {
		// ...
	}
}
class ReportGenerator {
	public generateReport() {
		// ...
	}
}
