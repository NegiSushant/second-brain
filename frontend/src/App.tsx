// import "./App.css";
import { NavbarDemo } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SingIn";
import { Brain } from "./pages/BrainPage";
import { Tweet } from "./pages/brain/Tweet";
import { YouTube } from "./pages/brain/Youtube";
import { Documents } from "./pages/brain/Documents";
import { Links } from "./pages/brain/Links";
import { Code } from "./pages/brain/Code";
import { Notion } from "./pages/brain/NotionDocs";
import { Dashboard } from "./pages/brain/Dashboard";
import { ChatWithBrain } from "./pages/brain/ChatWithBrain";

function App() {
  return (
    <>
      {/* <NavbarDemo/> */}
      <BrowserRouter>
        {/* <NavbarDemo /> */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route element={<MyBrainLayout />}>
            <Route path="/brain" element={<Brain />}>
              <Route index element={<Dashboard />} />
              <Route path="tweet" element={<Tweet />} />
              <Route path="youtube" element={<YouTube />} />
              <Route path="docs" element={<Documents />} />
              <Route path="links" element={<Links />} />
              <Route path="code" element={<Code />} />
              <Route path="notion" element={<Notion />} />
              <Route path="chat" element={<ChatWithBrain />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function MainLayout() {
  return (
    <>
      <NavbarDemo />
      <Outlet />
    </>
  );
}

function MyBrainLayout() {
  return <Outlet />;
}
export default App;
