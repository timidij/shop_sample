async function displayCart() {
    let cartData = localStorage.getItem("cart")
    let cartArray = JSON.parse(cartData)
    let cartHtml = ""
    let totalPrice = 0
    
    document.querySelector(".cartitems").innerHTML = "<div class='text-center'><i class='fas fa-spinner fa-spin'></i> Loading...</div>"
  
    for (let item of cartArray) {
      try {
        let response = await fetch(`https://fakestoreapi.com/products/${item}`)
        let json = await response.json()
        cartHtml += `
          <div class="cartitems">
            <div class="carteach row">
              <div class="col-md-2">
                <img src="${json.image}" width="100%" class="cartImage img-fluid" />
              </div>
              <div class="col-md-4">
                <h6>${json.title}</h6>
              </div>
              <div class="col-md-2">
                <p class="price">$${json.price}</p>
              </div>
              <div class="col-md-2">
                <div class="d-flex">
                  <button class="decrease btn btn-secondary">-</button>
                  <h1><span class="amount">1</span></h1>
                  <button class="increase btn btn-secondary">+</button>
                </div>
              </div>
              <div class="col-md-2">
                <p class="subtotal">$${json.price}</p>
                <button class="remove btn btn-danger" value="${json.id}"> Remove</button>
              </div>
            </div>
          </div>
        `
        totalPrice += json.price
      } catch (error) {
        console.error(error)
      }
    }
  
    if (cartHtml === "") {
      cartHtml = "<div class='text-center'>Cart is empty</div>"
    } else {
      cartHtml += `
        <div class="row">
          <div class="col-md-12">
            <h4>Total price: <span class="total">$${totalPrice}</span></h4>
          </div>
        </div>
      `
    }
  
    document.querySelector(".cartitems").innerHTML = cartHtml
  
    // Get the HTML elements after they are rendered
    decreaseBtn = document.querySelectorAll(".decrease")
    increaseBtn = document.querySelectorAll(".increase")
    price = document.querySelectorAll(".price")
    subtotal = document.querySelectorAll(".subtotal")
    total = document.querySelector(".total")
    amount = document.querySelectorAll(".amount")
    product = document.querySelectorAll(".cartitem")
  
    removeItem()
    decreasefn()
    increasefn()
    calculateTotal(subtotal)
}

function decreasefn() {
    decreaseBtn.forEach((decrease, index) => {
        decrease.addEventListener("click", () => {
            let number = Number(amount[index].innerHTML)
            number--
            if (number <= 1) {
                number = 1
            }
            displaySubtotal(index, number)
            amount[index].innerHTML = number
            console.log("decrease")
            calculateTotal(subtotal)
        })
    });
}

function increasefn() {
    increaseBtn.forEach((increase, index) => {
        increase.addEventListener("click", () => {
            let number = Number(amount[index].innerHTML)
            number++
            displaySubtotal(index, number)
            amount[index].innerHTML = number
            console.log("increase")
            calculateTotal(subtotal)
        })
    });
}

function displaySubtotal(index, number) {
    subtotal[index].innerHTML = `$${Number(price[index].innerHTML.replace('$', '')) * number}`
}

function calculateTotal(data) {
    let calc = 0;
    data.forEach(value => {
        calc += Number(value.innerHTML.replace('$', ''))
    })
    total.innerHTML = `$${calc}`
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
displayCart()


