import React,{useState,useEffect} from 'react'
import {ethers} from "ethers"
import { Box,Image,Badge,Tag,TagLabel  } from '@chakra-ui/react'


const Purchases = ({ecommerce}) => {
  const [product,setProduct] = useState([])
  const [loading,setLoading] = useState(true);
 

  const userPurchases = async() =>{
    const allProduct = []
    const productLength = await ecommerce.id();
    for(let i = 0; i < productLength;i++){
      const items = await ecommerce.products(i)
      if(items.delivered){
        const id = await items.ProductId
        const img = await items.image;
        const title = await items.title;
        const desc = await items.desc;
        const price = await items.price;
        const seller = await items.seller;
        const buyer = await items.buyer;

        const item = {
          id,
          img,
          title,
          desc,
          price,
          seller,
          buyer
        }

        allProduct.push(item)
      }

    }

    setProduct(allProduct)
    setLoading(false)


  }
  useEffect(()=>{

    userPurchases()
  },[!loading])


  return (
    <div>
      
      <div className="mt-5">
      <Box bg='white' w='100%' p={4} color='white'>
        
        <Tag size='lg' colorScheme='green' borderRadius='full'>
        <TagLabel size="lg"><span className="text-2xl">Your Orders</span></TagLabel>
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
            <p className="text-xl font-medium">Seller Address <span className="font-bold">{item.seller} </span></p>
          </Box>
          </Box>
        </Box>
        )
        
      })}
      </Box>
      </div>

    </div>
  )
}

export default Purchases