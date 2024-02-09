/** ----------- Navbar ----------- */
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

/** ----------- Slider ----------- */
let imgs = ["img/Slider/1.jpg", "img/Slider/2.jpg", "img/Slider/3.jpg"];

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let i = 0;
prev.addEventListener("click", function () {
  i--;
  if (i < 0) {
    i = imgs.length - 1;
  }
  setTimeout(() => {
    document.querySelector(".overlay-img").src = imgs[i];
  }, 500);
});

next.addEventListener("click", function () {
  i++;
  if (i > imgs.length - 1) {
    i = 0;
  }
  setTimeout(() => {
    document.querySelector(".overlay-img").src = imgs[i];
  }, 500);
});

let x = 0;
setInterval(() => {
  x++;
  if (x > imgs.length - 1) {
    x = 0;
  }
  document.querySelector(".overlay-img").src = imgs[x];
}, 3000);

/** --------- products ---------------- */

const pro = document.querySelectorAll(".pro-container")[0];
const filter = document.querySelectorAll(".filter-btn");

function requestAndBuild(string) {
  fetch(
    "https://json-server-brown-five.vercel.app/products?" + string + ""
  ).then((res) => {
    res.json().then((data) => {
      pro.innerHTML = "";
      data.forEach((element) => {
        let div = document.createElement("div");
        div.classList.add("pro");
        div.innerHTML = `
                      <img src="${element.img}" alt="" onclick="clicked(${element.id})">
                <div class="des">
                    <span>${element.category}</span>
                    <h5>${element.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$${element.price}</h4>
                </div>
                <a id="cart" onclick="addToCart(${element.id})"><i class="fa-solid fa-cart-shopping cart"></i></a>
      `;
        pro.appendChild(div);
      });
    });
  });
}

requestAndBuild("");

filter[0].addEventListener("click", function () {
  requestAndBuild("");
});

filter[1].addEventListener("click", function () {
  requestAndBuild("category=Jeans");
});

filter[2].addEventListener("click", function () {
  requestAndBuild("category=Sweatshirts");
});

filter[3].addEventListener("click", function () {
  requestAndBuild("category=T-shirts");
});

filter[4].addEventListener("click", function () {
  requestAndBuild("category=Jackets");
});

/** --------- product ----------- */
function clicked(id) {
  window.open("product.html?id=" + id, "_blank");
}

/** --------- arrow ----------- */
function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  if (
    document.body.scrollTop > window.outerHeight ||
    document.documentElement.scrollTop > window.outerHeight
  ) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
};

/** ----------- cart ----------- */
const cartIcon = document.getElementById("cart-icon");
const cartContainer = document.getElementById("cart-section");
const closeCart = document.getElementById("close-cart");
let productIDs = [];

cartIcon.addEventListener("click", function () {
  cartContainer.classList.add("show");
});

closeCart.addEventListener("click", function () {
  cartContainer.classList.remove("show");
});

let countSpan = document.getElementById("cart-counter");
// function to load the cart content
async function loadCartContent() {
  // Clear the cart content before loading
  let cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = "";

  let storedProductIDs = localStorage.getItem("productIDs");

  // Check if localStorage item exists
  if (storedProductIDs) {
    productIDs.push(...storedProductIDs.split(","));

    // Use Promise.all to wait for all fetch requests to complete
    await Promise.all(
      productIDs.map(async (id) => {
        try {
          const response = await fetch(
            `https://json-server-brown-five.vercel.app/products?id=${id}`
          );
          const data = await response.json();

          cartContent.innerHTML += `<div id="cart-box" class="cart-box ${data[0].id}">
            <img id='cart-img' src="${data[0].img}" alt="">
            <div id="product-details">
              <h4 id="product-name">${data[0].name}</h4>
              <h5 id="product-price" class="product-price">$${data[0].price}</h5>
              <input type="number" id="product-quantity" class="product-quantity" value="1">
            </div>
            <i class="fa-solid fa-trash" id="remove"></i>
          </div>`;
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      })
    );
  }
  update(); // Call update function after loading the cart content
}

loadCartContent();

// start when the page is loaded
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
  let counter = localStorage.getItem("counter");
  countSpan.innerHTML = counter;
} else {
  start();
}

//start function
function start() {
  addEvents();
}

//update & render
function update() {
  addEvents();
  updateTotal();
}

//add event
function addEvents() {
  //remove product from cart
  let removeCartBtn = document.getElementsByClassName("fa-trash");
  for (let i = 0; i < removeCartBtn.length; i++) {
    removeCartBtn[i].addEventListener("click", handle_removeProduct);
  }

  //change product quantity
  let quantityInputs = document.getElementsByClassName("product-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", handle_changeProductQuantity);
  }

  //checkout
  let checkoutBtn = document.getElementById("checkout");
  checkoutBtn.addEventListener("click", handle_checkout);
}

//handle events

function handle_checkout() {
  if (productIDs.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Cart is empty",
      text: "You need to add product first!",
    });
    return;
  }
  let cartcontent = document.getElementById("cart-content");
  cartcontent.innerHTML = "";
  productIDs = [];
  localStorage.setItem("counter", productIDs.length);
  localStorage.setItem("productIDs", productIDs);
  countSpan.innerHTML = 0;
  Swal.fire({
    position: "center-center",
    icon: "success",
    title: "Successfully Checkout!",
    showConfirmButton: false,
    timer: 1500,
  });
  update();
}

async function addToCart(id) {
  let cartContent = document.getElementById("cart-content");
  if (productIDs.find((element) => element == id)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Product already added!",
    });
    return;
  }
  try {
    const response = await fetch(
      `https://json-server-brown-five.vercel.app/products?id=${id}`
    );
    const data = await response.json();

    cartContent.innerHTML += `<div id="cart-box" class="cart-box ${data[0].id}">
      <img id='cart-img' src="${data[0].img}" alt="">
      <div id="product-details">
        <h4 id="product-name">${data[0].name}</h4>
        <h5 id="product-price" class="product-price">${data[0].price}</h5>
        <input type="number" id="product-quantity" class="product-quantity" value="1">
      </div>
      <i class="fa-solid fa-trash" id="remove"></i>
    </div>`;

    productIDs.push(data[0].id);
    localStorage.setItem("counter", productIDs.length);
    localStorage.setItem("productIDs", productIDs);
    countSpan.innerHTML = productIDs.length;
    update();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your product has been added!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

function handle_removeProduct() {
  let removedProduct = this.parentElement.classList[1];
  this.parentElement.remove();
  productIDs = productIDs.filter((element) => element != removedProduct);
  localStorage.setItem("counter", productIDs.length);
  localStorage.setItem("productIDs", productIDs);
  countSpan.innerHTML = productIDs.length;
  update();
}

function handle_changeProductQuantity() {
  if (isNaN(this.value) || this.value <= 0) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  update();
}

//update and render functions
function updateTotal() {
  let cartBoxes = document.getElementsByClassName("cart-box");
  let cartArray = Array.from(cartBoxes);
  let totalElement = document.getElementById("total-amount");
  let total = 0;
  cartArray.forEach((cartBox) => {
    let priceElement = cartBox.getElementsByClassName("product-price")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = cartBox.getElementsByClassName("product-quantity")[0].value;
    total = total + price * quantity;
  });

  total = total.toFixed(2);
  totalElement.innerHTML = `$${total}`;
}
