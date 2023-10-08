// class Bank 
// {
//     name : string;
//     branches : Branch[];

//     constructor(name : string)
//     {
//         this.name = name ;
//         this.branches = [];
//     }

//     addBranch(branch : Branch)
//     {
//         if(! this.branches.includes(branch))
//         {

//         this.branches.push(branch);
//         return this.branches;

//         }
//         else
//         {
//             return false
//         }
//     }



//     addCustomer(branch : Branch ,customerId : number ,amount :number )
//     {
//          const newBranch = this.branches.find(branch => branch.name === branch);
//           if (newBranch)
//           {
//                newBranch.addCustomer(customerId,amount );
//           }
       
//     }

// }










// class Branch
// {
//     name : string;
//     customers : Customer [];

//     constructor(name : string)
//     {
//         this.name = name;
//         this.customers = [];
//     }

//     getName()
//     {
//         return this.name;
//     }

//     getCustomers()
//     {
//         return this.customers;
//     }


//     addCustomer(customer : Customer)
//     {
//         if(! this.customers.includes(customer))
//         {
//            const custm = this.customers.push(customer);
//            console.log(custm);
//             return true;
//         }
//         else
//         {
//             console.log('this customer is already added')
//             return false
//         }
//     }


     
//     addCustomerTransaction(customerId : number, amount : number)
//     {
//         const customer = this.customers.find(
//             (customer) => customer.id === customerId
//         );

//         if(customer)
//         {
//             customer.addTransaction(amount);
//         }
//     }

    
// }





// class Transaction
// {
//     amount : number;
//     date : Date;
//     constructor(amount : number, date : Date)
// {
//        this.amount = amount;
//        this.date = date;
// }

// }






// class Customer
// {
//     name: string ;
//     id: string;
//     transactions : Transaction[]

//     constructor(name:string, id:string)
//     {
//         this.name = name ;
//         this.id = id ;
//         this.transactions = [];
//     }

//     getName() 
//     {
//         return this.name;
//     }

//     getId()
//     {
//         return this.id;
//     }

//     getTransactions()
//     {
//         return this.transactions;
//     }


//     getBalance()
//     {
//        return this.transactions.reduce(
//           (total, current) => total + current.amount,
//           0
//        );
//     }


//     addTransaction(amount : number)
//     {
//         if(amount < 0)
//         {
//             console.log('the transaction amount can not be negative');
//             return false;
//         }
//              const transaction = new Transaction(amount, new Date());
//              this.transactions.push(transaction);
//              console.log(transaction);
//              return true;
//     }

// }





// const customer1 = new Customer('nada', '1');
// customer1.addTransaction(1000);
// console.log(customer1);

