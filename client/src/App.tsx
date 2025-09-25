import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
