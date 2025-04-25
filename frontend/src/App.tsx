import "./App.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
//import Dashboard from "./Pages/Dashboard";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
