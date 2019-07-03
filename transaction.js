
var transactions = [];

class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.from = from;
        this.to = to;
        this.date = date;
        this.narrative = narrative;
        this.amount = amount;  
    }
}

exports.NewTransaction = function(date, from, to, narrative, amount) {
    var newTransaction = new Transaction(date, from, to, narrative, amount);
    transactions.push(newTransaction);
    return newTransaction;
}

exports.GetAllTransactions = function() {
    return transactions;
}
