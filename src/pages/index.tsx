import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import {ethers} from "ethers"
import ReadERC20 from "components/ReadERC20"
import ReadTimeNFT from "components/ReadTimeNFT"
import TransferERC20 from "components/TransferERC20"
import TransferTimeNFT from "components/TransferTimeNFT"
import MintTimeNFT from "components/MintTimeNFT"
import CreateAsk from "components/CreateAsk"
import ReadAsks from "components/ReadAsks"
import CancelAsk from "components/CancelAsk"
import FillAsk from "components/FillAsk"
import UpdateAsk from "components/UpdateAsk"

declare let window:any

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })

  },[currentAccount])

  const onClickConnect = () => {
    //client side code
    if(!window.ethereum) {
      console.log("please install MetaMask")
      return
    }
    /*
    //change from window.ethereum.enable() which is deprecated
    //see docs: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts:any)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch('error',console.error)
    */

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch((e)=>console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3"  my={4}>Explore Web3</Heading>
      <VStack>
        <Box w='100%' my={4}>
        {currentAccount
          ? <Button type="button" w='100%' onClick={onClickDisconnect}>
                Account:{currentAccount}
            </Button>
          : <Button type="button" w='100%' onClick={onClickConnect}>
                  Connect MetaMask
              </Button>
        }
        </Box>
        {currentAccount
          ?<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Account info</Heading>
          <Text>ETH Balance of current account: {balance}</Text>
          <Text>Chain Info: ChainId {chainId} name {chainname}</Text>
        </Box>
        :<></>
        }

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Read ClassToken Info</Heading>
          <ReadERC20
            addressContract={process.env.CLASS_TOKEN_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Read NFT Info</Heading>
          <ReadTimeNFT
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Transfer Classtoken</Heading>
          <TransferERC20
            addressContract={process.env.CLASS_TOKEN_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Mint NFT</Heading>
          <MintTimeNFT
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Transfer NFT</Heading>
          <TransferTimeNFT
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Create Ask</Heading>
          <CreateAsk
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Current Asks</Heading>
          <ReadAsks
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Cancel Ask</Heading>
          <CancelAsk
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Update Ask</Heading>
          <UpdateAsk
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Fill Ask</Heading>
          <FillAsk
            addressContract={process.env.TIME_NFT_CONTRACT || ""}
            currentAccount={currentAccount}
          />
        </Box>

        <LinkBox  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <NextLink href="https://github.com/NoahZinsmeister/web3-react/tree/v6" passHref>
          <LinkOverlay>
            <Heading my={4} fontSize='xl'>Task 3 with link</Heading>
            <Text>Read docs of Web3-React V6</Text>
          </LinkOverlay>
          </NextLink>
        </LinkBox>
      </VStack>
    </>
  )
}

export default Home
