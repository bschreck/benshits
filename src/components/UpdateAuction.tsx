import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import { Props, useAuctions, Auction, auctionAllZeros } from "components/auction_utils"

export default function UpdateAuction(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [reservePrice, setReservePrice]=useState<string>("0x0");

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
  }, [currentAccount])

  async function getReservePrice(auctionModuleContract: ethers.Contract): Promise<string> {
    const auction = await auctionModuleContract.auctionForNFT(addressContract, tokenId) as Auction;
    if (auctionAllZeros(auction)) {
      return "";
    }
    return auction.reservePrice.toHexString();
  }

  async function updateAuction(event:React.FormEvent) {
    if(!currentAccount) return
    if(!auctionModuleContract) return
    event.preventDefault()

    const finder = ethers.constants.AddressZero;
    const currency = ethers.constants.AddressZero;
    // TODO: refactor shared code (e.g. reading asks)
    const formerReservePrice = await getReservePrice(auctionModuleContract);
    if (reservePrice === formerReservePrice) {
      console.log("reserve prices equal");
      return;
    }
    console.log("new reserve price:", reservePrice);
    const tx = await auctionModuleContract.setAuctionReservePrice(
      addressContract,
      tokenId,
      reservePrice,
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

  const handleReservePriceChange = (reservePrice:string) => {
    if (reservePrice !== "") {
      try {
        reservePrice = ethers.utils.parseEther(reservePrice).toHexString();
      } catch {
        reservePrice = ""
      }
    }
    setReservePrice(reservePrice);
  }


  return (
    <form onSubmit={updateAuction}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleChange(e.target.value)}/>
    <FormLabel htmlFor='reservePrice'>Reserve Price: </FormLabel>
    <NumberInput defaultValue={reservePrice} min={0.00000001} onChange={handleReservePriceChange}>
      <NumberInputField />
    </NumberInput>
    <Button type="submit" isDisabled={!currentAccount}>{"Update Auction"}</Button>
    </FormControl>
    </form>
  )
}
