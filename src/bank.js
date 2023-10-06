
class Bank {
    constructor(name)
     {
      this.name = name;
      this.branches = [];
    }
  
    // Method to add a branch to the bank
    addBranch(branch) 
    {
      if (!this.checkBranch(branch)) 
      {
        this.branches.push(branch);
        return true;
      }
      return false;
    }
  
    // Method to add a customer to a branch
    addCustomer(branch, customer)
     {
      if (this.checkBranch(branch)) 
      {
        if (!branch.customers.some((existingCustomer) => existingCustomer.customerId === customer.customerId))
         {
          branch.customers.push(customer);
          return true;
        }
      }
      return false;
    }
  
    // Method to add a customer transaction
    addCustomerTransaction(branch, customerId, amount)
     {
      if (this.checkBranch(branch)) 
      {
        const customer = branch.customers.find((existingCustomer) => existingCustomer.customerId === customerId);
        if (customer)
         {
          customer.transactions.push(amount);
          return true;
        }
      }
      return false;
    }
  
    // Method to find branches by name
    findBranchByName(branchName) 
    {
      return this.branches.filter((branch) => branch.branchName === branchName);
    }
  
    // Method to check if a branch belongs to the bank
    checkBranch(branch) 
    {
      return this.branches.includes(branch);
    }
  
    // Method to list customers and their transactions
    listCustomers(branch, includeTransactions) 
    {
      if (this.checkBranch(branch))
       {
        console.log(`Customers of ${branch.branchName} at ${this.name}:`);
        branch.customers.forEach((customer) =>
         {
          console.log(`Customer ID: ${customer.customerId}, Customer Name: ${customer.customerName}`);
          if (includeTransactions) 
          {
            console.log(`Transactions: ${customer.transactions.join(', ')}`);
          }
        });
      }
    }
  }
  


class Branch {
    constructor(name)
     {
      this.name = name;
      this.customers = [];
    }
  
    getName() 
    {
      return this.name;
    }
  
    getCustomers()
     {
      return this.customers;
    }
  
    addCustomer(customer)
     {
      if (!this.customers.some((c) => c.getId() === customer.getId())) 
      {
        this.customers.push(customer);
        return true;
      }
      return false;
    }
  
    addCustomerTransaction(customerId, amount)
     {
      const customer = this.customers.find((c) => c.getId() === customerId);
      if (customer)
       {
        customer.addTransaction(amount);
        return true;
      }
      return false;
    }
  }

  



class Customer
 {
    constructor(name, id) 
    {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }
  
    getName() 
    {
      return this.name;
    }
  
    getId()
     {
      return this.id;
    }
  
    getTransactions()
     {
      return this.transactions;
    }
  
    getBalance() 
    {
      const balance = this.transactions.reduce((total, transaction) =>
       {
        return total + transaction.getAmount();
      }, 0);
      return Math.max(balance, 0); // يتأكد من الراتب انه مو بالسالب
    }
  
    addTransaction(amount) 
    {
      if (amount > 0) 
      {
        const transaction = new Transaction(amount);
        this.transactions.push(transaction);
        return true;
      }
      return false;
    }
  }
  




  class Transaction {
    constructor(amount, date = new Date())
    {
      this.amount = amount;
      this.date = date;
    }
  
    getAmount() 
    {
      return this.amount;
    }
  
    getDate()
     {
      return this.date;
    }
  }
  



const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId, 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId, 3000)

// customer1.addTransactions(-1000)
console.log(customer3.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))





// const myBank = new Bank("My Bank");
  
// const branch1 = new Branch("Branch A");
// const branch2 = new Branch("Branch B");

// myBank.addBranch(branch1);
// myBank.addBranch(branch2);

// const customer1 = new Customer("1", "John");
// const customer2 = new Customer("2", "Alice");

// myBank.addCustomer(branch1, customer1);
// myBank.addCustomer(branch2, customer2);

// myBank.addCustomerTransaction(branch1, "1", 100);
// myBank.addCustomerTransaction(branch2, "2", 200);

// myBank.listCustomers(branch1, true);
// myBank.listCustomers(branch2, false);