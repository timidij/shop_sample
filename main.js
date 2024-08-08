
let dataArray = []
let html = document.querySelector(".product")  
let category = document.querySelector(".category")



function getCategory(){
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{
                json.forEach((data, index)=>{
                    category.innerHTML+=`<h2>${data}</h2`
                })
            })
    
    

}

getCategory()
function displayProduct (){


fetch("https://fakestoreapi.com/products")
.then((response)=>response.json())
.then((data)=>{
    // console.log(data)
  data.forEach((value) => {
   
   
        html.innerHTML +=`<div class="eachproduct">
        <img src="${value.image}" width="100%"/>
        <h6>${value.title}</h6>
        <p>$${value.price}</p>
        <button>Add to cart</button>
        
        </div>`
        console.log(value)
  
    
  });
})

}
displayProduct()
// console.log(dataArray)