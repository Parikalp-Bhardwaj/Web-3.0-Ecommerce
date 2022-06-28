import React,{useState} from 'react'
import {ethers} from "ethers"
import {create as ipfsHttpClient} from "ipfs-http-client"
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

const Seller = ({ecommerce}) => {
    const [image,setImage] = useState('');
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(null);

    const uploadToIPFS = async(event)=>{
        event.preventDefault()

        const file = event.target.files[0]
        if(typeof file !== "undefined")
        try{
            const result = await client.add(file);
            setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
        }
        catch(err){
            alert("ipfs error")
            console.log("ipfs image upload error",err)
        }
    }

    const saleItems = async(e)=>{
        e.preventDefault();
        const register = await ecommerce.registerProduct(image,title,description,ethers.utils.parseEther(price).toString())
        await register.wait()
        setImage('')
        setTitle('')
        setDescription('')
        setPrice('')
    }

     return (
        <div>
        
            <div className="flex justify-center items-center flex-col mb-2">
            <input  type="file" className="mt-3 pt-2 w-28 h-18 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100 w-[600px] h-12  text-xl pl-3 bg-slate-200 
                        font-bold text-2xl"
             type="file" name="file" onChange={uploadToIPFS}/>
            <br></br>
            <input className='w-[600px] font-bold h-12 rounded-lg text-xl pl-3 bg-slate-200 mt-2 border-black border-2' placeholder='Title'
             type="text" onChange={(e) => setTitle(e.target.value)} />
            <br></br>
            <input className='w-[600px] h-12 font-bold rounded-lg text-xl pl-3 bg-slate-200 mt-2 border-black border-2'
             placeholder='Description' type="text" onChange={(e) => setDescription(e.target.value)} />
            <br></br>
            <input className='w-[600px] h-12 font-bold rounded-lg text-xl pl-3 bg-slate-200 mt-2 border-black border-2' placeholder='Price in ETH'
             type="number" onChange={(e) => setPrice(e.target.value)} />
            
            <button className="rounded-full bg:teal p-3 w-[620px] hover:bg-teal-700 active:bg-teal-500
            bg-teal-600 text-black mt-5" onClick={saleItems} >Submit</button>

            </div>
            
        </div>
  )
}

export default Seller