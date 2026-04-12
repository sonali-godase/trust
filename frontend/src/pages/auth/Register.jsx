import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Register() {
  const [mobile, setMobile] = useState("");

  const sendOTP = async () => {
    try {

      if (mobile.length !== 10) {
        alert("Enter valid mobile number");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + mobile,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      alert("OTP Sent Successfully");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow p-6 rounded w-96">

        <h2 className="text-xl mb-4">Register</h2>

        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={sendOTP}
          className="bg-blue-500 text-white p-2 w-full"
        >
          Send OTP
        </button>

        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}