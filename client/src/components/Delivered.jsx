import React,{useState,useEffect} from 'react'
import { Box,Image,Badge,Tag,TagLabel } from '@chakra-ui/react'
import {ethers} from "ethers"
import { useBoolean } from '@chakra-ui/react'
const Delivered = ({ecommerce,accounts}) => {
    const [flag, setFlag] = useBoolean()
    const [loading,setLoading] = useState(true)
    const [product,setProduct] = useState([])

  
  const deliverItems = async()=>{

    const allProduct = []
    const productLength = await ecommerce.id();
    for(let i = 0; i < productLength;i++){
      const items = await ecommerce.products(i)
      if(!items.delivered){
        if(items.buyer !== "0x0000000000000000000000000000000000000000"){
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

    deliverItems()
  },[!loading])

  const confirmDelivery = async(item)=> {
   
  try{
    if(item.buyer !== "0x0000000000000000000000000000000000000000"){
      const deliver = await ecommerce.delivery(item.id.toString())
      await deliver.wait()
      deliverItems()
    }
  }
    
  catch(err){
    alert("Seller cannot buy items that he sold")
    console.log(err.message)
  }

  }

  return (
    <div>
      <div className="mt-5">
      <Box bg='white' w='100%' p={4} color='white'>
        
        <Tag size='lg' colorScheme='green' borderRadius='full'>
        <TagLabel size="lg"><span className="text-2xl">Delivery Confirmation</span></TagLabel>
      </Tag>
      </Box>
      </div>

      <div className="mt-5">
       <Box  display='flex' flexDirection='row' >
      {product.map((item,idx) => {
        return (
          <Box key={idx} className='ml-8 mt-3 bg-white flex flex-col' maxW='sm' borderWidth='1px' borderRadius='sm'
          boxSize="250px" height="350px">
          <Image boxSize='100px' src={item.img} alt={""} />

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
          <div onMouseEnter={setFlag.on} onMouseLeave={setFlag.off}>
          {flag ? item.seller : (<p>Seller Address {item.seller.slice(0,4)}...{item.seller.slice(38,42)}</p>)}
        </div>
            <Box as='span' color='gray.600' fontSize='sm'>
            </Box>
          </Box>
          <Box>
            {<p>Buyer Address {item.buyer.slice(0,4)}...{item.buyer.slice(38,42)}</p>}
            <Box as='span' color='gray.600' fontSize='sm'>
            </Box>
          </Box>
          <button className='bg-green-400 mt-5 border-2 rounded h-8 w-28 active:bg-green-600
          hover:bg-green-500 ' onClick={() => confirmDelivery(item)}>Delivered</button>
          </Box>
        </Box>
        )
        
      })}
      </Box>
      </div>
      

    </div>
  )
}

export default Delivered