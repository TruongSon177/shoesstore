document.addEventListener('DOMContentLoaded', function() {
    const rowElement = document.getElementById('productLoad');

    // Lắng nghe sự kiện click cho các nút "Add to cart"
    rowElement.addEventListener('click', function(event) {
        // Kiểm tra xem nút được nhấn có phải là nút "Add to cart" hay không
        if (event.target.matches('.btn-outline-dark')) {
            // Ngăn chặn hành động mặc định của nút
            event.preventDefault();

            const loggedInUsername = localStorage.getItem('loggedInUsername');

            // Kiểm tra nếu người dùng đã đăng nhập
            if (loggedInUsername) {
                const productElement = event.target.closest('.card');
                const productName = productElement.querySelector('.fw-bolder').textContent;
                const productPrice = parseFloat(productElement.querySelector('.text-center').lastElementChild.textContent);
                const productImage = productElement.querySelector('.card-img-top').getAttribute('src');

                // Tạo payload dữ liệu để gửi đến API
                const payload = {
                    id: (Math.floor(Math.random() * 9999) + 1) + "" ,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                // Gửi yêu cầu POST đến API để thêm sản phẩm vào giỏ hàng
                fetch('http://localhost:3000/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (response.ok) {
                        alert('Sản phẩm đã được thêm vào giỏ hàng!');
                        window.location.reload(); 
                    } else {
                        throw new Error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
                    }
                })
                .catch(error => {
                    console.error('Lỗi:', error);
                });
            } else {
                alert('Bạn chưa đăng nhập! Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
            }
        }
    });
});
