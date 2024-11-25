// eslint-disable-next-line
import React from "react";
/* eslint-disable react/prop-types */
import { Modal, Tooltip } from "antd"
import { useContext, useMemo, useState } from "react"
import { WalletContext } from "../providers/WalletProvider"
import { ethers } from "ethers";
import { CHAINS_CONFIG } from "../chains";

const TransactionItem = ({ transaction }) => {
    const { wallet, selectedChain } = useContext(WalletContext);
    const isSender = useMemo(() => transaction.from_address === wallet.toLowerCase(), [transaction.from_address, wallet])
    const unit = useMemo(() => CHAINS_CONFIG[selectedChain].ticker, [selectedChain])

    const firstMessage = useMemo(()=> isSender? <>To : <small>{transaction.to_address}</small></>:<>From: <small>{transaction.from_address}</small></>, [isSender, transaction.to_address, transaction.from_address])

    const amountMessage = useMemo(()=> `${isSender ? '-' : '+'} ${ethers.formatEther(transaction.value)}`, [isSender, transaction.value])
    // Modal Logic
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };


    return (
        <>
            <div className="transaction-item" onClick={showModal}>
                <h3>
                    {
                        isSender ? "Sent" : "Received"
                    }
                </h3>
                <p>{isSender ? "-" : "+"} {ethers.formatEther(transaction.value).slice(0, 4)}... {unit}</p>
            </div>
            <Modal
                title={<p style={{ display: 'flex', justifyContent: 'space-between' }}>Transaction Hash: <Tooltip title={transaction.hash}>Hover and Copy</Tooltip></p>}
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <p className="transaction-info">Nonce : <small>{transaction.nonce || "N/A"}</small></p>
                <p className="transaction-info">{firstMessage}</p>
                <p className="transaction-info">Amount : <small>{amountMessage}{CHAINS_CONFIG[selectedChain].ticker}</small></p>
                <p className="transaction-info">Time : <small>{(new Date(transaction.block_timestamp).toLocaleString('en-US'))}</small></p>
                <p className="transaction-info">Transaction Fee : <small>{transaction.transaction_fee}{CHAINS_CONFIG[selectedChain].ticker}</small></p>
            </Modal>
        </>
    )
}

export default TransactionItem