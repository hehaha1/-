// 1. 搜索框事件
var search = document.querySelector('.search')
var searchForm = document.querySelector('.search-form')
var searchInput = document.querySelector('.search-input')
var searchClear = document.querySelector('.search-clear')

// 鼠标点击搜索框，发生颜色的变化
searchForm.onclick = function(){
    searchForm.style.backgroundColor = '#C9CCD0'
    searchInput.style.backgroundColor = '#C9CCD0'
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
    // console.log(searchInput.value)
    var searchHelperP = document.querySelectorAll('.search-helper>p');
    console.log(searchHelperP)
    for(let i = 0; i < searchHelperP.length; i++){
      searchHelperP[i].onmousedown = function(){
        location.href = location.href=`/search?keyword=${searchHelperP[i].innerText}`
        console.log(searchHelperP[i].innerText)
      }
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

//3. nav导航栏部分
var navContainer = document.querySelector('.nav-container')
var nav = document.querySelector('.nav')
var header = document.querySelector('.header')
var goTop = document.querySelector('.goTop')

  //1. 绑定滚动事件
  window.onscroll = function(){
    //2-1.获取浏览器卷去的高度
    var height = document.documentElement.scrollTop || document.body.scrollTop
    // console.log('height='+height)
    // console.log(navContainer.className)

    //3-2-1.判断卷去的高度
    if(height >= 255){
        navContainer.style.display = 'block'
        // console.log('headerHeight+bannerHeight='+headerHeight+bannerHeight)
        navContainer.className = 'nav-container nav-container-fix'
        // console.log(navContainer.className)
        goTop.style.display = 'block'
      }else{
        navContainer.style.display = 'none'
        navContainer.className = 'nav-container'
        goTop.style.display = 'none'
      }
  }

  //goTop事件
  goTop.onclick = function(){
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
  }

  //2. 实现点击跳转功能
  var navBtn = document.querySelectorAll('.nav-sub>button')

  navBtn[0].onclick = function(){
    window.scrollTo({
      top: 480,
      behavior:'smooth'
    })
  }
  navBtn[1].onclick = function(){
    window.scrollTo({
      top: 965,
      behavior:'smooth'
    })
  }
  navBtn[2].onclick = function(){
    window.scrollTo({
      top: 1470,
      behavior:'smooth'
    })
  }
  navBtn[3].onclick = function(){
    window.scrollTo({
      top: 1975,
      behavior:'smooth'
    })
  }
  navBtn[4].onclick = function(){
    window.scrollTo({
      top: 2480,
      behavior:'smooth'
    })
  }
        
// self 弹出部分
var selfHeader = document.querySelector('.self-header')
var show = document.querySelector('.show')

//1.退出登录
selfHeader.onmouseover = function(){
  show.style.display = 'block'
}
show.onmouseover = function(){
  show.style.display = 'block'
}
selfHeader.onmouseout = function(){
  show.style.display = 'none'
}
show.onmouseout = function(){
  show.style.display = 'none'
}

var xinfeng = document.querySelector('.xinfeng')
var show2 = document.querySelector('.show2')

//2.信息
xinfeng.onmouseover = function(){
  show2.style.display = 'block'
}
show2.onmouseover = function(){
  show2.style.display = 'block'
}
xinfeng.onmouseout = function(){
  show2.style.display = 'none'
}
show2.onmouseout = function(){
  show2.style.display = 'none'
}
var shoucang = document.querySelector('.shoucang')
var show3 = document.querySelector('.show3')

//3.收藏
shoucang.onmouseover = function(){
  show3.style.display = 'block'
}
show3.onmouseover = function(){
  show3.style.display = 'block'
}
shoucang.onmouseout = function(){
  show3.style.display = 'none'
}
show3.onmouseout = function(){
  show3.style.display = 'none'
}

var dongtai = document.querySelector('.dongtai')
var show4 = document.querySelector('.show4')

//4.动态
dongtai.onmouseover = function(){
  show4.style.display = 'block'
}
show4.onmouseover = function(){
  show4.style.display = 'block'
}
dongtai.onmouseout = function(){
  show4.style.display = 'none'
}
show4.onmouseout = function(){
  show4.style.display = 'none'
}

var lishi = document.querySelector('.lishi')
var show5 = document.querySelector('.show5')

//5.历史
lishi.onmouseover = function(){
  show5.style.display = 'block'
}
show5.onmouseover = function(){
  show5.style.display = 'block'
}
lishi.onmouseout = function(){
  show5.style.display = 'none'
}
show5.onmouseout = function(){
  show5.style.display = 'none'
}

//6.点击页面跳转事件
var vSelf = document.querySelector('.v-self')
var vExit = document.querySelector('.v-exit')
var goUpVideo = document.querySelector('#goUpVideo')

vSelf.onclick = function(){
  location.href='/self'
}

goUpVideo.onclick = function(){
  location.href='/upVideo'
}

//7. 退出登录
var vExit = document.querySelector('.v-exit')

vExit.onclick = function(){
    fetch("/api/logout").then(res=>res.json()).then(res=>{
        if(res.ok === 1){
            location.href='/login'
            // 删除userId
            localStorage.removeItem('userId')
        }
    })
}

// 8. 数据渲染
// (1) 前方高能
// 点击换一换事件
var qfgnChange = document.querySelector('#qfgnChange')
var page = 1;
qfgnChange.onclick = ()=>{
  page = ++page;
  qfgnRender(page)
}

qfgnRender(page)
// 获取后端数据
function qfgnRender(page){
  fetch(`/api/video/get?page=${page}&limit=10`) // 获取第一页的十条数据
    .then(res=>res.json())
    .then(res=>{
        // console.log(res.data)
        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var qfgn = document.querySelector('.video-card-body')
        qfgn.innerHTML = res.data.map(item=>` 
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
        `).join('')
    })
}

// (2) 美食探索
// 获取后端数据
var a = 0;
var b = 8;
var mscsChange = document.querySelector('#mscsChange')
mscsChange.onclick = ()=>{
  a = a + 8;
  b = b + 8;
  mscsRender(a,b);
}

mscsRender(a,b)

function mscsRender(a,b){
  fetch('/api/video/get2')
    .then(res=>res.json())
    .then(res=>{
        // 筛选数据
        const item = res.data.filter(item => item.classify == "美食探索")

        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var msts = document.querySelector('#msts')
        msts.innerHTML = item.slice(a,b).map(item=>` 
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
        `).join('')
    })
}

    // 热门
    fetch('/api/video/hot/get')
    .then(res=>res.json())
    .then(res=>{
      // (1)筛选数据
      const items = res.data.filter(item => item.classify == "美食探索")
      // 遍历数组
      items.forEach((item,index)=>{
        // (2)获取这个视频的总播放量
        fetch(`/api/videoview/number/get/${item.videoId}`)
        .then(res=>res.json())
        .then(res=>{
          items[index]["vv"] = res.data;
        })
      })

      // (3)按时间大小排序
      items.sort(function(a, b) {
         return b.vv < a.vv ? -1 : 1
      })

      // (4)给数组排名
      var rank = 0
      items.forEach((item,index)=>{
        items[index]["rank"] = ++rank;
      })

      // (4)渲染页面
      var mscshot = document.querySelector('#mscshot')
      
      mscshot.innerHTML = items.slice(0,9).map(item=>`
      <li class="video-rank-list-item" onclick="bindEvent(${item.videoId})">
        <span class="rank-number"><i>${item.rank}</i></span>
        <span class="rank-text">${item.title}</span>
      </li>
      `).join('')
    })
  

// (3) 美食测评
// 获取后端数据
var mscpChange = document.querySelector('#mscpChange')
mscpChange.onclick = ()=>{
  a = a + 8;
  b = b + 8;
  mscpRender(a,b);
}

mscpRender(a,b);

function mscpRender(a,b){
  fetch('/api/video/get2')
    .then(res=>res.json())
    .then(res=>{
        // 筛选数据
        const item = res.data.filter(item => item.classify == "美食测评")

        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var mscp = document.querySelector('#mscp')
        mscp.innerHTML = item.slice(a,b).map(item=>` 
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
        `).join('')
    })
}

     // 热门
     fetch('/api/video/hot/get')
     .then(res=>res.json())
     .then(res=>{
       // (1)筛选数据
       const items = res.data.filter(item => item.classify == "美食测评")
       // 遍历数组
       items.forEach((item,index)=>{
         // (2)获取这个视频的总播放量
         fetch(`/api/videoview/number/get/${item.videoId}`)
         .then(res=>res.json())
         .then(res=>{
           items[index]["vv"] = res.data;
         })
       })
 
       // (3)按时间大小排序
       items.sort(function(a, b) {
          return b.vv < a.vv ? -1 : 1
       })
 
       // (4)给数组排名
       var rank = 0
       items.forEach((item,index)=>{
         items[index]["rank"] = ++rank;
       })
 
       // (4)渲染页面
       var mscphot = document.querySelector('#mscphot')
       
       mscphot.innerHTML = items.slice(0,9).map(item=>`
       <li class="video-rank-list-item" onclick="bindEvent(${item.videoId})">
         <span class="rank-number"><i>${item.rank}</i></span>
         <span class="rank-text">${item.title}</span>
       </li>
       `).join('')
     })

// (4) 美食制作
// 获取后端数据
var mszzChange = document.querySelector('#mszzChange')
mszzChange.onclick = ()=>{
  a = a + 8;
  b = b + 8;
  mszzRender(a,b);
}

mszzRender(a,b)

function mszzRender(a,b){
  fetch('/api/video/get2')
    .then(res=>res.json())
    .then(res=>{
        // 筛选数据
        const item = res.data.filter(item => item.classify == "美食制作")

        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var mszz = document.querySelector('#mszz')
        mszz.innerHTML = item.slice(a,b).map(item=>` 
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
        `).join('')
    })
}

      // 热门
      fetch('/api/video/hot/get')
      .then(res=>res.json())
      .then(res=>{
        // (1)筛选数据
        const items = res.data.filter(item => item.classify == "美食制作")
        // 遍历数组
        items.forEach((item,index)=>{
          // (2)获取这个视频的总播放量
          fetch(`/api/videoview/number/get/${item.videoId}`)
          .then(res=>res.json())
          .then(res=>{
            items[index]["vv"] = res.data;
          })
        })
  
        // (3)按时间大小排序
        items.sort(function(a, b) {
           return b.vv < a.vv ? -1 : 1
        })
  
        // (4)给数组排名
        var rank = 0
        items.forEach((item,index)=>{
          items[index]["rank"] = ++rank;
        })
  
        // (4)渲染页面
        var mszzhot = document.querySelector('#mszzhot')
        
        mszzhot.innerHTML = items.slice(0,9).map(item=>`
        <li class="video-rank-list-item" onclick="bindEvent(${item.videoId})">
          <span class="rank-number"><i>${item.rank}</i></span>
          <span class="rank-text">${item.title}</span>
        </li>
        `).join('')
      })

// (5) 特产推荐
// 获取后端数据
var tctjChange = document.querySelector('#tctjChange')
tctjChange.onclick = ()=>{
  a = a + 8;
  b = b + 8;
  tctjRender(a,b);
}

tctjRender(a,b)

function tctjRender(a,b){
  fetch('/api/video/get2')
    .then(res=>res.json())
    .then(res=>{
        // 筛选数据
        const item = res.data.filter(item => item.classify == "特产推荐")

        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var cctj = document.querySelector('#cctj')
        cctj.innerHTML = item.slice(a,b).map(item=>` 
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
        `).join('')
    })
}

      // 热门
      fetch('/api/video/hot/get')
      .then(res=>res.json())
      .then(res=>{
        // (1)筛选数据
        const items = res.data.filter(item => item.classify == "特产推荐")
        // 遍历数组
        items.forEach((item,index)=>{
          // (2)获取这个视频的总播放量
          fetch(`/api/videoview/number/get/${item.videoId}`)
          .then(res=>res.json())
          .then(res=>{
            items[index]["vv"] = res.data;
          })
        })
  
        // (3)按时间大小排序
        items.sort(function(a, b) {
           return b.vv < a.vv ? -1 : 1
        })
  
        // (4)给数组排名
        var rank = 0
        items.forEach((item,index)=>{
          items[index]["rank"] = ++rank;
        })
  
        // (4)渲染页面
        var tctjhot = document.querySelector('#tctjhot')
        
        tctjhot.innerHTML = items.slice(0,9).map(item=>`
        <li class="video-rank-list-item" onclick="bindEvent(${item.videoId})">
          <span class="rank-number"><i>${item.rank}</i></span>
          <span class="rank-text">${item.title}</span>
        </li>
        `).join('')
      })

// 点击图片跳转到详情页
var userId = localStorage.getItem('userId')

function bindEvent(id) {
  location.href=`/videoPlay?id=${id}`

  // 获取所点击视频的其他数据
  fetch(`/api/videoPlay/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
        const item = res.data[0]
        // (1) 记录观看历史
        async function fetchHistory(){
          const response = await fetch("/api/watch/history/add",{
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
          const res = await response.json()
          return res
        }
      
        fetchHistory().then(res=>{
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
  })
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

// 获取历史记录
fetch(`/api/watch/history/get/${userId}`)
    .then(res=>res.json())
    .then(res=>{
      const items = res.data.filter(item => item.userId == userId)
      // console.log(items)

      // 先按时间大小排序
      items.sort(function(a, b) {
        // return b.watchtime < a.watchtime ? 1 : -1
        return b.watchtime < a.watchtime ? -1 : 1
      })

      // 数据渲染
      var historyC = document.querySelector('.history-container')
      historyC.innerHTML = items.map(item=>` 
      <div class="video-page-card-small">
        <div class="pic-box">
          <img src="${item.img}" alt="">
        </div>
        <div class="info">
          <a href="">
              <p class="title">${item.title}</p>
          </a>
          <div class="upname2">
              <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z"></path></svg>
              <span class="name">${item.nickName}</span>
          </div>
      </div>
    </div>
        `).join('')
    })

// 获取视频收藏记录
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
  var items = res.data

  // 先按时间大小排序
  items.sort(function(a, b) {
    return b.collecttime < a.collecttime ? -1 : 1
  })

  var collectC = document.querySelector('.collect-container')
  collectC.innerHTML = items.map(item=>` 
      <div class="video-page-card-small">
        <div class="pic-box">
          <img src="${item.img}" alt="">
        </div>
        <div class="info">
          <a href="">
              <p class="title">${item.title}</p>
          </a>
          <div class="upname2">
              <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z"></path></svg>
              <span class="name">${item.nickName}</span>
          </div>
      </div>
    </div>
        `).join('')

})

// 获取动态（这个用户关注了哪些up,up是否发布新视频）
// (1) 知道这个用户关注了哪些up
fetch(`/api/dynamic/${userId}`)
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data) 
      var items = []
      // (2) 获取每个博主发布的视频
      let arr = res.data;
      function pro(item) {
        return new Promise((resolve, reject) => {
          fetch(`/api/videoinfo/find/${item.up}`)
        .then(res=>res.json())
        .then(res=>{
          // console.log(res.data)
          for(i=0;i<res.data.length;i++){
            items.push(res.data[i])
          }
          resolve();
        })
        });
      }
      let asyncFuns = [];
      arr.forEach((item) => {
        asyncFuns.push(pro(item));
      });
      Promise.all(asyncFuns).then(() => {
        items.sort(function(a, b) {
          return new Date(b.time) < new Date(a.time) ? -1 : 1
        })
      // (3) 将博主们发布的视频按时间进行排序
      // 渲染页面
      var dynamic = document.querySelector('#dynamic')
      dynamic.innerHTML = items.map(item=>`
        <div class="rec-list">
          <div class="video-page-card-small">
            <div class="pic-box">
                <img src="${item.img}" alt="">
            </div>
            <div class="info">
                <a href="">
                    <p class="title">${item.title}</p>
                </a>
                <div class="upname2">
                    <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z"></path></svg>
                    <span class="name">${item.nickName}</span>
                </div>
              </div>
            </div>
        </div>
      </div>
        `)
      });
    })

// header页面跳转
var message = document.querySelector('#message') // 信息
message.onclick = ()=>{
  location.href='/message'
}

var collect = document.querySelector('#collect') // 收藏
collect.onclick = ()=>{
  location.href='/collect'
}

var dongtai = document.querySelector('#dongtai') // 动态
dongtai.onclick = ()=>{
  location.href='/dynamic'
}

var lishi = document.querySelector('.lishi') // 历史
lishi.onclick = ()=>{
  location.href='/history'
}

// main-nav 的页面跳转
var mainBtn = document.querySelectorAll('.main-sub>span')
mainBtn[3].style.color = '#ff6767'

  mainBtn[1].onclick = function(){
    location.href = '/cuisines'
  }
  mainBtn[2].onclick = function(){
    location.href = '/snacks'
  }
  mainBtn[3].onclick = function(){
    location.href = '/foodvideo'
  }
  mainBtn[0].onclick = function(){
    location.href = '/specialty'
  }

  
// 2. 实现轮播图的自动切换
var img = document.querySelector('.img')
var points = document.querySelectorAll('.banner-btn>li')
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')
var slide = document.querySelector('.slide')

var imgArr = ['swipe1.webp','swipe2.webp','swipe3.webp']

var count = 0;

// 定义函数，用来切换图片的路径
function cutImg(){
    img.src = '/images/' + imgArr[count]; // 拼接图片路径

    // 设置圆点的显示
    for(var i=0;i<points.length;i++){
        points[i].className = ''
    }

    points[count].className = 'active'
}

// 设置定时器，每隔3s切换图片
var timer = setInterval(function(){
    count++;
    if(count > imgArr.length-1){ //由于count是从开始的，故length要减1
        count = 0;
    }
    cutImg();
},2000)

points.forEach((item,index)=>{
    points[index].onclick = function(){
        count = index
        cutImg();
    }
})

// 点击上一张
prev.onclick = ()=>{
    count--
    if(count < 0){ //由于count是从开始的，故length要减1
        count = imgArr.length-1;
    }
    cutImg();
}

// 点击下一张
next.onclick = ()=>{
    count++
    if(count > imgArr.length-1){ //由于count是从开始的，故length要减1
        count = 0;
    }
    cutImg();
}

// 鼠标划入-取消定时切换图片
slide.onmouseover = function(){
    clearInterval(timer)
}

// 鼠标移除-继续定时切换图片
slide.onmouseout = function(){
    timer = setInterval(function(){
        count++;
        if(count > imgArr.length-1){ //由于count是从开始的，故length要减1
            count = 0;
        }
        cutImg();
    },2000)
}

img.onclick = ()=>{
  console.log(img.getAttribute("src"))
  var nowSwiperSrc = img.getAttribute("src")
  if(nowSwiperSrc == '/images/swipe1.webp'){
    bindEvent(1)
  }else if(nowSwiperSrc == '/images/swipe2.webp'){
    bindEvent(2)
  }else{
    bindEvent(3)
  }
}


