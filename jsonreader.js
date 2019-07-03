const fs = require("fs");



exports.getTransactions = function(filename) {
    var fileOutput = fs.readFileSync(filename,"utf8");


    //set up the array of transactions, where each transaction is an array of strings
    var unparsedTransactions = JSON.parse(fileOutput);
    transactions =[];

    unparsedTransactions.forEach(element => {transactions.push([element.Date ,element.FromAccount,element.ToAccount,element.Narrative,element.Amount.toString()])});

    return transactions;
}


