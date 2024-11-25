// eslint-disable-next-line
import React from "react";
import { Button } from "antd";
import logo from "../assets/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {localStorage.getItem(TOKEN_KEY) ? (
        <Navigate to="/login" />
      ) : (
        <div className="content  flex flex-col justify-center items-center ">
          <h3 className="absolute top-14 font-semibold  text-black text-2xl">
            Welcome to Flex Wallet
          </h3>
          {/* <h3 className=" absolute top-24 font-semibold  text-lg underline text-gray-500  ">
            The decentralized web awaits
          </h3> */}
          <div
            className=" flex flex-col items-center "
            style={{ display: "flex ", gap: 10 }}
          >
            <img  
              src={logo}
              alt="logo"
              width={100}
              style={{ objectFit: "contain" }}
            />
            <h5 className="text-black font-semibold " style={{ fontWeight: "semibold", fontSize: 20 }}>Flex Wallet</h5>
          </div>
          <div className=" flex justify-end flex-row  gap-4">
            <Button
              type="default "
              onClick={() => navigate("/your-wallet")}
              className="frontPageButton   text-white  py-2 px-4 rounded "
            >
              Create A Wallet
            </Button>
            <Button
              className="frontPageButton text-white  py-2 px-4 rounded"
              type="default"
              onClick={() => navigate("/recover")}
            >
              Import your Wallet
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
