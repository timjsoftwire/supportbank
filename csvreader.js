const fs = require("fs");





exports.getTransactions = function(filename) {
    var fileOutput = fs.readFileSync(filename,"utf8");

    var transactionStrings = fileOutput.split("\n")

    var transactions = []
    fileOutput.split("\n").forEach( element => transactions.push(element.split(",")));
    transactions.splice(0,1);
    return transactions;
}

