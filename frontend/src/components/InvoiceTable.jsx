function InvoiceTable({ invoices }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Period</th>
          <th>Units</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(inv => (
          <tr key={inv.id}>
            <td>{inv.period_start} - {inv.period_end}</td>
            <td>{inv.total_units}</td>
            <td>₹{inv.amount}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceTable;
