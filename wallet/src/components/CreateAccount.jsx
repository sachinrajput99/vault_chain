import { Button, Card, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";
import { encryptData } from "../utils";

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

    const token = `${newSeedPhrase}-P${newPassword}`;
    const enc = encryptData(token);
    localStorage.setItem('token', enc);
  }, [newSeedPhrase, setSeedPhrase, setWallet, newPassword]);

  return (
    <div className="content">
      <div className="mnemonic">
        <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
        <div>
          Once you generate the seed phrase, save it securely in order to recorver your wallet in the future.
        </div>
      </div>
      <Button className="frontPageButton" type="primary" onClick={generateWallet}>
        Generate Seed Phrase
      </Button>
      <Card className="seedPhraseContainer">
        {
          newSeedPhrase && <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}
          </pre>
        }
      </Card>
      <Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="password" placeholder="Password. Minimum 8 characters." />
      <Button disabled={disableBtn} className="frontPageButton" type="default" onClick={setWalletAndMnemonic}>
        Open your wallet
      </Button>
      <p className="frontPageBottom" onClick={() => navigate("/")}>
        Back Home
      </p>
    </div>
  );
}

export default CreateAccount;
