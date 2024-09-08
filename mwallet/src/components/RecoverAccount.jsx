import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";

const { TextArea } = Input;

function RecoverAccount() {
  const { setSeedPhrase, setWallet } = useContext(WalletContext);
  
  const [seedPhraseInput, setSeedPhraseInput] = useState('');
  const [notValid, setNotValid] = useState(false);
  const navigate = useNavigate();
  const disableBtn = useMemo(() => seedPhraseInput.split(" ").length !== 12 || seedPhraseInput.at(-1) === " ", [seedPhraseInput]);

  const handleInput = useCallback((e) => {
    setSeedPhraseInput(e.target.value);
  }, [setSeedPhraseInput]);

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
    navigate("/your-wallet");
  }, [seedPhraseInput, setWallet, setSeedPhrase, navigate]);


  return (
    <div className="content">
      <div className="mnemonic">
        <BulbOutlined style={{ fontSize: "20px" }} />
        <div>
          Type your seed phrase in the field below to recover your wallet. (it should include 12 words separated by spaces)
        </div>
      </div>

      <TextArea rows={4} value={seedPhraseInput} onChange={handleInput} placeholder="Type your seed phrase here..." className="seedPhraseContainer" />

      <Button disabled={disableBtn} className="frontPageButton" type="primary" onClick={handleRecoverWallet}>
        Recover Wallet
      </Button>
      {notValid && <p style={{ color: "red" }}>Invalid seed phrase</p>}
      <p className="frontPageBottom" onClick={() => navigate("/")}>
        <span>Back To Home</span>
      </p>
    </div>
  );
}

export default RecoverAccount;
