import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin/*" element={<SignIn />} />
        <Route path="/SignIn/*" element={<SignIn />} />
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/Signup/*" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;