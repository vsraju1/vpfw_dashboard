# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Pseudo coding:

- show a form to add or update works(customer name,phone number, work name, date, advance, total amt received, final amt/kg/sqft, expected delivery date,status: active or completed,delivered date, balance pending)

<h2> Adding a new work</h2>
IF NEW WORK: <br>
SHOW ADD WORK BUTTON <br>
BUTTON ONCLICK: OPEN A FORM <br>
PERFORM FORM VALIDATION <br>
PUSH to WORK DETAILS ARRAY

```
// Work details
all_works = [{work1 object}, {work2 object}, ...{workn object}]
```
```
// work object
{
    id: num, // auto id
    customer_name: string, // required
    phone: num, // required
    work_name: string, // required
    advance: [{amount: num, date: date},...], // default empty array of objects
    final_amt: num, // defualt 0 // optional

    // below details are not from user
    received_date: date, // today date
    received_amt: num, // total advances
    isPendig: boolean, // true by default
    delivered: boolean, // false by default
    isFitted: boolean, // false by default
    balancePending: boolean, // true by default
    updatedAt: date, // By default to date
}
```
```
// Advance object in work object
{
    date: num,
    amount: num,
},
{
    date: num,
    amount: num
}
```
# Showing Work
USE TABLE TO SHOW WORKS <br>
```
// Provide optionS for works filter
Show data according to:
- ALL WORKS
- PENDING WORKS
- UNPAID WORKS
- COMPLETED WORKS

// When one of the above links clicked show works in tabular format

// Works table should contain
Table Headers:
- S.NO.
- RECEIVED
- CUSTOMER NAME
- STATUS
    - BALANCE PENDING
    - DELIVERED
    - FITTING
    - COMPLETED
- ADD ADVANCE
    - EMPTY BOX TO ENTER AMOUNT
- TOTAL
- LAST UPDATED
- UPDATE BUTTON
```

<h2> Updating work</h2> <br>
// Show works in tabular form with side button to update <br>



```
// Show status list in a option format
1. Balance pending - yes or no
2. Delivered - yes or no
3. Fitting - yes or no
4. Completed - yes or no

STATUS ONCLICK:
    BALANCE PENDING:
       - UPDATE BALANCE PENDING TO TRUE IN WORK OBJECT
    DELIVERED:
        - UPDATE DEVLIVERED TO TRUE
    FITTING:
       - UPDATE FITTING TO FALSE
    COMPLETED:
       - UPDATE PENDING TO FALSE

UPDATE ONCLICK:
    ENTER A AMOUNT:
        - VALIDATE AND UPDATE ADVANCE OBJECT IN WORK OBJECT
```


- select from works which are pending
show details to update => update advance, fitting completed,delivered, balance pending, pending or completed.

Showing works:
- Show pending works in box in numbers (onclick go to pending works list like transaction)
- Show complete works in box in numbers (onclick go to completed works)
- Show all works in box in number (onclick go to all works)
- Show works that have to fit (onclick go to works that left to fit)
- Show works yet to receive in total amount and in number of works(onclick go works which have balance pending)

# Example code from chatgpt to add work

```
// Initialize an empty array to store work orders
const workOrders = [];

// Function to create a new work order
function createWorkOrder(customerName, phone, workName) {
    // Generate a unique ID (you can use a library like uuid or a simple counter)
    const id = generateUniqueId();

    // Initialize the work order object
    const workOrder = {
        id,
        customer_name: customerName,
        phone,
        work_name: workName,
        advance: [], // Empty array for advances
        final_amt: 0, // Default final amount
        received_date: new Date(), // Today's date
        received_amt: 0, // Total advances (initially 0)
        isPending: true, // Default status
        delivered: false, // Default status
        isFitted: false, // Default status
        balancePending: true, // Default status
        updatedAt: new Date(), // Initial update date
    };

    // Add the new work order to the list
    workOrders.push(workOrder);

    return workOrder;
}

// Example usage:
const userFormInput = {
    customerName: 'John Doe',
    phone: 1234567890,
    workName: 'Install new flooring',
};

const newWorkOrder = createWorkOrder(
    userFormInput.customerName,
    userFormInput.phone,
    userFormInput.workName
);

console.log('New work order added:', newWorkOrder);
console.log('Updated work order list:', workOrders);

```
