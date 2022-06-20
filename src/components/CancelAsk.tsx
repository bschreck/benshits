import React, { useEffect, useState } from 'react'
import {Button, Input,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { useAsks, Props } from "components/ask_utils"

export default function CancelAsk(props:Props){
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
      checkApprovals(window, currentAccount)
    //TODO:
    //checkAskExists();
  }, [currentAccount])


  async function cancelAsk(event:React.FormEvent) {
    if(!currentAccount) return
    if(!askModuleContract) return

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
