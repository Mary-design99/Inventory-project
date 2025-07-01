function fetchData() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(productData => {
        const productList = document.getElementById('product-list');
        productData.forEach(product => {
            const productName = product.title;
            const stockLevel = product.rating.count;
            
            const productItem = document.createElement('div');
            productItem.innerHTML = `
  <img src="${product.image}" alt="${productName}" style="width:100px;">
  <h3>${productName}</h3>
  <p>${product.description}</p>
  <p>Stock: ${stockLevel}</p>
`;
            productList.appendChild(productItem);
            if (stockLevel < 250) {
                productItem.style.color = 'red';
            }
            const restockButton = document.createElement('button');
            restockButton.textContent = 'Restock';
            restockButton.classList.add('action-button')
            restockButton.addEventListener('click', () => {
                productItem.innerHTML = `<h3>${productName}</h3><p>Stock: ${stockLevel + 100}</p>`;//when the restock button is clicked,the stock level in creases by 100
            });
            productItem.appendChild(restockButton);
            const formData=document.createElement('form');
            formData.innerHTML = `<input  type="number" placeholder="Enter new stock level" class="stock-input" id="new-stock-${product.id}">
            <button  class="update-action" type="submit">Update Stock</button>`;
            
            formData.addEventListener('submit', (event) => {
                event.preventDefault(); // prevent reloading page
                const newStock = document.getElementById(`new-stock-${product.id}`).value;
                if (newStock) {
                    productItem.innerHTML = `<h3>${productName}</h3><p>Stock: ${newStock}</p>`;
                    if (newStock < 250) {
                        productItem.style.color = 'red';
                    } else {
                        productItem.style.color = 'green';
                    }
                }
            });
            productItem.appendChild(formData);
    });
})
 
}
fetchData()