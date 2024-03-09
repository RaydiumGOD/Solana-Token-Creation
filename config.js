const {
    Connection,
    Keypair,
} = require('@solana/web3.js')
const bs58 = require('bs58')

const PRIVATE_KEY = "aaaaa";
const endpoint = "aaaaa";
const NFT_STORAGE_TOKEN = 'aaaaa';

// Example of created token: https://solscan.io/token/Bj3EDqheEpjSVSwJxWkxYNpPHX1PWQKm7AtpQj8eCMcQ

const revokeMintBool = true
const revokeFreezeBool  = false


let tokenInfo = {
    amount: 1000000000,
    decimals: 9,
    metadata: '',
    symbol: 'TBS',
    tokenName: 'Teletubbies'
}


let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '',
    "description": `
                            One hundred eaters
                            They won't fit in one SUV (nah)
                            S-O-S, somebody rescue me
                            I got too many gyal, too many-many gyal, I got
                            They can last me the next two weeks (uh, huh)
                            Alright, like send the address through, please
                            `,
    "extensions": {
        "website": "https://kokiez.com/",
        "twitter": "https://twitter.com/kokiez",
        "telegram": "https://t.me/kokiez"
    },
    "tags": [ "SOLANA","MEME", "KOKIEZ"
    ],
    "creator": {
        "name": "KOKIEZ",
        "site": "https://github.com/kokiez"
    }
}




// Ignore these
const connection = new Connection(endpoint); // helius
const myKeyPair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY)));


module.exports = {
    connection,
    myKeyPair,
    NFT_STORAGE_TOKEN,
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
};