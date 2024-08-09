

let details = document.querySelector(".details")

let productID = window.localStorage.getItem("indiProduct")
console.log(productID)





function displayDetails (){
    fetch(`https://fakestoreapi.com/products/${productID}`)
            .then(res=>res.json())
            .then(json=>{
                let item = `
                <div class="row">
            <div class="col-md-12 col-lg-6 ">
                <img src="${json.image}" alt="" width="100%" >
            </div>
            <div class="col-6 p-auto">
                <h1>${json.title}</h1>
                <p>
                    
                    ${json.description}
                </p>
                <h3>
                   $ ${json.price}
                    
                </h3>
                <button class="cart"> add to cart </button>
                
            </div>
           
        </div>
                `
                details.innerHTML=item

                addCart()
            })
}

displayDetails()

function addCart(){
    let cat = document.querySelector(".cart")
    cat.addEventListener("click",()=>{
        //function to be executed here
        console.log("item added")
    })
}