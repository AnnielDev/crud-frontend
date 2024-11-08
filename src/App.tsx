import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthProvider } from "@/context/AuthContext";
import SideBar from "@/layout/SideBar";

// PAGES
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
function App() {
  const { session } = useAuthProvider();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Auth />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={!!session} />}>
            <Route
              path="/"
              element={
                <div className="flex flex-row gap-8 h-[100vh]">
                  <SideBar />
                  <Home />
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
