import Button from "../components/Button";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

export default function Group({ groups, calculateBalances, settleDebts }) {
  const { id } = useParams();
  const group = groups.find((g) => g.groupID === id);
  if (!group) {
    return <div>Loading...</div>;
  }
  const { payments = [], members = [], currency, name } = group;

  const balances = calculateBalances(payments, members);
  const transactions = settleDebts(balances);

  let hasPayments = payments.length === 0;
  return (
    <>
      <GroupHeader groupName={name} members={members} />
      <div style={{ padding: "1.25rem" }} className="bg-a0 ">
        <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
          <Link
            to={`/addPayment/${id}`}
            className="link-cta"
            style={{ marginTop: "1.25rem" }}
          >
            <Button>Add a payment💲</Button>
          </Link>
          {hasPayments && <NewRegisterMsg />}

          <PaymentDetails payments={payments} currency={currency} />
        </div>
        {!hasPayments && (
          <TransactionsDetls transactions={transactions} currency={currency} />
        )}
      </div>
    </>
  );
}
function GroupHeader({ groupName, members }) {
  return (
    <div style={{ padding: "1.25rem" }}>
      <div className="group-name">
        <h1>{groupName}</h1>
        <button className="edit-main-btn">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="mx-auto"
              width="18"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
            </svg>
          </a>
        </button>
      </div>
      <span>
        {Object.entries(members)
          .map(([key, member]) => member.name)
          .join(" • ")}
      </span>
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

function PaymentDetails({ payments, currency }) {
  return (
    <div style={{ marginTop: "1.25rem" }}>
      {payments.map((p, id) => (
        <div key={id} className="payemnt-tile">
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
            {currency}
            {p.price}
          </div>
          <div style={{ gridColumn: "span 2 / span 2" }}>
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
          </div>
        </div>
      ))}
    </div>
  );
}

function TransactionsDetls({ transactions, currency }) {
  if (transactions.length === 0) {
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
              {currency}
              {trxn.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
