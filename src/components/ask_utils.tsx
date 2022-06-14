import {ethers} from 'ethers'

export interface Ask {
  seller: string,
  sellerFundsRecipient: string,
  askCurrency: string,
  findersFeeBps: number,
  askPrice: ethers.BigNumber, // bignumber
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
