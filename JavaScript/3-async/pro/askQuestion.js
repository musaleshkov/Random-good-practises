const readline = require('readline');

// Create ONE shared readline interface (reused across questions)
const readlineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function askQuestion(question) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(question, (answer) => {
			resolve(answer);
		});
	});
}

// Clean up when done
function closeReadline() {
	readlineInterface.close();
}

module.exports = askQuestion;
module.exports.close = closeReadline;
