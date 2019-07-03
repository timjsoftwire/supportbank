const fs = require("fs");
const xml2js = require('fast-xml-parser');



exports.getTransactions = function(filename) {
    var fileOutput = fs.readFileSync(filename,"utf8");
    var transactions = [];
    var lastDatePosition = 0;
    var unparsedfile = xml2js.parse(fileOutput);
    for (i = 0; i< unparsedfile.TransactionList.SupportTransaction.length;i++) {
        transaction = []
        NextDatePosition = fileOutput.indexOf("Date=", lastDatePosition);
        date = fileOutput.slice(NextDatePosition+5,NextDatePosition+11)

        unparsedCurrentTransaction = unparsedfile.TransactionList.SupportTransaction[i];
        transactions.push([date,unparsedCurrentTransaction.Parties.From, unparsedCurrentTransaction.Parties.To, unparsedCurrentTransaction.Description, unparsedCurrentTransaction.Value]);


        lastDatePosition = NextDatePosition+5;
    }
    return transactions;
}


