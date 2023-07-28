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

var dynamic = document.querySelector('#dynamic')
dynamic.onclick = ()=>{
  location.href='/dynamic'
}

var hist = document.querySelector('#hist')
hist.onclick = ()=>{
  location.href='/history'
}

var upVideo = document.querySelector('#upVideo')
upVideo.onclick = ()=>{
  location.href='/upVideo'
}
// 头部部分结束


// 1. 获取视频收藏记录
var userId = localStorage.getItem('userId') // 获取userId

PageRender2()

// 将时间戳转化为时间
function getime(a) {
  var date = new Date(parseInt(a));  // 参数需要毫秒数，所以这里将秒数乘于 1000
  M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  return M+D
}

// 2. 点击图片跳转到详情页
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

// 3. 关键字搜索视频（过滤视频标题）
var videoSearchInput = document.querySelector('.search-fav-input')
var iconSearch = document.querySelector('.icon-search')

iconSearch.onclick = ()=>{
  // 如果搜索的内容为空，就不跳转页面
  if(!videoSearchInput.value.trim()) return;
  PageRender2(videoSearchInput.value.trim())
}

function searchInputEnter(event){
  if (event.keyCode == 13){
    // 如果搜索的内容为空，就不跳转页面
    if(!videoSearchInput.value.trim()) return;
    PageRender2(videoSearchInput.value.trim())
  }  
}

function PageRender2(data){
  fetch("/api/user/collect/get2",{
    method:"POST",
    body:JSON.stringify({
      userId:userId,
    }),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then(res=>res.json())
  .then(res=>{

    const items = res.data
  
    // 先按时间大小排序
    items.sort(function(a, b) {
      return b.collecttime < a.collecttime ? -1 : 1
    })

    if(data){
      const vitems = items.filter(item => item.title.indexOf(data) != -1)
      // console.log(111)
      aaa(vitems)
    }else{
      aaa(items)
      // console.log(222)
    }
  
    function aaa(items){
      var fvl = document.querySelector('.fav-video-list')
      fvl.innerHTML = items.map(item=>` 
      <li class="small-item">
        <div class="video-img" onclick="bindEvent(${item.videoId})">
          <img src="${item.img}" alt="">
        </div>
        <div class="video-title">${item.title}</div>
        <div class="collect-info">
          <span class="pubdata">收藏于： ${getime(item.collecttime)}</span>
          <svg onclick="delEvent(${item.videoId})" t="1679061827273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2731" width="14" height="14"><path d="M214.6048 298.666667v598.613333a41.429333 41.429333 0 0 0 41.386667 41.386667h513.28c22.869333 0 41.386667-18.56 41.386666-41.386667V298.666667h-596.053333z m554.666667 725.333333h-513.28c-69.845333 0-126.72-56.832-126.72-126.72V213.333333h766.72v683.946667c0 69.888-56.832 126.72-126.72 126.72z" fill="#8a8a8a" p-id="2732"></path><path d="M981.333333 298.666667H42.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h938.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667M768 213.333333H682.666667V128c0-23.509333-19.114667-42.666667-42.666667-42.666667H384c-23.509333 0-42.666667 19.157333-42.666667 42.666667v85.333333H256V128c0-70.570667 57.429333-128 128-128h256c70.570667 0 128 57.429333 128 128v85.333333zM384 810.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667V469.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667M640 810.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667V469.333333c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666667 42.666666v298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667" fill="#8a8a8a" p-id="2733"></path></svg>
        </div>
        <span class="icon-more">更多操作</span>
      </li>
      `).join('')
    }
  })
}

// 4. 删除收藏的视频
function delEvent(id) {
  if(confirm("确定要删除？")){
    fetch('/api/videoPlay/del',{
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
      if(res.ok == 1){
        window.location.reload(); // 在删除成功后，刷新页面
      }
    })
  }
}

