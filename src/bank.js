// class Bank {
//     name : string;
//     branches : Branch[];
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.branches = [];
        this.name = name;
    }
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.some(function (existingBranch) { return existingBranch.getName() === branch.getName(); })) {
            return this.branches.push(branch);
        }
        else {
            return console.log("branch already exists");
        }
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.checkBranch(branch)) {
            return branch.addCustomer(customer);
        }
        else {
            return console.error("Branch [".concat(branch.getName(), "] does not belong to this bank."));
        }
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        var customer = branch.getCustomers().find(function (existingCustomer) { return existingCustomer.getId() === customerId; });
        if (customer) {
            return customer.addTransaction(amount);
        }
    };
    Bank.prototype.findBranchByName = function (name) {
        return this.branches.find(function (branch) { return branch.getName() === name; });
    };
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        if (!this.checkBranch(branch))
            return;
        console.log("\nCustomers of\n----".concat(branch.getName(), " at ").concat(this.name, ":----"));
        branch.getCustomers().forEach(function (customer) {
            console.log("Customer ID: ".concat(customer.getId(), ",\nCustomer Name:").concat(customer.getName()));
            if (includeTransactions) {
                var transactions = customer.getTransactions().map(function (t) { return "\nAmount:[".concat(t.getAmount(), "]$ on Date:[").concat(t.getDate().toISOString(), "]"); });
                console.log("Transactions: ".concat(transactions.join(',\n ')));
            }
        });
    };
    return Bank;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.customers = [];
        this.name = name;
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        var existingCustomer = this.customers.find(function (c) { return c.getId() === customer.getId(); });
        if (!existingCustomer) {
            return this.customers.push(customer);
        }
        else {
            return console.log("customer already exists");
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (c) { return c.getId() === customerId; });
        if (customer) {
            return customer.addTransaction(amount);
        }
    };
    return Branch;
}());
var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        if (date === void 0) { date = new Date(); }
        this.amount = amount;
        this.date = date;
    }
    Transaction.prototype.getAmount = function () {
        return this.amount;
    };
    Transaction.prototype.getDate = function () {
        return this.date;
    };
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.transactions = [];
        this.name = name;
        this.id = id;
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transaction) { return total + transaction.getAmount(); }, 0);
    };
    Customer.prototype.addTransaction = function (amount) {
        this.transactions.push(new Transaction(amount));
    };
    return Customer;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
customer1.addTransaction(-1000);
customer1.getBalance();
arizonaBank.listCustomers(westBranch, true);
arizonaBank.listCustomers(sunBranch, true);
