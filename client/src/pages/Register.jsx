import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../store/slices/authSlice";

// Signature element: a looping mini-conversation that "arrives" in real time,
// standing in for a static illustration — it shows the product instead of describing it.
const CONVERSATION = [
  { from: "them", name: "Maya", text: "Hey! Welcome to Talkie 👋" },
  { from: "me", text: "Just made my account — that was fast" },
  { from: "them", name: "Maya", text: "Encrypted, instant, made for real chats" },
  { from: "them", name: "Maya", text: "Ready when you are ✨" },
];

const ChatPreview = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="talkie-phone">
      <div className="talkie-phone__bar">
        <span className="talkie-dot" />
        <span className="talkie-phone__name">Maya Chen</span>
        <span className="talkie-phone__status">● online</span>
      </div>

      <div className="talkie-phone__body" key={cycle}>
        {CONVERSATION.map((m, i) => (
          <div
            key={i}
            className={`talkie-bubble-row ${m.from === "me" ? "is-me" : "is-them"}`}
            style={{ animationDelay: `${i * 0.9 + 0.2}s` }}
          >
            {m.from === "them" && <span className="talkie-avatar">M</span>}
            <span className="talkie-bubble">{m.text}</span>
          </div>
        ))}

        <div
          className="talkie-bubble-row is-them talkie-typing-row"
          style={{ animationDelay: `${CONVERSATION.length * 0.9 + 0.6}s` }}
        >
          <span className="talkie-avatar">M</span>
          <span className="talkie-bubble talkie-bubble--typing">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }
    dispatch(signup(formData));
  };

  return (
    <div className="talkie-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .talkie-page {
          min-height: 100vh;
          padding: 6rem 1rem 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #F6F5FF;
          font-family: 'Inter', sans-serif;
          color: #14152B;
        }
        .talkie-page::before, .talkie-page::after {
          content: '';
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.35;
          z-index: 0;
        }
        .talkie-page::before {
          background: #5B4CFF;
          top: -120px;
          left: -100px;
          animation: talkieDrift 16s ease-in-out infinite;
        }
        .talkie-page::after {
          background: #FF6F9C;
          bottom: -140px;
          right: -120px;
          animation: talkieDrift 18s ease-in-out infinite reverse;
        }
        @keyframes talkieDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, 30px); }
        }

        .talkie-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1080px;
          display: grid;
          grid-template-columns: 1fr;
          background: #FFFFFF;
          border-radius: 28px;
          box-shadow: 0 30px 80px -20px rgba(20, 21, 43, 0.25);
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .talkie-card { grid-template-columns: 1fr 1fr; }
        }

        .talkie-form-side {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.5rem 3rem;
        }
        .talkie-form-inner { width: 100%; max-width: 400px; }

        .talkie-logo-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.75rem;
        }
        .talkie-logo-badge {
          width: 46px; height: 46px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #5B4CFF, #8A6BFF);
          box-shadow: 0 8px 24px -6px rgba(91, 76, 255, 0.55);
        }
        .talkie-logo-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }
        .talkie-logo-sub { font-size: 0.82rem; color: #6B7280; margin-top: 1px; }

        .talkie-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: #4C4A73;
          background: #F1EFFF;
          border: 1px solid #E4E0FF;
          padding: 0.32rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .talkie-eyebrow .talkie-dot { width: 6px; height: 6px; }

        .talkie-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.85rem;
          letter-spacing: -0.02em;
          margin-bottom: 0.35rem;
        }
        .talkie-subheading { color: #6B7280; font-size: 0.92rem; margin-bottom: 2rem; }

        .talkie-field {
          position: relative;
          opacity: 0;
          animation: talkieFieldIn 0.55s ease forwards;
          margin-bottom: 1.1rem;
        }
        .talkie-field:nth-child(1) { animation-delay: 0.05s; }
        .talkie-field:nth-child(2) { animation-delay: 0.15s; }
        .talkie-field:nth-child(3) { animation-delay: 0.25s; }
        @keyframes talkieFieldIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .talkie-field-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border: 1.5px solid #E7E4FB;
          background: #FAFAFF;
          border-radius: 14px;
          padding: 0.85rem 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .talkie-field-wrap:focus-within {
          border-color: #5B4CFF;
          box-shadow: 0 0 0 4px rgba(91, 76, 255, 0.12);
          transform: translateY(-1px);
        }
        .talkie-field-wrap svg { color: #9490B8; flex-shrink: 0; transition: color 0.2s ease; }
        .talkie-field-wrap:focus-within svg { color: #5B4CFF; }
        .talkie-field-wrap input {
          border: none; outline: none; background: transparent;
          width: 100%; font-size: 0.94rem; color: #14152B;
          font-family: 'Inter', sans-serif;
        }
        .talkie-field-wrap input::placeholder { color: #B3B0D6; }
        .talkie-toggle-btn {
          background: none; border: none; cursor: pointer;
          color: #9490B8; display: flex; align-items: center;
        }
        .talkie-toggle-btn:hover { color: #5B4CFF; }

        .talkie-submit {
          width: 100%;
          border: none;
          cursor: pointer;
          padding: 0.9rem 1rem;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.96rem;
          color: white;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: linear-gradient(100deg, #5B4CFF, #8A6BFF, #FF6F9C);
          background-size: 200% 100%;
          background-position: 0% 0%;
          box-shadow: 0 10px 30px -8px rgba(91, 76, 255, 0.5);
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 0.4rem;
        }
        .talkie-submit:hover:not(:disabled) {
          background-position: 100% 0%;
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -6px rgba(91, 76, 255, 0.6);
        }
        .talkie-submit:disabled { opacity: 0.75; cursor: not-allowed; }

        .talkie-footer-link { text-align: center; font-size: 0.88rem; color: #6B7280; margin-top: 1.6rem; }
        .talkie-footer-link a { color: #5B4CFF; font-weight: 600; text-decoration: none; }
        .talkie-footer-link a:hover { text-decoration: underline; }

        /* Signature side */
        .talkie-visual-side {
          display: none;
          position: relative;
          background: linear-gradient(160deg, #5B4CFF 0%, #7C5CFF 55%, #FF6F9C 130%);
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
        }
        @media (min-width: 1024px) { .talkie-visual-side { display: flex; } }

        .talkie-phone {
          width: 100%;
          max-width: 340px;
          background: rgba(255,255,255,0.97);
          border-radius: 22px;
          box-shadow: 0 30px 60px -20px rgba(20, 10, 60, 0.5);
          overflow: hidden;
        }
        .talkie-phone__bar {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.9rem 1.1rem;
          border-bottom: 1px solid #EFEDFB;
        }
        .talkie-dot {
          display: inline-block; width: 8px; height: 8px; border-radius: 999px;
          background: #2EC4B6;
          animation: talkiePulse 1.8s ease-in-out infinite;
        }
        @keyframes talkiePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46, 196, 182, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(46, 196, 182, 0); }
        }
        .talkie-phone__name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.9rem; }
        .talkie-phone__status {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: #2EC4B6;
        }
        .talkie-phone__body { padding: 1.1rem; display: flex; flex-direction: column; gap: 0.55rem; min-height: 260px; }

        .talkie-bubble-row {
          display: flex; align-items: flex-end; gap: 0.4rem;
          opacity: 0;
          animation: talkieBubbleIn 0.5s ease forwards;
        }
        .talkie-bubble-row.is-me { justify-content: flex-end; }
        @keyframes talkieBubbleIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .talkie-avatar {
          width: 22px; height: 22px; border-radius: 999px;
          background: linear-gradient(135deg, #5B4CFF, #FF6F9C);
          color: white; font-size: 0.62rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .talkie-bubble {
          max-width: 78%;
          padding: 0.55rem 0.8rem;
          border-radius: 14px;
          font-size: 0.82rem;
          line-height: 1.35;
        }
        .is-them .talkie-bubble { background: #F1EFFF; color: #232244; border-bottom-left-radius: 4px; }
        .is-me .talkie-bubble { background: linear-gradient(135deg, #5B4CFF, #7C5CFF); color: white; border-bottom-right-radius: 4px; }

        .talkie-bubble--typing { display: flex; gap: 3px; align-items: center; padding: 0.65rem 0.9rem; }
        .talkie-bubble--typing i {
          width: 5px; height: 5px; border-radius: 999px; background: #9490B8;
          animation: talkieTyping 1.1s ease-in-out infinite;
        }
        .talkie-bubble--typing i:nth-child(2) { animation-delay: 0.15s; }
        .talkie-bubble--typing i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes talkieTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .talkie-page *, .talkie-page *::before, .talkie-page *::after {
            animation: none !important;
            transition: none !important;
          }
          .talkie-field, .talkie-bubble-row { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="talkie-card">
        <div className="talkie-form-side">
          <div className="talkie-form-inner">
            <div className="talkie-logo-row">
              <div className="talkie-logo-badge">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="talkie-logo-title">Talkie</div>
                <div className="talkie-logo-sub">Create your account</div>
              </div>
            </div>

            <span className="talkie-eyebrow">
              <span className="talkie-dot" /> ENCRYPTED · REAL-TIME
            </span>

            <h2 className="talkie-heading">Let's get you set up</h2>
            <p className="talkie-subheading">
              Takes about 20 seconds. No credit card, no spam.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="talkie-field">
                <div className="talkie-field-wrap">
                  <User size={17} />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="talkie-field">
                <div className="talkie-field-wrap">
                  <Mail size={17} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="talkie-field">
                <div className="talkie-field-wrap">
                  <Lock size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="talkie-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="talkie-submit" disabled={isSigningUp}>
                {isSigningUp && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSigningUp ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="talkie-footer-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>

        <div className="talkie-visual-side">
          <ChatPreview />
        </div>
      </div>
    </div>
  );
};

export default Register;
