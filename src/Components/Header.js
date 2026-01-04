import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Logo.png";
import { useAuth } from "../Contexts/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <Link className="mx-auto ara" to="/">
        <img className="logo" style={{ width: currentUser && !isAuthPage ? "8rem" : "10rem" }} src={logo} alt="logo" />
        <p className="rubik-doodle-shadow-regular" style={{ fontSize: currentUser && !isAuthPage ? "40px" : "50px" }} >My Splits</p>
      </Link>

      {currentUser && !isAuthPage && (
        <div className="header-user-menu" ref={dropdownRef}>
          <button
            className="user-profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="user-avatar">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" />
              ) : (
                <FiUser size={18} />
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="user-avatar-large">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" />
                  ) : (
                    <FiUser size={24} />
                  )}
                </div>
                <div className="user-info">
                  <div className="user-display-name">
                    {currentUser.displayName || "User"}
                  </div>
                  <div className="user-email">
                    {currentUser.email}
                  </div>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button className="dropdown-item" onClick={handleLogout}>
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}