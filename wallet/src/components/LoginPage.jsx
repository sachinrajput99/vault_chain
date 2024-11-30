/* eslint-disable-next-line*/
import React from "react";
import { Input, Tooltip } from "antd";
import { ethers } from "ethers";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../providers/WalletProvider";
import { decryptData, getDataFromToken } from "../utils";
import { TOKEN_KEY } from "../constants";
import { fromHex, toBech32 } from "@cosmjs/encoding";

const { Password } = Input;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setWallet, setSeedPhrase } = useContext(WalletContext);
  const [passwordInput, setPasswordInput] = useState("");
  const [notValid, setNotValid] = useState(false);
  const disableBtn = useMemo(() => passwordInput.length < 8, [passwordInput]);

  function convertToCosmosAddress(evmPublicKey) {
    // Convert the public key to a Uint8Array

    const pubkeyUint8Array = fromHex(evmPublicKey.slice(2)); // Remove 0x and convert to byte array

    // Encode the public key in Bech32 format with the CrossFi 'mx' prefix

    const cosmosAddress = toBech32("mx", pubkeyUint8Array);
    console.log("Cosmos Address 2: ", cosmosAddress);
    return cosmosAddress;
  }

  const handleLogin = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const decryptedToken = decryptData(token);
    const { password, seedPhrase } = getDataFromToken(decryptedToken);
    if (password !== passwordInput) {
      setNotValid(true);
      return;
    }
    setNotValid(false);

    // console.log(ethers.Wallet.fromPhrase(seedPhrase));

    const recoverWallet = convertToCosmosAddress(
      ethers.Wallet.fromPhrase(seedPhrase).address
    );
    setWallet(recoverWallet);
    setSeedPhrase(seedPhrase);

    // cosmos

    navigate("/your-wallet");
  };
  return (
    <div className="content flex justify-around items-center ">
      <div className="flex justify-center items-center flex-col gap-7">
        <h1 className="font-bold text-3xl ">Login Page</h1>
        <Password
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Type your password here..."
          className="password bg-gray-900"
        />

        {notValid && <p style={{ color: "red" }}>Invalid password</p>}
        <button
          disabled={disableBtn}
          className="   text-white  py-1 px-6 rounded border whitespace-nowrap  bg-purple-800  hover:bg-purple-600  "
          onClick={handleLogin}
        >
          Unlock
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <button className="   text-white  py-1 px-2 rounded border whitespace-nowrap  bg-purple-700  hover:bg-purple-600  ">
          <Tooltip
            title="Recover your wallet with the seed phrase and type a new password"
            onClick={() => navigate("/recover")}
          >
            Forgot Password
          </Tooltip>
        </button>
        <button className="   text-white  py-1 px-2 rounded border whitespace-nowrap  bg-purple-700  hover:bg-purple-600  ">
          <Tooltip
            title="Use another wallet"
            onClick={() => {
              localStorage.removeItem(TOKEN_KEY);
              navigate("/");
            }}
          >
            Import a different wallet
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
