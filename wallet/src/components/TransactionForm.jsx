/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
// import { CHAINS_CONFIG } from "../chains";
// import { useContext } from "react";
// import { WalletContext } from "../providers/WalletProvider";
import useSendTransaction from "../hooks/useSendTransaction";
import CopyBTN from "./CopyBTN";

const TransactionForm = ({ balance,successCallback }) => {
  // const { selectedChain } = useContext(WalletContext);
  const {
    amountToSend,
    processing,
    sendToAddress,
    sendTransaction,
    setAmountToSend,
    setSendToAddress,
    txHash,
  } = useSendTransaction(successCallback);

  // if(balance){

  // const [{ xfi, mpx }] = balance;
  // const [xfi, mpx] = balance;
  // console.log("balance", balance);
  // console.log(balance);
  // console.log("xfi", xfi);
  // console.log("mpx", mpx);
  // }
  // const balance = [
  //   {
  //     denom: "mpx",
  //     amount: "8457500000000000000",
  //   },
  //   {
  //     denom: "xfi",
  //     amount: "97667456725000000000",
  //   },
  // ];
  const [xfi, mpx] = balance || [];

  return (
    <>
      <h3 className="font-bold text-xl mb-2">Native Balance</h3>
      {balance === null ? (
        <p>
          Go to the{" "}
          <a href="https://test.xficonsole.com/cosmos-wallet" target="_blank">
            console
          </a>
          , sign in with the same phrase and follow the instructions to get your
          tokens
        </p>
      ) : (
        <h1 className="flex flex-col gap-4  justify-center items-center mb-6">
          {/* {balance?.toFixed(2)}... {CHAINS_CONFIG[selectedChain].ticker} */}
          {/* {balance.map((bal, index) => {
            return (
              <div key={index}>
                <div className="flex gap-5">
                  {" "}
                  
                  <h1> {parseFloat(bal.amount).toFixed(2)}</h1>{" "}

                  <h1> {bal.denom}</h1>


                
                </div>
              </div>
            );
          })} */}

          {xfi && (
            <div className="flex gap-5">
              {" "}
              <h1 className=" font-semibold">
                {" "}
                {parseFloat(xfi.amount).toFixed(2)}
              </h1>{" "}
              <h1> {xfi.denom}</h1>
            </div>
          )}
          {mpx && (
            <div className="flex gap-5">
              {" "}
              {/* <h1> {parseFloat(mpx.amount).toFixed(2)}</h1>{" "} */}
              <h1 className=" font-semibold">
                {" "}
                {parseFloat(mpx.amount).toFixed(2)}
              </h1>{" "}
              {/* <h1> {mpx.denom}</h1> */}
              <h1> {mpx.denom}</h1>
            </div>
          )}
        </h1>
      )}
      <div className="sendRow mt-2">
        <p
          className="font-semibold"
          style={{ width: "90px", textAlign: "left" }}
        >
          To:
        </p>
        <Input
          className="  bg-gray-900"
          value={sendToAddress}
          onChange={(e) => setSendToAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div className="sendRow">
        <p
          className="font-semibold"
          style={{ width: "90px", textAlign: "left" }}
        >
          Amount:
        </p>
        <Input
          className="  bg-gray-900"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
          placeholder="Native tokens you wish to send..."
        />
      </div>
      <button
        className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
        disabled={balance === 0 || balance === null}
        style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
        onClick={sendTransaction}
      >
        Send Tokens
      </button>
      {processing && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            columnGap: "9px",
          }}
        >
          <Spin />
          {txHash && <CopyBTN text={txHash} label={"Copy Transaction Hash"} />}
        </div>
      )}
    </>
  );
};

export default TransactionForm;
