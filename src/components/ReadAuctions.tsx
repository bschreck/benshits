import React, { useEffect, useState } from 'react'
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {ethers} from 'ethers'
import { defaultAuction, Props, useAuctions, Auction, auctionAllZeros } from "components/auction_utils"

export default function ReadAuctions(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [bidAmount, setBidAmount]=useState<string>("0x0");
  const [auctions, setAuctions] = useState<Array<Auction>>([]);
  const [auctionTokenIds, setAuctionTokenIds] = useState<Array<string>>([]);

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
    console.log("1");
    if(!provider) return
    console.log("2");
    if(!nftContract) return
    console.log("3");
    if(!nftContract) return
    console.log("4");
    if(!nftContract) return
    if(!auctionModuleContract) return
    console.log("5");
    if(!nftContract) return
    getAuctions(window, currentAccount)

    console.log(`listening for Auctions...`)

    // UI isn't updating from these
    const auctionCreated = auctionModuleContract.filters.AuctionCreated(
      addressContract,
      null, // any token id
      null, // any Auction
    );
    provider.on(auctionCreated, (from, to, amount, event) => {
      getAuctions(window, currentAccount)
    })

    const reservePriceUpdated = auctionModuleContract.filters.AuctionReservePriceUpdated(
      addressContract,
      null, // any token id
      null, // any Auction
    );
    provider.on(reservePriceUpdated, (from, to, amount, event) => {
      getAuctions(window, currentAccount)
    })

    const auctionCanceled = auctionModuleContract.filters.AuctionCanceled(
      addressContract,
      null, // any token id
      null, // any Auction
    );
    provider.on(auctionCanceled, (from, to, amount, event) => {
      getAuctions(window, currentAccount)
    })

    const auctionBid = auctionModuleContract.filters.AuctionBid(
      addressContract,
      null, // any token id
      null,  // any fist bid
      null,  // any extended
      null, // any Auction
    );
    provider.on(auctionBid, (from, to, amount, event) => {
      getAuctions(window, currentAccount)
    })

    const auctionEnded = auctionModuleContract.filters.AuctionEnded(
      addressContract,
      null, // any token id
      null, // any Auction
    );
    provider.on(auctionEnded, (from, to, amount, event) => {
      getAuctions(window, currentAccount)
    })
    // remove listener when the component is unmounted
    return () => {
        provider.removeAllListeners(auctionCreated)
        provider.removeAllListeners(reservePriceUpdated)
        provider.removeAllListeners(auctionCanceled)
        provider.removeAllListeners(auctionBid)
        provider.removeAllListeners(auctionEnded)
    }
  }, [currentAccount])

  async function getAuctions(window:any, currentAccount: string){
    console.log("get auctions");
    if(!nftContract) return
    console.log("nft cotnract in get auctions")
    if(!auctionModuleContract) return
    console.log("auction cotnract in get auctions")

    const totalSupplyString = await nftContract.totalSupply();
    const totalSupply = Number(totalSupplyString);
    console.log("totalSupply", totalSupply)

    const tokenIds = [];
    const auctionTokenIds = [];
    const auctions: Array<Auction> = [];
    for (let i = 0; i<totalSupply; i++) {
      const token = await nftContract.tokenByIndex(i);
      tokenIds.push(token.toHexString());
      let auction = defaultAuction();
      console.log("checking for auction on token", token)
      try {
        auction = await auctionModuleContract.auctionForNFT(addressContract, token.toHexString()) as Auction;
      } catch (err) {
        console.log(err)
      }
      if (!auctionAllZeros(auction)) {
        console.log("got auction")
        auctions.push(auction);
        auctionTokenIds.push(token.toHexString());
      }
    }

    setAuctions(auctions);
    setAuctionTokenIds(auctionTokenIds);
    console.log(auctionTokenIds);
  }

  return (
    <div>
      <Text ><b>Current Auctions</b>:</Text>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Current Auctions</TableCaption>
          <Thead>
            <Tr>
              <Th>Token Id</Th>
              <Th>Seller</Th>
              <Th>Seller Funds Recipient</Th>
              <Th isNumeric>Reserve Price</Th>
              <Th isNumeric>Highest Bid</Th>
              <Th>Highest Bidder</Th>
              <Th isNumeric>duration</Th>
              <Th isNumeric>startTime</Th>
              <Th isNumeric>firstBidTime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {auctions.map((auction: Auction, index: number) => (
              <Tr key={index}>
                <Td>{auctionTokenIds[index]}</Td>
                <Td>{auction.seller}</Td>
                <Td>{auction.sellerFundsRecipient}</Td>
                <Td isNumeric>{parseFloat(ethers.utils.formatEther(auction.reservePrice))}</Td>
                <Td isNumeric>{parseFloat(ethers.utils.formatEther(auction.highestBid))}</Td>
                <Td>{auction.highestBidder}</Td>
                <Td isNumeric>{auction.duration}</Td>
                <Td isNumeric>{auction.startTime}</Td>
                <Td isNumeric>{auction.firstBidTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
