let decreaseBtn = document.querySelectorAll(".decrease")
let increaseBtn = document.querySelectorAll(".increase")
let price = document.querySelectorAll(".price")
let subtotal = document.querySelectorAll(".subtotal")
let total = document.querySelector(".total")
let amount = document.querySelectorAll(".amount")
let product = document.querySelectorAll(".cartitem")

async function displayCart() {
    let cartData = localStorage.getItem("cart")
    let cartArray = JSON.parse(cartData)
    let cartHtml = ""
    let totalPrice = 0
    
   
    document.querySelector(".cartitems").innerHTML = "<div>Loading...</div>"
  
    for (let item of cartArray) {
      try {
        let response = await fetch(`https://fakestoreapi.com/products/${item}`)
        let json = await response.json()
        cartHtml += `<div class="cartitems">
          <div class="carteach">
            <img src="${json.image}" width="100%" class="cartImage" />
            <h6>${json.title}</h6>
            <p class="price">$${json.price}</p>
              <div class="d-flex">
                <button class="decrease">-</button>
                    <h1><span class="amount"> 1</span></h1>
                <button class="increase">+</button>
            </div>
            <p class="subtotal">0</p>
            <button class="remove " value="${json.id}"> Remove</button>
          </div>
        </div>`
        totalPrice += json.price
      } catch (error) {
        console.error(error)
      }
    }
  
    if (cartHtml === "") {
      cartHtml = "<div>Cart is empty</div>"
    } else {
      cartHtml += `<div>Total price: <span class="total">$${totalPrice}</span></div>`
    }
  
    document.querySelector(".cartitems").innerHTML = cartHtml
    removeItem()
    
  }
  
  displayCart()
function decreasefn (){

    decreaseBtn.forEach((decrease,index) => {

    decrease.addEventListener("click", ()=>{
        
        let number = Number(amount[index].innerHTML)
        number--
        if(number <= 1){
            number=1
        }
        
        displaySubtotal(index,number)
   amount[index].innerHTML= number
   console.log("decrease")
   

})
});

}
decreasefn()

function displaySubtotal(index,number){
    subtotal[index].innerHTML = Number(price[index].innerHTML)*number
    
}

increaseBtn.forEach((increase, index) => {
    // let amount = document.querySelectorAll(".amount")
    increase.addEventListener("click", ()=>{
        let number = Number(amount[index].innerHTML)
        console.log(price[index].innerHTML)
        number++

        displaySubtotal(index,number)
        console.log(number)
        console.log(number)
   amount[index].innerHTML= number
   console.log("increase")
   calculateTotal(subtotal)
   
 })
});

function calculateTotal(data){
    let calc=0;
data.forEach(value=>{
    calc += Number(value.innerHTML)

    total.innerHTML= calc
})
}



function removeItem() {
    let removeButtons = document.querySelectorAll(".remove")
  
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let cartData = localStorage.getItem("cart")
        let cartArray = JSON.parse(cartData)
        let index = cartArray.indexOf(button.value)
        cartArray.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cartArray))
        displayCart()
      })
    })
  }