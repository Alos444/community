import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import SubmitLocation from "./pages/submitLocation";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/submit-location" element={<SubmitLocation />} />

     
    </Routes>
  );
};

export default App;




