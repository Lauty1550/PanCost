import { Toaster } from "sonner";
import Header from "./components/Header";
import "./css/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Display } from "./components/Display";
import LogIn from "./components/LogIn";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Toaster richColors position="top-center" />
        <Header />

        <Routes>
          <Route path="/Log-In" element={<LogIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/Recetas" replace />} />
            <Route path="/Recetas" element={<Display />} />
            <Route path="/Ingredientes" element={<Display />} />
            <Route path="*" element={<Navigate to="/Recetas" replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
