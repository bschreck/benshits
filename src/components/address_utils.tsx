import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import rinkebyZoraAddresses from "@zoralabs/v3/dist/addresses/4.json";
import ropstenZoraAddresses from "@zoralabs/v3/dist/addresses/3.json";
import mainnetZoraAddresses from "@zoralabs/v3/dist/addresses/1.json";

export async function getZoraAddresses(provider: ethers.providers.BaseProvider) {
  const network = await provider.getNetwork();
  switch (network.chainId) {
    case 1:
    return mainnetZoraAddresses;
    case 3:
    return ropstenZoraAddresses;
    case 4:
    return rinkebyZoraAddresses;
  }
};

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export function useZora(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [tokenId,setTokenId]=useState<string>('');
  const [zoraAddresses,setZoraAddresses]= useState<any>(mainnetZoraAddresses);

  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return

    const doSetZoraAddresses = async function() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const zoraAddresses = await getZoraAddresses(provider);
      setZoraAddresses(zoraAddresses);
    }
    doSetZoraAddresses()
  }, [currentAccount])
  return {tokenId, setTokenId, zoraAddresses}
};

export function useProvider(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [provider,setProvider]=useState<ethers.providers.Web3Provider | null>(null);


  useEffect( () => {
    if(!window.ethereum) return
    if(!currentAccount) return
    setProvider(new ethers.providers.Web3Provider(window.ethereum))

  }, [currentAccount])
  return {provider}
};
