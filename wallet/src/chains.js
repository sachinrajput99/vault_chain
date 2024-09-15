const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/2WgmYnBXqWCkpDaHOXaSZnyTRuCbzodv',
    ticker: "ETH"
};

const CrossFiTestnet = {
    hex: '4157',
    name: 'CrossFi Testnet',
    rpcUrl: "https://rpc.testnet.ms",
    ticker: "XFI"
}

const SepoliaTestnet = {
    hex: '0xaa36a7',
    name: 'Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/YO1bIajMUYQNoOMjxOMgfuqSbobq52Tf',
    ticker: "SepoliaETH"
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0xaa36a7": SepoliaTestnet,
    "4157": CrossFiTestnet
};