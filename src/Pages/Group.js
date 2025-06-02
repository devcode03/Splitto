import Button from "../Components/Button";
import { Link, useParams } from "react-router-dom";
import { useGroups } from "../Contexts/GroupContext";
import {
  calculateBalances,
  minimizeCashFlow,
} from "../Utils/calculateBalances";
import { useMemo, useState } from "react";
import ErrorPopup from "../Components/ErrorPopup";

export default function Group() {
  const { groups } = useGroups();
  const { id } = useParams();
  const [error, setError] = useState("");
  const group = groups.find((g) => g.groupID === id);

  const { payments = [], members = [], currency, name } = group;
  const hasPayments = payments.length > 0;

  const { balances, transactions } = useMemo(() => {
    if (!hasPayments)
      return { balances: {}, transactions: [], minimizedTransactions: [] };
    const balances = calculateBalances(payments, members);
    const transactions = minimizeCashFlow(balances);
    return { balances, transactions };
  }, [payments, members, hasPayments]);
  // Show error if group is not found
  if (!group) {
    return (
      <>
        <ErrorPopup message={"Group not found!"} onClose={() => setError("")} />
        <div>Loading...</div>
      </>
    );
  }
  return (
    <>
      <ErrorPopup message={error} onClose={() => setError("")} />
      <GroupHeader group={group} />
      <div style={{ padding: "1.25rem" }} className="bg-a0 ">
        <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to={`/addPayment/${id}`}
              className="link-cta"
              style={{ marginTop: "1.25rem" }}
            >
              <Button>Add a payment💲</Button>
            </Link>
          </div>
          {!hasPayments && <NewRegisterMsg />}
          <PaymentDetails payments={payments} currency={currency} id={id} />
        </div>
        {hasPayments && (
          <TransactionsDetls transactions={transactions} currency={currency} />
        )}
      </div>
    </>
  );
}
function GroupHeader({ group }) {
  let memberNames = [];
  if (Array.isArray(group.members)) {
    memberNames = group.members.map((m) => m.name || m.Name);
  } else if (typeof members === "object" && group.members !== null) {
    memberNames = Object.values(group.members).map((m) => m.name || m.Name);
  }
  return (
    <div style={{ padding: "1.25rem" }}>
      <div className="group-name">
        <h1>{group.name}</h1>
        <Link className="edit-main-btn" to={`/newGroup/${group.groupID}/edit`}>
          <a>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"></path>
            </svg>
          </a>
        </Link>
      </div>
      <span>{memberNames.join(" • ")}</span>
    </div>
  );
}
function NewRegisterMsg() {
  return (
    <div style={{ padding: "1.25rem" }}>
      <div
        style={{
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        <svg
          className="mx-auto animate-bounce"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z"></path>
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="8" x2="8" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="16" y1="12" x2="12" y2="8"></line>
        </svg>
        <div style={{ whiteSpace: "pre", textWrap: "pretty" }}>
          Register payment records from <br />
          "Add a payment" button
        </div>
      </div>
    </div>
  );
}

function PaymentDetails({ payments, currency, id }) {
  if (!payments.length) return null;

  return (
    <div style={{ marginTop: "1.25rem" }}>
      {payments.map((p) => (
        <div key={p.id} className="payemnt-tile">
          <div style={{ gridColumn: "span 6 / span 6", lineHeight: "1.25rem" }}>
            <span style={{ fontSize: "1rem", display: "block" }}>
              {p.paymentOf}
            </span>
            <div className="pmtTile-payer">
              {p.payer} paid on ({p.date})
            </div>
            <div style={{ display: "inline-flex" }}>
              {p.splitAmong?.map((name, idx) => (
                <div key={idx} className="payment-for">
                  {name.charAt(0)}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              gridColumn: "span 4 / span 4",
              textAlign: "right",
              fontSize: "1rem",
            }}
          >
            {currency.symbol}
            {p.price}
          </div>
          <div style={{ gridColumn: "span 2 / span 2" }}>
            <Link
              to={`/addPayment/${id}/edit?paymentID=${p.id}`}
              style={{ textDecoration: "none", color: "var(--clr-light-a0)" }}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-auto"
                  width="20"
                  display="block"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function TransactionsDetls({ transactions, currency }) {
  if (!transactions.length) {
    return <div className="settled-message">💰 Settled! 🎉</div>;
  }
  return (
    <>
      <div className="debts-header">
        <h4 style={{ fontWeight: "700", margin: "0" }}>How to Settle Debts</h4>
        <button style={{ fontSize: "0.9rem", color: "#717171" }}>
          Copy for Share
        </button>
      </div>
      <div>
        {transactions.map((trxn, idx) => (
          <div className="debt-tile" key={idx}>
            <div style={{ gridColumn: "span 8 / span 8" }}>
              <span>
                {trxn.from} → {trxn.to}
              </span>
            </div>
            <div className="trxn-amt">
              {currency.symbol}
              {trxn.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
