document.addEventListener('DOMContentLoaded', function() {
    const cartTotalElement = document.getElementById('cart-total');

    cartTotalElement.addEventListener('click', function(event) {
        if (event.target.matches('#removeCart')) {
            event.preventDefault();

            // Lấy ID sản phẩm từ phần tử HTML
            const productId = document.getElementById('idRemove').textContent;

            // Gửi yêu cầu DELETE đến API với ID sản phẩm
            fetch(`http://localhost:3000/cart/${productId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Nếu xóa thành công, làm mới trang để cập nhật giỏ hàng
                    window.location.reload();
                } else {
                    throw new Error('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.');
                }
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
        }
    });
});
