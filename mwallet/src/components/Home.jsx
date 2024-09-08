import { Button } from "antd";
import mWallet from "../assets/mwallet.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <img src={mWallet} alt="logo" className="frontPageLogo" />
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
