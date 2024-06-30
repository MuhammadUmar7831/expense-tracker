import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import OverviewCards from "./pages/overview-cards";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
          <Route path="/overview/*" element={<OverviewCards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
