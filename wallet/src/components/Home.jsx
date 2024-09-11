import { Button } from "antd";
import mWallet from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <div style={{ display: "flex", gap: 10 }}>
        <img src={mWallet} alt="logo"  width={50} style={{ objectFit:'contain' }} />
        <h5 style={{ fontWeight: "bold" , fontSize: 20}}>Web3 Wallet</h5>
      </div>
      <h2>Hey There</h2>
      <h3>Welcome to your Web3 wallet</h3>
      <Button type="primary"
        onClick={() => navigate("/your-wallet")} className="frontPageButton">
        Create A Wallet
      </Button>
      <Button className="frontPageButton" type="default" onClick={() => navigate("/recover")}>
        Sign In With Seed Phrase
      </Button>
      <p className="frontPageBottom">
        Find Alt Coin Gems!{" "}
        <a href="https://moralismoney.com" target="_blank" rel="noreferrer">
          money.moralis.io
        </a>
      </p>
    </div>
  );
}

export default Home;
