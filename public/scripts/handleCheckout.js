"usestrict";

const checkoutContents = document.querySelector(".checkout-contents");

const orderTotal = localStorage.getItem("orderTotal");
const vat = (orderTotal / 119) * 19;

checkoutContents.innerHTML += `    
<form>   
   <section class="payment-options">
      <div class="payment-option">
         <input type="radio" value="paypal" name="payment-options" required="required">
         <label for="paypal">PayPal</label>
      </div>
      <div class="payment-option">
         <input type="radio" value="crecit-card" name="payment-options" required="required">
         <label for="paypal">Credit Card</label>
      </div>
      <div class="payment-option">
         <input type="radio" value="bank-transfer" name="payment-options" required="required">
         <label for="paypal">Bank Transfer</label>
      </div>
   </section>

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
         <label for="email">Email:</label>
         <input name="address" class="contact-form" type="email" required="required">
      </div>
   </section>


   <section class="order-total-checkout">
      ORDER TOTAL: €${orderTotal}
      <br>
      <div class="vat">(Included VAT: €${vat.toFixed(2)})</div>

   </section>

   <button class="order-now-btn"><a href="./orderConfirmationPage.html">ORDER NOW</a></button>

</form>
`;

const orderNowButton = document.querySelector(".order-now-btn");

const contactFormInputs = document.querySelectorAll(".contact-form");

orderNowButton.addEventListener("click", (e) => {
  const userAddress = {
    FirstName: contactFormInputs[0].value,
    lastName: contactFormInputs[1].value,
    street: contactFormInputs[2].value,
    zip: contactFormInputs[3].value,
    email: contactFormInputs[4].value,
  };

  localStorage.setItem("userAddress", JSON.stringify(userAddress));
});
