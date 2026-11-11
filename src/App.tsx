import { Toaster } from "sonner";
import Header from "./components/Header";
import "./css/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Main } from "./components/Main";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Toaster richColors position="top-center" />
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/Recetas" replace />} />
          <Route path="/Recetas" element={<Main />} />
          <Route path="/Ingredientes" element={<Main />} />
          <Route path="*" element={<Navigate to="/Recetas" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
