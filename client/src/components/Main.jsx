import React,{useState} from 'react'
import {ethers} from "ethers"
import EcommerceAbi from "./artifacts/contracts/Ecommerce.sol/Ecommerce.json"
import Address from "./artifacts/Addresses.json"
import Navbar from "./Navbar"
import { Routes,Route } from 'react-router-dom';
import Buyer from "./Buyer"
import Seller from "./Seller"
import { Spinner } from '@chakra-ui/react'
import Purchases from "./Purchases"
import Delivered from "./Delivered"

const Main = () => {
    const [accounts ,setAccount] = useState(null)
    const [loading,setLoading] = useState(true)
    const [ecommerce,setEcommerce] = useState(null)

    const connectWeb3 = async()=>{
        if(typeof window.ethereum !== "undefined"){
            const account = await window.ethereum.request({method:"eth_requestAccounts"})
            setAccount(account[0])
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            window.ethereum.on("accountsChanged",async (account)=>{
                setAccount(account[0])
            })

            window.ethereum.on("chainChanged",(chainId)=>{
                window.location.reload()
            })

            const signer = provider.getSigner();

            if((await signer.getChainId()) !== 31337){
                alert("Please change your network with localhost hardhat")
            }

            const ecommerce = new ethers.Contract(Address,EcommerceAbi.abi,signer)
            setEcommerce(ecommerce)
            setLoading(false)


        }
    }


  return (
    <div className="bg-slate-200 h-screen">
        <Navbar connectWeb3={connectWeb3} accounts={accounts} />
        {loading ? (
        <div className='flex justify-center items-center mt-80 '>
          <Spinner size='xl' speed='0.65s' color='blue.500' />
        </div> ):
        (<Routes >
          <Route path='/' element={<Buyer ecommerce={ecommerce} accounts={accounts} />} />
          <Route path='/seller' element={<Seller ecommerce={ecommerce} />} />
          <Route path="/your-orders" element={<Purchases ecommerce={ecommerce} />} />
          <Route path="/product-devlivered" element={<Delivered ecommerce={ecommerce} />} />
        </Routes>
          )}
    </div>
  )
}

export default Main