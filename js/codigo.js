"use strict";
const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#444");
})

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
})

zona.addEventListener("drop",e=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
    cargarArchivo(e.dataTransfer.files[0]);
    zona.style.outline = "4px solid #888";
})


const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.outline = `4px dashed ${color}`;
}
//cargar Texto...
// const cargarArchivo = (ar) =>{
//     const reader = new FileReader();
//     reader.readAsText(ar);
//     reader.addEventListener("load",e=>{
//         document.querySelector(".resultado").textContent = e.currentTarget.result;
//     })
// }

//Cargar imagen

// const cargarArchivo = (ar) =>{
//     const reader = new FileReader();
//     reader.readAsDataURL(ar);
//     reader.addEventListener("load",e=>{
//         let url = URL.createObjectURL(ar);
//         let img = document.createElement("IMG");
//         img.src = url;
//         document.querySelector(".resultado").appendChild(img);
//     })
// }

//cargar video
const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("progress",(e)=>{
        let carga = Math.round((e.loaded / ar.size)*100); //obtener cuanto va cargando...
        //e.loaded es cuánto cargó.
        //e.size cuanto pesa el archivo...
        zona.textContent = `${carga}`;
        document.querySelector(".barra-de-carga").style.padding = "72px 20px";
        document.querySelector(".barra-de-carga").style.width = `${carga}`;
        

    });
    reader.addEventListener("load",e=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: "video/mp4"});
        let url = URL.createObjectURL(video);
        let videoElemento = document.createElement("VIDEO");
        videoElemento.src = url;
        document.querySelector(".resultado").appendChild(videoElemento);
        alert("Video cargado exitosamente");
        videoElemento.play();
    })
}

document.write("Mi abuela Elena is the better grandmother, the more beautiful and the more love.... María Elena Sánchez Ortíz I LOVE YOU, YOUR grandchild Elian");