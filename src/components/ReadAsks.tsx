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
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"
import { defaultAsk, askAllZeros, Ask, useAsks, Props } from "components/ask_utils"


export default function ReadAsks(props:Props){
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

  const [askPrice, setAskPrice]=useState<string>("0x0");
  const [findersFeeBps, setFindersFeeBps]=useState<string>("200");
  const [asks, setAsks] = useState<Array<Ask>>([]);

  useEffect( () => {
    if(!currentAccount) return
    if(!provider) return
    if(!askModuleContract) return
    getAsks(window, currentAccount)

    console.log(`listening for Asks...`)

    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)

    const askCreated = askModuleContract.filters.AskCreated(
      addressContract,
      null, // any token id
      null, // any Ask
    );
    provider.on(askCreated, (from, to, amount, event) => {
      getAsks(window, currentAccount)
    })

    const askPriceUpdated = askModuleContract.filters.AskPriceUpdated(
      addressContract,
      null, // any token id
      null, // any Ask
    );
    provider.on(askPriceUpdated, (from, to, amount, event) => {
      getAsks(window, currentAccount)
    })

    const askCanceled = askModuleContract.filters.AskCanceled(
      addressContract,
      null, // any token id
      null, // any Ask
    );
    provider.on(askCanceled, (from, to, amount, event) => {
      getAsks(window, currentAccount)
    })

    const askFilled = askModuleContract.filters.AskFilled(
      addressContract,
      null, // any token id
      null,  // any buyer
      null,  // any finder
      null, // any Ask
    );
    provider.on(askFilled, (from, to, amount, event) => {
      getAsks(window, currentAccount)
    })
    // remove listener when the component is unmounted
    return () => {
        provider.removeAllListeners(askCreated)
        provider.removeAllListeners(askPriceUpdated)
        provider.removeAllListeners(askCanceled)
        provider.removeAllListeners(askFilled)
    }
  }, [currentAccount])

  async function getAsks(window:any, currentAccount: string){
    console.log("get asks");
    if(!provider) return
    if(!nftContract) return
    if(!askModuleContract) return
    if(!currentAccount) return

    let balanceString = ""
    try {
      balanceString = await nftContract.balanceOf(currentAccount);
    } catch (err) {
      console.log(err)
      return
    }
    const balance = Number(balanceString);

    const tokenIds = [];
    const asks: Array<Ask> = [];
    for (let i = 0; i<balance; i++) {
      const token = await nftContract.tokenOfOwnerByIndex(currentAccount, i);
      tokenIds.push(token.toHexString());
      let ask = defaultAsk();
      try {
        ask = await askModuleContract.askForNFT(addressContract, token.toHexString()) as Ask;
      } catch (err) {
        console.log(err)
      }
      if (!askAllZeros(ask)) {
        asks.push(ask);
      }
    }

    setAsks(asks);
  }

  return (
    <div>
      <Text ><b>Current Asks</b>:</Text>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Current Asks</TableCaption>
          <Thead>
            <Tr>
              <Th>Seller</Th>
              <Th>Seller Funds Recipient</Th>
              <Th>Ask Currency</Th>
              <Th isNumeric>Finders Fee (bps)</Th>
              {/* TODO: make numeric*/}
              <Th>Ask Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {asks.map((ask: Ask, index: number) => (
              <Tr key={index}>
                <Td>{ask.seller}</Td>
                <Td>{ask.sellerFundsRecipient}</Td>
                <Td>{ask.askCurrency}</Td>
                <Td isNumeric>{ask.findersFeeBps}</Td>
                <Td>{ask.askPrice.toHexString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
