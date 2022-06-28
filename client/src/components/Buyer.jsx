import React,{useState,useEffect} from 'react'
import { Box,Image,Badge } from '@chakra-ui/react'
import {ethers} from "ethers"
const Buyer = ({ecommerce,accounts}) => {
    const [loading,setLoading] = useState(true)
    const [product,setProduct] = useState([])

  
  const purchaseItems = async()=>{

    const allProduct = []
    const productLength = await ecommerce.id();
    for(let i = 0; i < productLength;i++){
      const items = await ecommerce.products(i)
      if(!items.delivered){
        if(items.buyer === "0x0000000000000000000000000000000000000000"){
          const id = await items.ProductId
          const img = await items.image;
          const title = await items.title;
          const desc = await items.desc;
          const price = await items.price;
          const seller = await items.seller;
          const buyer = await items.buyer;
          const delivered = await items.delivered

          let productInfo = {
            id:id,
            img,
            title,
            desc,
            price,
            seller,
            buyer,
            delivered
          }

          allProduct.push(productInfo)
        }
      }
      
    }
    setProduct(allProduct)
    setLoading(false);
  }

  useEffect(()=>{

    purchaseItems()
  },[!loading])

  const BuyProduct = async(item)=> {
   

  try{

    if(item.buyer === "0x0000000000000000000000000000000000000000"){
      console.log("buyer ",item.buyer)
      const buy = await ecommerce.buy(item.id.toString(),{value:item.price})
      await buy.wait()
      purchaseItems()

    }
  }
    
  catch(err){
    alert("Seller cannot buy items that he sold")
    console.log(err.message)
  }
    // console.log("product id",item.id.toString())

  }

  return (
    <div>
       <Box  display='flex' flexDirection='row' overflowY="scroll" overflowX="hidden">
      {product.map((item,idx) => {
        return (
          <Box key={idx} className='ml-8 mt-3 bg-white flex flex-col' maxW='sm' borderWidth='1px' borderRadius='sm'
          boxSize="250px" height="500px"  >
            
          <Image boxSize='300px' src={item.img} alt={""} />

          <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' mx="10" px='4' colorScheme='teal'>
              <p className='flex justify-center items-center text-xl'>{ethers.utils.formatEther(item.price)} Eth</p>
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {item.title}
            <p>{item.desc}</p>
          </Box>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            <p>{item.desc}</p>
          </Box>

          <Box>
            {<p>Seller Address{item.seller.slice(0,4)}...{item.seller.slice(38,42)}</p>}
            <Box as='span' color='gray.600' fontSize='sm'>
            </Box>
          </Box>

          <button className='bg-yellow-400 mt-2 border-2 rounded h-8 w-28 active:bg-yellow-600
          hover:bg-yellow-500 ' onClick={() => BuyProduct(item)}>Buy Now</button>
          </Box>
        </Box>
        )
        
      })}
      </Box>
      

    </div>
  )
}

export default Buyer