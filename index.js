let products=[];
let addToCart=[];

const prodContainer=document.querySelector(".product-list");
const name=document.querySelector(".name");
const price=document.querySelector(".price");
const type=document.querySelector(".type");
const description=document.querySelector(".description");
const submit=document.querySelector(".adBtn");


const home=document.querySelector(".home");
const cart=document.querySelector(".cart");
const prods=document.querySelector(".prods");
const add=document.querySelector(".add");

const cartsPage=document.querySelector("#cart");
const productPage=document.querySelector("#products");
const addPage=document.querySelector("#add-product");


const addProduct=()=>{
    
   submit.addEventListener("click",()=>{
    if (name.value && price.value && type.value && description.value) {
    const enterOrod={
        Name:name.value,
        Price:price.value,
        Type:type.value,
        Descrip:description.value,
    };
    products.push(enterOrod);
    renderCards();   // Update the product list
    clearInputs();
  
} else {
   alert("Please fill in all fields.");
};
});
};
addProduct();


const clearInputs=()=>{
    // Clear input fields
  name.value = "";
  price.value = "";
  type.value = "";
  description.value = "";
}


const renderCards=()=>{
    prodContainer.innerHTML = ""; // Clear existing products before rendering new ones

    products.forEach((ele,i)=>{
        let prodCard=document.createElement("div");
        let setName=document.createElement("h3");
        let setprice=document.createElement("p");
        let settype=document.createElement("code");
        let setDesc=document.createElement("textarea");
        let setDb=document.createElement("button");
        let addcartbtn=document.createElement('button');
        let qnty=document.createElement("div");

        prodCard.className=`cart-items ${i}`;
       
        setprice.className="price";
        


        let selA=document.createElement("button");
        let selM=document.createElement("button");
        
        

        selA.className="Add";
        selM.className="Minus";
        
        
        

        setName.innerHTML=ele.Name;
        setprice.innerHTML=`Price: $${ele.Price}`;
        settype.innerHTML=`Type: ${ele.Type}`;
        setDesc.innerHTML=ele.Descrip;
        setDb.innerHTML="delete";
        addcartbtn.innerHTML="add to Cart";
        selA.innerHTML="+";
        selM.innerHTML="-";

        setDb.addEventListener("click",()=>{
            products.splice(i,1);    
            renderCards();     // Re-render the product cards
        })
        
        qnty.appendChild(selA);
        qnty.appendChild(selM);


        prodCard.appendChild(setName);
        prodCard.appendChild(setprice);
        prodCard.appendChild(settype);
        prodCard.appendChild(setDb);
        prodCard.appendChild(addcartbtn);
        prodCard.appendChild(qnty);
        

        addcartbtn.addEventListener("click",()=>{
            addToCart.push(ele);
            console.log(addToCart);
            addCart();  // Update the cart whenever an item is added
            total();
        })
       
       
        //prodCard.appendChild(setDesc);

        prodContainer.appendChild(prodCard);
    });
};


const Navigation=()=>{
    cart.addEventListener("click",(e)=>{
        e.preventDefault();
        cartsPage.style.display="block";
        productPage.style.display="none";
        addPage.style.display="none";
    });

    prods.addEventListener("click",(e)=>{
        e.preventDefault();
        cartsPage.style.display="none";
        productPage.style.display="block";
        addPage.style.display="none";
    });

    add.addEventListener("click",(e)=>{
        e.preventDefault();
        cartsPage.style.display="none";
        productPage.style.display="none";
        addPage.style.display="block";
    });
    home.addEventListener("click",(e)=>{
        e.preventDefault();
        cartsPage.style.display="block";
        productPage.style.display="block";
        addPage.style.display="block";
    });

};
Navigation();




const addCart=()=>{
   const cartContainer=document.querySelector("#cart-items");
   cartContainer.innerHTML="";

    addToCart.forEach((ele,i)=>{
        let cartItem=document.createElement("div");
        let setName=document.createElement("h3");
        let setprice=document.createElement("p");
        let settype=document.createElement("code");
        let setDb=document.createElement("button");
        cartItem.className=`cart-items ${i}`;
       
        setprice.className="price";

        setName.innerHTML=ele.Name;
        setprice.innerHTML=`Price: $${ele.Price}`;
        settype.innerHTML=`Type: ${ele.Type}`;
        setDb.innerHTML="delete";

        setDb.addEventListener("click",()=>{
            addToCart.splice(i,1);    
            addCart();     // Re-render the product cards
            total();
        })
    

        cartItem.appendChild(setName);
        cartItem.appendChild(setprice);
        cartItem.appendChild(settype);
        cartItem.appendChild(setDb);
       

        
       
       
        //cartItem.appendChild(setDesc);

        cartContainer.appendChild(cartItem);
    });
};


const total=()=>{
    const tot=document.querySelector("#cart-total-amount");
    let totalPrice=0;
    addToCart.forEach((ele,i)=>{
        totalPrice+=parseFloat(ele.Price);
        
    });
    tot.innerHTML=`${totalPrice.toFixed(2)}`;
    
}

const filterOut=()=>{
    const search=document.querySelector(".search");

    search.addEventListener("input",()=>{
         let searchTerm=search.value.toLowerCase();
         
         const filteredProducts = products.filter(product => 
            product.Name.toLowerCase().includes(searchTerm) || 
            product.Type.toLowerCase().includes(searchTerm) ||
            product.Descrip.toLowerCase().includes(searchTerm)
        
        )
       
            // Display only the filtered products

            displayFilteredProducts(filteredProducts);
    });
}

// Function to display filtered products
const displayFilteredProducts = (filteredProducts) => {
    prodContainer.innerHTML = ""; // Clear existing products

    filteredProducts.forEach((ele, i) => {
        let prodCard = document.createElement("div");
        let setName = document.createElement("h3");
        let setprice = document.createElement("p");
        let settype = document.createElement("code");
        let setDb = document.createElement("button");
        let addcartbtn = document.createElement('button');
        
        prodCard.className = `cart-items ${i}`;
        setprice.className = "price";

        setName.innerHTML = ele.Name;
        setprice.innerHTML = `Price: $${ele.Price}`;
        settype.innerHTML = `Type: ${ele.Type}`;
        setDb.innerHTML = "delete";
        addcartbtn.innerHTML = "add to Cart";

        setDb.addEventListener("click", () => {
            products.splice(i, 1);
            filterOut();  // Re-render the filtered product list
        });

        addcartbtn.addEventListener("click", () => {
            addToCart.push(ele);
            addCart();  // Update the cart whenever an item is added
            total();
        });

        prodCard.appendChild(setName);
        prodCard.appendChild(setprice);
        prodCard.appendChild(settype);
        prodCard.appendChild(setDb);
        prodCard.appendChild(addcartbtn);

        
            prodContainer.appendChild(prodCard);
    })
};
filterOut();
