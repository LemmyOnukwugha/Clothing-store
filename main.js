// state
let cart = [];
let wishlist = [];

let products = [];
let men = [];
let women = [];
let jewelry = [];
let electronics = [];

// Query the DOM
const menuElement = document.getElementById("menu");
const cartElement = document.getElementById("cart");
const wishlistElement = document.getElementById("wishlist");
const menEl = document.getElementById("men");
const womenEl = document.getElementById("women");
const jewelryEl = document.getElementById("jewelry");
const electronicsEl = document.getElementById("electronics");

//Default values
writeToDom(cartElement, 0);
writeToDom(wishlistElement, 0);

// fetch the products from api
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((fetchedproducts) => {
    console.log(fetchedproducts);
    // populate the product store with the fetched products
    products = fetchedproducts;

    // populate the DOM with the right category of products
    //  1. loop through the products and populate the DOM

    // create product element
    // menuElem.appendChild(productElement)
    products.forEach((item, index) => {
      const productElement = createProduct(item);
      menuElement.append(productElement);
    });
  })
  .catch((err) => console.error(err));

// Utility functions
function writeToDom(element, content) {
  element.textContent = content;
}

// CREATE PRODUCT

function createProduct(item) {
  const divElement = document.createElement("div");
  divElement.classList.add("col");

  const content = `<div class="card">
                <img
                  src=${item.image}
                  class="card-img-top"
                  alt="..."
                  style="height: 350px"
                />
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">$${item.price}</p>
                  </div>

                  <div class="text-center">
                    <a href="#" class="btn btn-dark rounded-0" id='cartBtn'>Add To Cart</a>
                    <a href="#" class="btn btn-dark rounded-0" id='wishListBtn'
                      >Add To Wishlist</a
                    >
                  </div>
                </div>`;
  divElement.innerHTML = content;
  // each product should have a button event listener to add/remove to cart or to wishlist
  const cartBtn = divElement.querySelector("#cartBtn");
  const wishListBtn = divElement.querySelector("#wishListBtn");
  cartBtn.addEventListener("click", handleCart);
  wishListBtn.addEventListener("click", handleWishList);
  return divElement;
}

// Event Handlers

function handleCart(event) {
  // if product is not in cart, then add product
  // if product is already in cart, then remove product
  const Btn = event.target;
  BtnContainer = Btn.parentElement;
  const titleContainer = BtnContainer.previousElementSibling;
  const titleElement = titleContainer.children[0];
  const title = titleElement.textContent;

  const completeProduct = products.find((item, index) => {
    if (item.title === title) {
      return item;
    } else {
      return null;
    }
  });

  //check cart if product with this title exist
  const product = cart.find((item, index) => {
    if (item.title === completeProduct.title) {
      return item;
    } else {
      return null;
    }
  });

  if (product) {
    // remove product from cart
    cart = cart.filter((item, index) => {
      if (item.title !== title) {
        return item;
      } else {
        return null;
      }
    });
    event.target.className = " btn btn-dark rounded-0";
    event.target.textContent = "Add To Cart";
  } else {
    // add product to cart
    cart.push(completeProduct);
    // change button style to red
    event.target.className = " btn btn-danger rounded-0";
    event.target.textContent = "Remove";
  }

  const count = cart.length;

  // update cart count in the dom
  writeToDom(cartElement, count);
}

function handleWishList(event) {
  const Btn = event.target;
  BtnContainer = Btn.parentElement;
  const titleContainer = BtnContainer.previousElementSibling;
  const titleElement = titleContainer.children[0];
  const title = titleElement.textContent;

  const completeProduct = products.find((item, index) => {
    if (item.title === title) {
      return item;
    } else {
      return null;
    }
  });

  const product = wishlist.find((item, index) => {
    if (item.title === title) {
      return item;
    } else {
      return null;
    }
  });

  if (product) {
    wishlist = wishlist.filter((item, index) => {
      if (item.title !== title) {
        return item;
      } else {
        return null;
      }
    });
    event.target.className = " btn btn-dark rounded-0";
    event.target.textContent = "Add To Wishlist";
  } else {
    wishlist.push(completeProduct);

    event.target.className = " btn btn-danger rounded-0";
    event.target.textContent = "Remove";
  }

  const count = wishlist.length;

  writeToDom(wishlistElement, count);
}
//navigation eventlisteners
menEl.addEventListener("click", filterMen);
womenEl.addEventListener("click", filterMen);
jewelryEl.addEventListener("click", filterMen);
electronicsEl.addEventListener("click", filterMen);

// navigation eventhandlers
function filterMen(e) {
  const menFilter = products.filter((item, index) => {
    if (item.category === "men's clothing") {
      return item;
    } else {
      return null;
    }
  });
  menuElement.innerHTML = "";
  menFilter.forEach((item, index) => {
    const menFilter = createProduct(item);
    menuElement.append(menFilter);
  });
  console.log(menFilter);
}
