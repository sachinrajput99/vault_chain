/* eslint-disable react/prop-types */
import { Button, Input, Spin, Tooltip } from "antd"
import { CHAINS_CONFIG } from "../chains"
import { useContext } from "react"
import { WalletContext } from "../providers/WalletProvider"
import useSendTransaction from "../hooks/useSendTransaction"


const TransactionForm = ({ balance, successCallback }) => {
    const { selectedChain } = useContext(WalletContext);
    const { amountToSend, processing, sendToAddress, sendTransaction, setAmountToSend, setSendToAddress, txHash } = useSendTransaction(successCallback);
    return (
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
            <Button type="primary" style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} className="frontPageButton" onClick={sendTransaction}>
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
}

export default TransactionForm