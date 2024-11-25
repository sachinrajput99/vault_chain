// eslint-disable-next-line
import React from "react"; 
import { createContext, useState } from 'react'

export const WalletContext = createContext();


// eslint-disable-next-line react/prop-types
const WalletProvider = ({ children }) => {
    const [selectedChain, setSelectedChain] = useState('4157');
    const [wallet, setWallet] = useState(null);
    const [seedPhrase, setSeedPhrase] = useState(null);

    return (
        <WalletContext.Provider value={{ selectedChain, setSelectedChain, wallet, setWallet, seedPhrase, setSeedPhrase }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider