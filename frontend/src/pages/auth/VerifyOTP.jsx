import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP(){

const [otp,setOtp] = useState("");

const navigate = useNavigate();

const verifyOTP = async()=>{

const result = await window.confirmationResult.confirm(otp);

const user = result.user;

const token = await user.getIdToken();

localStorage.setItem("token",token);

navigate("/");

};

return(

<div className="flex justify-center items-center h-screen">

<div className="bg-white p-6 shadow rounded">

<h2>Verify OTP</h2>

<input
value={otp}
onChange={(e)=>setOtp(e.target.value)}
placeholder="Enter OTP"
className="border p-2"
/>

<button
onClick={verifyOTP}
className="bg-green-500 text-white p-2"
>
Verify
</button>

</div>

</div>

)

}