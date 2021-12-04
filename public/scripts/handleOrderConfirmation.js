"usestrict";

const displayAddressData = document.querySelector(".order-confirmation");
const addressData = JSON.parse(localStorage.getItem("userAddress"));
const paymentOption = localStorage.getItem("paymentOption");

console.log(addressData);

displayAddressData.innerHTML += `
      <section class="user-address">
         <div>First Name: ${addressData.firstName}</div>
         <div>Last Name: ${addressData.lastName}</div>
         <div>Street: ${addressData.street}</div>
         <div>Zip Code: ${addressData.zip}</div>
         <div>City: ${addressData.city}</div>
         <div>Email: ${addressData.email}</div>

         <div>Payment via ${paymentOption}</div>
      
      </section>
   
   
   `;
