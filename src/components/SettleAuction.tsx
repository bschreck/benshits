import React, { useEffect, useState } from 'react'
import {Button, Input,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { ReserveAuctionCoreEth__factory } from "@zoralabs/v3/dist/typechain/factories/ReserveAuctionCoreEth__factory";
import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet

const auctionAddress = rinkebyZoraAddresses.ReserveAuctionCoreEth

const formatter = new Intl.NumberFormat("en-us", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const formatBalance = (balance: ethers.BigNumber | undefined) =>
  formatter.format(parseFloat(ethers.BigNumber.from(balance).toHexString()));


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function SettleAuction(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [tokenId,setTokenId]=useState<string>('');

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    //TODO:
    //checkAuctionExists();
  }, [currentAccount])


  async function settleAuction(event:React.FormEvent) {
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const auctionContract = ReserveAuctionCoreEth__factory.connect(auctionAddress, signer);
    event.preventDefault()

    const tx = await auctionContract.settleAuction(
      addressContract,
      tokenId,
    );

    console.log(`TransactionResponse TX hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("transfer receipt",receipt);
  }

  const handleChange = (tokenId:string) => {
    if (tokenId !== "") {
      try {
        tokenId = ethers.BigNumber.from(tokenId).toHexString();
      } catch {
        tokenId = ""
      }
    }
    setTokenId(tokenId);
  }

  return (
    <form onSubmit={settleAuction}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <Button type="submit" isDisabled={!currentAccount}>{"Settle Auction"}</Button>
    </FormControl>
    </form>
  )
}
