
document.addEventListener('DOMContentLoaded' , function() {
    document.getElementById("signup").addEventListener("submit" , function(event){
        event.preventDefault();

        let username = document.getElementById('username1').value;
        let phone = document.getElementById('phone1').value;
        let password = document.getElementById('password1').value;
        let comfirmPassword = document.getElementById('ComfirmPassword').value;

        if(username === ''){
            alert("username is not empty")
            return;
        }
        if(phone === ''){
            alert("phone is not empty")
            return;
        }
        if(password === ''){
            alert("password is not empty")
            return;
        }
        if(comfirmPassword === ''){
            alert("comfirmPassword is not empty")
            return;
        }
        if(password != comfirmPassword){
            alert("comfirm not correct")
            return;
        }

        let dataUser = {
            id: (Math.floor(Math.random() * 9999) + 1) + "" ,
            username: username,
            password: password,
            phone: phone+"",
        }
        

        fetch('http://localhost:3000/user' , {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(dataUser)
        })
        .then(res => res.json())
        .then(data => {
            alert("Singup successfully")
            console.log("Success" , data);
        })
        .catch((error) => {
            console.error('error', error);
        })
    })
})