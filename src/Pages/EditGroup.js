import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Button";
import { useEffect, useRef, useState } from "react";
import { useGroups } from "../Contexts/GroupContext";
import { useCurrencyList } from "../Contexts/CurrencyContext";
import { nanoid } from "nanoid";

export default function EditGroup() {
  const navigate = useNavigate();

  const { groups, updateGroup } = useGroups();
  const currencyList = useCurrencyList();
  const { id } = useParams();
  const group = groups.find((g) => g.groupID === id);
  const [groupName, setGroupName] = useState(group.name);
  const [currency, setCurrency] = useState(group.currency);
  const [editMember, setEditMember] = useState(null); // {id, name}
  const [editName, setEditName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [members, setMembers] = useState(group?.members || []);

  const inputRef = useRef();

  useEffect(() => {
    setMembers(group?.members || []);
  }, [group?.members]);
  if (!group) return <div>Group not found</div>;

  function openEditModal(member) {
    setEditMember(member);
    setEditName(member.name);
    setTimeout(() => inputRef.current?.focus(), 100);
  }
  function closeEditModal() {
    setEditMember(null);
    setEditName("");
  }
  function isDuplicateMemberName(name, excludeId = null) {
    return members.some(
      (m) =>
        m.id !== excludeId &&
        m.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  }
  function handleMemberUpdate() {
    const name = editName.trim();
    if (!name) return alert("Member name required.");
    if (isDuplicateMemberName(name, editMember.id)) {
      alert("A member with this name already exists.");
      return;
    }
    const updatedMembers = members.map((m) =>
      m.id === editMember.id ? { ...m, name } : m
    );
    setMembers(updatedMembers);
    updateGroup(group.groupID, { ...group, members: updatedMembers });
    closeEditModal();
  }
  function handleMemberDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete "${editMember?.name}" from the group?`
      )
    ) {
      const updatedMembers = members.filter((m) => m.id !== editMember.id);
      setMembers(updatedMembers);
      updateGroup(group.groupID, { ...group, members: updatedMembers });
      closeEditModal();
    }
  }
  function handleAddMember(e) {
    e.preventDefault();
    const name = newMemberName.trim();
    if (!name) return alert("Member name required.");
    if (isDuplicateMemberName(name)) {
      alert("A member with this name already exists.");
      return;
    }
    const newId = nanoid(8);
    const updatedMembers = [...members, { id: newId, name }];
    setMembers(updatedMembers);
    updateGroup(group.groupID, { ...group, members: updatedMembers });
    setNewMemberName("");
  }
  function handleUpdate(e) {
    e.preventDefault();
    if (!groupName.trim()) return alert("Group name required");
    if (!currency.code) return alert("Select a currency");
    const duplicate = groups.some(
      (g) =>
        g.groupID !== group.groupID &&
        g.name.trim().toLowerCase() === groupName.trim().toLowerCase()
    );
    if (duplicate) {
      alert("A group with this name already exists.");
      return;
    }
    updateGroup(group.groupID, {
      ...group,
      name: groupName.trim(),
      currency,
      members,
    });
    navigate(`/groupPage/${group.groupID}`);
  }
  return (
    <div className={"bg-a0"} style={{ padding: "2rem" }}>
      <EditMemberModal
        member={editMember}
        editName={editName}
        setEditName={setEditName}
        onUpdate={handleMemberUpdate}
        onDelete={handleMemberDelete}
        onClose={closeEditModal}
        inputRef={inputRef}
      />

      <div
        style={{
          filter: editMember ? "blur(5px)" : "none",
          transition: "filter 0.2s",
        }}
      >
        <form className="new-group-form" onSubmit={handleUpdate}>
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
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                  />
                  <button
                    className="btn-add"
                    type="button"
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
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => openEditModal(mem)}
                    aria-label="Edit member"
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
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"></path>
                    </svg>
                  </button>
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
                  onChange={(e) => {
                    const selected = currencyList.find(
                      (c) => c.code === e.target.value
                    );
                    if (selected) setCurrency(selected);
                  }}
                >
                  {currencyList.map((i) => (
                    <option key={i.code} value={i.code}>
                      {i.name} ({i.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </li>
            <li></li>
          </ul>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button>Update</Button>
            <Link
              style={{ background: "var(--clr-surface-a40)" }}
              to={`/groupPage/${group.groupID}`}
              className="cta-button"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditMemberModal({
  member,
  editName,
  setEditName,
  onUpdate,
  onDelete,
  onClose,
  inputRef,
}) {
  if (!member) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--clr-surface-a10)",
          borderRadius: "1rem",
          minWidth: 350,
          maxWidth: 400,
          padding: "2rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          position: "relative",
          color: "var(--clr-light-a0)",
          border: "1px solid var(--clr-surface-a30)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 20,
            textAlign: "center",
            color: "var(--clr-primary-a50)",
            letterSpacing: "0.5px",
          }}
        >
          Edit Member Name
        </div>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              marginBottom: 8,
              fontWeight: 500,
              color: "var(--clr-light-a0)",
            }}
          >
            Member Name
          </div>
          <input
            ref={inputRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: "0.5rem",
              border: "1px solid var(--clr-surface-a30)",
              background: "var(--clr-surface-a20)",
              color: "var(--clr-light-a0)",
              marginBottom: 8,
              outline: "none",
            }}
            maxLength={100}
            aria-label="Edit member name"
          />
        </div>
        <button
          style={{
            width: "100%",
            background: "var(--clr-primary-a20)",
            color: "var(--clr-light-a0)",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 10,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={onUpdate}
        >
          Update
        </button>
        <button
          style={{
            width: "100%",
            background: "var(--clr-surface-a20)",
            color: "#ff5a5a",
            border: "1px solid #ff5a5a",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 10,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          style={{
            width: "100%",
            background: "var(--clr-surface-a30)",
            color: "var(--clr-light-a0)",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
