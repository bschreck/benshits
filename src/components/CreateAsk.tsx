import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

import { Props, useAsks } from "components/ask_utils"

// TODO: multiple approve calls don't happen, have to reload
// have to reload to call create ask too

export default function CreateAsk(props:Props){
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [askPrice, setAskPrice]=useState<string>("0x0");
  const [findersFeeBps, setFindersFeeBps]=useState<string>("200");
  const [moduleAddressesToApprove, setModuleAddressesToApprove] = useState<Array<string>>([]);
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
    // TODO: need listener for transfer helper & module approve events to change
   //  text of submit button on the fly
    //  nft event: ApprovalForAll(_msgSender(), operator, approved);
    //  module manager events:
    //  ModuleApprovalSet(msg.sender, _module, _approved)
  }, [currentAccount])

  async function createAsk(event:React.FormEvent) {
    if(!currentAccount) return
    if(!provider) return
    if(!nftContract) return
    if(!askModuleContract) return
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

  const twoApprovals = erc721NeedsApproveTransferHelper && (moduleAddressesToApprove.length > 0)
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
    <Button type="submit" isDisabled={!currentAccount}>{needsApproval ? "Approve Zora Modules" : "Create Ask"} {twoApprovals ? "(2 approval transactions)" : ""}</Button>
    </FormControl>
    </form>
  )
}
