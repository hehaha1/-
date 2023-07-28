// 头部部分开始
// 1. 搜索框事件
var search = document.querySelector('.search')
var searchForm = document.querySelector('.search-form')
var searchInput = document.querySelector('.search-input')
var searchClear = document.querySelector('.search-clear')

// 鼠标点击搜索框，发生颜色的变化
searchForm.onclick = function(){
    searchForm.style.backgroundColor = '#C9CCD0'
    searchInput.style.backgroundColor = '#C9CCD0'

    // hover搜索框时，搜索框颜色发生变化
    search.onmousemove = function(){
      searchForm.style.backgroundColor = '#C9CCD0'
      searchForm.style.border = '1px solid #C9CCD0'
      searchInput.style.backgroundColor = '#C9CCD0'
    }
    search.onmouseout = function(){
      searchForm.style.backgroundColor = '#C9CCD0'
      searchForm.style.border = '1px solid #C9CCD0'
      searchInput.style.backgroundColor = '#C9CCD0'
}
}
// 全局点击事件
document.onclick = function(){
    search.style.backgroundColor = '#e3e5e7'
    searchForm.style.backgroundColor = '#e3e5e7'
    searchForm.style.border = '1px solid #e3e5e7'
    searchInput.style.backgroundColor = '#e3e5e7'
    search.style.borderRadius = '8px'
}


// 删除文本框内的内容
searchClear.onclick = function(){
    searchInput.value = ''
    searchClear.style.display = 'none'
    search.style.borderRadius = '8px'
}

// hover搜索框时，搜索框颜色发生变化
search.onmousemove = function(){
    search.style.backgroundColor = '#f1f2f3'
    search.style.opacity = 1
    searchForm.style.backgroundColor = '#f1f2f3'
    searchForm.style.opacity = 1
    searchForm.style.border = '1px solid #f1f2f3'
    searchInput.style.backgroundColor = '#f1f2f3'
}
search.onmouseout = function(){
    search.style.backgroundColor = '#e3e5e7'
    search.style.opacity = '.9'
    searchForm.style.backgroundColor = '#e3e5e7'
    searchForm.style.opacity = '.9'
    searchForm.style.border = '1px solid #e3e5e7'
    searchInput.style.backgroundColor = '#e3e5e7'
}

//2. 实现模糊查询
//2-1. 获取
var searchHelper = document.querySelector('.search-helper');//获取搜索的下拉列表

//2-2. 定义数组，存储搜索的内容
var searchArr = ['特色美食', '美食测评', '地方美食', '美食推荐', '物超所值']

//2-3. 给输入框绑定内容改变事件
searchInput.oninput = function () {
    // 每当搜索框的value值改变，下拉框的innerHTML就会设置为空
    searchHelper.innerHTML = ''
    for (let i = 0; i < searchArr.length; i++) {
        // IndexOf() 查找字串中指定字符或字串首次出现的位置,返首索引值.注意如果返回值为-1，就说明索引越界了。
        if (searchArr[i].indexOf(searchInput.value) != -1) {
            searchHelper.innerHTML += '<p>' + searchArr[i] + '</p>'
            searchHelper.style.display = 'block'
            searchClear.style.display = 'block'

            search.style.borderRadius = '8px 8px 0 0'
        }
    }
    if(searchInput.value==''){
        searchHelper.innerHTML = ''
        // search.style.borderRadius = '8px'
    }
    
    var searchHelperP = document.querySelectorAll('.search-helper>p');

    for(let i = 0; i < searchHelperP.length; i++){
      searchHelperP[i].onmousedown = function(){
        location.href = location.href=`/search?keyword=${searchHelperP[i].innerText}`
        console.log(searchHelperP[i].innerText)
      }
    }    
}
// 搜索部分：点击搜索图标和键盘摁下回车键立即跳转页面
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
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

//鼠标失焦 onblur:失去焦点
searchInput.onblur = function () {
    searchHelper.style.display = 'none'
    search.style.borderRadius = '8px'
}
// onfocus:获得焦点
searchInput.onfocus = function () {
    searchHelper.style.display = 'block'
}

// 3. 右侧点击跳转
var my = document.querySelector('#my')
my.onclick = ()=>{
  location.href='/self'
}

var message = document.querySelector('#message')
message.onclick = ()=>{
  location.href='/message'
}

var collect = document.querySelector('#collect')
collect.onclick = ()=>{
  location.href='/collect'
}

var dynamic = document.querySelector('#dynamic')
dynamic.onclick = ()=>{
  location.href='/dynamic'
}

var upVideo = document.querySelector('#upVideo')
upVideo.onclick = ()=>{
  location.href='/upVideo'
}
// 头部部分结束

// 1. 渲染页面
// 获取历史记录
var userId = localStorage.getItem("userId")

pageRender()

