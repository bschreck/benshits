import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import { useZora } from "components/address_utils"
import abi from 'artifacts/contracts/TimeNFT.sol/TimeNFT.json'
import { ReserveAuctionCoreEth__factory } from "@zoralabs/v3/dist/typechain/factories/ReserveAuctionCoreEth__factory";
import { ZoraModuleManager__factory } from "@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory";
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

export interface Auction {
  seller: string,
  sellerFundsRecipient: string,
  reservePrice: ethers.BigNumber, // bignumber
  highestBid: ethers.BigNumber, // bignumber
  highestBidder: string,
  duration: number,
  startTime: number,
  firstBidTime: number,
}

//export function auctionWithTokenId(auction: Auction, tokenId: string): Auction {
//  return {
//     seller: auction.seller,
//     sellerFundsRecipient: auction.sellerFundsRecipient,
//     reservePrice: auction.reservePrice,
//     highestBid: auction.highestBid,
//     highestBidder: auction.highestBidder,
//     duration: auction.duration,
//     startTime: auction.startTime,
//     firstBidTime: auction.firstBidTime,
//     tokenId: tokenId
//  }
//}

export function defaultAuction(): Auction {
  return {
    seller: ethers.constants.AddressZero,
    sellerFundsRecipient:ethers.constants.AddressZero,
    reservePrice: ethers.constants.Zero,
    highestBid: ethers.constants.Zero,
    highestBidder: ethers.constants.AddressZero,
    duration: 0,
    startTime: 0,
    firstBidTime: 0,
  }
}


export function auctionAllZeros(auction: Auction): boolean {
  if (ethers.utils.getAddress(auction.seller) === ethers.constants.AddressZero &&
    ethers.utils.getAddress(auction.sellerFundsRecipient) === ethers.constants.AddressZero &&
    auction.reservePrice.eq(ethers.constants.Zero) &&
    auction.highestBid.eq(ethers.constants.Zero) &&
    ethers.utils.getAddress(auction.highestBidder) === ethers.constants.AddressZero &&
    auction.duration === 0 &&
    auction.startTime === 0 &&
    auction.firstBidTime === 0
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

export function useAuctions(props: Props) {
  const tokenContractAddress = props.addressContract;
  const currentAccount = props.currentAccount;
  const {tokenId, setTokenId, zoraAddresses} = useZora(props);
  const [provider, setProvider]=useState<ethers.providers.Web3Provider | null>(null);
  const [nftContract, setNftContract] = useState<ethers.Contract | null>(null)
  const [auctionModuleContract, setAuctionModuleContract] = useState<ethers.Contract | null>(null)
  const [moduleManagerContract, setModuleManagerContract] = useState<ethers.Contract | null>(null)
  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper] = useState<boolean>(true);
  const [moduleManagerApproved, setModuleManagerApproved] = useState<boolean>(false);

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)

    if(!provider) return
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(tokenContractAddress, abi.abi, signer)
    setNftContract(contract)
    console.log("set nft contract in auction utils")
    if(!nftContract) return
    console.log("past nft contract return in auction utils")

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, provider
    );
    setModuleManagerContract(moduleManagerContract)

    const auctionModuleContract = ReserveAuctionCoreEth__factory.connect(zoraAddresses.ReserveAuctionCoreEth, signer);
    setAuctionModuleContract(auctionModuleContract)
    console.log("past auction contract return in auction utils: ", auctionModuleContract)

    const moduleApproval = moduleManagerContract.filters.ModuleApprovalSet(
      currentAccount,
      zoraAddresses.ReserveAuctionCoreEth,
      null,
    );
    provider.on(moduleApproval, (from, to, amount, event) => {
      checkApproval(window, currentAccount)
    })

    const nftApproval = nftContract.filters.ApprovalForAll(
      currentAccount,
      zoraAddresses.ReserveAuctionCoreEth,
      null,
    );
    provider.on(moduleApproval, (from, to, amount, event) => {
      checkApproval(window, currentAccount)
    })

  }, [currentAccount])

  async function checkApproval(window:any, currentAccount: string | undefined){
    if(!provider) return
    if(!currentAccount) return
    console.log("checkApproval")
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(tokenContractAddress, abi.abi, signer)

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, provider
    );

    const erc721NeedsApproveTransferHelper = await checkErc721NeedsApproveTransferHelper(
      contract,
      currentAccount,
      zoraAddresses.ERC721TransferHelper
    );
    console.log("erc721NeedsApproveTransferHelper",erc721NeedsApproveTransferHelper);
    setErc721NeedsApproveTransferHelper(erc721NeedsApproveTransferHelper);

    const moduleManagerApproved = await moduleManagerContract.isModuleApproved(currentAccount, zoraAddresses.ReserveAuctionCoreEth);
    console.log("moduleManagerApproved:", moduleManagerApproved)
    setModuleManagerApproved(moduleManagerApproved);
    if (moduleManagerApproved || erc721NeedsApproveTransferHelper) {
      setNeedsApproval(false)
    } else {
      setNeedsApproval(true)
    }
  }

  async function doApproval(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return
    if(!currentAccount) return
    if(!provider) return
    const signer = provider.getSigner()
    const contract:ethers.Contract = new ethers.Contract(tokenContractAddress, abi.abi, signer)

    const moduleManagerContract = ZoraModuleManager__factory.connect(
      zoraAddresses.ZoraModuleManager, signer
    );

    let tx:TransactionResponse;
    if (!moduleManagerApproved) {
      tx = await moduleManagerContract.setApprovalForModule(zoraAddresses.ReserveAuctionCoreEth, true);
      console.log("submitted approval");
      await tx.wait()
      console.log("done with approval");
    }

    if (erc721NeedsApproveTransferHelper) {
      console.log("sending 2nd tx for 721transferhelper");
      tx = await contract.setApprovalForAll(zoraAddresses.ERC721TransferHelper, true);
      console.log("waiting for 721transferhelper to finish");
      await tx.wait()
      console.log("done with transfer helper");
    }
  }

  async function checkErc721NeedsApproveTransferHelper(nftContract: ethers.Contract, ownerAddr: string | undefined, erc721TransferHelperAddress: string): Promise<boolean> {
    console.log(nftContract.address, ownerAddr, erc721TransferHelperAddress);
    return !(await nftContract.isApprovedForAll(ownerAddr, erc721TransferHelperAddress));
  }

  return {
    checkApproval,
    doApproval,
    tokenId, setTokenId,
    zoraAddresses,
    provider,
    nftContract,
    auctionModuleContract,
    needsApproval, setNeedsApproval,
    moduleManagerApproved, setModuleManagerApproved,
    erc721NeedsApproveTransferHelper, setErc721NeedsApproveTransferHelper,
  }
}
