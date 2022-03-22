"use strict";

const checkoutContents = document.querySelector(".checkout-contents");

const numberOfProductsInShoppingCart = document.querySelector(
  ".number-of-products"
);

const shoppingCartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (!shoppingCartFromLocalStorage) {
  numberOfProductsInShoppingCart.textContent = 0;
} else {
  numberOfProductsInShoppingCart.textContent =
    shoppingCartFromLocalStorage.length;
}

const orderTotal = localStorage.getItem("orderTotal");
const vat = (orderTotal / 119) * 19;

checkoutContents.innerHTML += `    
<form>   
   <section class="payment-options">
      <div class="payment-option">
         <input type="radio" value="Credit Card" name="payment-options" required="required" checked>
         <label for="paypal">Credit Card</label>
      </div>

      <div class="payment-option">
         <input type="radio" value="Paypal" name="payment-options" required="required">
         <label for="paypal">PayPal</label>
      </div>

      <div class="payment-option">
         <input type="radio" value="Bank Transfer" name="payment-options" required="required">
         <label for="paypal">Bank Transfer</label>
      </div>
   </section>

   <section class="warning"></section>

   <section id="address">
      <div>
         <label for="first-name">First Name:</label>
         <input name="name" class="contact-form" type="text" required="required">
      </div>

      <div>
         <label for="last-name">Last Name:</label>
         <input name="last-name" class="contact-form" type="text" required="required">
      </div>

      <div>
         <label for="street-name">Street:</label>
         <input name="address" class="contact-form" type="text" required="required">
      </div>

      <div>
         <label for="zip-code">Zip Code:</label>
         <input name="address" class="contact-form" type="number" required="required">
      </div>

      <div>
         <label for="city">City:</label>
         <input name="address" class="contact-form" type="text" required="required">
      </div>
      
      <div>
         <label for="email">Email:</label>
         <input name="address" class="contact-form" type="email" required="required">
      </div>
   </section>


   <section class="order-total-checkout">
      ORDER TOTAL: €${orderTotal}
      <br>
      <div class="vat">(Included VAT: €${vat.toFixed(2)})</div>

   </section>

   <button class="order-now-btn">ORDER NOW</button>

</form>
`;

const contactFormInputs = document.querySelectorAll(".contact-form");

const checkPaymentOption = () => {
  const paymentOption = document.querySelector(
    "input[name=payment-options]:checked"
  ).value;

  localStorage.setItem("paymentOption", paymentOption);
};

const warning = document.querySelector(".warning");

let formDataisValid = false;

const checkInputFields = () => {
  if (contactFormInputs[0].value.length < 2) {
    warning.innerHTML = `<p>Please Enter First Name!</p>`;
    return;
  } else if (contactFormInputs[1].value.length < 2) {
    warning.innerHTML = `<p>Please Enter Last Name!</p>`;
    return;
  } else if (contactFormInputs[2].value.length < 3) {
    warning.innerHTML = `<p>Please Enter Street Name!</p>`;
    return;
  } else if (
    contactFormInputs[3].value.length !== 5 ||
    parseInt(contactFormInputs[3].value) === isNaN
  ) {
    warning.innerHTML = `<p>Please Enter Valid Zip Code!</p>`;
    return;
  } else if (contactFormInputs[4].value.length < 3) {
    warning.innerHTML = `<p>Please Enter City!</p>`;
    return;
  } else if (!contactFormInputs[5].value.includes("@")) {
    warning.innerHTML = `<p>Please Enter Valid Email!</p>`;
    return;
  }
  formDataisValid = true;
};

const sendOrder = () => {
  const userAddress = {
    firstName: contactFormInputs[0].value,
    lastName: contactFormInputs[1].value,
    street: contactFormInputs[2].value,
    zip: contactFormInputs[3].value,
    city: contactFormInputs[4].value,
    email: contactFormInputs[5].value,
  };

  localStorage.setItem("userAddress", JSON.stringify(userAddress));

  localStorage.removeItem("cart");
  localStorage.removeItem("orderTotal");
  localStorage.removeItem("currentProductId");
  localStorage.removeItem("currentCategory");

  checkPaymentOption();
  location.href = "./orderConfirmationPage.html";
};

const orderButton = document.querySelector(".order-now-btn");

orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkInputFields();
  if (formDataisValid === true) sendOrder();
});
