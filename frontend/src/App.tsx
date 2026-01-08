import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Initial } from "./pages/Initial/Initial";
function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route index element={<Initial />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
