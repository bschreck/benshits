import React, { useState } from 'react'
import {Button, Input,  FormControl,  FormLabel } from '@chakra-ui/react'
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

export default function MintTimeNFT(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [tokenId,setTokenId]=useState<string>('0x')

  async function mint(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const tr:TransactionResponse = await contract.mint()
    console.log(`TransactionResponse TX hash: ${tr.hash}`);
    const receipt = await tr.wait();
    console.log("transfer receipt",receipt);
  }

  const handleChange = (tokenId:string) => setTokenId(tokenId)

  return (
    <form onSubmit={mint}>
    <FormControl>
      <Button type="submit" isDisabled={!currentAccount}>Mint</Button>
    </FormControl>
    </form>
  )
}
