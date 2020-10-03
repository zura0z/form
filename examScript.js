 var invalidMsg = document.createElement('div'); 
 invalidMsg.setAttribute('class', 'invalid-feedback mt-2'); 
 invalidMsg.innerHTML = 'Fill every input';

 var invalidPass = document.createElement('div'); 
 invalidPass.setAttribute('class', 'invalid-feedback mt-2'); 
 invalidPass.innerHTML = 'Passwords Don\'t match';

 var invalidEmail = document.createElement('div'); 
 invalidEmail.setAttribute('class', 'invalid-feedback mt-2'); 
 invalidEmail.innerHTML = 'Invalid Email';


var firstName = document.querySelector('#fname');
var lastName = document.querySelector('#lname');
var email = document.querySelector('#email');
var password1 = document.querySelector('#pass1');
var password2 = document.querySelector('#pass2');
var country = document.querySelector('#country');
var city = document.querySelector('#city');
var radio1 = document.querySelector('#customRadioInline1');
var radio2 = document.querySelector('#customRadioInline2');
var submit = document.querySelector('#btn');
var inputs = document.querySelectorAll('input');
var city = document.querySelector('#city');
var country = document.querySelector('#country');
var ok = false;

submit.addEventListener('click', validation);
radio1.addEventListener('click', radio);
radio2.addEventListener('click', radio);
city.addEventListener('change', select);
country.addEventListener('change', select);



function validation(){
    
            for(let i = 0; i<=inputs.length-4; i++){
                if((inputs[i].value).trim() === ''){
                    event.preventDefault();
                     inputs[i].classList.add('is-invalid');
                     document.querySelector('#msg').appendChild(invalidMsg);
                     ok = false
                } else{
                    inputs[i].classList.remove('is-invalid');
                    inputs[i].classList.add('is-valid');
                    ok = true;
                } 
               
            }
                if(radio1.checked === false && radio2.checked === false){
                    event.preventDefault();
                     radio1.classList.add('is-invalid');
                     radio2.classList.add('is-invalid');
                     document.querySelector('#msg').appendChild(invalidMsg);
                     ok = false;
                } else{
                        radio2.classList.remove('is-invalid');
                        radio1.classList.remove('is-invalid');
                        ok = true;
                        }
              if((firstName.value).length<5){
                  event.preventDefault();
                 firstName.classList.add('is-invalid');
                 ok =false;
                }
            if((lastName.value).length<5){
                  event.preventDefault();
                  lastName.classList.add('is-invalid');
                  ok = false;
                }

            if(password1.value !== password2.value){
                event.preventDefault();
                password2.classList.add('is-invalid');
                invalidPass.style.color = 'red';
                invalidPass.innerHTML = 'Passwords Don\'t match';
                document.querySelector('#pass').appendChild(invalidPass);
                ok = false;
            } else if(password1.value === password2.value && password2.value!=='') {
                password2.classList.remove('is-invalid');
                invalidPass.innerHTML = 'Looks Good!'
                invalidPass.style.color = 'green';
                password1.classList.add('is-valid');
                password2.classList.add('is-valid');
                ok = true;
                
            } 
            if((password1.value).length<8){
                event.preventDefault();
                password1.classList.add('is-invalid');
                password2.classList.add('is-invalid');
                invalidPass.style.color = 'red';
                invalidPass.innerHTML = 'Password length is less then 8';
                ok = false;
            }

         if(!(email.value).includes('@') || !(email.value).includes('.') || (email.value).length<5){
            event.preventDefault();
            email.classList.add('is-invalid');
                document.querySelector('#emailDiv').appendChild(invalidEmail);
                invalidEmail.innerHTML = 'Email is invalid'
                invalidEmail.style.color = 'red';
                ok = false;
         } else{
            document.querySelector('#emailDiv').appendChild(invalidEmail);
             invalidEmail.innerHTML = 'Looks Good!'
             invalidEmail.style.color = 'green';
            
         } 
         if(country.selectedIndex === 0){
            event.preventDefault();
            country.classList.add('is-invalid');    
            ok = false;
         }
         if(city.selectedIndex === 0){
            event.preventDefault();
            city.classList.add('is-invalid');    
            ok = false;
         }
         if (ok === false){
            event.preventDefault();
         } else{
             event.preventDefault();
             sendData();
         }
    }

    function select(){
         if(city.selectedIndex != 0){
            city.classList.add('is-valid');
            city.classList.remove('is-invalid');
         } 
        if(country.selectedIndex != 0) 
            country.classList.add('is-valid');  
            country.classList.remove('is-invalid');  
    }
    function radio(){
        if(radio1.checked === true || radio2.checked === true){
        radio2.classList.remove('is-invalid');
        radio1.classList.remove('is-invalid');
         }
    }    

    ///////////////////

  const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
      if (response.status >= 400) {
        return response.json().then(errResData => {
          const error = new Error('Something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
    });
  };
  
  function sendData() {
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  };