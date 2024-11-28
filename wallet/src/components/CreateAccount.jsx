// eslint-disable-next-line
import React from "react";
import { Card, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { WalletContext } from "../providers/WalletProvider";
import { createToken, encryptData } from "../utils";
import { TOKEN_KEY } from "../constants";
import logo from "../assets/logo.png";

import { fromHex, toBech32 } from "@cosmjs/encoding";

const { Password } = Input;

function CreateAccount() {
  const { setSeedPhrase, setWallet, setCosmosAddress } =
    useContext(WalletContext);
  const [newPassword, setNewPassword] = useState("");
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);

  // new function added

  // eslint-disable-next-line
  function convertToCosmosAddress(evmPublicKey) {
    // Convert the public key to a Uint8Array

    const pubkeyUint8Array = fromHex(evmPublicKey.slice(2)); // Remove 0x and convert to byte array

    // Encode the public key in Bech32 format with the CrossFi 'mx' prefix

    const cosmosAddress = toBech32("mx", pubkeyUint8Array);
    console.log("Cosmos Address 2: ", cosmosAddress);
    return cosmosAddress;
  }

  const disableBtn = useMemo(
    () => !newSeedPhrase || newPassword.length < 8,
    [newPassword, newSeedPhrase]
  );

  const generateWallet = useCallback(() => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
    setShowCard(true);
  }, []);

  const setWalletAndMnemonic = useCallback(() => {
    setSeedPhrase(newSeedPhrase);
    const cosmosWalletAddress = convertToCosmosAddress(
      ethers.Wallet.fromPhrase(newSeedPhrase).address
    );

    console.log(cosmosWalletAddress);

    setCosmosAddress(cosmosWalletAddress);

    // setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
    setWallet(cosmosWalletAddress);

    const token = createToken(newSeedPhrase, newPassword);
    const encryptedToken = encryptData(token);
    localStorage.setItem(TOKEN_KEY, encryptedToken);
    console.log("hello form create a aacount");

    // navigate("/fauscet");
    // <Navigate to="/fauscet" />
    console.log("navigate to home");

    // navigate
  }, [newSeedPhrase, setSeedPhrase, setWallet, newPassword]);

  return (
    <div className="content">
      {!showCard && (
        <div className=" mt-[70%]  flex flex-col justify-center items-center">
          {" "}
          <img
            className="mb-6"
            src={logo}
            alt="logo"
            width={100}
            style={{ objectFit: "contain" }}
          />
          <button
            className="   text-white  w-52   py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600  "
            onClick={generateWallet}
          >
            Generate Seed Phrase
          </button>
        </div>
      )}

      {showCard && (
        <div>
          <div className=" mb-5   flex justify-center items-center">
            <img
              className="mt-2 h-16"
              src={logo}
              alt="logo"
              width={100}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Card className="mx-3 bg-gray-900 ">
            {newSeedPhrase && (
              <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>
            )}
          </Card>
          <button
            className="   text-white mt-4  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
            type="default"
            onClick={generateWallet}
          >
            Generate Seed Phrase
          </button>
          <div className="mnemonic mx-4  mb-5 mt-5">
            <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
            <div>
              Once you generate the seed phrase, save it securely in order to
              recorver your wallet in the future.
            </div>
          </div>
          <Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="password  bg-gray-900  text-white mt-10"
            placeholder="Password. Minimum 8 characters."
          />{" "}
          <button
            disabled={disableBtn}
            className="   text-white mt-2  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
            onClick={setWalletAndMnemonic()}
          >
            Open your wallet
          </button>
        </div>
      )}
      <div className="absolute bottom-6 ">
        <button
          className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600  "
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
