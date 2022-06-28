//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

contract Ecommerce{
    
    struct Product{
        uint ProductId;
        string image;
        string title;
        string desc;
        address payable seller;
        uint price;
        address buyer;
        bool delivered;
    }
    uint public id;
    Product[] public products;
    event register(string image,string title,uint ProductId,address seller);
    event Bought(uint productId,address buyer);
    event deliverProduct(uint productId);

    function registerProduct(string memory _image,string memory _title,string memory _desc,uint _price)external{
        require(bytes(_image).length > 0,"image is undefine");
        require(bytes(_title).length > 0,"title is undefine");
        require(bytes(_desc).length > 0,"desc is undefine");
        require(_price > 0,"price must be greater than zero");
        Product memory DProduct;
        DProduct.ProductId = id;
        DProduct.image = _image;
        DProduct.title = _title;
        DProduct.desc = _desc;
        DProduct.seller = payable(msg.sender);
        DProduct.price = _price;
        products.push(DProduct);
        emit register(_image,_title,id,msg.sender);
        id++;
    }
    modifier noSeller(uint _productId){
        require(products[_productId].seller != msg.sender,"Seller cannot buy is");
        _;
    }

    function buy(uint _productId)external payable noSeller(_productId){
        require(products[_productId].price == msg.value,"Pay the exact price");
        products[_productId].buyer = msg.sender;
        emit Bought(_productId,msg.sender);
    }

    function delivery(uint _productId)external{
        require(products[_productId].buyer == msg.sender,"Only buyer can confirm it");
        products[_productId].delivered = true;
        (bool success,) = products[_productId].seller.call{value:products[_productId].price}("");
        require(success,"call failed");
        emit deliverProduct(_productId);
    }

}