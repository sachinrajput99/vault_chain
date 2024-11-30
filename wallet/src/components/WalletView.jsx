// eslint-disable-next-line
import React from "react";
import { useCallback, useContext } from "react";
import { Divider, Tooltip, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HistoryOutlined,
  LogoutOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { WalletContext } from "../providers/WalletProvider";
import useAccountDetails from "../hooks/useAcountDetails";
import TokenItems from "./TokenItems";
import NFTItems from "./NFTItems";
import TransactionForm from "./TransactionForm";
import Transactions from "./Transactions";
import CopyBTN from "./CopyBTN";
import RecoveryTab from "./RecoveryTab";
import { TOKEN_KEY } from "../constants";
import { useState } from "react";

function WalletView() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const { wallet, setWallet, setSeedPhrase, selectedChain } =
    useContext(WalletContext);
  const {
    balance,
    getAccountDetails,
    nfts,
    tokens,
    resetAccountData,
    isFetching,
    transactions,
  } = useAccountDetails();

  const handleLogOut = useCallback(() => {
    resetAccountData();
    setSeedPhrase(null);
    setWallet(null);
    localStorage.removeItem(TOKEN_KEY);
    navigate("/");
  }, [navigate, setSeedPhrase, setWallet, resetAccountData]);

  // const items = [
  //   {
  //     key: "5",
  //     label: "Tokens",
  //     children: <TokenItems tokens={tokens} />,
  //   },
  //   {
  //     key: "4",
  //     label: "NFTs",
  //     children: <NFTItems nfts={nfts} />,
  //   },
  //   {
  //     key: "3",
  //     label: "Transfer",
  //     children: (
  //       <TransactionForm
  //         balance={balance}
  //         successCallback={() => getAccountDetails(wallet, selectedChain)}
  //       />
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: <SyncOutlined />,
  //     children: <RecoveryTab />,
  //   },
  //   {
  //     key: "1",
  //     label: <HistoryOutlined />,
  //     children: <Transactions transactions={transactions} />,
  //   },
  // ];

  const tabs = [
    {
      label: "Transaction",
      content: (
        <TransactionForm
          balance={balance}
          successCallback={() => getAccountDetails(wallet, selectedChain)}
        />
      ),
    },
    { label: "Tokens", content: <TokenItems tokens={tokens} /> },
    { label: "NFTs", content: <NFTItems nfts={nfts} /> },

    {
      label: <SyncOutlined />,
      content: <RecoveryTab />,
    },
    {
      label: <HistoryOutlined />,
      content: <Transactions transactions={transactions} />,
    },
  ];

  return (
    <div className="content mt-8">
      <div className="logoutButton" onClick={handleLogOut}>
        <LogoutOutlined />
      </div>
      <div className="walletName">Wallet</div>
      <Tooltip title={wallet}>
        <div>
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
          <CopyBTN text={wallet} />
        </div>
      </Tooltip>
      <Divider />

      {isFetching ? (
        <Spin />
      ) : (
        // <Tabs defaultActiveKey="3" items={items} className="walletView " />

        <div className="flex flex-col  ">
          <div className="flex flex-row gap-4  ">
            {/* tab content */}
            <div className="mt-4  w-fit">{tabs[selectedTab].content}</div>
          </div>
          {/* <div className="mt-4 wi">{tabs[selectedTab].content}</div> */}
          {/* <div className=" absolute bottom-20 bg-red-600">
            <div className="flex flex-row gap-4">

            {tabs.map((tab, index) => (
              <div key={index}>
                <button
                  key={index}
                  className={`py-2  text-lg font-medium ${
                    selectedTab === index
                    ? "text-purple-500 border-b-2 border-blue-500"
                    : "text-gray-600"
                  }`}
                  onClick={() => setSelectedTab(index)}
                  >
                  {tab.label}
                </button>
              </div>
            ))}
            </div>
          </div> */}
        </div>
      )}
      {/* hello */}
      <div className=" absolute bottom-10 ">
        <div className="flex flex-row gap-4">
          {/* tabs */}
          {tabs.map((tab, index) => (
            <div key={index}>
              <button
                key={index}
                className={`py-2  text-lg font-medium ${
                  selectedTab === index
                    ? "text-purple-500 border-b-2 border-blue-500"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedTab(index)}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WalletView;
