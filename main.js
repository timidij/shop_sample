
let dataArray = []
let html = document.querySelector(".product")  
let category = document.querySelector(".category")


getCategory()

function getCategory(){
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{
                json.forEach((data, index)=>{
                    category.innerHTML+=`<div class= "container"><button class="cat">${data}</button </div>`
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
        <img src="${value.image}" width="100%"/>
        <h6>${value.title}</h6>
        <p>$${value.price}</p>
        <button>Add to cart</button>
        
        </div>`
        // console.log(value)
        

  })
individualProduct()

}


function individualProduct(){
    let products = document.querySelectorAll(".eachproduct")
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

