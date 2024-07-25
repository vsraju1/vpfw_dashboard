import React,{useState} from 'react'

const WorkForm = () => {
  const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [workName, setWorkName] = useState('');
    const [advanceAmount, setAdvanceAmount] = useState('');
    const [finalAmount, setFinalAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the work order object
        const workOrder = {
            id: generateUniqueId(), // Auto-generated ID (you can replace this)
            customer_name: customerName,
            phone,
            work_name: workName,
            advance: [], // Empty array for advances
            final_amt: finalAmount || 0, // Default final amount
            received_date: new Date().toISOString(), // Today's date
            received_amt: parseFloat(advanceAmount) || 0, // Total advances (initially 0)
            isPending: true, // Default status
            delivered: false, // Default status
            isFitted: false, // Default status
            balancePending: true, // Default status
            updatedAt: new Date().toISOString(), // Initial update date
        };

        // Add the work order to your work list array (workOrders)
        // You can handle this part based on your application's architecture

        console.log('New work order:', workOrder);
        // Reset form fields if needed
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Customer Name:
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Work Name:
                <input
                    type="text"
                    value={workName}
                    onChange={(e) => setWorkName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Advance Amount:
                <input
                    type="number"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                />
            </label>
            <br />
            <label>
                Final Amount:
                <input
                    type="number"
                    value={finalAmount}
                    onChange={(e) => setFinalAmount(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default WorkForm

