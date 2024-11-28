// eslint-disable-next-line
import React from "react";
import { useCallback, useContext, useMemo, useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import {  Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";
import { createToken, encryptData } from "../utils";
import { TOKEN_KEY } from "../constants";

const { TextArea } = Input;

function RecoverAccount() {
  const { setSeedPhrase, setWallet } = useContext(WalletContext);

  const [seedPhraseInput, setSeedPhraseInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [notValid, setNotValid] = useState(false);
  const navigate = useNavigate();
  const disableBtn = useMemo(
    () =>
      seedPhraseInput.split(" ").length !== 12 ||
      seedPhraseInput.at(-1) === " " ||
      passwordInput.length < 8,
    [seedPhraseInput, passwordInput]
  );

  const handleInput = useCallback(
    (e) => {
      setSeedPhraseInput(e.target.value);
    },
    [setSeedPhraseInput]
  );

  const handleRecoverWallet = useCallback(() => {
    let recoverWallet;
    try {
      recoverWallet = ethers.Wallet.fromPhrase(seedPhraseInput);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setNotValid(true);
      return;
    }

    setWallet(recoverWallet.address);
    setSeedPhrase(seedPhraseInput);

    const token = createToken(seedPhraseInput, passwordInput);
    const encryptedToken = encryptData(token);
    localStorage.setItem(TOKEN_KEY, encryptedToken);

    navigate("/your-wallet");
  }, [seedPhraseInput, setWallet, setSeedPhrase, navigate, passwordInput]);

  return (
    <div className="content mb-5">
    

      <TextArea
        rows={7}
        value={seedPhraseInput}
        onChange={handleInput}
        placeholder="Type your seed phrase here..."
        className="seedPhraseContainer  bg-gray-900"
      />
        <div className="mnemonic my-5 ">
        <BulbOutlined style={{ fontSize: "20px" }} />
        <p>
          Enter your 12-word seed phrase in the field below to restore your
          wallet. Make sure the words are separated by spaces.
        </p>
      </div>

      <Input.Password
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        className="password  bg-gray-900"
        placeholder="Password. Minimum 8 characters."
      />
      <button
        disabled={disableBtn}
        className="   text-white mt-4  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
        type="default"
        onClick={handleRecoverWallet}
      >
        Recover Wallet
      </button>
      <div className="absolute bottom-10">
        <div className="flex flex-col gap-6">
          {notValid && <p style={{ color: "red" }}>Invalid seed phrase</p>}
          <p
            className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600  "
            onClick={() => navigate("/")}
          >
            <span>Back To Home</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecoverAccount;
