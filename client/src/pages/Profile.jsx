import { Camera, Loader2, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../store/slices/authSlice";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    avatar: authUser?.avatar?.url || "",
  });

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

      // avatar file store for backend
      setFormData((prev) => ({ ...prev, avatar: file }));
    };
  };

  const handleUpdateProfile = () => {
    const data = new FormData();

    data.append("fullName", formData.fullName);
    data.append("email", formData.email);

    // only append if avatar is file
    if (formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    dispatch(updateProfile(data));
  };

  return (
    <div className="talkie-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .talkie-page {
          min-height: 100vh;
          padding: 6.5rem 1rem 4rem;
          display: flex;
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
          width: 460px;
          height: 460px;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.3;
          z-index: 0;
        }
        .talkie-page::before {
          background: #5B4CFF;
          top: -110px;
          left: -110px;
          animation: talkieDrift 16s ease-in-out infinite;
        }
        .talkie-page::after {
          background: #FF6F9C;
          bottom: -130px;
          right: -110px;
          animation: talkieDrift 18s ease-in-out infinite reverse;
        }
        @keyframes talkieDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(36px, 26px); }
        }

        .talkie-profile-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 620px;
          background: #FFFFFF;
          border-radius: 26px;
          box-shadow: 0 30px 70px -24px rgba(20, 21, 43, 0.22);
          padding: 2.75rem 2.25rem;
        }

        .talkie-section {
          opacity: 0;
          animation: talkieRise 0.55s ease forwards;
        }
        .talkie-section--1 { animation-delay: 0.05s; }
        .talkie-section--2 { animation-delay: 0.15s; }
        .talkie-section--3 { animation-delay: 0.25s; }
        .talkie-section--4 { animation-delay: 0.35s; }
        @keyframes talkieRise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .talkie-profile-header { text-align: center; margin-bottom: 2rem; }
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
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.9rem;
        }
        .talkie-dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 999px;
          background: #2EC4B6;
          animation: talkiePulse 1.8s ease-in-out infinite;
        }
        @keyframes talkiePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46, 196, 182, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(46, 196, 182, 0); }
        }
        .talkie-profile-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.7rem;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .talkie-profile-sub { color: #6B7280; font-size: 0.9rem; }

        /* Avatar */
        .talkie-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 2.25rem;
        }
        .talkie-avatar-ring {
          position: relative;
          width: 132px;
          height: 132px;
          border-radius: 999px;
          padding: 4px;
          background: linear-gradient(135deg, #5B4CFF, #8A6BFF, #FF6F9C);
          background-size: 200% 200%;
          animation: talkieRingShift 6s ease infinite;
        }
        .talkie-avatar-ring.is-uploading { animation: talkieRingShift 1.4s ease infinite; }
        @keyframes talkieRingShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .talkie-avatar-img {
          width: 100%; height: 100%;
          border-radius: 999px;
          object-fit: cover;
          object-position: top;
          border: 4px solid #FFFFFF;
          display: block;
        }
        .talkie-avatar-btn {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 38px; height: 38px;
          border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #5B4CFF, #8A6BFF);
          box-shadow: 0 6px 18px -4px rgba(91, 76, 255, 0.6);
          cursor: pointer;
          border: 3px solid #FFFFFF;
          transition: transform 0.2s ease;
        }
        .talkie-avatar-btn:hover { transform: scale(1.08) rotate(-6deg); }
        .talkie-avatar-btn.is-disabled { pointer-events: none; opacity: 0.7; animation: talkiePulseSoft 1.4s ease-in-out infinite; }
        @keyframes talkiePulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .talkie-avatar-hint {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: #9490B8;
        }

        /* Fields */
        .talkie-field-label {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem;
          color: #6B7280;
          margin-bottom: 0.45rem;
        }
        .talkie-field-group { margin-bottom: 1.15rem; }

        .talkie-field-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border: 1.5px solid #E7E4FB;
          background: #FAFAFF;
          border-radius: 14px;
          padding: 0.8rem 1rem;
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

        .talkie-submit {
          width: 100%;
          border: none;
          cursor: pointer;
          padding: 0.9rem 1rem;
          border-radius: 14px;
          font-weight: 600;
          font-size: 0.96rem;
          color: white;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: linear-gradient(100deg, #5B4CFF, #8A6BFF, #FF6F9C);
          background-size: 200% 100%;
          background-position: 0% 0%;
          box-shadow: 0 10px 30px -8px rgba(91, 76, 255, 0.5);
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .talkie-submit:hover:not(:disabled) {
          background-position: 100% 0%;
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -6px rgba(91, 76, 255, 0.6);
        }
        .talkie-submit:disabled { opacity: 0.75; cursor: not-allowed; }

        /* Account info */
        .talkie-info-card {
          margin-top: 1.75rem;
          background: #FAFAFF;
          border: 1px solid #EFEDFB;
          border-radius: 18px;
          padding: 1.4rem 1.5rem;
        }
        .talkie-info-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.9rem;
        }
        .talkie-info-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.65rem 0;
          font-size: 0.88rem;
          color: #4B4A6B;
        }
        .talkie-info-row + .talkie-info-row { border-top: 1px solid #EFEDFB; }
        .talkie-info-status {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: #1DA588;
          font-weight: 600;
        }

        @media (prefers-reduced-motion: reduce) {
          .talkie-page *, .talkie-page *::before, .talkie-page *::after {
            animation: none !important;
            transition: none !important;
          }
          .talkie-section { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="talkie-profile-card">
        <div className="talkie-profile-header talkie-section talkie-section--1">
          <span className="talkie-eyebrow">
            <span className="talkie-dot" /> YOUR ACCOUNT
          </span>
          <h1 className="talkie-profile-title">Profile</h1>
          <p className="talkie-profile-sub">Manage how you appear across Talkie</p>
        </div>

        <div className="talkie-avatar-wrap talkie-section talkie-section--2">
          <div className={`talkie-avatar-ring ${isUpdatingProfile ? "is-uploading" : ""}`}>
            <img
              src={
                selectedImage ||
                (typeof formData.avatar === "string" ? formData.avatar : null) ||
                "/avatar-holder.avif"
              }
              alt="avatar"
              className="talkie-avatar-img"
            />

            <label
              htmlFor="avatar-upload"
              className={`talkie-avatar-btn ${isUpdatingProfile ? "is-disabled" : ""}`}
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <p className="talkie-avatar-hint">
            {isUpdatingProfile ? "UPLOADING…" : "CLICK THE CAMERA TO CHANGE PHOTO"}
          </p>
        </div>

        <div className="talkie-section talkie-section--3">
          <div className="talkie-field-group">
            <div className="talkie-field-label">
              <User className="w-3.5 h-3.5" /> Full name
            </div>
            <div className="talkie-field-wrap">
              <User size={16} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="talkie-field-group">
            <div className="talkie-field-label">
              <Mail className="w-3.5 h-3.5" /> Email address
            </div>
            <div className="talkie-field-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={isUpdatingProfile}
            className="talkie-submit"
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Update profile"
            )}
          </button>
        </div>

        <div className="talkie-info-card talkie-section talkie-section--4">
          <div className="talkie-info-title">Account information</div>

          <div className="talkie-info-row">
            <span>Member since</span>
            <span>{authUser?.createdAt ? authUser.createdAt.split("T")[0] : "N/A"}</span>
          </div>

          <div className="talkie-info-row">
            <span>Account status</span>
            <span className="talkie-info-status">
              <span className="talkie-dot" /> Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
