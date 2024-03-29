document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/product')
        .then(response => response.json())
        .then(data => {
            const rowElement = document.getElementById('productLoad');
            rowElement.innerHTML = '';
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col', 'mb-5');
                productCard.innerHTML = `
                    <div class="card h-100" data-gender="${product.gender}">
                        <!-- Sale badge (nếu có) -->
                        ${product.sale ? '<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>' : ''}
                        <!-- Product image -->
                        <img class="card-img-top" src="${product.image}" alt="...">
                        <!-- Product details -->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name -->
                                <h5 class="fw-bolder">${product.name}</h5>
                                <!-- Product reviews -->
                                <!-- Product price -->
                                ${product.sale ? '<span class="text-muted text-decoration-line-through">' + product.oldPrice + '</span>' : ''}
                               <span> ${product.price}</span>
                            </div>
                        </div>
                        <!-- Product actions -->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div id="addToCart" class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                        </div>
                    </div>
                `;
                // Thêm sản phẩm vào phần tử .row
                rowElement.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});


