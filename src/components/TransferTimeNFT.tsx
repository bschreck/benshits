import React, { useState } from 'react'
import {Button, Input, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function TransferTimeNFT(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [tokenId,setTokenId]=useState<string>('0x')
  const [toAddress, setToAddress]=useState<string>("")

  async function transfer(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const tr:TransactionResponse = await contract["safeTransferFrom(address,address,uint256)"](currentAccount, toAddress,tokenId)
    console.log(`TransactionResponse TX hash: ${tr.hash}`);
    const receipt = await tr.wait();
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
    <form onSubmit={transfer}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
      <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
      <FormLabel htmlFor='toaddress'>To address: </FormLabel>
      <Input id="toaddress" type="text" required  onChange={(e) => setToAddress(e.target.value)} my={3}/>
      <Button type="submit" isDisabled={!currentAccount}>Transfer</Button>
    </FormControl>
    </form>
  )
}
