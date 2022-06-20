import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import { AsksV11__factory } from "@zoralabs/v3/dist/typechain/factories/AsksV11__factory";
import { ZoraModuleManager__factory } from "@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory";
import { useZora } from "components/address_utils"
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"


export interface Ask {
  seller: string,
  sellerFundsRecipient: string,
  askCurrency: string,
  findersFeeBps: number,
  askPrice: ethers.BigNumber, // bignumber
}

export function defaultAsk(): Ask {
  return {
    seller: ethers.constants.AddressZero,
    sellerFundsRecipient:ethers.constants.AddressZero,
    askCurrency: ethers.constants.AddressZero,
    findersFeeBps: 0,
    askPrice: ethers.constants.Zero,
  }
}

export function askAllZeros(ask: Ask): boolean {
  if (ethers.utils.getAddress(ask.seller) === ethers.constants.AddressZero &&
    ethers.utils.getAddress(ask.sellerFundsRecipient) === ethers.constants.AddressZero &&
    ethers.utils.getAddress(ask.askCurrency) === ethers.constants.AddressZero &&
    ask.findersFeeBps === 0 &&
    ask.askPrice.eq(ethers.constants.Zero)
  ) {
    return true;
  }
  return false;
}

export interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export function useAsks(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const {tokenId, setTokenId, zoraAddresses} = useZora(props);
  const [provider, setProvider]=useState<ethers.providers.Web3Provider | null>(null);
  const [nftContract, setNftContract] = useState<ethers.Contract | null>(null)
  const [askModuleContract, setAskModuleContract] = useState<ethers.Contract | null>(null)
  const [moduleManagerContract, setModuleManagerContract] = useState<ethers.Contract | null>(null)
  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper] = useState<boolean>(true);
  const [moduleAddressesToApprove, setModuleAddressesToApprove] = useState<Array<string>>([]);

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)

    if(!provider) return
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(addressContract, abi.abi, signer)
    setNftContract(contract)

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, provider
    );
    setModuleManagerContract(moduleManagerContract)

    const askModuleContract = AsksV11__factory.connect(zoraAddresses.AsksV1_1, signer);
    setAskModuleContract(askModuleContract)

  }, [currentAccount])

  async function checkApprovals(window:any, currentAccount: string | undefined){
    if(!provider) return
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(addressContract, abi.abi, signer)

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, provider
    );

  const zoraModuleAddresses = [zoraAddresses.AsksV1_1, zoraAddresses.OffersV1];
    const moduleAddressesToApprove = await getModulesToApprove(
      moduleManagerContract,
      zoraModuleAddresses,
      currentAccount,
    );
    setModuleAddressesToApprove(moduleAddressesToApprove);

    const erc721NeedsApproveTransferHelper = await checkErc721NeedsApproveTransferHelper(
      contract,
      currentAccount,
      zoraAddresses.ERC721TransferHelper
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
    if(!provider) return
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(addressContract, abi.abi, signer)

    event.preventDefault()

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, signer
    );

    console.log("DO APPROALS");
    console.log(moduleManagerContract);
    console.log(moduleAddressesToApprove);
    console.log(zoraAddresses.ERC721TransferHelper);
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
      tx = await contract.setApprovalForAll(zoraAddresses.ERC721TransferHelper, true);
      console.log("waiting for 721transferhelper to finish");
      await tx.wait()
      console.log("done with transfer helper");
    }
  }

  async function getModulesToApprove(moduleManagerContract: ethers.Contract, zoraModuleAddresses: any, ownerAddr: string | undefined): Promise<Array<string>>  {
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

  async function checkErc721NeedsApproveTransferHelper(nftContract: ethers.Contract, ownerAddr: string | undefined, erc721TransferHelperAddress: string): Promise<boolean> {
    return !(await nftContract.isApprovedForAll(ownerAddr, erc721TransferHelperAddress));
  }

  return {
    checkApprovals,
    doApprovals,
    tokenId, setTokenId,
    zoraAddresses,
    provider,
    nftContract,
    askModuleContract,
    needsApproval, setNeedsApproval,
    erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper,
  }
};
