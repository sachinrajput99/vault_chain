import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Divider, Tooltip, List, Avatar, Spin, Tabs, Input, BackTop } from "antd";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../assets/noImg.png";
import { WalletContext } from "../providers/WalletProvider";
import { getAccountDetails } from "../utils";
import { CHAINS_CONFIG } from "../chains";



function WalletView() {
  const { wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain } = useContext(WalletContext);

  const navigate = useNavigate();
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const handleLogOut = useCallback(() => {
    setSeedPhrase(null);
    setWallet(null);
    setNfts(null);
    setBalance(null);
    setTokens(null);
    navigate("/")
  }, [navigate, setSeedPhrase, setWallet]);

  const [sendToAddress, setSendToAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [processing, setProcessing] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const sendTransaction = useCallback(async() => {
      const chain = CHAINS_CONFIG[selectedChain]
      const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
      const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;
      const wallet= new ethers.Wallet(privateKey, provider);
      const tx = {
          to: sendToAddress,
          value: ethers.parseEther(amountToSend)
      }

      setProcessing(true);

      try {
          const transaction = await wallet.sendTransaction(tx);
          setTxHash(transaction.hash);
           await transaction.wait();
          
      } catch (error) {
        setAmountToSend('')
        setSendToAddress('')
        console.log(error);
      }finally {
        setProcessing(false);
        setTxHash(null);
      }
  }, [selectedChain, seedPhrase, sendToAddress, amountToSend]);

  const items = [
    {
      key: '3',
      label: 'Tokens',
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo || logo} />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <>
              <span>You seem to not have any tokens yet</span>
              <p className="frontPageBottom">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      )
    },
    {
      key: '2',
      label: 'NFTs',
      children: (
        <>
          {nfts ? (
            <>
              {nfts.map((e, i) => {
                return (
                  <>
                    {e && (
                      <img
                        key={i}
                        className="nftImage"
                        alt="nftImage"
                        src={e}
                      />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <span>You seem to not have any NFTs yet</span>
              <p className="frontPageBottom">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      )
    },
    {
      key: '1',
      label: 'Transfer',
      children: (
        <>
          <h3>Native Balance</h3>
          <h1>{balance?.toFixed(2)}... {CHAINS_CONFIG[selectedChain].ticker}</h1>
          <div className="sendRow">
            <p style={{ width: '90px', textAlign: 'left' }}>To:</p>
            <Input value={sendToAddress} onChange={(e) => setSendToAddress(e.target.value)} placeholder="0x..." />
          </div>
          <div className="sendRow">
            <p style={{ width: '90px', textAlign: 'left' }}>Amount:</p>
            <Input value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} placeholder="Native tokens you wish to send..." />
          </div>
          <Button type="primary" style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} onClick={sendTransaction}>
            Send Tokens
          </Button>
          {
            processing && (
              <>
              <Spin />
              {
                txHash && (
                  <Tooltip title={txHash}>
                    <p>Hover for Transaction Hash</p>
                  </Tooltip>
                )
              }
              </>
            )
          }
        </>
      )
    },
  ]
console.log(balance);

  useEffect(() => {
    if (!wallet || !selectedChain) {
      return
    }

    setIsFetching(true)
    getAccountDetails(wallet, selectedChain).then((data) => {
      setTokens(data.tokens);
      setNfts(data.nfts.length > 0 ? data.nfts : null);
      setBalance(data.balance);
    }).finally(() => setIsFetching(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!wallet || isFetching) {
      return
    }

    setIsFetching(true)
    getAccountDetails(wallet, selectedChain).then((data) => {
      setTokens(data.tokens);
      setNfts(data.nfts.length > 0 ? data.nfts : null);
      setBalance(data.balance);
    }).finally(() => setIsFetching(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain, wallet])

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
