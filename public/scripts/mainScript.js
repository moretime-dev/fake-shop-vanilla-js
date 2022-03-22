"use strict";

const apiUrl = "https://fakestoreapi.com/products/";

const categories = document.querySelector(".categories");
const productsPreviews = document.querySelector(".products-main");
const numberOfProductsInShoppingCart = document.querySelector(
  ".number-of-products"
);

let categoriesArray = [];

document.addEventListener("DOMContentLoaded", () => {
  const getCategories = async () => {
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((json) =>
        json.forEach((product) => {
          categoriesArray.push(product.category);
        })
      );
    categoriesArray = Array.from(new Set(categoriesArray));

    if (categories) {
      displayCategories();
    }
  };

  const displayCategories = () => {
    categories.innerHTML += `<li class="category">all</li>`;
    categoriesArray.map((category) => {
      categories.innerHTML += `<li class="category">${category}</li>`;
    });
  };

  getCategories();

  const displayProductPreviews = async () => {
    let currentCategory = localStorage.getItem("currentCategory");
    const shoppingCartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart")
    );

    if (!shoppingCartFromLocalStorage) {
      numberOfProductsInShoppingCart.textContent = 0;
    } else {
      numberOfProductsInShoppingCart.textContent =
        shoppingCartFromLocalStorage.length;
    }

    await fetch(apiUrl)
      .then((res) => res.json())
      .then((json) =>
        json.map((product) => {
          let filteredProducts = json.filter(
            (product) => product.category === currentCategory
          );

          if (filteredProducts.length > 0) {
            productsPreviews.innerHTML = "";
            filteredProducts.map((product) => {
              productsPreviews.innerHTML += `
            <section class="product-preview-container">
              <a href="./product.html">
                <h2 style="display: none">${product.id}</h2>
                <div class="product-preview-img-container">
                  <img src=${product.image} class="product-preview-img" alt=${
                product.title
              }></div>
                <h2 class="product-preview-title">${product.title}</h2><br><br>
                <h3 class="product-preview-price">€${product.price.toFixed(
                  2
                )}</h3>
              </a>
            </section>`;
            });
          } else {
            productsPreviews.innerHTML += `
            <section class="product-preview-container">
              <a href="./product.html">
                <h2 style="display: none">${product.id}</h2>
                <div class="product-preview-img-container">
                  <img src=${product.image} class="product-preview-img" alt=${
              product.title
            }>
                </div>
                <h2 class="product-preview-title">${product.title}</h2><br><br>
               <h3 class="product-preview-price">€${product.price.toFixed(
                 2
               )}</h3>
              </a>
            </section>`;
          }
        })
      );

    const categoryList = document.querySelectorAll(".category");
    const productLinks = document.querySelectorAll(
      ".product-preview-container"
    );

    filterCategories(categoryList);
    setProductId(productLinks);
    setCategory(categoryList);
  };

  if (productsPreviews) {
    displayProductPreviews();
  }

  const filterCategories = (categoryList) => {
    categoryList.forEach((category) => {
      category.addEventListener("click", () => {
        fetch(apiUrl)
          .then((res) => res.json())
          .then((json) => {
            let filteredProducts;

            filteredProducts = json.filter(
              (product) => product.category === category.textContent
            );

            productsPreviews.innerHTML = "";

            if (filteredProducts.length > 0) {
              filteredProducts.map((product) => {
                productsPreviews.innerHTML += `
              <section class="product-preview-container">
                <a href="./product.html">
                  <h2 style="display: none">${product.id}</h2>
                  <div class="product-preview-img-container">
                    <img src=${product.image} class="product-preview-img" alt=${
                  product.title
                }></div>
                  <h2 class="product-preview-title">${
                    product.title
                  }</h2><br><br>
                  <h3 class="product-preview-price">€${product.price.toFixed(
                    2
                  )}</h3>
                </a>
              </section>`;
              });
            } else {
              window.location.reload();
            }

            const productLinks = document.querySelectorAll(
              ".product-preview-container"
            );

            setProductId(productLinks);
          });
      });
    });

    categoryList;
  };

  const setProductId = (productLinks) => {
    productLinks.forEach((productLink) => {
      productLink.addEventListener("click", () => {
        /** Hier ist die ID in einer h2 */
        let productId = productLink.children[0].children[0].textContent;

        localStorage.setItem("currentProductId", productId);
      });
    });
  };

  const setCategory = (categoryList) => {
    categoryList.forEach((category) => {
      category.addEventListener("click", () => {
        localStorage.setItem("currentCategory", category.textContent);
      });
    });
  };
});
