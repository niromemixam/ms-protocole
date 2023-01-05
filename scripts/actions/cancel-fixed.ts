import { ethers, upgrades } from "hardhat";
import hre from "hardhat";
import networks from "../../subgraph/networks.json";
import contracts from "../../utils/contracts.json";
import fs from "fs";

async function main() {
  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  const Mkt = await ethers.getContractFactory("MSMarketplace");
  const mkt = Mkt.attach(networks.localhost.MSMarketplace.address);

  const cancel = await mkt.connect(addr2).cancelDirectListing(1);
  const cancelTx = await cancel.wait()
  console.log(cancelTx.events);

  const listing1 = await mkt.listings(1)
  console.log(listing1);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
