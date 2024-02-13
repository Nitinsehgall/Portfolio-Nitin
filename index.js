let cvbtn=document.querySelector("#cvBtn");
let submit=document.querySelector("#Submit");
cvbtn.addEventListener("click",Click=()=>{
    alert("Download Successfully")
})



submit.addEventListener("click",form=()=>{
    let email=document.querySelector("#Email");
    let msg=document.querySelector("#Message");

if(email.value==""&& msg.value==""){
    alert("* fields are Required");
}else{
   alert("logged in")
}

})
