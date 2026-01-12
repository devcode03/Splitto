import { useCallback, useEffect, useState, memo } from "react";
import Button from "../Components/Button";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGroups } from "../Contexts/GroupContext";
import ErrorPopup from "../Components/ErrorPopup";
import validatePayment from "../Utils/validatePayment";
import Loading from "../Components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export default function AddNewPayment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentID = params.get("paymentID");
  const isEditMode = !!paymentID;

  const { groups, loading, addPayment, updatePayment } = useGroups();
  const navigate = useNavigate();
  const [payer, setPayer] = useState("");
  const [paymentOf, setPaymentOf] = useState("");
  const [price, setPrice] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { id } = useParams();
  const group = groups.find((g) => g.groupID === id);
  const { members = [], currency } = group;

  // Initialize form when group loads or changes - only run once when component mounts
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!group || initialized) return;

    const { members = [], payments = [] } = group;

    if (isEditMode && payments.length > 0) {
      const payment = payments.find((p) => p.id === paymentID);
      if (payment) {
        setPayer(payment.payer);
        setPaymentOf(payment.paymentOf);
        setPrice(payment.price);
        setSelectedMembers(payment.splitAmong);
        setInitialized(true);
      }
    } else if (members.length > 0 && !payer) {
      setPayer(members[0].name);
      setSelectedMembers(members.map((m) => m.name));
      setInitialized(true);
    }
  }, [group, isEditMode, paymentID, initialized]); // Fixed dependencies



  const allSelected = selectedMembers.length === members.length;
  const handleSelectAll = useCallback(() => {
    setSelectedMembers(allSelected ? [] : members.map((m) => m.name));
  }, [allSelected, members]);

  const handleMemberToggle = useCallback((memName) => {
    setSelectedMembers((prev) =>
      prev.includes(memName)
        ? prev.filter((name) => name !== memName)
        : [...prev, memName]
    );
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      const errorMsg = validatePayment({
        payer,
        paymentOf,
        price,
        selectedMembers,
      });
      if (errorMsg) {
        setError(errorMsg);
        return;
      }

      setIsSaving(true);
      setError(""); // Clear any previous errors

      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      });

      let result;
      try {
        if (isEditMode) {
          // Update existing payment via context
          result = await updatePayment(id, paymentID, {
            payer,
            paymentOf,
            price: Number(price),
            splitAmong: selectedMembers,
            date: formattedDate,
          });
        } else {
          // Add new payment via context
          const newPayment = {
            id: crypto.randomUUID(),
            payer,
            paymentOf,
            price: Number(price),
            splitAmong: selectedMembers,
            date: formattedDate,
          };
          result = await addPayment(id, newPayment);
        }

        setIsSaving(false);

        if (result.success) {
          // Reset fields and navigate
          setPaymentOf("");
          setPrice("");
          setError("");
          navigate(`/groupPage/${id}`);
        } else {
          setError(result.error || "Failed to save payment. Please try again.");
        }
      } catch (error) {
        setIsSaving(false);
        setError("An unexpected error occurred. Please try again.");
        console.error("Payment save error:", error);
      }
    },
    [
      payer,
      paymentOf,
      price,
      selectedMembers,
      id,
      navigate,
      isEditMode,
      paymentID,
    ]
  );

  // Show loading state
  if (loading) {
    return <Loading fullScreen message="Loading payment form..." />;
  }

  // Show error if group is not found
  if (!group) {
    return (
      <>
        <ErrorPopup message={"Group not found"} onClose={() => setError("")} />
        <div style={{ padding: "2rem", textAlign: "center" }}>Group not found</div>
      </>
    );
  }


  return (
    <div className="bg-a0">
      <ErrorPopup message={error} onClose={() => setError("")} />
      <div className="form-card">
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ marginBottom: ".5rem", fontSize: ".9rem" }}>Payer</div>
          <div>
            <select
              id="member-selectbox"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
            >
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
              <div className="rs-btn">{currency?.symbol}</div>
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
          <div
            style={{
              marginBottom: ".5rem",
              fontSize: ".9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Payment for...
            <label
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                margin: "10px",
                alignItems: "center",
              }}
            >
              <input
                className="checkbox__input"
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
              Select All
            </label>
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
                      checked={selectedMembers.includes(m.name)}
                      onChange={() => handleMemberToggle(m.name)}
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
        <div
          style={{
            paddingBottom: "0 1.25rem 1.25rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginBottom: "2.5rem",
              justifyContent: "center", // Center the buttons horizontally
              alignItems: "center",
              padding: 0, // Remove extra padding
              width: "fit-content", // Only as wide as needed
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              onClick={handleSave}
              disabled={
                isSaving || !payer || !paymentOf || !price || selectedMembers.length === 0
              }
            >
              {isSaving ? <><FontAwesomeIcon icon={faFloppyDisk} /> Saving...</> : <><FontAwesomeIcon icon={faFloppyDisk} /> Save</>}
            </Button>
            <Link to={`/groupPage/${id}`} className="link-cta">
              <Button disabled={isSaving}>← Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
