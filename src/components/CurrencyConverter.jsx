import { useEffect, useState } from "react";

function CurrencyConverter({ expenses }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError("");

    fetch(`https://api.frankfurter.app/latest?from=INR&to=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        if (data && data.rates && data.rates[currency]) {
          setRate(data.rates[currency]);
        } else {
          setError("Invalid exchange data");
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to fetch exchange rate");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currency]);

  const converted = rate ? (total * rate).toFixed(2) : "0.00";

  return (
    <div className="converter">
      <h3>Currency Converter</h3>

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      {loading && <p>Loading rate...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <p>
          Converted Total: {currency} {converted}
        </p>
      )}
    </div>
  );
}

export default CurrencyConverter;