import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "./components/pages";

const InitApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route />
        <Route path="/Register" element={<Register />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return <InitApp />;
}

export default App;
