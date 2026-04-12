import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // ✅ NEW: password toggle
  const [showPassword, setShowPassword] = useState(false);

  // OTP INPUT
  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login Working");
  };

  const verifyOtp = () => {
    const finalOtp = otp.join("");
    alert(`OTP Entered: ${finalOtp}`);
  };

  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">
        <h1>
          The best offer <br />
          <span>for your business</span>
        </h1>

        <p>
          Manage temple operations with secure login, modern UI and powerful system.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <div className="card">

          <h1 className="title">Temple Management</h1>
          <p className="subtitle">Sign in to your account</p>

          {/* GOOGLE LOGIN */}
          <div className="google-wrapper">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("Google Login:", credentialResponse);
              }}
            />
          </div>

          {/* DIVIDER */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD WITH 👁 */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="button" className="primary-btn" onClick={handleLogin}>
            Sign In
          </button>

          {/* MOBILE OTP */}
          <p className="otp-text">Login with Mobile OTP</p>

          <input
            type="tel"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input"
          />

          {!showOtp && (
            <button
              type="button"
              onClick={() => setShowOtp(true)}
              className="otp-btn"
            >
              Send OTP
            </button>
          )}

          {showOtp && (
            <div>
              <div className="otp-box">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    className="otp-input"
                  />
                ))}
              </div>

              <button type="button" className="verify-btn" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          {/* FOOTER */}
          <p className="footer">
            Don't have an account?
            <span> Register</span>
          </p>

        </div>
      </div>
    </div>
  );
}