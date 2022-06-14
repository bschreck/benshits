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
import { Ask, askAllZeros } from "components/ask_utils"

import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { ZoraModuleManager__factory } from "@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory";

const erc721TransferHelperAddress = rinkebyZoraAddresses.ERC721TransferHelper;
const zoraModuleAddresses = [rinkebyZoraAddresses.AsksV1_1, rinkebyZoraAddresses.OffersV1];


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

export default function ReadAsks(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [tokenId,setTokenId]=useState<string>('0x');
  const [askPrice, setAskPrice]=useState<string>("0x0");
  const [findersFeeBps, setFindersFeeBps]=useState<string>("200");
  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper] = useState<boolean>(true);
  const [moduleAddressesToApprove, setModuleAddressesToApprove] = useState<Array<string>>([]);
  const [asks, setAsks] = useState<Array<Ask>>([]);

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    getAsks(window, currentAccount)

    console.log(`listening for Asks...`)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(addressContract, abi.abi, provider)
    // TODO probably dont need signer here, can use provider
    const askModuleContract = AsksV11__factory.connect(rinkebyZoraAddresses.AsksV1_1, signer);

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
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const askModuleContract = AsksV11__factory.connect(rinkebyZoraAddresses.AsksV1_1, signer);

    const balanceString = await contract.balanceOf(currentAccount);
    const balance = Number(balanceString);

    const tokenIds = [];
    const asks: Array<Ask> = [];
    for (let i = 0; i<balance; i++) {
      const token = await contract.tokenOfOwnerByIndex(currentAccount, i);
      tokenIds.push(token.toHexString());
      const ask = await askModuleContract.askForNFT(addressContract, token.toHexString()) as Ask;
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
