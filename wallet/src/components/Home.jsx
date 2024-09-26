import { Button } from "antd";
import logo from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {
        localStorage.getItem(TOKEN_KEY) ?
          <Navigate to="/login" /> :
          <div className="content">
            <div style={{ display: "flex", gap: 10 }}>
              <img src={logo} alt="logo" width={40} style={{ objectFit: 'contain' }} />
              <h5 style={{ fontWeight: "bold", fontSize: 20 }}>Cross Wallet</h5>
            </div>
            <h2>Hey There</h2>
            <h3>Welcome to Cross Wallet</h3>
            <Button type="primary"
              onClick={() => navigate("/your-wallet")} className="frontPageButton">
              Create A Wallet
            </Button>
            <Button className="frontPageButton" type="default" onClick={() => navigate("/recover")}>
              Import your Wallet
            </Button>

          </div>
      }
    </>
  );
}

export default Home;
