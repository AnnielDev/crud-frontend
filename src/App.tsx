import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthProvider } from "@/context/AuthContext";
// PAGES
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
function App() {
  const { session } = useAuthProvider();

  useEffect(() => {
    if (session) {
      <Navigate to={"/"} replace />;
    } else {
      <Navigate to={"/login"} replace />;
    }
  }, [session]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Auth />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={!!session} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
