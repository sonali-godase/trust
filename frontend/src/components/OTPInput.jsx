import React from "react";

export default function OTPInput({ value, onChange }) {

return(

<input
type="text"
maxLength="6"
value={value}
onChange={(e)=>onChange(e.target.value)}
className="border p-2 rounded text-center w-full"
/>

)

}