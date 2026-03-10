function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="list">
      <h2>Expenses</h2>

      {expenses.length === 0 && <p>No expenses added.</p>}

      {expenses.map((expense) => (
        <div className="expense-card" key={expense.id}>
          <div>
            <strong>{expense.name}</strong>
            <p>{expense.category}</p>
          </div>

          <div>
            ₹{expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;