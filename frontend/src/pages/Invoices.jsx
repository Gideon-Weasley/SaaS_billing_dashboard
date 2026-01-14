import { useEffect, useState } from "react";
import { getInvoices } from "../api/api";
import InvoiceTable from "../components/InvoiceTable";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices().then(setInvoices);
  }, []);

  return (
    <div className="page">
      <h2>Invoices</h2>
      <InvoiceTable invoices={invoices} />
    </div>
  );
}

export default Invoices;
