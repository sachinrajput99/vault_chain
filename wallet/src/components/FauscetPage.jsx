/* eslint-disable-next-line*/
import React from "react";
import { useContext } from "react";
import { WalletContext } from "../providers/WalletProvider";
import { useNavigate } from "react-router-dom";
import { Divider, Tooltip } from "antd";
import CopyBTN from "./CopyBTN";

const FauscetPage = () => {
  const { cosmosAddress } = useContext(WalletContext);

  //     const { wallet } =
  //     useContext(WalletContext);
  const navigate = useNavigate();
  return (
    <div className="content flex justify-around items-center  gap-4 mt-2 ">
      <div className=" flex gap-3 flex-col mx-7 ">
        {cosmosAddress && (
          <div>
            {" "}
            <div className="walletName">Wallet</div>
            <Tooltip title={cosmosAddress}>
              <div>
                {cosmosAddress.slice(0, 4)}...${cosmosAddress.slice(-4)}
                <CopyBTN text={cosmosAddress} />
              </div>
            </Tooltip>
            <Divider />
          </div>
        )}
        {!cosmosAddress && (
          <div className="mt-5 mb-2">
            <p className="font font-bold  text-red-700 uppercase border border-red-600  text-sm">
              cosmosAddress not available
            </p>
          </div>
        )}

        <ul className=" flex flex-col  flex-wrap ml-2  gap-4 w-full list-disc  text-left ">
          <li>
            {/* <p className="font  font-bold bg-red-950">{cosmosAddress}</p> */}
            In VaultChain, click on your account name to copy your wallet
            address to the clipboard.
          </li>
          <li>
            Go to the Faucet : Open the CrossFi{" "}
            <a
              className="  text-purple-600 active:text-purple-800 hover:text-purple-500 uppercase"
              href="https://crossfi.faucetme.pro/"
            >
              <span className=" font-bold text-purple-600 active:text-purple-900 hover:text-purple-400 uppercase">
                faucet link.
              </span>
            </a>
          </li>
          <li> Paste your wallet address on the faucet page.</li>
          <li>Paste the copied wallet address into the provided field.</li>
        </ul>

        <p className="  text-white font font-bold mt-10 mx-8 border border-purple-600 border-3 p-5">
          You need to have some native coins in your wallet to make
          transactions.
        </p>
      </div>

      <button
        className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
        onClick={() => navigate("/your-wallet")}
      >
        Go To Wallet
      </button>
    </div>
  );
};

export default FauscetPage;
