let cvbtn=document.querySelector("#cvBtn");
let submit=document.querySelector("#Submit");
let bar=document.querySelector("#bar");

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

    let ul=document.querySelector('ul')

bar.addEventListener("click",Click=()=>{
        ul.classList.toggle('showData')
        if(ul.className=='showData'){
            bar.className='fa-solid fa-xmark'
          
        }else{
            bar.className='fa-solid fa-bars'

        }
    })