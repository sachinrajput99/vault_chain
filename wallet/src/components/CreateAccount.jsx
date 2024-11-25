// eslint-disable-next-line
import React from "react"; 
import { Button, Card, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";
import { createToken, encryptData } from "../utils";
import { TOKEN_KEY } from "../constants";

const { Password } = Input

function CreateAccount() {
  const { setSeedPhrase, setWallet } = useContext(WalletContext);
  const [newPassword, setNewPassword] = useState('');
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  const disableBtn = useMemo(()=> !newSeedPhrase || newPassword.length < 8, [newPassword, newSeedPhrase]);
  
  const generateWallet = useCallback(() => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }, []);

  const setWalletAndMnemonic = useCallback(() => {
    setSeedPhrase(newSeedPhrase)
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);

    const token = createToken(newSeedPhrase, newPassword);
    const encryptedToken = encryptData(token);
    localStorage.setItem(TOKEN_KEY, encryptedToken);
  }, [newSeedPhrase, setSeedPhrase, setWallet, newPassword]);

  return (
    <div className="content">
      <div className="mnemonic">
        <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
        <div>
          Once you generate the seed phrase, save it securely in order to recorver your wallet in the future.
        </div>
      </div>
      
      <Card className="seedPhraseContainer bg-[#D7BBA8] ">
        {
          newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}
          </pre>
        }
      </Card>
      <Button className="frontPageButton" type="default" onClick={generateWallet}>
        Generate Seed Phrase
      </Button>
      <Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="password bg-[#221d1a]  text-white" placeholder="Password. Minimum 8 characters." />
      <Button disabled={disableBtn} className="frontPageButton" type="primary" onClick={setWalletAndMnemonic}>
        Open your wallet
      </Button>
      <p className=" hover:text-gray-600 mt-2 cursor-pointer" onClick={() => navigate("/")}>
         Home
      </p>
    </div>
  );
}

export default CreateAccount;
