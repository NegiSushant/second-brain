// import "./App.css";
import { NavbarDemo } from "./components/Navbar";
import Home from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SingIn";

function App() {
  return (
    <>
      {/* <NavbarDemo/> */}
      <BrowserRouter>
        <NavbarDemo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
