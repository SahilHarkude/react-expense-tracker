function SummaryPanel({ expenses }) {

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  return (
    <div className="summary">
      <h2>Total: ₹{total}</h2>

      <h3>Category Breakdown</h3>

      {Object.keys(categoryTotals).map((cat) => (
        <p key={cat}>
          {cat}: ₹{categoryTotals[cat]}
        </p>
      ))}
    </div>
  );
}

export default SummaryPanel;