function pageRender(data){
  fetch(`/api/watch/history/get/${userId}`)
    .then(res=>res.json())
    .then(res=>{
      const items = res.data.filter(item => item.userId == userId)

      // 先按时间大小排序
      items.sort(function(a, b) {
        return b.watchtime < a.watchtime ? -1 : 1
      })

      // 获取用户头像
      items.map((item,index) => {
        fetch(`/api/getFace/${item.userId}`)
        .then(res=>res.json())
        .then(res=>{
            var avatarImg = res.data[0].avatar
            // 渲染页面
            items[index]['avatarImg'] = avatarImg
        })
      });
      console.log(items)

      if(data){
        const vitems = items.filter(item => item.title.indexOf(data) != -1)
        aaa(vitems)
      }else{
        aaa(items)
      }

      // 数据渲染
      function aaa(items){
        var historyL = document.querySelector('.history-list')
        historyL.innerHTML = items.map(item=>` 
      <li class="history-record">
        <div class="video-img" onclick="bindEvent(${item.videoId})">
          <img src="${item.img}" alt="">
        </div>
        <div class="video-info">
          <div class="video-info-l">
              <div class="video-title">${item.title}</div>
              <div class="w-info">
                  <div class="time-wrap">
                      <div>
                          <svg t="1679028102496" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3044" width="16" height="16"><path d="M944.1 266.67c-20.82-13-177 59.61-177 59.61v-7.56c0-63.46-53.73-114.8-120.17-114.8H184.17C117.77 204 64 255.34 64 318.72v385.91c0 63.46 53.77 114.79 120.17 114.79H647c66.4 0 120.17-51.33 120.17-114.79v-9.41s157.11 72.07 177 59.69 20.83-475.35-0.07-488.32zM319 608.34V400.86A42 42 0 0 1 382.79 365L553.7 468.65a42 42 0 0 1 0 71.77l-171 103.81a42 42 0 0 1-63.7-35.89z m0 0" p-id="3045" fill="#bfbfbf"></path></svg>
                      </div>
                      <span>${getime(item.watchtime)}</span>
                  </div>
                  <div class="video-up">
                      <div class="up-face">
                          <img src="/images/default.jpg" alt="">
                      </div>
                      <span class="up-name">${item.nickName}</span>
                      <span class="classify">${item.classify}</span>
                  </div>
              </div>
          </div>
          <div class="del" onclick="delEvent(${item.videoId})">
              <svg t="1679028349046" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="16" height="16"><path d="M783 312.5v510c0 16.6-13.4 30-30 30H273c-16.6 0-30-13.4-30-30v-510h540m60-60H183v600c0 33.1 26.9 60 60 60h540c33.1 0 60-26.9 60-60v-600z" fill="#99a2aa" p-id="4185"></path><path d="M333 251v-78h360v78H333m-60 60h420c33.1 0 60-26.9 60-60v-78c0-33.1-26.9-60-60-60H333c-33.1 0-60 26.9-60 60v138z" fill="#99a2aa" p-id="4186"></path><path d="M882 252H145c-16.6 0-30 13.4-30 30s13.4 30 30 30h737c16.6 0 30-13.4 30-30s-13.4-30-30-30zM392.8 432.5h60v300h-60zM572.8 432.5h60v300h-60z" fill="#99a2aa" p-id="4187"></path></svg>
          </div>
        </div>
      </li>
        `).join('')
      }
    })
}

 // 将时间戳转化为时间
 function getime(a) {
  var date = new Date(parseInt(a));  // 参数需要毫秒数，所以这里将秒数乘于 1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  return Y+M+D+h+m+s
}

// 2. 删除特定历史数据
function delEvent(videoId){
  if(confirm("确定要删除？")){
    fetch("/api/watch/history/del",{
      method:"POST",
      body:JSON.stringify({
        userId:userId,
        videoId:videoId
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.ok == 1){
        window.location.reload(); // 在删除成功后，刷新页面
      }
    })
  }
}

// 3. 清空历史记录
var cBtn = document.querySelector('.b-header-btn')
cBtn.onclick = ()=>{
  if(confirm("确定要删除？")){
    fetch(`/api/del/history/all/${userId}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.ok == 1){
        window.location.reload(); // 在删除成功后，刷新页面
      }
    })
  }
}

// 4. 关键词搜索历史记录
var videoSearchInput = document.querySelector('.b-head-search_input')
var iconSearch = document.querySelector('.icon-search')

iconSearch.onclick = ()=>{
  // 如果搜索的内容为空，就不跳转页面
  if(!videoSearchInput.value.trim()) return;
  pageRender(videoSearchInput.value.trim())
}

function searchInputEnter(event){
  if (event.keyCode == 13){
    // 如果搜索的内容为空，就不跳转页面
    if(!videoSearchInput.value.trim()) return;
    pageRender(videoSearchInput.value.trim())
  }  
}

// 5. 点击图片跳转到详情页
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
            nickName:item.nickName
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
