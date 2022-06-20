import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import { defaultAuction, Props, useAuctions, auctionAllZeros, Auction } from "components/auction_utils"

export default function CreateBid(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [bidAmount,setBidAmount]=useState<string>('0x0');
  const [minBid,setMinBid]=useState<number>(0);

  const { checkApproval,
    doApproval,
    tokenId, setTokenId,
    zoraAddresses,
    provider,
    nftContract,
    auctionModuleContract,
    needsApproval, setNeedsApproval,
    moduleManagerApproved, setModuleManagerApproved,
    erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper,
  } = useAuctions(props);


  useEffect( () => {
    if(!currentAccount) return
    getMinimumBid(window, currentAccount)
    checkApproval(window, currentAccount)
  }, [currentAccount])

  async function getMinimumBid(window: any, currentAccount: string) {
    if(!auctionModuleContract) return
    if (tokenId == "") {
      setMinBid(0);
      return;
    }
    let auction = defaultAuction()
    try {
      auction = await auctionModuleContract.auctionForNFT(addressContract, tokenId) as Auction;
    } catch (err) {
      console.log("auctionForNFT error", err)
      return
    }
    if (auctionAllZeros(auction)) {
      setMinBid(0);
      return;
    }
    const highestBid = auction.highestBid;
    const minBid = highestBid.add(highestBid.mul(ethers.BigNumber.from(10)).div(ethers.BigNumber.from(100)));
    setMinBid(parseFloat(ethers.utils.formatEther(minBid)));
  }

  async function createBid(event:React.FormEvent) {
    if(!auctionModuleContract) return
    event.preventDefault()

    const tx = await auctionModuleContract.createBid(
      addressContract,
      tokenId,
      {value: bidAmount},
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
  const handleBidAmountChange = (bidAmount:string) => {
    if (bidAmount !== "") {
      try {
        bidAmount = ethers.utils.parseEther(bidAmount).toHexString();
      } catch {
        bidAmount = "0x0"
      }
    }
    setBidAmount(bidAmount);
  }
  let twoApprovals = erc721NeedsApproveTransferHelper && !moduleManagerApproved
  console.log("erc721NeedsApproveTransferHelper", erc721NeedsApproveTransferHelper);
  console.log("moduleManagerApproved", moduleManagerApproved);
  // TODO: still listener isn't changing needsApproval and UI button
  return (
    <form onSubmit={needsApproval? doApproval : createBid}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required={!needsApproval} onChange={(e) => handleChange(e.target.value)}/>
    <FormLabel htmlFor='bidAMount'>Bid Amount: </FormLabel>
    <NumberInput defaultValue={bidAmount} min={minBid} onChange={handleBidAmountChange}>
      <NumberInputField />
    </NumberInput>
    <Button type="submit" isDisabled={!currentAccount}>{needsApproval ? "Approve Zora Modules" : "Create Bid"} {
      twoApprovals ? "(2 approval transactions)" : ""
    }</Button>
    </FormControl>
    </form>
  )
}
