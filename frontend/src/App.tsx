import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from "./components/nav-bar";
import Home from "./pages/home";
import Account from "./pages/account"
import InputApiKey from "./pages/api-keys";
import About from "./pages/about";
import Inventory from "./pages/inventory";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <div className={"app"}>
          <Routes>
            <Route
              path={"/"}
              element={<Home />}
            />
            <Route
              path={"account"}
              element={<Account />}
            />
            <Route
              path={"inventory"}
              element={<Inventory />}
            />
            <Route
              path={"api-keys"}
              element={<InputApiKey />}
            />
            <Route
              path={"about"}
              element={<About />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );


}

export default App;