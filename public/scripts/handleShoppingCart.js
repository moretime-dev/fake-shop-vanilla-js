"usestrict";

const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const shoppingCartContainer = document.querySelector(".shopping-cart");

const numberOfProductsInShoppingCart = document.querySelector(
  ".number-of-products"
);

const displayShoppingCart = () => {
  const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  numberOfProductsInShoppingCart.textContent =
    shoppingCartFromLocalStorage.length;

  shoppingCartContainer.innerHTML += `
   <section class="shopping-cart">
      <section class="shopping-cart-header">
         <div class="shopping-cart-column"></div>
         <i class="shopping-cart-column shopping-cart-title">Product</i>
         <i class="shopping-cart-column">Quantity</i>
         <i class="shopping-cart-column">Price</i>
         <i class="shopping-cart-column">Total</i>
         <div class="shopping-cart-column"></div>
      </section>
    </section>`;

  shoppingCartFromLocalStorage.map((item) => {
    shoppingCartContainer.innerHTML += `
   
    <section class="shopping-cart">
      <section class="shopping-cart-content">
        <div style="display: none">${item.id}</div>
        <div class="shopping-cart-columnn img">
          <img src=${item.image} alt=${
      item.title
    } class="shopping-cart-img"></div>
        <div class="shopping-cart-column shopping-cart-title">
          <a href="./product.html" class="link-to-product">${
            item.title
          }</a></div>

        <div class="shopping-cart-quantity">
          <input type="number" class="shopping-cart-no-products" value=${
            item.quantity
          } readonly="true"></input>
          <button class="shopping-cart-page-minus">-</button>
          <button class="shopping-cart-page-plus">+</button>
        </div>

        <div class="shopping-cart-column price">€${item.pricePerUnit.toFixed(
          2
        )}</div>
        <div class="shopping-cart-column price">€${item.priceAllProductItems.toFixed(
          2
        )}</div>
        <div class="shopping-cart-column delete"> 
            <img src="./img/trash.svg" class="shopping-cart-delete">
        </div>
      </section>
    
     </section>
    </section>

      `;

    /** Set Product ID For Title Link */

    const itemLinks = document.querySelectorAll(".link-to-product");

    itemLinks.forEach((itemLink) => {
      itemLink.addEventListener("click", () => {
        const productId =
          itemLink.parentElement.parentElement.children[0].textContent;

        localStorage.setItem("currentProductId", productId);
      });
    });

    /** Set Product ID For Title Link END */

    /** Change Item Quantity */

    const buttonDecrease = document.querySelectorAll(
      ".shopping-cart-page-minus"
    );
    const buttonIncrease = document.querySelectorAll(
      ".shopping-cart-page-plus"
    );

    const numberInputs = document.querySelectorAll(
      ".shopping-cart-no-products"
    );

    const recalculateCart = (item, numberOfItems) => {
      let cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      cartFromLocalStorage.forEach((product) => {
        if (product.id === item) {
          let index = cartFromLocalStorage.indexOf(product);

          cartFromLocalStorage[index].quantity = numberOfItems;
          cartFromLocalStorage[index].priceAllProductItems =
            numberOfItems * product.pricePerUnit;

          localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
        }
      });

      window.location.reload();
    };

    buttonIncrease.forEach((btnIncrease) => {
      btnIncrease.addEventListener("click", () => {
        let itemToIncrease =
          btnIncrease.parentElement.parentElement.children[0].textContent;
        numberInputs.forEach((numberInput) => {
          let inputFieldToIncrease =
            numberInput.parentElement.parentElement.children[0].textContent;

          if (inputFieldToIncrease === itemToIncrease) {
            let numberOfItems = parseInt(numberInput.value);
            numberOfItems++;
            numberInput.value = numberOfItems.toString();

            recalculateCart(itemToIncrease, numberOfItems);
          }
        });
      });
    });

    buttonDecrease.forEach((btnDecrease) => {
      btnDecrease.addEventListener("click", () => {
        let itemToIncrease =
          btnDecrease.parentElement.parentElement.children[0].textContent;
        numberInputs.forEach((numberInput) => {
          let inputFieldToIncrease =
            numberInput.parentElement.parentElement.children[0].textContent;
          if (inputFieldToIncrease === itemToIncrease) {
            let numberOfItems = parseInt(numberInput.value);
            if (numberOfItems <= 1) return;
            numberOfItems--;
            numberInput.value = numberOfItems.toString();

            recalculateCart(itemToIncrease, numberOfItems);
          }
        });
      });
    });

    /** Change Item Quantity END*/

    /** Delete Item From Cart */

    const deleteBtn = document.querySelectorAll(".shopping-cart-delete");

    deleteBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        let itemToDelete =
          deleteBtn.parentElement.parentElement.children[0].textContent;

        shoppingCartFromLocalStorage.forEach((itemInCart) => {
          if (itemInCart.id === itemToDelete) {
            let index = shoppingCartFromLocalStorage.indexOf(itemInCart);
            shoppingCartFromLocalStorage.splice(index, 1);
            localStorage.setItem(
              "cart",
              JSON.stringify(shoppingCartFromLocalStorage)
            );
          }
        });

        shoppingCartContainer.innerHTML = "";

        checkIfShoppingCartIsEmpty();
      });
    });

    /** Delete Item From Cart END */
  });
};

/** Check Shopping Cart Contents */

const checkIfShoppingCartIsEmpty = () => {
  const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  const displayOrderTotal = document.querySelector(".order-total");
  const cartEmptyMessage = document.querySelector(
    ".shopping-cart-empty-message"
  );
  if (shoppingCartFromLocalStorage.length === 0) {
    displayOrderTotal.innerHTML = "";
    cartEmptyMessage.innerHTML = `
   
   <h3 class="shopping-cart-empty-message">You don't have any items in your shopping cart yet. Shop NOW!</h3>
   
   `;
  } else {
    calculcateOrderTotal();
    displayShoppingCart();
  }
};

/** Check Shopping Cart Contents END*/

/** Calculate Order Total */

const calculcateOrderTotal = () => {
  const displayOrderTotal = document.querySelector(".order-total");

  let orderTotal = 0;
  shoppingCartFromLocalStorage.forEach((product) => {
    orderTotal += product.priceAllProductItems;
  });

  localStorage.setItem("orderTotal", orderTotal.toFixed(2));

  displayOrderTotal.innerHTML = `
  <i>ORDER TOTAL: €${orderTotal.toFixed(2)}</i>
  <br>
  <a href="./checkout.html"><button class="goto-checkout-btn">Go To Checkout</button></a>`;
};

/** Calculate Order Total END */

/** Initialize Shopping Cart Page */

checkIfShoppingCartIsEmpty();

/** Initialize Shopping Cart Page END */
