import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
=======
import Login from "./pages/auth/Login"; 
import Register from "./pages/Register";
>>>>>>> 388504fa536cd1cdfa94497b0482c522aac6b685

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;