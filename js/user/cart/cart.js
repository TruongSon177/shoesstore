document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/cart')
        .then(response => response.json())
        .then(data => {
            const cartTotalElement = document.getElementById('cart-total');
            let total = 0;
            let itemCount = data.length; // Đếm số lượng sản phẩm trong giỏ hàng

            data.forEach(item => {
                total += item.price;
                const productDiv = createProductElement(item);
                cartTotalElement.appendChild(productDiv);
            });
            
            const totalElement = document.getElementById('tongTien');
            totalElement.textContent = `Tổng tiền: $${total.toFixed(2)}`;

            // Hiển thị số lượng sản phẩm trong giỏ hàng
            const slCardElement = document.getElementById('slCard');
            slCardElement.textContent = itemCount;
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
});


function createProductElement(item) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('card', 'mb-3');
    productDiv.innerHTML = `
        <div class="card-body p-4" style="height:190px">
            <div class="text-center">
                <span id="idRemove" style="opacity:0">${item.id}</span>
                <h5 class="fw-bolder">${item.name}</h5>
                <div class="d-flex justify-content-center small text-warning mb-2">
                </div>
                $${item.price}
                <div>
                <button class="btn btn-danger" type="button" id="removeCart">Remove</button>
                </div>
            </div>
        </div>
    `;
    return productDiv;
}
