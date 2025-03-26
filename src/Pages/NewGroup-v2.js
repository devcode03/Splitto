import { use, useEffect, useId, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const KEY = "fca_live_qs8ovMhP2am2kETawTSuf4VFn08t1johxAYNmYY6";
export default function NewGroup({ setGroups }) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [groupId, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [currencyList, setCurrencyList] = useState([]);

  useEffect(function () {
    async function fetchCurrList() {
      try {
        const res = await fetch(
          `https://api.freecurrencyapi.com/v1/currencies?apikey=${KEY}&currencies=`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching Currencies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Currencies not found");
        console.log("fetched currency list: ", data);

        setCurrencyList(Object.values(data.data));
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchCurrList();
  }, []);

  //handle currency selection
  function handleCurrency(e) {
    const selectedCode = e.target.value;
    const selectedCurrency = currencyList.find((c) => c.code === selectedCode);
    setCurrency(selectedCurrency ? selectedCurrency.symbol : "");
  }
  // Add member to the group
  function handleMembers(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Member name cannot be empty!");
    if (members.some((mem) => mem.name.toLowerCase() === name.toLowerCase()))
      return alert("This member is already added!");

    const newMember = {
      name: name.trim(),
      id: nanoid(8),
    };
    setMembers((prev) => {
      const updatedMember = [...prev, newMember];
      console.log("updated members list :", updatedMember);
      return updatedMember;
    });
    setName("");
  }
  //handle delete member
  function handleDeleteMember(id) {
    setMembers((x) => x.filter((mem) => mem.id !== id));
  }

  //handle group creation
  function handleSubmit(e) {
    e.preventDefault();

    if (!groupName.trim()) return alert("Please enter the Group Name");

    if (members.length < 2) return alert("Add two or more members/firends");
    const groupID = crypto.randomUUID();
    const newGroup = {
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
    };
    setGroups((prev) => {
      const updatedGroups = [...prev, newGroup];
      console.log("updated group:", updatedGroups);
      return updatedGroups;
    });
    setGroupId(groupID);
    setIsSubmitted(true);
  }

  return (
    <div
      className={!isSubmitted ? "bg-a0" : "bg-d0"}
      style={{ padding: "2rem" }}
    >
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
                <div className="label">Member Name</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="text"
                    placeholder="Rahul"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button className="btn-add" onClick={handleMembers}>
                    Add
                  </button>
                </div>
              </div>

              {members.map((mem) => (
                <div className="frnd-added" key={mem.id}>
                  <span style={{ marginRight: "0.5rem" }} key={mem.id}>
                    {mem.name}
                  </span>
                  <svg
                    onClick={() => handleDeleteMember(mem.id)}
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
                </div>
              ))}
            </li>
            <li>
              <div className="label">Currency of Your Country</div>
              <div>
                <select
                  name="currencies"
                  id="base-currency-selectbox"
                  value={currency.code}
                  onChange={handleCurrency}
                >
                  {currencyList.map((i) => (
                    <option key={i.code} value={i.code}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li>
              <Button>Create a group</Button>
            </li>
          </ul>
        </form>
      )}{" "}
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

      <Link to={`/groupPage/${groupID}?${groupName}`} className="link-cta">
        <Button>Go to your Group Page!</Button>
      </Link>
    </div>
  );
}
