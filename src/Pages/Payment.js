import { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddNewPayment({ groups = [], setGroups }) {
  const navigate = useNavigate();
  const [payer, setPayer] = useState("");
  const [paymentOf, setPaymentOf] = useState("");
  const [price, setPrice] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const { id } = useParams();
  console.log(id);
  const group = groups.find((g) => g.groupID === id);
  console.log("group", group);

  if (!group) {
    return <div>Group not found</div>;
  }

  const { members = [], currency, payments = [] } = group;

  // let isDisabled = false;
  function onChange(MemName) {
    setSelectedMembers((prv) =>
      prv.includes(MemName)
        ? prv.filter((name) => name !== MemName)
        : [...prv, MemName]
    );
    setIsChecked(!isChecked);
  }
  function handleSave(e) {
    e.preventDefault();
    if (!payer || !paymentOf || !price || selectedMembers.length === 0) {
      alert("Please fill all the fields and select atleast one friend.");
      return;
    }
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });

    const newPayment = {
      id: crypto.randomUUID(),
      payer,
      paymentOf,
      price: price,
      splitAmong: selectedMembers,
      date: formattedDate,
    };
    // Update the groups state
    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g.groupID === id ? { ...g, payments: [...g.payments, newPayment] } : g
      )
    );
    setPayer("");
    setPaymentOf("");
    setPrice("");
    setSelectedMembers([]);
    navigate(`/groupPage/${id}`);
  }

  return (
    <div className="bg-a0">
      <div style={{ padding: "1.25rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ marginBottom: ".5rem", fontSize: ".9rem" }}>Payer</div>
          <div>
            <select
              id="member-selectbox"
              defaultValue={payer}
              onChange={(e) => setPayer(e.target.value)}
            >
              <option value="PAO">Pick a member</option>
              {members.map((m) => (
                <option value={m.name} key={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ marginBottom: ".5rem", fontSize: ".9rem" }}>
            Payment of...
          </div>
          <div>
            <input
              placeholder="flight ticket"
              type="text"
              maxLength="100"
              value={paymentOf}
              onChange={(e) => setPaymentOf(e.target.value)}
            ></input>
          </div>
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ marginBottom: ".5rem", fontSize: ".9rem" }}>Price</div>
          <div>
            <div style={{ width: "100%", display: "flex" }}>
              <div className="rs-btn">{currency}</div>
              <input
                type="number"
                placeholder="980"
                max="100000000"
                min="0.001"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: ".5rem", fontSize: ".9rem" }}>
            Payment for...
          </div>
          <div>
            <div className="grid-pmt-for">
              {members.map((m) => (
                <div style={{ marginBottom: ".5rem" }} key={m.id}>
                  <label className="checkbox">
                    <input
                      className="checkbox__input"
                      type="checkbox"
                      id={`checkbox-${m.id}`}
                      onChange={() => onChange(m.name)}
                    />
                    <svg className="checkbox__check" width="24" height="24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div style={{ lineHeight: "1.25rem", marginLeft: "1rem" }}>
                      <span style={{ display: "block", fontSize: "1rem" }}>
                        {m.name}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingBottom: "0 1.25rem 1.25rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <Button onClick={handleSave}>Save</Button>
            <Link to={`/groupPage/${id}`} className="link-cta">
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
