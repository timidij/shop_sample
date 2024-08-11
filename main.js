let dataArray = []
let html = document.querySelector(".product")  
let category = document.querySelector(".category")
let cart = document.querySelector(".cartnumber")
cart.innerHTML=0

getCategory()

function getCategory(){
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{
                json.forEach((data, index)=>{
                    category.innerHTML+=`<div class= "container"><button class="cat">${data}</button></div>`
                })
                displayCategory ()
            })
      
    

}

fetch("https://fakestoreapi.com/products")
.then((response)=>response.json())
.then((data)=>{
console.log(data)
displayProduct(data)

})

function displayProduct(data){

    html.innerHTML = ""
    data.forEach((value) => {
   
        html.innerHTML +=`<div class="eachproduct">
        <div class="special">
        <img src="${value.image}" width="100%"/>
        <h6>${value.title}</h6>
        <p>$${value.price}</p>
        </div>
        <button class= "cart" value = "${value.id}"> Add to cart</button>
        
        </div>`
        // console.log(value)
        

        
    })
    individualProduct()
    addToCart()

}


function individualProduct(){
    let products = document.querySelectorAll(".special")
    products.forEach((product,index)=>{
        product.addEventListener("click",()=>{
            localStorage.setItem("indiProduct",index+1)
            window.location.href = "details.html"
        })
    })


}

function displayCategory (){
    let cat = document.querySelectorAll(".cat")
    
   cat.forEach((cat)=>{

    cat.addEventListener("click", ()=>{
        let procat = cat.innerHTML

        fetch(`https://fakestoreapi.com/products/category/${procat}`)
            .then(res=>res.json())
            .then(json=>{

                displayProduct(json)
                console.log(json)

            })
    })
   })


}

function addToCart() {
    let cartButtons = document.querySelectorAll(".cart")
  
    cartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let cartItem = button.value
        let cartData = localStorage.getItem("cart")
  
        if (cartData === null) {
          let cartArray = [cartItem]
          localStorage.setItem("cart", JSON.stringify(cartArray))
        } else {
          let cartArray = JSON.parse(cartData)
          if (!cartArray.includes(cartItem)) {
            cartArray.push(cartItem)
            localStorage.setItem("cart", JSON.stringify(cartArray))
          }
        }
        updateCartCount()
      })
    })
  }
  
  function updateCartCount() {
    let cartData = localStorage.getItem("cart")
    let cartArray = JSON.parse(cartData)
    let cartCount = cartArray.length
    cart.innerHTML = cartCount
  }


function cartCount(data){
    let cart = document.querySelector(".cartnumber")
    let cartNumber = data.length
    cart.innerHTML= cartNumber
    console.log(cartNumber)
}