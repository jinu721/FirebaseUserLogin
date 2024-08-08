const avatar = document.getElementById("img-profileHome");
const nickname = document.getElementById("txt-nickname");
const username = document.getElementById("txt-username");
const uid = document.getElementById("txt-uid");
const email = document.getElementById("txt-email");
const btnLogout = document.getElementById("btn-logout");
const btnEdit = document.getElementById("btn-edit");
const popup = document.getElementById("popup");
const avtarpopup = document.getElementById("img-popup");
const nicknamepopup = document.getElementById("inp-nickname");
const usernamepopup = document.getElementById("inp-username");
const emailpopup = document.getElementById("inp-email");
const btnCancel = document.getElementById("btn-cancel");
const btnUpdate = document.getElementById("btn-update");
const inpFile = document.getElementById("inp-file");

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    const uid = user.uid;
    const userRef = database.ref("users/" + uid);
    userRef.once("value").then((snapshot) => {
      const userData = snapshot.val();
      avatar.src = userData.avatar;
      nickname.innerText = "Nickname : "+userData.nickname;
      username.innerText = "Username : "+userData.username;
      uid.innerText = "UID : "+userData.uid;
      email.innerText = "Email : "+userData.email;
      avtarpopup.src = userData.avatar;
      nicknamepopup.value = userData.nickname;
      usernamepopup.value = userData.username;
      emailpopup.value = userData.email;
    });
  });
});


btnEdit.addEventListener('click',()=>{
    popup.style.display = "block"
    auth.onAuthStateChanged((user)=>{
      const uid = user.uid;
      const userRef =  database.ref('users/'+uid);
      userRef.once('value').then((snapshot)=>{
        const userData = snapshot.val();
        // userData.avatar =
      })
    })
})

btnLogout.addEventListener('click',()=>{
  auth.signOut().then(()=>{
    window.location.href = "../register.html"
  })
})

btnCancel.addEventListener('click',()=>{
    popup.style.display = "none"
})

btnUpdate.addEventListener('click',()=>{
  updateData();
})


// avatar picker

avtarpopup.addEventListener('click',()=>{
  inpFile.click();
})

let imgFile;

inpFile.addEventListener('change',(event)=>{
  const file = event.target.files[0];
  const imgUrl = URL.createObjectURL(file);
  avtarpopup.src = imgUrl;
  imgFile = file;
})

let updateData = ()=>{
  auth.onAuthStateChanged((user)=>{
    const uid = user.uid;
    const userRef = database.ref('users/'+uid);
    userRef.once('value').then((snapshot)=>{
      const dataRef = snapshot.val();
      if(imgFile){
        auth.onAuthStateChanged((user)=>{
          const uid = user.uid;
          const storageRef = storage.ref('profile-images/'+uid);
          storageRef.put(imgFile).then((imageDetails)=>{
            return imageDetails.ref.getDownloadURL();
          }).then((avatarUrl)=>{
            dataRef.avatar = avatarUrl;
            dataRef.nickname = nicknamepopup.value;
            dataRef.username = usernamepopup.value;
            return userRef.update(dataRef);
          })
        })
      }else{
        console.log("img not picked")
        dataRef.nickname = nicknamepopup.value;
        dataRef.username = usernamepopup.value;
        return userRef.update(dataRef);
      }
    })
  })
  popup.style.display = "none";
}
