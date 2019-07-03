/*const fs = require("fs");
const xml2js = require('fast-xml-parser');



exports.getTransactions = function(filename) {
    var fileOutput = fs.readFileSync("filename","utf8");
    var transactions = [];
    var lastDatePosition = 0;
    var unparsedfile = xml2js.parse(fileOutput);
    for (i = 0; i< unparsedfile.TransactionList.SupportTransaction.length;i++) {
        transaction = []
        NextDatePosition = FindNextDatePosition(lastDatePosition);
        date = fileOutput.slice(NextDatePosition+5,NextDatePosition+11)
        transaction.push(date)
        transaction.push(unparsedfile.TransactionList.SupportTransaction[i].Parties.From);
        transaction.push(unparsedfile.TransactionList.SupportTransaction[i].Parties.To);
        transaction.push(unparsedfile.TransactionList.SupportTransaction[i].Description);
        transaction.push(unparsedfile.TransactionList.SupportTransaction[i].Value);
        
        transactions.push(transaction);

        lastDatePosition = NextDatePosition+5;
    }
}


function FindNextDatePosition (lastDatePosition) {
    return fileOutput.indexOf("Date=", lastDatePosition);
}

*/
