import React, { useEffect, useState } from 'react'
import {Button, Input,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet

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

export default function CancelAsk(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [tokenId,setTokenId]=useState<string>('0x');

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    //TODO:
    //checkAskExists();
  }, [currentAccount])


  async function cancelAsk(event:React.FormEvent) {
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const askModuleContract = AsksV11__factory.connect(rinkebyZoraAddresses.AsksV1_1, signer);
    event.preventDefault()

    const tx = await askModuleContract.cancelAsk(
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
    <form onSubmit={cancelAsk}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <Button type="submit" isDisabled={!currentAccount}>{"Cancel Ask"}</Button>
    </FormControl>
    </form>
  )
}
