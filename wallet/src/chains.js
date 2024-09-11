const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: '',
    ticker: "ETH"
};

// const MumbaiTestnet = {
//     hex: '0x13881',
//     name: 'Mumbai Testnet',
//     rpcUrl: '',
//     ticker: "MATIC"
// };

// const Polygon = {
//     hex: '0x89',
//     name: 'Polygon',
//     rpcUrl: "https://polygon-bor-rpc.publicnode.com",
//     ticker: "MATIC"
// }

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
    // "0x13881": MumbaiTestnet,
    "0xaa36a7": SepoliaTestnet,
    "4157": CrossFiTestnet
};