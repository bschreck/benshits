import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { Ask, askAllZeros } from "components/ask_utils"
import { Props, useAsks } from "components/ask_utils"

export default function FillAsk(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;

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
    const ask = await askModuleContract.askForNFT(addressContract, tokenId) as Ask;
    if (askAllZeros(ask)) {
      return "";
    }
    return ask.askPrice.toHexString();
  }

  async function fillAsk(event:React.FormEvent) {
    if(!currentAccount) return
    if(!askModuleContract) return
    event.preventDefault()

    const finder = ethers.constants.AddressZero;
    const currency = ethers.constants.AddressZero;
    // TODO: refactor shared code (e.g. reading asks)
    const askPrice = await getAskPrice(askModuleContract);
    if (askPrice === "") {
      console.log("no ask to fill");
      return;
    }
    console.log("ask price:", askPrice);
    const tx = await askModuleContract.fillAsk(
      addressContract,
      tokenId,
      currency, // eth sale
      askPrice,
      finder,
      {value: askPrice},
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
    <form onSubmit={fillAsk}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <Button type="submit" isDisabled={!currentAccount}>{"Fill Ask"}</Button>
    </FormControl>
    </form>
  )
}
