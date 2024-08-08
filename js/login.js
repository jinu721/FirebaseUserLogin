
const inpEmail = document.getElementById('inp-LoginEmail');
const inpPass = document.getElementById('inp-LoginPass');
const btnLogin = document.getElementById('btn-login');
const txtLogin = document.getElementById('txt-login');
const loderLogin = document.getElementById('loader-login');

btnLogin.addEventListener('click',()=>{
  const val = emailAndPassValidation(inpEmail,inpPass);
  if(val){
    txtLogin.style.display = "none";
    loderLogin.style.display = "block";
    auth.signInWithEmailAndPassword(inpEmail.value,inpPass.value).then(()=>{
      window.location.href = "../home.html"
    }).catch((error)=>{
      alert("Error msg : "+error);
    })
  }
})

// email and password validation
let emailAndPassValidation = (emailInp,passwordInp)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailInp.value==""){
      alert("Email can't be empty");
    }else if(!emailPattern.test(emailInp.value)){
      alert("Enter a valid email address");
    }else if(passwordInp.value==""){
      alert("Password can't be empty");
    }else if(passwordInp.value.length<6){
      alert("Password should be at least 6 characters");
    }else{
      return true;
    }
  }

  document.getElementById('txt-RegisterNewAccount').addEventListener('click',()=> window.location.href = "../register.html")