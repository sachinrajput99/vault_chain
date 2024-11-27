// eslint-disable-next-line
import React from "react";
import "./App.css";
import { useContext } from "react";
// import { Select } from "antd";
// import logo from "./assets/logo.png";
// import { chains } from "./constants";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";
import WalletView from "./components/WalletView";
import { WalletContext } from "./providers/WalletProvider";
import LoginPage from "./components/LoginPage";

function App() {
  const { wallet, seedPhrase } =
    useContext(WalletContext);

  return (
    <div className="App flex flex-col items-center justify-center    b bg-opacity-70  rounded bg-red-950 ">
      
      <div>
        {/* <img src={logo}   height={100}  alt="logo" className="headerLogo" /> */}
{/*        
        <Select
          value={selectedChain}
          onChange={(value) => setSelectedChain(value)}
          options={chains}
          className="dropdown"
        /> */}
      </div>
      
      {wallet && seedPhrase ? (
        <Routes>
          <Route path="/your-wallet" element={<WalletView />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recover" element={<RecoverAccount />} />
          <Route path="/your-wallet" element={<CreateAccount />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
