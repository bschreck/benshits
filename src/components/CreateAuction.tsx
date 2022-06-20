import React, { useEffect, useState } from 'react'
import {Button, Input, NumberInput,  NumberInputField, FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {parseEther } from 'ethers/lib/utils'
import { Props, useAuctions } from "components/auction_utils"
import { ChakraProvider } from '@chakra-ui/react'
import { Calendar, CalendarDefaultTheme, CalendarValues, CalendarDate } from '@uselessdev/datepicker'
import DatePopover from 'components/DatePopover'
import { format, isAfter, isBefore, isValid } from 'date-fns'

function isCalendarValues(values: CalendarDate | CalendarValues): values is CalendarValues {
  return (values as CalendarValues).start !== undefined;
}

export default function CreateAuction(props:Props){
  const tokenContractAddress = props.addressContract;
  const currentAccount = props.currentAccount;
  const [reservePrice, setReservePrice]=useState<string>("0x0");
  const [sellerFundsRecipient, setSellerFundsRecipient]=useState<string>("0x");
  const [duration, setDuration]=useState<string>("0x0");
  const [startTime, setStartTime]=useState<string>("0x0");
  const [dates, setDates] = useState<CalendarValues>({} as CalendarValues);

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

  async function createAuction(event:React.FormEvent) {
    event.preventDefault()
    if(!currentAccount) return
    console.log("currentAccount in createAuction")
    if(!provider) return
    console.log("provider in createAuction")
    if(!nftContract) return
    console.log("nftContract in createAuction")
    if(!auctionModuleContract) return
    console.log("auctionModuleContract in createAuction")

    try {
      ethers.utils.getAddress(sellerFundsRecipient)
    } catch {
      setSellerFundsRecipient(currentAccount)
    }
    if (sellerFundsRecipient === "") {
      setSellerFundsRecipient(currentAccount)
    }
    console.log(sellerFundsRecipient);
    const tx = await auctionModuleContract.createAuction(
      tokenContractAddress,
      tokenId,
      duration,
      reservePrice,
      sellerFundsRecipient,
      startTime,
    );

    console.log(`TransactionResponse TX hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("transfer receipt",receipt);
  }

  const handleTokenIDChange = (tokenId:string) => {
    if (tokenId !== "") {
      try {
        tokenId = ethers.BigNumber.from(tokenId).toHexString();
      } catch {
        tokenId = ""
      }
    }
    setTokenId(tokenId);
  }
  const handleSellerFundsRecipientChange = (sellerFundsRecipient:string) => {
    if (sellerFundsRecipient !== "") {
      try {
        sellerFundsRecipient = ethers.utils.getAddress(sellerFundsRecipient);
      } catch {
        sellerFundsRecipient = "";
      }
    }
    setSellerFundsRecipient(sellerFundsRecipient);
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
  // const handleDurationChange = (duration:string) => {
  //   if (duration !== "") {
  //     try {
  //       duration = ethers.BigNumber.from(duration).toHexString();
  //     } catch {
  //       duration = ""
  //     }
  //   }
  //   setDuration(duration);
  // }
  // const handleStartTimeChange = (startTime:string) => {
  //   if (startTime !== "") {
  //     try {
  //       startTime = ethers.BigNumber.from(startTime).toHexString();
  //     } catch {
  //       startTime = ""
  //     }
  //   }
  //   setStartTime(startTime);
  // }

  const handleDateChange = (dates: CalendarValues) => {
    console.log("date change:", dates)
    setDates(dates);
    if (dates.start) {
      console.log("dates.start", (dates.start as Date));
      const start = ethers.BigNumber.from((dates.start as Date).getTime() / 1000);
      setStartTime(start.toHexString());
      console.log("start time", startTime);
      if (dates.end) {
        const duration = (dates.end as Date).getTime()/1000 - ethers.BigNumber.from(startTime).toNumber()
        setDuration(ethers.BigNumber.from(duration).toHexString());
        console.log("duration ", duration);
      }
    }
  }

  //const handleSelectEndDate = (date: Date) => {
  //  setDuration(date.getSeconds() - ethers.BigNumber.from(startTime).toNumber())
  //})
  //const handleSelectStartDate = (date: Date) => {
  //  setStartTime(ethers.BigNumber.from(date.getSeconds()).toHexString());
  //})

  return (
    <form onSubmit={createAuction}>
    <FormControl>
    <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
    <Input id="tokenid" type="text" required onChange={(e) => handleTokenIDChange(e.target.value)}/>



    <FormLabel htmlFor='reservePrice'>Reserve Price </FormLabel>
    <NumberInput defaultValue={reservePrice} min={0.00000001} onChange={handleReservePriceChange}>
      <NumberInputField />
    </NumberInput>

    <FormLabel htmlFor='sellerFundsRecipient'>Seller Funds Recipient: </FormLabel>
    <Input id="sellerFundsRecipient" type="text" required onChange={(e) => handleSellerFundsRecipientChange(e.target.value)}/>

    {/*
    <FormLabel htmlFor='duration'>Duration (s)</FormLabel>
    <NumberInput defaultValue={duration} min={1} onChange={handleDurationChange}>
      <NumberInputField />
    </NumberInput>
    <FormLabel htmlFor='startTime'>Start Time (unix seconds): </FormLabel>
    <NumberInput defaultValue={startTime} min={0} onChange={handleStartTimeChange}>
      <NumberInputField />
    </NumberInput>
      */}
    <FormLabel htmlFor='dates'>Auction Dates: </FormLabel>
    <ChakraProvider theme={CalendarDefaultTheme}>
      <DatePopover
        id="dates"
        dates={dates}
        setDates={handleDateChange}
      />
    </ChakraProvider>
    <Button type="submit" isDisabled={!currentAccount}>Create Auction</Button>
    </FormControl>
    </form>
  )
}
