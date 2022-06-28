const { expect } = require("chai");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num)


describe("Ecommerce", function () {
  let seller,buyer,add1;
  let ecommerce;
  beforeEach("",async()=>{
    const Ecommerce = await hre.ethers.getContractFactory("Ecommerce");
    ecommerce = await Ecommerce.deploy()
    ecommerce.deployed()
    add1 = await ethers.getSigners()
    

  })

  
  describe("Register by seller",()=>{

    it("Register some Product",async()=>{
      expect(await ecommerce.registerProduct("image","Iphone 11","Black color",toWei(1)))
      

      const id = await ecommerce.id()
      expect(await ecommerce.id()).to.equal(id)

      const items = await ecommerce.products(0)
      expect(await items.image).to.equal("image")

      expect(await items.title).to.equal("Iphone 11")
      expect(await items.desc).to.equal("Black color")

      expect(await items.price).to.equal(toWei(1))
      expect(await items.seller).to.equal(add1[0].address)

      .to.emit(ecommerce,"register")
      .withArgs("image","Iphone 11",0,items.seller)

     
    })
    it("should fall if price is zero",async()=>{
      await expect(ecommerce.connect(add1[0]).registerProduct("image","Iphone 11","Black color",0))
      .to.be.revertedWith("price must be greater than zero");
  });

  it("should fall if image is undefine",async()=>{
    await expect(ecommerce.connect(add1[0]).registerProduct("","Iphone 11","Black color",0))
    .to.be.revertedWith("image is undefine");
  });

  it("should fall if title is undefine",async()=>{
    await expect(ecommerce.connect(add1[0]).registerProduct("image","","Black color",0))
    .to.be.revertedWith("title is undefine");
  });
  
  it("should fall if desc is undefine",async()=>{
    await expect(ecommerce.connect(add1[0]).registerProduct("image","Iphone 11","",0))
    .to.be.revertedWith("desc is undefine");
  });

  })

  describe("Buyer Deployment",()=>{
    beforeEach(async()=>{
      expect(await ecommerce.registerProduct("image","Iphone 11","Black color",toWei(1)))
      expect(await ecommerce.registerProduct("image","Iphone 12","Blue color",toWei(1.5)))
    })

    it(" Buy some items",async()=>{
      
      expect(await ecommerce.connect(add1[1]).buy(0,{value:toWei(1)}))
      .to.emit(ecommerce,"Bought")
      .withArgs(0,add1[1].address)
    })

    it("let's buy 2nd items",async()=>{
      expect(await ecommerce.connect(add1[1]).buy(1,{value:toWei(1.5)}))
      .to.emit(ecommerce,"Bought")
      .withArgs(1,add1[1].address)
    })
  })

  describe("should be delivered the items and amount has to be paid",()=>{
    beforeEach(async()=>{
      expect(await ecommerce.registerProduct("image","Iphone 11","Black color",toWei(1)))
      expect(await ecommerce.registerProduct("image","Iphone 12","Blue color",toWei(1.5)))

      expect(await ecommerce.connect(add1[1]).buy(0,{value:toWei(1)}))
      expect(await ecommerce.connect(add1[1]).buy(1,{value:toWei(1.5)}))
    })
    it("After the delivery amount paid",async()=>{
      expect(await ecommerce.connect(add1[1]).delivery(0))
      .to.emit(ecommerce,"deliverProduct")
      .withArgs(0)


      expect(await ecommerce.connect(add1[1]).delivery(1))
      .to.emit(ecommerce,"deliverProduct")
      .withArgs(1)


    })

  })



});
