import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { useAsks, Props, Ask, askAllZeros } from "components/ask_utils"

export default function UpdateAsk(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [askPrice, setAskPrice]=useState<string>("0x0");

  const { checkApprovals,
    doApprovals,
    tokenId, setTokenId,
    zoraAddresses,
    provider,
    nftContract,
    askModuleContract,
    needsApproval, setNeedsApproval,
    erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper,
  } = useAsks(props);

  useEffect( () => {
    if(!currentAccount) return
  }, [currentAccount])

  async function getAskPrice(askModuleContract: ethers.Contract): Promise<string> {
    if (!askModuleContract) return "";
    const ask = await askModuleContract.askForNFT(addressContract, tokenId) as Ask;
    if (askAllZeros(ask)) {
      return "";
    }
    return ask.askPrice.toHexString();
  }

  async function updateAsk(event:React.FormEvent) {
    if(!currentAccount) return
    if(!provider) return
    if(!askModuleContract) return

    event.preventDefault()

    const finder = ethers.constants.AddressZero;
    const currency = ethers.constants.AddressZero;
    // TODO: refactor shared code (e.g. reading asks)
    const formerAskPrice = await getAskPrice(askModuleContract);
    if (askPrice === formerAskPrice) {
      console.log("asks equal");
      return;
    }
    console.log("new ask price:", askPrice);
    const tx = await askModuleContract.setAskPrice(
      addressContract,
      tokenId,
      askPrice,
      currency, // eth sale
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

  const handleAskPriceChange = (askPrice:string) => {
    if (askPrice !== "") {
      try {
        askPrice = ethers.utils.parseEther(askPrice).toHexString();
      } catch {
        askPrice = ""
      }
    }
    setAskPrice(askPrice);
  }


  return (
    <form onSubmit={updateAsk}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <FormLabel htmlFor='askPrice'>Ask Price: </FormLabel>
    <NumberInput defaultValue={askPrice} min={0.00000001} onChange={handleAskPriceChange}>
      <NumberInputField />
    </NumberInput>
    <Button type="submit" isDisabled={!currentAccount}>{"Update Ask"}</Button>
    </FormControl>
    </form>
  )
}
