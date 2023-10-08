

interface ICustomer {
  name: string;
  id: number;
  transactions: Transaction[];
  getName(): string;
  getId(): number;
  getTransactions(): Transaction[];
  getBalance(): number;
  addTransaction(amount: number): any;
}

interface IBranch {
  name: string;
  customers: ICustomer[];
  getName(): string;
  getCustomers(): ICustomer[];
  addCustomer(customer: ICustomer): any;
  addCustomerTransaction(customerId: number, amount: number): any;
}

class Bank {
  name: string;
  branches: IBranch[] = [];

  constructor(name: string) {
      this.name = name;
  }

  addBranch(branch: IBranch): any {
      if (!this.branches.some(existingBranch => existingBranch.getName() === branch.getName())) {
        return this.branches.push(branch);
      } else {
          return console.log("branch already exists");
      }
  }

  addCustomer(branch: IBranch, customer: ICustomer): any {
      if (this.checkBranch(branch)) {
        return branch.addCustomer(customer);
      } else {
        return console.error(`Branch [${branch.getName()}] does not belong to this bank.`);
      }
  }

  addCustomerTransaction(branch: IBranch, customerId: number, amount: number): any {
      const customer = branch.getCustomers().find(existingCustomer => existingCustomer.getId() === customerId);
      if (customer) {
        return customer.addTransaction(amount);
      }
  }

  findBranchByName(name: string): IBranch | undefined {
      return this.branches.find(branch => branch.getName() === name);
  }

  checkBranch(branch: IBranch): boolean {
      return this.branches.includes(branch);
  }

  listCustomers(branch: IBranch, includeTransactions: boolean): any {
      if (!this.checkBranch(branch)) return;

      console.log(`\nCustomers of\n----${branch.getName()} at ${this.name}:----`);
      branch.getCustomers().forEach(customer => {
          console.log(`Customer ID: ${customer.getId()},\nCustomer Name:${customer.getName()}`);
          if (includeTransactions) {
              const transactions = customer.getTransactions().map(t => `\nAmount:[${t.getAmount()}]$ on Date:[${t.getDate().toISOString()}]`);
              console.log(`Transactions: ${transactions.join(',\n ')}`);
          }
      });
  }
}

class Branch implements IBranch {
  name: string;
  customers: ICustomer[] = [];

  constructor(name: string) {
      this.name = name;
  }

  getName(): string {
      return this.name;
  }

  getCustomers(): ICustomer[] {
      return this.customers;
  }

  addCustomer(customer: ICustomer): any {
      const existingCustomer = this.customers.find(c => c.getId() === customer.getId());
      if (!existingCustomer) {
        return this.customers.push(customer);
      } else {
        return console.log("customer already exists");
      }
  }

  addCustomerTransaction(customerId: number, amount: number): any {
      const customer = this.customers.find(c => c.getId() === customerId);
      if (customer) {
        return customer.addTransaction(amount);
      }
  }
}

class Transaction {
  amount: number;
  date: Date;

  constructor(amount: number, date: Date = new Date()) {
      this.amount = amount;
      this.date = date;
  }

  getAmount(): number {
      return this.amount;
  }

  getDate(): Date {
      return this.date;
  }
}

class Customer implements ICustomer {
  name: string;
  id: number;
  transactions: Transaction[] = [];

  constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
  }

  getName(): string {
      return this.name;
  }

  getId(): number {
      return this.id;
  }

  getTransactions(): Transaction[] {
      return this.transactions;
  }

  getBalance(): number {
      return this.transactions.reduce((total, transaction) => total + transaction.getAmount(), 0);
  }

  addTransaction(amount: number): any {
      this.transactions.push(new Transaction(amount));
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

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransaction(-1000);
customer1.getBalance();
arizonaBank.listCustomers(westBranch, true)
arizonaBank.listCustomers(sunBranch,true)



























// class Bank {
//     name : string;
//     branches : Branch[];

//     constructor(name: string)
//      {
//       this.name = name;
//       this.branches = [];
//     }
  
//     // Method to add a branch to the bank only one time
//     addBranch(branch:Branch) 
//     {
//         if (!this.branches.some((existingBranch) => existingBranch.getName() === branch.getName())) 
//         {
         
//           return  this.branches.push(branch);
//         }
//         return console.log(`branch already exist`);
       
//       }
      
  
//     // Method to add a customer to a branch
//     addCustomer(branch: Branch, customer : Customer)
//      {
       
//             if (!this.checkBranch(branch)) {
               
//                 return  console.error(`"Branch [ ${branch} ]does not belong to this bank. `);;
//             }
            
//             return branch.addCustomer(customer);
        
//     }
  
//     // Method to add a customer transaction
//     addCustomerTransaction(branch:Branch, customerId:number, amount:number) 
//     {
//         if (this.checkBranch(branch)) 
//         {
          
//           const customer = branch.getCustomers().find((existingCustomer) => existingCustomer.getId() === customerId);
//           if (customer) 
//           {
            
//             return customer.addTransaction(amount);
//           }
//         }
//         return false;
//       }
      
  
//       findBranchByName(name:string) {
//         return this.branches.find(branch => branch.getName() === name);
       
//     }

//     checkBranch(branch:Branch) {
//         return this.branches.includes(branch);
//     }
  
//     // Method to list customers and their transactions
//     listCustomers(branch:Branch, includeTransactions) 
//     {
     
//     if (!this.checkBranch(branch)) return;

//     console.log(`\nCustomers of\n----${branch.getName()} at ${this.name}:----`);
//     branch.getCustomers().forEach(customer => {
//         console.log(`Customer ID: ${customer.getId()},\nCustomer Name:${customer.getName()}`);
//         if (includeTransactions) {
//             const transactions = customer.getTransactions().map(t => `\nAmount:[${t.getAmount()}]$ on Date:[${t.getDate()}]`);
//             console.log(`Transactions: ${transactions.join(',\n ')}`);
//         }
//     });
// }



//     }
  
  





// class Branch {

//   name: string;
//   customers : Customer[];

//     constructor(name:string)
//      {
//       this.name = name;
//       this.customers = [];
//     }
  
//     getName() 
//     {
//       return this.name;
//     }
  
//     getCustomers()
//      {
//       return this.customers;
//     }
  
//     addCustomer(customer:Customer)
//      {
       
//             // Check if the customer is already in this branch
//             const existingCustomer = this.customers.find(c => c.getId() === customer.getId());
//             if (existingCustomer) return console.log(`"customer already exists" ${existingCustomer}`);
    
//             this.customers.push(customer);
//             return this.customers.push(customer);;
        
//     }
  
//     addCustomerTransaction(customerId: number, amount:number)
//      {
//       const customer = this.customers.find((c) => c.getId() === customerId);
//       if (customer)
//        {
        
//         return customer.addTransaction(amount);
//       }
//       return false;
//     }
//   }

  





// class Customer
//  {
//   name: string ;
//   id: number;
//   transactions : Transaction[]

//     constructor(name:string, id:number) 
//     {
//       this.name = name;
//       this.id = id;
//       this.transactions = [];
//     }
  
//     getName() 
//     {
//       return this.name;
//     }
  
//     getId()
//      {
//       return this.id;
//     }
  
//     getTransactions()
//      {
//       return this.transactions;
//     }
  
//     getBalance() 
//     {
//       export const balance = this.transactions.reduce((total, transaction) =>
//        {
//         const balan:number = total + transaction.getAmount()
//         return console.log(`Balance: ${balan}`) ;
//       }, 0);
//       return Math.max(balance, 0); // يتأكد من الراتب انه مو بالسالب

//     }


//     addTransaction(amount:number) 
//     {
//         if (amount > 0)
//          {
//           const transaction = new Transaction(amount);
          
//           return this.transactions.push(transaction);
//         }
//         return console.log(`"is negative" ${amount}`);

//       }
      
//   }
  


//   class Transaction {
//     amount : number;
//         date : Date;
//     constructor(amount: number, date = new Date())
//     {
//       this.amount = amount;
//       this.date = date;
//     }
  
//     getAmount() 
//     {
//       return this.amount;
//     }
  
//     getDate()
//      {
//       return this.date;
//     }
//   }
  






// const arizonaBank = new Bank("Arizona")
// const westBranch = new Branch("West Branch")
// const sunBranch = new Branch("Sun Branch")
// const customer1 = new Customer("John", 1)
// const customer2 = new Customer("Anna", 2)
// const customer3 = new Customer("John", 3)

// arizonaBank.addBranch(westBranch)
// arizonaBank.addBranch(sunBranch)
// arizonaBank.addBranch(westBranch) 


// arizonaBank.findBranchByName("bank")
// arizonaBank.findBranchByName("sun")

// arizonaBank.addCustomer(westBranch, customer1)
// arizonaBank.addCustomer(westBranch, customer3)
// arizonaBank.addCustomer(sunBranch, customer1)
// arizonaBank.addCustomer(sunBranch, customer2)

// arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
// arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
// arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

// customer1.addTransaction(-1000);
// customer1.getBalance();
// arizonaBank.listCustomers(westBranch, true)
// arizonaBank.listCustomers(sunBranch,true)

