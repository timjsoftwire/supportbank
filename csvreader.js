const fs = require("fs");

var fileOutput = fs.readFileSync("Transactions2014.csv","utf8");

var transactionStrings = fileOutput.split("\n")

var transactions = []
fileOutput.split("\n").forEach( element => transactions.push(element.split(",")));
transactions.splice(0,1);


//returns the nth transaction as an array strings
exports.getTransaction= function(n) {
    return(transactions[n]);
}

//returns the number of transactions
exports.getNumberOfTransactions = function() {
    return transactions.length;
}
