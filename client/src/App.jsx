import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import BudgetDetail from "./pages/BudgetDetail";
// import MyExpenses from './pages/MyExpenses';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/BudgetDetail" element={<BudgetDetail />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
          {/* <Route path="/expenses/:id" element={<MyExpenses />} /> */}
          {/* <Route path="/myexpenses" element={<MyExpenses />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;