// eslint-disable-next-line
import React from "react";
import { useCallback, useContext } from "react";
import { Divider, Tooltip, Spin, Tabs } from "antd";
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

function WalletView() {
  const navigate = useNavigate();

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

  const items = [
    
    {
      key: "5",
      label: "Tokens",
      children: <TokenItems tokens={tokens} />,
    },
    {
      key: "4",
      label: "NFTs",
      children: <NFTItems nfts={nfts} />,
    },
    {
      key: "3",
      label: "Transfer",
      children: (
        <TransactionForm
          balance={balance}
          successCallback={() => getAccountDetails(wallet, selectedChain)}
        />
      ),
    },
    {
      key: "2",
      label: <SyncOutlined />,
      children: <RecoveryTab />,
    },{
      key: "1",
      label: <HistoryOutlined />,
      children: <Transactions transactions={transactions} />,
    },
  ];

  return (
    <div className="content">
      <div className="logoutButton" onClick={handleLogOut}>
        <LogoutOutlined />
      </div>
      <div className="walletName">Wallet</div>
      <Tooltip title={wallet }  >
        <div>
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
          <CopyBTN text={wallet} />
        </div>
      </Tooltip>
      <Divider />



      {isFetching ? (
        <Spin />
      ) : (
        <Tabs defaultActiveKey="3" items={items} className="walletView " />
      )}
    </div>
  );
}

export default WalletView;
