import { useEffect, useState } from "react";
import { LogOut, Menu, MessageSquare, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
  };

  const initial = (authUser?.fullName || authUser?.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <header className={`talkie-nav ${scrolled ? "is-scrolled" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .talkie-nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 40;
          font-family: 'Inter', sans-serif;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(231, 228, 251, 0.8);
          transition: box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .talkie-nav.is-scrolled {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 30px -12px rgba(20, 21, 43, 0.18);
          border-color: #E7E4FB;
        }

        .talkie-nav__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }
        .talkie-nav__row {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .talkie-nav__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }
        .talkie-nav__badge {
          width: 36px; height: 36px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #5B4CFF, #8A6BFF);
          box-shadow: 0 6px 18px -6px rgba(91, 76, 255, 0.55);
          transition: transform 0.25s ease;
        }
        .talkie-nav__logo:hover .talkie-nav__badge {
          transform: rotate(-8deg) scale(1.06);
        }
        .talkie-nav__wordmark {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #14152B;
          letter-spacing: -0.01em;
        }

        .talkie-nav__right { display: flex; align-items: center; gap: 0.6rem; }

        .talkie-link {
          position: relative;
          padding: 0.55rem 0.9rem;
          border-radius: 10px;
          font-weight: 500;
          font-size: 0.9rem;
          color: #4B4A6B;
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .talkie-link::after {
          content: '';
          position: absolute;
          left: 0.9rem; right: 0.9rem; bottom: 0.3rem;
          height: 2px;
          background: linear-gradient(90deg, #5B4CFF, #FF6F9C);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .talkie-link:hover { color: #14152B; background: #F6F5FF; }
        .talkie-link:hover::after { transform: scaleX(1); }

        .talkie-btn-primary {
          padding: 0.6rem 1.1rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
          text-decoration: none;
          display: inline-flex;
          background: linear-gradient(100deg, #5B4CFF, #8A6BFF, #FF6F9C);
          background-size: 200% 100%;
          background-position: 0% 0%;
          box-shadow: 0 8px 22px -8px rgba(91, 76, 255, 0.55);
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .talkie-btn-primary:hover {
          background-position: 100% 0%;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px -6px rgba(91, 76, 255, 0.65);
        }

        .talkie-chip {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.4rem 0.85rem 0.4rem 0.4rem;
          border-radius: 999px;
          background: #F6F5FF;
          border: 1px solid #E7E4FB;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.88rem;
          color: #33325C;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .talkie-chip:hover {
          border-color: #C9C2FF;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px -8px rgba(91, 76, 255, 0.4);
        }
        .talkie-chip__avatar {
          width: 26px; height: 26px; border-radius: 999px;
          background: linear-gradient(135deg, #5B4CFF, #FF6F9C);
          color: white; font-size: 0.72rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .talkie-logout {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.55rem 0.9rem;
          border-radius: 12px;
          border: 1px solid #FBD9DA;
          background: #FFF5F5;
          color: #C63A3A;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .talkie-logout svg { transition: transform 0.2s ease; }
        .talkie-logout:hover {
          background: #FFE7E8;
          transform: translateY(-1px);
          box-shadow: 0 8px 18px -10px rgba(198, 58, 58, 0.5);
        }
        .talkie-logout:hover svg { transform: translateX(2px); }

        .talkie-menu-btn {
          display: none;
          background: none; border: none; cursor: pointer;
          color: #33325C;
          padding: 0.4rem;
          border-radius: 10px;
        }
        .talkie-menu-btn:hover { background: #F6F5FF; }

        .talkie-nav__desktop { display: flex; align-items: center; gap: 0.6rem; }

        .talkie-mobile-panel {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
          border-top: 1px solid #EFEDFB;
        }
        .talkie-mobile-panel.is-open { max-height: 260px; }
        .talkie-mobile-panel__inner {
          padding: 0.75rem 1.25rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (max-width: 720px) {
          .talkie-nav__desktop { display: none; }
          .talkie-menu-btn { display: inline-flex; }
        }

        @media (prefers-reduced-motion: reduce) {
          .talkie-nav, .talkie-nav *, .talkie-nav *::after {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div className="talkie-nav__inner">
        <div className="talkie-nav__row">
          <Link to="/" className="talkie-nav__logo">
            <div className="talkie-nav__badge">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="talkie-nav__wordmark">Talkie</span>
          </Link>

          <div className="talkie-nav__desktop">
            {!authUser ? (
              <>
                <Link to="/login" className="talkie-link">Login</Link>
                <Link to="/register" className="talkie-btn-primary">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="talkie-chip">
                  <span className="talkie-chip__avatar">{initial}</span>
                  {authUser?.fullName || "Profile"}
                </Link>
                <button onClick={handleLogout} className="talkie-logout">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            className="talkie-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={`talkie-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <div className="talkie-mobile-panel__inner">
          {!authUser ? (
            <>
              <Link to="/login" className="talkie-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link
                to="/register"
                className="talkie-btn-primary"
                onClick={() => setMenuOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="talkie-chip" onClick={() => setMenuOpen(false)}>
                <span className="talkie-chip__avatar">{initial}</span>
                {authUser?.fullName || "Profile"}
              </Link>
              <button onClick={handleLogout} className="talkie-logout">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
