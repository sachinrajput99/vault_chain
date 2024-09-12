import "./App.css";
import { useContext } from "react";
import { Select } from "antd";
import logo from "./assets/logo.png";
import { chains } from "./constants";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import RecoverAccount from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";
import WalletView from "./components/WalletView";
import { WalletContext } from "./providers/WalletProvider";

function App() {
  const { selectedChain, setSelectedChain, wallet, seedPhrase } = useContext(WalletContext);

  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" className="headerLogo" />
        <Select value={selectedChain} onChange={(value) => setSelectedChain(value)}
          options={chains} className="dropdown" />
      </header>
      {
        wallet && seedPhrase ?
          <Routes>
            <Route path="/your-wallet" element={<WalletView />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recover" element={<RecoverAccount />} />
            <Route path="/your-wallet" element={<CreateAccount />} />
          </Routes>
      }
    </div>
  );
}

export default App;