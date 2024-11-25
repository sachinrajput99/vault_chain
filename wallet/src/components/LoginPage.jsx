/* eslint-disable-next-line*/
import React from "react";
import { Button, Input, Tooltip } from "antd";
import { ethers } from "ethers";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../providers/WalletProvider";
import { decryptData, getDataFromToken } from "../utils";
import { TOKEN_KEY } from "../constants";

const { Password } = Input;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setWallet, setSeedPhrase } = useContext(WalletContext);
  const [passwordInput, setPasswordInput] = useState("");
  const [notValid, setNotValid] = useState(false);
  const disableBtn = useMemo(() => passwordInput.length < 8, [passwordInput]);

  const handleLogin = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const decryptedToken = decryptData(token);
    const { password, seedPhrase } = getDataFromToken(decryptedToken);
    if (password !== passwordInput) {
      setNotValid(true);
      return;
    }
    setNotValid(false);
    const recoverWallet = ethers.Wallet.fromPhrase(seedPhrase);
    setWallet(recoverWallet.address);
    setSeedPhrase(seedPhrase);
    navigate("/your-wallet");
  };
  return (
    <div className="content">
      <h1>Login Page</h1>
      <Password
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Type your password here..."
        className="password"
      />

      {notValid && <p style={{ color: "red" }}>Invalid password</p>}
      <Button
        disabled={disableBtn}
        className="frontPageButton"
        type="default"
        onClick={handleLogin}
      >
        Unlock
      </Button>

      <p
        className="frontPageBottom noHover"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <Tooltip
          title="Recover your wallet with the seed phrase and type a new password"
          onClick={() => navigate("/recover")}
        >
          <span className="link hover:text-gray-600">Forgot Password</span>
        </Tooltip>
        <Tooltip
          title="Use another wallet"
          onClick={() => {
            localStorage.removeItem(TOKEN_KEY);
            navigate("/");
          }}
        >
          <span className="link hover:text-gray-600">Import a different wallet</span>
        </Tooltip>
      </p>
    </div>
  );
};

export default LoginPage;
