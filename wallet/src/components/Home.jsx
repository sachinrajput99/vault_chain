// eslint-disable-next-line
import React from "react";
import { Button } from "antd";
import logo from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";
import { useContext } from "react";
import { Select } from "antd";
// import logo from "./assets/logo.png";
import { chains } from "../constants";
import { WalletContext } from "../providers/WalletProvider";

function Home() {
  const navigate = useNavigate();

  const { selectedChain, setSelectedChain } = useContext(WalletContext);

  return (
    <>
      {localStorage.getItem(TOKEN_KEY) ? (
        <Navigate to="/login" />
      ) : (
        <div className="content flex flex-col items-center  mt-16 bg-blue-900 ">
          <div
            className=" flex flex-col items-center mb-16  "
            style={{ display: "flex ", gap: 10 }}
          >
            <img
              className="mb-6"
              src={logo}
              alt="logo"
              width={100}
              style={{ objectFit: "contain" }}
            />
            {/* <h5 className="text-black font-semibold " style={{ fontWeight: "semibold", fontSize: 20 }}>Flex Wallet</h5> */}
            <h5 className="text-black font-semibold   text-2xl">
              Welcome to Flex Wallet
            </h5>

            <Select
              value={selectedChain}
              onChange={(value) => setSelectedChain(value)}
              options={chains}
              className="dropdown"
            />
          </div>
          <div className=" flex justify-end flex-row  gap-4">
            <button
              onClick={() => navigate("/your-wallet")}
              className="frontPageButton   text-white  py-2 px-4 rounded whitespace-nowrap"
            >
              Create A Wallet
            </button>
            <button
              onClick={() => navigate("/recover")}
              className="frontPageButton   text-white  py-2 px-4 rounded whitespace-nowrap "
            >
              {" "}
              Import your Wallet
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
