document.addEventListener('DOMContentLoaded', function () {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const loginElement = document.getElementById("login1");
    const signupElement = document.getElementById('signup1');
    let userData = [];

    if (loggedInUsername) {
        // Hiển thị chào mừng nếu đã đăng nhập
        loginElement.innerText = "Xin chào " + loggedInUsername;
        loginElement.style.width = "138px";

        // Ẩn nút đăng ký
        signupElement.style.display = 'none';

        // Tạo nút logout
        const logoutButton = document.createElement('button');
        logoutButton.innerText = 'Logout';
        logoutButton.id = 'logoutButton';
        logoutButton.classList.add('btn', 'btn-secondary');
        logoutButton.addEventListener('click', function () {
            // Xử lý đăng xuất
            localStorage.removeItem('loggedInUsername');
            loginElement.innerText = 'Login'; // Đặt lại nút "Login"
            signupElement.style.display = 'block'; // Hiển thị lại nút đăng ký
            logoutButton.style.display = 'none'; // Ẩn nút logout
        });

        // Thêm nút logout vào cùng hàng với nút "Xin chào"
        loginElement.parentNode.insertBefore(logoutButton, loginElement.nextSibling);
    } else {
        // Nếu không có tên người dùng được lưu, hiển thị lại nút đăng ký
        signupElement.style.display = 'block';
    }

    document.getElementById("loginButton").addEventListener("click", function () {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
      
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            userData = data;
            console.log('Dữ liệu người dùng:', userData);

            let isLoginSuccessful = false;
            userData.forEach(user => {
                if (username === user.username && password === user.password) {
                    isLoginSuccessful = true;
                    return;
                }
            });

            if (isLoginSuccessful) {
                localStorage.setItem('loggedInUsername', username);

                // Hiển thị chào mừng
                loginElement.innerText = "Xin chào " + username;
                loginElement.style.width = "138px";
                loginElement.disabled = true;
                // Ẩn nút đăng ký
                signupElement.style.display = 'none';
               

                // Tạo nút logout
                const logoutButton = document.createElement('button');
                logoutButton.innerText = 'Logout';
                logoutButton.id = 'logoutButton';
                logoutButton.classList.add('btn', 'btn-secondary');
                logoutButton.style.marginLeft = '10px';
                logoutButton.addEventListener('click', function () {
                    // Xử lý đăng xuất
                    localStorage.removeItem('loggedInUsername');
                    loginElement.innerText = 'Login'; // Đặt lại nút "Login"
                    signupElement.style.display = 'block'; // Hiển thị lại nút đăng ký
                    logoutButton.style.display = 'none'; // Ẩn nút logout
                    loginElement.disabled = false;
                });

                // Thêm nút logout vào cùng hàng với nút "Xin chào"
                loginElement.parentNode.insertBefore(logoutButton, loginElement.nextSibling);

                alert("Đăng nhập thành công!");
            } else {
                alert("Đăng nhập thất bại! Vui lòng kiểm tra lại tên người dùng và mật khẩu.");
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert("Đã xảy ra lỗi khi đăng nhập.");
        });
    });
});
