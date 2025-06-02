import { useState } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useGroups } from "../Contexts/GroupContext";
import { useCurrencyList } from "../Contexts/CurrencyContext";
import ErrorPopup from "../Components/ErrorPopup";

export default function NewGroup() {
  const { setGroups } = useGroups();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  });
  const [groupId, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currencyList = useCurrencyList();

  //handle currency selection
  function handleCurrency(e) {
    const selectedCode = e.target.value;
    const selectedCurrency = currencyList.find((c) => c.code === selectedCode);
    if (selectedCurrency) setCurrency(selectedCurrency);
  }

  // Add member to the group
  function handleAddMember(e) {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Member name cannot be empty!");
      return;
    }
    if (
      members.some(
        (mem) => mem.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError("This member is already added!");
      return;
    }
    setMembers((prev) => [...prev, { name: trimmedName, id: nanoid(8) }]);
    setName("");
  }

  //handle delete member
  function handleDeleteMember(id) {
    setMembers((x) => x.filter((mem) => mem.id !== id));
  }

  //handle group creation
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!groupName.trim()) {
      setError("Please enter the Group Name");
      return;
    }
    if (members.length < 2) {
      setError("Add two or more members/friends");
      return;
    }
    const groupID = crypto.randomUUID();
    setGroups((prev) => [
      ...prev,
      {
        groupID,
        name: groupName.trim(),
        currency,
        members,
        payments: [],
        createDt: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
      },
    ]);
    setGroupId(groupID);
    setIsSubmitted(true);
  }
  if (isSubmitted) {
    return <Confirmation groupID={groupId} groupName={groupName} />;
  }
  return (
    <div
      className={!isSubmitted ? "bg-a0" : "bg-d0"}
      style={{ padding: "2rem" }}
    >
      <ErrorPopup message={error} onClose={() => setError("")} />

      {isSubmitted ? (
        <Confirmation groupID={groupId} groupName={groupName} />
      ) : (
        <form className="new-group-form" onSubmit={handleSubmit}>
          <ul>
            <li>
              <div className="label">Group Name</div>
              <div className="relative">
                <input
                  maxLength="100"
                  type="text"
                  value={groupName}
                  placeholder="Trip to Manali"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            </li>
            <li>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="member-name" className="label">
                  Member Name
                </label>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="text"
                    placeholder="Rahul"
                    value={name}
                    aria-required="true"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddMember(e);
                    }}
                  />
                  <button
                    className="btn-add"
                    type="button"
                    aria-label="Add member"
                    onClick={handleAddMember}
                  >
                    Add
                  </button>
                </div>
              </div>

              {members.map((mem) => (
                <div className="frnd-added" key={mem.id}>
                  <span style={{ marginRight: "0.5rem" }}>{mem.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${mem.name}`}
                    onClick={() => handleDeleteMember(mem.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </li>
            <li>
              <label htmlFor="base-currency-selectbox" className="label">
                Currency of Your Country
              </label>
              <div>
                <select
                  name="currencies"
                  id="base-currency-selectbox"
                  value={currency.code}
                  onChange={handleCurrency}
                >
                  {currencyList.map((i) => (
                    <option key={i.code} value={i.code}>
                      {i.name} ({i.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </li>
          </ul>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button>Create a group</Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Confirmation({ groupID, groupName }) {
  const groupURL = `${window.location.origin}/groupPage/${groupID}`;
  return (
    <div
      className="bg-d0"
      style={{ padding: "2rem 1rem", position: "relative" }}
    >
      <svg
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        className="confirm-svg"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="#2d332f "
          strokeWidth="5"
          fill="#379c61"
        />
        <path
          d="M30 50 L45 65 L70 30"
          stroke="#121212"
          strokeWidth="5"
          fill="none"
        />
        <style>
          {`    path{ 
                    animation: checkmark 0.5s ease-in-out forwards;
                    }
                    @keyframes checkmark{
                        0% { stroke-dasharray: 0, 100; }
                        100% { stroke-dasharray: 100, 0; }
                    }
                    `}
        </style>
      </svg>
      <div
        style={{ textAlign: "center", marginBottom: "1rem", color: "white" }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1.125rem",
          }}
        >
          Group created!
        </h1>
      </div>
      {/* Group URL Display */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#fff",
          fontSize: "0.9rem",
        }}
      >
        <p>
          First, copy the URL of the group page <br />
          and share it with members via messaging apps.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            value={groupURL}
            readOnly
            style={{
              flex: 1,
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left",
              padding: "0.5rem",
              color: "#fff",
            }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(groupURL);
              alert("Group link copied!");
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#379c61",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            COPY
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/groupPage/${groupID}`} className="link-cta">
          <Button>Go to your Group Page!</Button>
        </Link>
      </div>
    </div>
  );
}
