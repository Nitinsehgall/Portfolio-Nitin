let cvbtn=document.querySelector("#cvBtn");
let submit=document.querySelector("#Submit");
let bar=document.querySelector("#bar");

cvbtn.addEventListener("click",Click=()=>{
window.open('https://drive.google.com/file/d/1-8alknuMWQ7jMo02-CG102mpcanln04R/view?usp=drive_link',"_blank")

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

  const showData=document.querySelector('.showDAta');
  console.log(showData);