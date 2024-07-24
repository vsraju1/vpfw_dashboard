# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Pseudo coding:

- show a form to add or update works(customer name,phone number, work name, date, advance, total amt received, final amt/kg/sqft, expected delivery date,status: active or completed,delivered date, balance pending)

<h2> Adding a new work</h2>
IF NEW WORK: <br>
SHOW ADD WORK FORM <br>
FORM ONCLICK: perform form validation <br>
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
    received_date: date, // today date by default
    advance: [{},{}], // default empty array of objects
    final_amt: num, // defualt 0

    // below details are not from user
    received_amt: num, // total advances
    isPendig: boolean, // true by default
    delivered: boolean, // false by default
    isFitted: boolean, // false by default
    balancePending: boolean, // true by default
}
```
```
// Advance object in work object
{
    adv1: num,
    amount: num,
},
{
    adv2: num,
    amount: num
}
```
<h2> Updating work</h2>
IF UPDATE WORK: <br>
SHOW UPDATE FORM <br>
SHOW THE BELOW LIST TO UPDATE <br>

```
// update list
1. Add advance
2. Balance pending - yes or no
4. Delivered - yes or no
4. Fitting - yes or no
3. Pending - yes or no

```
- select from works which are pending
show details to update => update advance, fitting completed,delivered, balance pending, pending or completed.

Showing works:
- Show pending works in box in numbers (onclick go to pending works list like transaction)
- Show complete works in box in numbers (onclick go to completed works)
- Show all works in box in number (onclick go to all works)
- Show works that have to fit (onclick go to works that left to fit)
- Show works yet to receive in total amount and in number of works(onclick go works which have balance pending)




