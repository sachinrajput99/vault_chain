import { Button } from "antd";
import mWallet from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <div style={{ display: "flex", gap: 10 }}>
        <img src={mWallet} alt="logo"  width={50} style={{ objectFit:'contain' }} />
        <h5 style={{ fontWeight: "bold" , fontSize: 20}}>Cross Wallet</h5>
      </div>
      <h2>Hey There</h2>
      <h3>Welcome to Cross Wallet</h3>
      <Button type="primary"
        onClick={() => navigate("/your-wallet")} className="frontPageButton">
        Create A Wallet
      </Button>
      <Button className="frontPageButton" type="default" onClick={() => navigate("/recover")}>
        Sign In With Seed Phrase
      </Button>
    </div>
  );
}

export default Home;
