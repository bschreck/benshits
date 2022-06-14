import React, { useEffect,useState } from 'react'
import { Text} from '@chakra-ui/react'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import {ethers} from 'ethers'

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadTimeNFT(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [totalSupply,setTotalSupply]=useState<string>()
  const [tokenIds, SetTokenIds] =useState<Array<string>|undefined>(undefined)

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    queryOwnedTokens(window)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addressContract, abi.abi, provider)

    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)

    const fromMe = contract.filters.Transfer(currentAccount, null)
    provider.on(fromMe, (from, to, amount, event) => {
        console.log('Transfer|sent', { from, to, amount, event })
        queryOwnedTokens(window)
    })

    // this should show mints
    const toMe = contract.filters.Transfer(null, currentAccount)
    provider.on(toMe, (from, to, amount, event) => {
        console.log('Transfer|received', { from, to, amount, event })
        queryOwnedTokens(window)
    })

    // remove listener when the component is unmounted
    return () => {
        provider.removeAllListeners(toMe)
        provider.removeAllListeners(fromMe)
    }
  },[currentAccount])

  async function queryOwnedTokens(window:any){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addressContract, abi.abi, provider);
    const balanceString = await contract.balanceOf(currentAccount);
    const balance = Number(balanceString);
    const tokenIds = [];
    for (let i = 0; i<balance; i++) {
      const token = await contract.tokenOfOwnerByIndex(currentAccount, i);
      tokenIds.push(token.toHexString());
    }
    SetTokenIds(tokenIds);

    contract.totalSupply().then((result:string)=>{
        setTotalSupply(ethers.utils.formatEther(result))
    }).catch('error', console.error);
  }

  return (
    <div>
      <Text ><b>ERC721 Contract</b>: {addressContract}</Text>
        <Text><b>TimeNFT totalSupply</b>:{totalSupply}</Text>
        <Text my={4}><b>TimeNFTs in current account</b>: {tokenIds? tokenIds.toString() : ""}</Text>
    </div>
  )
}
