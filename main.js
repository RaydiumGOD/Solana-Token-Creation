const fs = require('fs');
const {createToken} = require('./src/create_token.js')
const { NFTStorage, Blob,File} = require ('nft.storage')

const {
    NFT_STORAGE_TOKEN,
    revokeMintBool,
    revokeFreezeBool,
    tokenInfo,
    metaDataforToken
} = require('./config.js')




async function main() {

    // uploadMetaData
    const metadata_url = await uploadMetaData()
    if (!metadata_url){
        console.log("Metadata failed")
        return;
    }
    tokenInfo.metadata = metadata_url

    // Create token
    console.log("Creating Token...")
    const mintAddress = await createToken(tokenInfo, revokeMintBool, revokeFreezeBool)
    console.log(`Mint Link: https://solscan.io/token/${mintAddress.toString()}`)


}




async function uploadMetaData() {
    const endpoint = 'https://api.nft.storage' 
    const storage = new NFTStorage({ endpoint, token: NFT_STORAGE_TOKEN })

    // Store image
    const data = await fs.promises.readFile('./image.png')
    const cid1 = await storage.storeBlob(new Blob([data]))
    const imageUrl = `https://${cid1}.ipfs.nftstorage.link`
    const status1 = await storage.status(cid1)
    if (status1.pin.status != 'pinned'){
        console.log("Could not upload image, Status: ",status1.pin.status)
        return;
    }
    console.log('Image Upload status: ',status1.pin.status)
    
    console.log("Image url: ",imageUrl)
    metaDataforToken.image = imageUrl


    // store as a json file
    const jsonString = JSON.stringify(metaDataforToken, null, 2);
    const file = new File([jsonString], "metadata.json", {type: "application/json"});

    const cid = await storage.storeBlob(file)
    const status = await storage.status(cid)

    if (status1.pin.status != 'pinned'){
        console.log("Could not upload Metadata, Status: ",status1.pin.status)
        return;
    }

    console.log('MetaData Upload status: ',status.pin.status)
    const metadata_url = `https://${cid}.ipfs.nftstorage.link`
    console.log('Metadata URI: ', metadata_url)

    
    return metadata_url

  }

main()
