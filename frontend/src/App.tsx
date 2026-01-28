import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { Chat } from "./pages/Chat/Chat";
function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
