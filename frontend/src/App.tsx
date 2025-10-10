// import "./App.css";
import { NavbarDemo } from "./components/Navbar";
import Home from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SingIn";
import { Brain } from "./pages/BrainPage";

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
          <Route path="/brain" element={<Brain />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
