import React from 'react'
import {Link} from "react-router-dom"


const Navbar = ({connectWeb3,accounts}) => {

  return (
    <div>
        <nav className="w-full h-20 flex  p-4
         bg-black">
            <ul className='flex flex-row ml-32'>
                <li className='cursor-pointer text-2xl mr-14 text-white'>
                    <Link to='/'>Home</Link></li>
                <li className='cursor-pointer text-2xl mr-14 text-white'>
                <Link to='/seller'>Seller</Link></li>
                <li className='cursor-pointer text-2xl mr-14 text-white'><Link to='/product-devlivered'>Delivered</Link></li>
                <li className='cursor-pointer text-2xl mr-14 text-white'><Link to='/your-orders'>My Orders</Link></li>
                {accounts ? (<li className="text-2xl ml-40 text-white">{accounts}</li>):
                <button className="border-2 rounded p-2 border-gray-300 bg-zinc-600
                hover:bg-zinc-800 active:bg-zinc-700 text-xl ml-44 text-white" onClick={connectWeb3}>Connect Wallet</button>}
            </ul>
           
        </nav>

    </div>
  )
}

export default Navbar