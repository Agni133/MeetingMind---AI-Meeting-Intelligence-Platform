import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/Authcontext';

// Protected Route wrapper
const ProtectedDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/SignIn" replace />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin/*" element={<SignIn />} />
        <Route path="/SignIn/*" element={<SignIn />} />
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/Signup/*" element={<Signup />} />
        <Route path="/dashboard/*" element={<ProtectedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;