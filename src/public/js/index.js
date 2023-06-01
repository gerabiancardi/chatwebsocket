const socket= io();
/* 
Swal.fire({
    title:"Saludos",
    text:"Mensaje Inicial",
    icon:"success"
});
 */

let user;
const chatbox = document.getElementById("chatBox");

Swal.fire(
    {
        title:"Indentifiquese",
        input: "text",
        text: "Ingrese su nombre de usuario para ingresar al chat",
        inputValidator: (value)=>{
            return !value && "Necesitas un nombre de usuario para ingresar al chat"
        },
        allowOutsideClick:false, 
        allowEscapeKey:false
    }
).then (result=>{
    user= result.value;
    socket.emit("authenticated", user);
});

chatbox.addEventListener("keyup", evt=>{
    if (evt.key === "Enter"){
        if(chatbox.value.trim().lenght >0){
            socket.emit("message", {user, message: chatbox.value});
             chatbox.value = "";
        }
    }
})

socket.on("messageLogs", data=>{
    let log= document.getElementById("messageLogs");
    let messages= "";
    data.forEach(message=>{
        messages += `${message.user} dice: ${message.message}<br/>`
    });
    log.innerHTML=messages;
});

socket.on("NewUserConnected", data=>{
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timmer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})

