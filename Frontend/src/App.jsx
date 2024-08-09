import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import LandingScreen from "./Screens/LandingScreen";
import Navbar from "./Components/Navbar";
import StreamBoard from "./Screens/StreamingScreen";
import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/AuthScreen";

function App() {

  return (
    <>
      <Router>
        <div className="flex justify-center">
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingScreen />} />
              <Route path="/authentication" element={<AuthScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/stream" element={<StreamBoard />} />
              {/* <Route path="/profile" element={<ProfileBox user={user} />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
