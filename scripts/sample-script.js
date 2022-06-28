
const hre = require("hardhat");
const fs = require("fs")
async function main() {
  
  const Ecommerce = await hre.ethers.getContractFactory("Ecommerce");
  const ecommerce = await Ecommerce.deploy();

  await ecommerce.deployed();

  console.log("Ecommerce deployed to:", ecommerce.address);

//   const Addresses = {
//     ecommerce:ecommerce.address
// }

 const AddressJson = JSON.stringify(ecommerce.address)
    
 fs.writeFileSync("./frontend/src/components/artifacts/Addresses.json",AddressJson)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
