"usestrict";

const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const shoppingCartContainer = document.querySelector(".shopping-cart");

const displayShoppingCart = () => {
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
        <div class="shopping-cart-column shopping-cart-title">${
          item.title
        }</div>

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
  });
};

const checkIfShoppingCartIsEmpty = () => {
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

const calculcateOrderTotal = () => {
  const displayOrderTotal = document.querySelector(".order-total");

  let orderTotal = 0;
  shoppingCartFromLocalStorage.forEach((product) => {
    orderTotal += product.priceAllProductItems;
  });

  console.log(orderTotal);
  displayOrderTotal.innerHTML = `<i>ORDER TOTAL: €${orderTotal.toFixed(2)}</i>`;
};

checkIfShoppingCartIsEmpty();
