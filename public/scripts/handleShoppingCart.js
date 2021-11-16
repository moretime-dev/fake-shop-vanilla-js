"usestrict";

const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const shoppingCartContainer = document.querySelector(".shopping-cart");

const displayShoppingCart = () => {
  shoppingCartContainer.innerHTML += `
   <section class="shopping-cart">
      <section class="shopping-cart-header">
         <div class="shopping-cart-column"></div>
         <i class="shopping-cart-column">Product Name</i>
         <i class="shopping-cart-column">Quantity</i>
         <i class="shopping-cart-column">Price</i>
         <i class="shopping-cart-column">Price Total</i>
         <div class="shopping-cart-column"></div>
      </section>`;

  shoppingCartFromLocalStorage.map((item) => {
    shoppingCartContainer.innerHTML += `
   
     <section class="shopping-cart-content">
      <div style="display: none">${item.id}</div>
       <div class="shopping-cart-columnn"><img src=${item.image} alt=${
      item.title
    } class="shopping-cart-img"></div>
       <div class="shopping-cart-column">${item.title}</div>
       <div class="shopping-cart-column">${item.quantity}</div>
       <div class="shopping-cart-column">€${item.pricePerUnit.toFixed(2)}</div>
       <div class="shopping-cart-column">€${item.priceAllProductItems.toFixed(
         2
       )}</div>
       <div class="shopping-cart-column"><img src="./img/trash.svg" class="shopping-cart-delete"></div>
     </section>
   
   </section>
      `;

    const deleteBtn = document.querySelectorAll(".shopping-cart-delete");

    deleteBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        // console.log(
        //   deleteBtn.parentElement.parentElement.children[1].textContent
        // );

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

        if (shoppingCartFromLocalStorage.length === 0) {
          shoppingCartContainer.innerHTML = `
        
        <h3 class="shopping-cart-empty-message">You don't have any items in your shopping cart yet. Shop NOW!</h3>
        
        `;
        } else {
          displayShoppingCart();
        }
      });
    });
  });
};

if (shoppingCartFromLocalStorage.length === 0) {
  shoppingCartContainer.innerHTML = `
 
 <h3 class="shopping-cart-empty-message">You don't have any items in your shopping cart yet. Shop NOW!</h3>
 
 `;
} else {
  displayShoppingCart();
}
