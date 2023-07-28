// 1. 搜索框事件
var falseIcon = document.querySelector('.false-icon')
var Input = document.querySelector('.search-input-wrap>input')

// 删除文本框内的内容
falseIcon.onclick = function(){
    Input.value = ''
    falseIcon.style.display = 'none'
}

Input.oninput = function(){
    if(Input.value != ''){
        falseIcon.style.display = 'block'
    }
}

// 搜索跳转
var searchBtn = document.querySelector('.btn')
var searchInput = document.querySelector('#searchInput')
searchBtn.onclick = ()=>{
  // 如果搜索的内容为空，就不跳转页面
  if(!searchInput.value.trim()) return;
  location.href = location.href=`/search?keyword=${searchInput.value}`
}

function enterSearch(event){  
  if (event.keyCode == 13){
    // 如果搜索的内容为空，就不跳转页面
    if(!searchInput.value.trim()) return;
    location.href = location.href=`/search?keyword=${searchInput.value}`
  }  
}


// 2-1. 拿到路径上的关键词(由于路径上不能传中文，所以得解析)
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); 
   //如果地址栏中出现中文则进行编码    
    var r = encodeURI(window.location.search).substr(1).match(reg);  
    if (r != null) {  
        //将中文编码的字符重新变成中文
        return decodeURI(unescape(r[2]));  
    }  
    return null;  
};
data = getParams("keyword")
// console.log(data)
// 2-2. 将关键词给搜索框
var searchInput = document.querySelector('#searchInput')
searchInput.value = data

// 3. 渲染搜索结果
// fetch('/api/video/get?page=1&limit=30')
fetch('/api/video/get2')
    .then(res=>res.json())
    .then(res=>{
        // 筛选数据
        const item = res.data.filter(item => item.title.indexOf(data) != -1)
        console.log(item)

        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var videoCardBody = document.querySelector('.video-card-body')
        videoCardBody.innerHTML = item.map(item=>` 
          <div class="video-card" onclick="bindEvent(${item.videoId})">
            <div class="video-img">
              <img src="${item.img}" alt="">
            </div>
            <div class="video-title">
              <div class="describe">
                <span>${item.title}</span>
              </div>
              <div class="up">
                 <div><svg t="1671695564719" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3431" width="16" height="16"><path d="M789.333333 620.309333a64 64 0 0 1 64 64v192l-128-48-128 48v-192a64 64 0 0 1 64-64h128z m-570.773333 148.693334l146.602667-171.029334A276.053333 276.053333 0 0 0 512 640a279.466667 279.466667 0 0 0 42.666667-3.264V874.666667H267.157333a64 64 0 0 1-48.597333-105.642667l146.602667-171.050667zM789.333333 684.330667h-128v99.626666l64-23.978666 64 24v-99.648zM512 149.333333c117.824 0 213.333333 95.509333 213.333333 213.333334s-95.509333 213.333333-213.333333 213.333333-213.333333-95.509333-213.333333-213.333333S394.176 149.333333 512 149.333333z" fill="#9499a0" p-id="3432"></path></svg></div>
                <span class="name">${item.nickName}</span>
                <span class="time">${item.time.slice(0 , item.time.indexOf(' '))}</span>
              </div>
            </div>
         </div>
        `).join(' ')
    })


// 点击跳转
function bindEvent(id) {
  location.href=`/videoPlay?id=${id}`

  // 获取所点击视频的其他数据
  fetch(`/api/videoPlay/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
        const item = res.data[0]
        // (1) 记录观看历史
        fetch("/api/watch/history/add",{
          method:"POST",
          body:JSON.stringify({
            userId:userId,
            videoId:id,
            img:item.img,
            title:item.title,
            nickName:item.nickName,
            classify:item.classify
          }),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
        })

        // (2) 记录视频的总播放量
        fetch("/api/videoview/number/add",{
          method:"POST",
          body:JSON.stringify({
            userId:userId,
            videoId:id
          }),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
        })
    })
}
