import { useCallback, useContext } from "react";
import {  Divider, Tooltip, Spin, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { WalletContext } from "../providers/WalletProvider";
import useAccountDetails from "../hooks/useAcountDetails";
import TokenItems from "./TokenItems";
import NFTItems from "./NFTItems";
import TransactionForm from "./TransactionForm";
import Transactions from "./Transactions";



function WalletView() {
  const navigate = useNavigate();

  const { wallet, setWallet, setSeedPhrase, selectedChain } = useContext(WalletContext);
  const { balance, getAccountDetails, nfts, tokens, resetAccountData, isFetching,transactions } = useAccountDetails();

  const handleLogOut = useCallback(() => {
    resetAccountData();
    setSeedPhrase(null);
    setWallet(null);
    navigate("/")
  }, [navigate, setSeedPhrase, setWallet, resetAccountData]);

  const items = [
    {
      key: '4',
      label: 'Tokens',
      children: (
        <TokenItems tokens={tokens} />
      )
    },
    {
      key: '3',
      label: 'Tx History',
      children: (
        <Transactions transactions={transactions} />
      )
    },
    {
      key: '2',
      label: 'NFTs',
      children: (
        <NFTItems nfts={nfts} />
      )
    },
    {
      key: '1',
      label: 'Transfer',
      children: (
        <TransactionForm balance={balance} successCallback={() => getAccountDetails(wallet, selectedChain)} />
      )
    },
  ]

  return (
    <div className="content">
      <div className="logoutButton" onClick={handleLogOut}>
        <LogoutOutlined />
      </div>
      <div className="walletName">Wallet</div>
      <Tooltip title={wallet}>
        <div>
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
        </div>
      </Tooltip>
      <Divider />
      {
        isFetching ? <Spin /> : (
          <Tabs defaultActiveKey="1" items={items} className="walletView" />
        )
      }
    </div>
  );
}

export default WalletView;
