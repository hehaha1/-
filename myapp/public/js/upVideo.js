// 1. 左侧切换部分
var myUpVideo = document.querySelector('.my-up-video')
var myUpSnacks = document.querySelector('.my-up-snacks')
var myVideo = document.querySelector('#myVideo')
var myPhoto = document.querySelector('#myPhoto')

myUpVideo.onclick = ()=>{
    myUpVideo.classList.add("active");
    myUpSnacks.classList.remove("active");
    myVideo.style.display = 'block'
    myPhoto.style.display = 'none'

    localStorage.setItem("upVideoIndex",0)
}

myUpSnacks.onclick = ()=>{
    myUpSnacks.classList.add("active");
    myUpVideo.classList.remove("active");
    myPhoto.style.display = 'block'
    myVideo.style.display = 'none'

    localStorage.setItem("upVideoIndex",1)
}

var uvIndex = localStorage.getItem("upVideoIndex")

if(uvIndex){
    myUpSnacks.classList.add("active");
    myUpVideo.classList.remove("active");
    myPhoto.style.display = 'block'
    myVideo.style.display = 'none'
}