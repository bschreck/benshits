import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json"; // Mainnet addresses, 4.json would be Rinkeby Testnet
import { ZoraModuleManager__factory } from "@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory";

const erc721TransferHelperAddress = rinkebyZoraAddresses.ERC721TransferHelper;
const zoraModuleAddresses = [rinkebyZoraAddresses.AsksV1_1, rinkebyZoraAddresses.OffersV1];


// TODO: multiple approve calls don't happen, have to reload
// have to reload to call create ask too
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

async function getModulesToApprove(moduleManagerContract: Contract, ownerAddr: string): Promise<Array<string>>  {
  const approved = await Promise.all(zoraModuleAddresses.map((moduleAddr: string) => {
    return moduleManagerContract.isModuleApproved(ownerAddr, moduleAddr);
  }));
  const returnModules: string[] = [];
  approved.forEach((val, index) => {
    if (val === false) {
      returnModules.push(zoraModuleAddresses[index]);
    }
  });
  return returnModules;
}

async function checkErc721NeedsApproveTransferHelper(nftContract: Contract, ownerAddr: string, erc721TransferHelperAddress: string): Promise<boolean> {
  return !(await nftContract.isApprovedForAll(ownerAddr, erc721TransferHelperAddress));
}

export default function CreateAsk(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [tokenId,setTokenId]=useState<string>('0x');
  const [askPrice, setAskPrice]=useState<string>("0x0");
  const [findersFeeBps, setFindersFeeBps]=useState<string>("200");
  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper] = useState<boolean>(true);
  const [moduleAddressesToApprove, setModuleAddressesToApprove] = useState<Array<string>>([]);

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    checkApprovals(window, currentAccount)
    // TODO: need listener for transfer helper & module approve events to change
   //  text of submit button on the fly
    //  nft event: ApprovalForAll(_msgSender(), operator, approved);
    //  module manager events:
    //  ModuleApprovalSet(msg.sender, _module, _approved)
  }, [currentAccount])

  async function checkApprovals(window:any, currentAccount: string){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      rinkebyZoraAddresses.ZoraModuleManager, provider
    );

    const moduleAddressesToApprove = await getModulesToApprove(
      moduleManagerContract,
      currentAccount,
    );
    setModuleAddressesToApprove(moduleAddressesToApprove);

    const erc721NeedsApproveTransferHelper = await checkErc721NeedsApproveTransferHelper(
      contract,
      currentAccount,
      erc721TransferHelperAddress,
    );
    console.log("erc721NeedsApproveTransferHelper",erc721NeedsApproveTransferHelper);
    setErc721NeedsApproveTransferHelper(erc721NeedsApproveTransferHelper);


    if (moduleAddressesToApprove.length > 0 || erc721NeedsApproveTransferHelper) {
      console.log("setting needs approval to true")
      setNeedsApproval(true);
    } else {
      console.log("setting needs approval to false")
      setNeedsApproval(false);
    }
  }

  async function doApprovals(event:React.FormEvent) {
    console.log("DO APPROALS");
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    event.preventDefault()

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      rinkebyZoraAddresses.ZoraModuleManager, signer
    );

    console.log("DO APPROALS");
    console.log(moduleManagerContract);
    console.log(moduleAddressesToApprove);
    console.log(erc721TransferHelperAddress);
    console.log("moduleAddressesToApprove?", moduleAddressesToApprove.length > 0);
    console.log("erc721NeedsApproveTransferHelper?", erc721NeedsApproveTransferHelper);
    let tx:TransactionResponse;
    // TODO: have a spinny thing showing that a transaction is in flight. there must be a company that does this
    if (moduleAddressesToApprove.length > 0) {
      console.log("sending 1st tx for modulemanager");
      let tx = await moduleManagerContract.setBatchApprovalForModules(moduleAddressesToApprove, true);
      console.log("waiting for first moduleAddressesToApprove to finish");
      await tx.wait()
      console.log("done with modulemanager");
    }

    if (erc721NeedsApproveTransferHelper) {
      console.log("sending 2nd tx for 721transferhelper");
      tx = await contract.setApprovalForAll(erc721TransferHelperAddress, true);
      console.log("waiting for 721transferhelper to finish");
      await tx.wait()
      console.log("done with transfer helper");
    }
  }

  async function createAsk(event:React.FormEvent) {
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract:Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const askModuleContract = AsksV11__factory.connect(rinkebyZoraAddresses.AsksV1_1, signer);
    event.preventDefault()


    const tx = await askModuleContract.createAsk(
      addressContract,
      tokenId,
      askPrice,
      "0x0000000000000000000000000000000000000000", // 0 address for ETH sale
      currentAccount,
      findersFeeBps
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
  const handleFindersFeeBpsChange = (findersFeeBps:string) => {
    if (findersFeeBps !== "") {
      try {
        findersFeeBps = ethers.BigNumber.from(findersFeeBps).toHexString();
      } catch {
        findersFeeBps = ""
      }
    }
    setFindersFeeBps(findersFeeBps);
  }

  return (
    <form onSubmit={needsApproval ? doApprovals : createAsk}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required={!needsApproval} onChange={(e) => handleChange(e.target.value)}/>
    <FormLabel htmlFor='askPrice'>Ask Price: </FormLabel>
    <NumberInput defaultValue={askPrice} min={0.00000001} onChange={handleAskPriceChange}>
      <NumberInputField />
    </NumberInput>

    <FormLabel htmlFor='findersFeeBps'>Finders Fee (bps): </FormLabel>
    <NumberInput defaultValue={findersFeeBps} min={0} onChange={handleFindersFeeBpsChange}>
      <NumberInputField />
    </NumberInput>
    <Button type="submit" isDisabled={!currentAccount}>{needsApproval ? "Approve Zora Modules" : "Create Ask"} {erc721NeedsApproveTransferHelper ? "(2 approval transactions)" : ""}</Button>
    </FormControl>
    </form>
  )
}
