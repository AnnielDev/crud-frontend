import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthProvider } from "@/context/AuthContext";
import SideBar from "@/layout/SideBar";

// PAGES
import Users from "@/pages/Users";
import Auth from "@/pages/Auth";
function App() {
  const { session } = useAuthProvider();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Auth />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={!!session} />}>
            <Route
              path="/users"
              element={
                <div className="flex flex-row gap-8 h-[100vh] bg-[#f8f8f8]">
                  <SideBar />
                  <Users />
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
