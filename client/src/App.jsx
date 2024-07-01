import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Error from "./interface/ErrorToaster";
import Success from "./interface/SuccessToaster";
import Loading from "./interface/Loading";
import PrivateRoute from "./components/PrivateRoute";
import BudgetDetail from "./pages/BudgetDetail";

function App() {
  return (
    <>
      <Error />
      <Success />
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<DashBoard />} />
            <Route path="/BudgetDetail" element={<BudgetDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;