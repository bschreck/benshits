import {ethers} from 'ethers'

const formatter = new Intl.NumberFormat("en-us", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const formatBalance = (balance: ethers.BigNumber | undefined) =>
  formatter.format(parseFloat(ethers.BigNumber.from(balance).toHexString()));

export {formatter, formatBalance}
