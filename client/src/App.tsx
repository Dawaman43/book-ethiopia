import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import HomePage from "./pages/Homepage";
import AuthPage from "./pages/auth/Auth";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
