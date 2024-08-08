
// get DOM elements
const regBg1 = document.getElementById('bg-1');
const regBg2 = document.getElementById('bg-2');
const emailInp = document.getElementById('inp-email');
const passwordInp = document.getElementById('inp-pass');
const nicknameInp = document.getElementById('inp-nickname');
const usernameInp = document.getElementById('inp-username');
const continueBtn = document.getElementById('btn-continue');
const registerBtn = document.getElementById('btn-register');
const txtBtnContinue = document.getElementById('txt-btn1');
const txtBtnRegister = document.getElementById('txt-btn2');
const loaderContinue = document.getElementById('loader-continue');
const loaderRegister = document.getElementById('loader-register');
const profileImage = document.getElementById('img-profile');
const imgPickerInp = document.getElementById('image-picker');

// auth.onAuthStateChanged((user)=>{
//   if(user){
//     window.location.href = "../home.html"
//   }
// })

// continue button click
continueBtn.addEventListener('click',()=>{
  let valid = emailAndPassValidation(emailInp,passwordInp);
  if(valid){
    txtBtnContinue.style.display = "none";
    loaderContinue.style.display = "block";
    setTimeout(()=>{
      txtBtnContinue.style.display = "block";
      loaderContinue.style.display = "none";
      regBg1.style.display = "none";
      regBg2.style.display = "flex";
    },2000)
  }
})

// register button click
registerBtn.addEventListener('click',()=>{
  let [valid,image] = nicknameAndUsernameValidation(nicknameInp,usernameInp);
  if(valid){
    txtBtnRegister.style.display = "none";
    loaderRegister.style.display = "block";
    createAccount(emailInp.value,passwordInp.value,image,nicknameInp.value,usernameInp.value);
  }
})


// create new account and upload datas to real time database
let createAccount = (email,pass,image,nickname,username)=>{
  auth.createUserWithEmailAndPassword(email,pass).then((userArg)=>{
    const uid = userArg.user.uid;
    const imgUpload = storage.ref('profile-images/'+uid);
    imgUpload.put(image).then((imgDetails)=>{
       return imgDetails.ref.getDownloadURL();
    }).then((imgFdbUrl)=>{
      return database.ref('users/'+uid).set({
        uid : uid,
        email : email ,
        avatar : imgFdbUrl,
        nickname : nickname ,
        username : username
      }).then(()=>{
        txtBtnRegister.style.display = "block";
        loaderRegister.style.display = "none";
        setTimeout(()=>{
          window.location.href = "   ../home.html"
        },1000)
      }).catch((error)=>{
        alert(error);
      })
    })
  })
}



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

// pick profile image
let image;
profileImage.addEventListener('click',()=>{
  imgPickerInp.click();
})
imgPickerInp.addEventListener('change',(e)=>{
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  image=file;
  console.log(imageUrl);
  profileImage.src = imageUrl;
})

//  user profile , nickname and username validation
let nicknameAndUsernameValidation = (nicknameInp,usernameInp)=>{
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  if(!image){
    alert("Pick a profile image");
  }else if(nicknameInp.value==""){
    alert("Nickname can't be empty");
  }else if(nicknameInp.value.length>20){
    alert("Nickname should be less then 20 characters");
  }else if(usernameInp.value==""){
    alert("Username can't be empty");
  }else if(usernameInp.value.length<4||usernameInp.value.length>20){
    alert("Username should be between 4 to 20 characters");
  }else if(!usernamePattern.test(usernameInp.value)){
    alert("Username can only contain numbers, lowercase letters and underscores");
  }else{
    return [true,image];
  }
}


document.getElementById('txt-aleardyHave').addEventListener('click',()=> window.location.href = "../login.html")

