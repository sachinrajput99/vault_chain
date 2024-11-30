// eslint-disable-next-line
import React from "react";
// import { Button } from "antd";
import logo from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";
// import { useContext } from "react";
// import { Select } from "antd";
// import logo from "./assets/logo.png";
// import { chains } from "../constants";
// import { WalletContext } from "../providers/WalletProvider";

function Home() {
  const navigate = useNavigate();

  // const { selectedChain, setSelectedChain } = useContext(WalletContext);

  return (
    <>
      {localStorage.getItem(TOKEN_KEY) ? (
        <Navigate to="/login" />
      ) : (
        <div className="content flex flex-col items-center  justify-around bg-black-900 ">
          {/* <button
            className="  text-white mt-4  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
            onClick={() => navigate("/fauscet")}
          >
           Faucet
          </button> */}
          <div
            // className=" flex flex-col items-center  "
            style={{ display: "flex ", gap: 10 }}
          >
            <div className=" flex flex-col items-center  ">
              {/* <h5 className="text-black font-semibold " style={{ fontWeight: "semibold", fontSize: 20 }}>Flex Wallet</h5> */}
              <h5 className="  text-2xl font-bold text-white">
                Welcome to Vault Chain
              </h5>

              {/*  */}
              {/* <Select
              value={selectedChain}
              onChange={(value) => setSelectedChain(value)}
              options={chains}
              className="dropdown"
            /> */}
            </div>
          </div>
          <img
            className="mb-6"
            src={logo}
            alt="logo"
            width={100}
            style={{ objectFit: "contain" }}
          />

          {/* <div className="mt-10 w-full">
            <p className="mb-3 text-lg text-gray-300  font-semibold ">Select your currency</p>
            <div className="flex flex-col  gap-4  flex-wrap  ">
              {chains.map((chain) => (
                <p
                  className="   text-white  py-2 px-2 rounded border whitespace-nowrap  bg-black-500  hover:bg-orange-700   "
                  key={chain.value}
                  onClick={() => setSelectedChain(chain.value)}
                >
                  {chain.label}
                </p>
              ))}
            </div>
          </div> */}

          <div className="">
            <div className=" flex flex-row  gap-4">
              <button
                onClick={() => navigate("/your-wallet")}
                className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
              >
                Create A Wallet
              </button>
              <button
                onClick={() => navigate("/recover")}
                className="   text-white  py-1 px-2 rounded border whitespace-nowrap bg-purple-700  hover:bg-purple-600 "
              >
                {" "}
                Import your Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
