import { Toaster } from "sonner";
import Header from "./components/Header";
import "./css/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Display } from "./components/Display";
import LogIn from "./components/LogIn";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Toaster richColors position="top-center" />
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/Recetas" replace />} />
          <Route path="/Recetas" element={<Display />} />
          <Route path="/Ingredientes" element={<Display />} />
          <Route path="*" element={<Navigate to="/Recetas" replace />} />
          <Route path="/Log-In" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
