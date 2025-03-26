import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const KEY = "fca_live_qs8ovMhP2am2kETawTSuf4VFn08t1johxAYNmYY6";
export default function NewGroup({
  setCurrency,
  currency,
  setMembers,
  members,
  setGroupName,
  GroupName,
}) {
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [curr, setCurr] = useState("");

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

        setCurrencyList(Object.values(data.data));
      } catch (err) {
        if (err.name !== "AbortError") {
          // ...existing code...
        }
      }
    }
    fetchCurrList();
  }, []);

  function handleCurrency(e) {
    const selectedCode = e.target.value;
    const selectedCurrency = currencyList.find((c) => c.code === selectedCode);
    setCurr(selectedCurrency ? selectedCurrency.symbol : "");
    setCurrency(selectedCurrency ? selectedCurrency.symbol : "");
  }

  function handleMembers(e) {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Member name cannot be empty!");
      return;
    }
    if (members.some((mem) => mem.Name.toLowerCase() === name.toLowerCase())) {
      alert("This member is already added!");
      return;
    }
    const newName = { Name: name.trim(), id: crypto.randomUUID() };
    setMembers([...members, newName]);
    setName("");
  }

  function handleDeleteMember(id) {
    setMembers((x) => x.filter((mem) => mem.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (GroupName.trim() === "") {
      alert("Please enter the Group Name");
      return;
    }
    if (members.length < 2) {
      alert("Add two or more members/firends");
      return;
    }
    setIsSubmitted(true);
  }

  return (
    <div
      className={!isSubmitted ? "bg-a0" : "bg-d0"}
      style={{ padding: "2rem" }}
    >
      {!isSubmitted ? (
        <form className="new-group-form" onSubmit={handleSubmit}>
          <ul>
            <li>
              <div className="label">Group Name</div>
              <div className="relative">
                <input
                  maxLength="100"
                  type="text"
                  value={GroupName}
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
                    {mem.Name}
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
                  value={curr.code}
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
      ) : (
        <Confirmation />
      )}
    </div>
  );
}

function Confirmation() {
  const navigate = useNavigate();
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
      <div>
        <Button onClick={() => navigate("/groupPage")}>
          Go to your Group Page!
        </Button>
      </div>
    </div>
  );
}

// const currency_list = [
//   { code: "AFA", name: "Afghan Afghani", symbol: "؋" },
//   { code: "ALL", name: "Albanian Lek", symbol: "L" },
//   { code: "DZD", name: "Algerian Dinar", symbol: "دج" },
//   { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
//   { code: "ARS", name: "Argentine Peso", symbol: "$" },
//   { code: "AMD", name: "Armenian Dram", symbol: "֏" },
//   { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
//   { code: "AUD", name: "Australian Dollar", symbol: "A$" },
//   { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
//   { code: "BSD", name: "Bahamian Dollar", symbol: "B$" },
//   { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
//   { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
//   { code: "BBD", name: "Barbadian Dollar", symbol: "Bds$" },
//   { code: "BYR", name: "Belarusian Ruble", symbol: "Br" },
//   { code: "BEF", name: "Belgian Franc", symbol: "FB" },
//   { code: "BZD", name: "Belize Dollar", symbol: "BZ$" },
//   { code: "BMD", name: "Bermudan Dollar", symbol: "$" },
//   { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
//   { code: "BTC", name: "Bitcoin", symbol: "₿" },
//   { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
//   { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
//   { code: "BWP", name: "Botswanan Pula", symbol: "P" },
//   { code: "BRL", name: "Brazilian Real", symbol: "R$" },
//   { code: "GBP", name: "British Pound Sterling", symbol: "£" },
//   { code: "BND", name: "Brunei Dollar", symbol: "B$" },
//   { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
//   { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
//   { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
//   { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
//   { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
//   { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
//   { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA" },
//   { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA" },
//   { code: "XPF", name: "CFP Franc", symbol: "₣" },
//   { code: "CLP", name: "Chilean Peso", symbol: "$" },
//   { code: "CLF", name: "Chilean Unit of Account", symbol: "UF" },
//   { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
//   { code: "COP", name: "Colombian Peso", symbol: "$" },
//   { code: "KMF", name: "Comorian Franc", symbol: "CF" },
//   { code: "CDF", name: "Congolese Franc", symbol: "FC" },
//   { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
//   { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
//   { code: "CUC", name: "Cuban Convertible Peso", symbol: "$" },
//   { code: "CZK", name: "Czech Republic Koruna", symbol: "Kč" },
//   { code: "DKK", name: "Danish Krone", symbol: "kr" },
//   { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
//   { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
//   { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
//   { code: "EGP", name: "Egyptian Pound", symbol: "£" },
//   { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
//   { code: "EEK", name: "Estonian Kroon", symbol: "kr" },
//   { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
//   { code: "EUR", name: "Euro", symbol: "€" },
//   { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
//   { code: "FJD", name: "Fijian Dollar", symbol: "$" },
//   { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
//   { code: "GEL", name: "Georgian Lari", symbol: "₾" },
//   { code: "DEM", name: "German Mark", symbol: "DM" },
//   { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
//   { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
//   { code: "GRD", name: "Greek Drachma", symbol: "₯" },
//   { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
//   { code: "GNF", name: "Guinean Franc", symbol: "FG" },
//   { code: "GYD", name: "Guyanaese Dollar", symbol: "$" },
//   { code: "HTG", name: "Haitian Gourde", symbol: "G" },
//   { code: "HNL", name: "Honduran Lempira", symbol: "L" },
//   { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
//   { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
//   { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
//   { code: "INR", name: "Indian Rupee", symbol: "₹" },
//   { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
//   { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
//   { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
//   { code: "ILS", name: "Israeli New Sheqel", symbol: "₪" },
//   { code: "ITL", name: "Italian Lira", symbol: "₤" },
//   { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
//   { code: "JPY", name: "Japanese Yen", symbol: "¥" },
//   { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
//   { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
//   { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
//   { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
//   { code: "KGS", name: "Kyrgystani Som", symbol: "лв" },
//   { code: "LAK", name: "Laotian Kip", symbol: "₭" },
//   { code: "LVL", name: "Latvian Lats", symbol: "Ls" },
//   { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
//   { code: "LSL", name: "Lesotho Loti", symbol: "L" },
//   { code: "LRD", name: "Liberian Dollar", symbol: "$" },
//   { code: "LYD", name: "Libyan Dinar", symbol: "ل.د" },
//   { code: "LTC", name: "Litecoin", symbol: "Ł" },
//   { code: "LTL", name: "Lithuanian Litas", symbol: "Lt" },
//   { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
//   { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
//   { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
//   { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
//   { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
//   { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
// ];
