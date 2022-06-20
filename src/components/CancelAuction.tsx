import React, { useEffect, useState } from 'react'
import {Button, Input,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import { Props, useAuctions } from "components/auction_utils"

export default function CancelAuction(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;

  const { checkApproval,
    doApproval,
    tokenId, setTokenId,
    zoraAddresses,
    provider,
    nftContract,
    auctionModuleContract,
    needsApproval, setNeedsApproval,
  } = useAuctions(props);

  useEffect( () => {
    if(!currentAccount) return
    //TODO:
    //
    //checkAuctionExists();
  }, [currentAccount])


  async function cancelAuction(event:React.FormEvent) {
    if(!provider) return
    if(!nftContract) return
    if(!auctionModuleContract) return
    event.preventDefault()

    const tx = await auctionModuleContract.cancelAuction(
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
    <form onSubmit={cancelAuction}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <Button type="submit" isDisabled={!currentAccount}>{"Cancel Auction"}</Button>
    </FormControl>
    </form>
  )
}
