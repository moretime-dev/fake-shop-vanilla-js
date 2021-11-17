"usestrict";

const apiUrl = "https://fakestoreapi.com/products/";
const productPage = document.querySelector(".product-page");

let productId = localStorage.getItem("currentProductId");

const showProductPage = async (productId) => {
  await fetch(apiUrl + productId)
    .then((res) => res.json())
    .then((product) => {
      productPage.innerHTML += `
      <a href="./index.html" class="product-page-back"><i>Back</i></a><br><br>
      <h2 class="product-page-title">${product.title}</h2>
      <p class="product-page-category">Category: ${product.category}</p>
      <div class="product-page-img-container">
        <img src=${product.image} class="product-page-img" alt=${product.title}>
      </div>
      <h3 class="product-page-price">€${product.price.toFixed(2)}</h3>
      <p class="product-page-addToCart-area">
      
       <input type="number" class="product-page-no-products" value="1" readonly="true"></input>
       <button class="product-page-cart-minus">-</button>
       <button class="product-page-cart-plus">+</button>
       <button class="product-page-addToCart-btn">Add To Cart</button>
       
      </p>
      <p>
        <a href="./cart.html">
          <button class="goto-checkout-btn">Go To Checkout</button>
        </a>
      </p>
      <h2>Description:</h2><br>
      <p class="product-page-description">${product.description}</p>
      <p class="product-page-rating">Rating: ${product.rating.rate}/5 (${
        product.rating.count
      } ratings)</p>
      

      `;

      const numberInput = document.querySelector(".product-page-no-products");

      let numberOfProductsInCart = parseInt(numberInput.value);

      const buttonDecrease = document.querySelector(".product-page-cart-minus");
      const buttonIncrease = document.querySelector(".product-page-cart-plus");
      const buttonAddToCart = document.querySelector(
        ".product-page-addToCart-btn"
      );

      buttonIncrease.addEventListener("click", () => {
        numberOfProductsInCart++;
        numberInput.value = numberOfProductsInCart.toString();
      });

      buttonDecrease.addEventListener("click", () => {
        if (numberOfProductsInCart <= 1) return;
        numberOfProductsInCart--;

        numberInput.value = numberOfProductsInCart.toString();
      });

      let cartArray = [];

      buttonAddToCart.addEventListener("click", () => {
        cartArray = JSON.parse(localStorage.getItem("cart"));
        if (cartArray === null) cartArray = [];

        const currentProduct = {
          id: productId,
          image: product.image,
          title: product.title,
          quantity: numberOfProductsInCart,
          pricePerUnit: product.price,
          get priceAllProductItems() {
            return this.quantity * this.pricePerUnit;
          },
        };

        let indexToUpdate;

        cartArray.forEach((product) => {
          if (product.id === currentProduct.id) {
            indexToUpdate = cartArray.indexOf(product);

            currentProduct.quantity =
              currentProduct.quantity + product.quantity;
            cartArray.splice(indexToUpdate, 1);
          } else return;
        });

        cartArray.push(currentProduct);

        localStorage.setItem("cart", JSON.stringify(cartArray));
      });
    });
};

showProductPage(productId);
