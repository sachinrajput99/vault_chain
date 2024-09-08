import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";

function CreateAccount() {
  const { setSeedPhrase, setWallet } = useContext(WalletContext);
  
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  const generateWallet = useCallback(() => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }, []);

  const setWalletAndMnemonic = useCallback(() => {
    setSeedPhrase(newSeedPhrase)
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }, [newSeedPhrase, setSeedPhrase, setWallet]);
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
      <Button className="frontPageButton" type="default" onClick={setWalletAndMnemonic}>
        Open your wallet
      </Button>
      <p className="frontPageBottom" onClick={() => navigate("/")}>
        Back Home
      </p>
    </div>
  );
}

export default CreateAccount;
