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

var collect = document.querySelector('#collect')
collect.onclick = ()=>{
  location.href='/collect'
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

// 1. 左侧“消息中心”切换部分
var right1 = document.querySelector('.right1')
var right2 = document.querySelector('.right2')
var right3 = document.querySelector('.right3')
var page1 = document.querySelector('#page1')
var page2 = document.querySelector('#page2')
var page3 = document.querySelector('#page3')
var pagep1 = document.querySelector('#pagep1')
var pagep2 = document.querySelector('#pagep2')
var pagep3 = document.querySelector('#pagep3')

page1.onclick = ()=>{
  right1.style.display = 'block'
  right2.style.display = 'none'
  right3.style.display = 'none'
  page1.classList.add('active')
  pagep1.classList.add('active')
  page2.classList.remove('active')
  pagep2.classList.remove('active')
  page3.classList.remove('active')
  pagep3.classList.remove('active')
}

page2.onclick = ()=>{
  right2.style.display = 'block'
  right1.style.display = 'none'
  right3.style.display = 'none'
  page2.classList.add('active')
  pagep2.classList.add('active')
  page1.classList.remove('active')
  pagep1.classList.remove('active')
  page3.classList.remove('active')
  pagep3.classList.remove('active')
}

page3.onclick = ()=>{
  right3.style.display = 'block'
  right1.style.display = 'none'
  right2.style.display = 'none'
  page3.classList.add('active')
  pagep3.classList.add('active')
  page1.classList.remove('active')
  pagep1.classList.remove('active')
  page2.classList.remove('active')
  pagep2.classList.remove('active')
}

// 2. 获取“评论的赞”的数据
var userId = localStorage.getItem('userId')
// (1) 获取评论收到的赞
fetch(`/api/user/comment/begood/get/${userId}`) // 获取这个视频的数据
.then(res=>res.json())
.then(res=>{
  // console.log(res.data)
  var CommentGoodData = res.data
  // (2) 渲染页面
  var CommentGood = document.querySelector('#CommentGood')
  CommentGood.innerHTML = CommentGoodData.map(item=>`
  <div class="reply-item">
    <div class="left-box">
      <img src="${item.gavatar}" alt="">
    </div>
    <div class="right-box">
      <div class="right-box-left">
          <div class="line-1">
              <span class="name-field">${item.gnickName}</span>
              <span class="desc-field">赞了我的评论</span>
          </div>
          <div class="line-2">
              <span class="time-filed">${item.goodtime}</span>
          </div>
      </div>
      <div class="right-box-right">${item.comment}</div>
    </div>
  </div>
  `).join('')
})



// 3. 获取“视频的赞”的数据
// (1)-1 先获取该用户发布的视频id
fetch(`/api/videoinfo/good/find/${userId}`) // 获取这个视频的数据
.then(res=>res.json())
.then(res=>{
  // console.log(res.data)
  var aaa = res.data
  // (1)-2 根据videoId获取到自己获得的视频点赞
  var items = []
  aaa.map((item,index) => {
    fetch(`/api/videoinfo/good/find2/${item.videoId}`) // 获取这个视频的数据
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data)
      if(res.data.length > 0){
        items.push(res.data[0])
        // items = items.concat(res.data[0])
      }
      if(aaa.length-1 == index){
        // console.log(items)
        // (1)-3 根据videoId拿到视频的title,并将title拼接到items里
        items.map((item,index) => {
          fetch(`/api/videoinfo/good/find3/${item.videoId}`) // 获取这个视频的数据
          .then(res=>res.json())
          .then(res=>{
            var title = res.data[0].title
            items[index]['title'] = title
          })
        })
        // console.log(items)
        // (1)-4 获取点赞者的头像
        items.map((item,index) => {
          fetch(`/api/getFace/${item.userId}`) // 获取这个视频的数据
          .then(res=>res.json())
          .then(res=>{
            // console.log(res.data[0].avatar)
            var avatar = res.data[0].avatar
            items[index]['avatar'] = avatar
          })
        })
        // console.log(items)
        // (1)-5 获取点赞者的昵称
        items.map((item,index) => {
          fetch(`/api/videoinfo/good/find4/${item.userId}`) // 获取这个视频的数据
          .then(res=>res.json())
          .then(res=>{
            var nickName = res.data[0].nickName
            items[index]['nickName'] = nickName
          })
        })
        // console.log(items)
        // (2) 渲染页面
        var VideoGood = document.querySelector('#VideoGood')
        setTimeout(()=>{
          VideoGood.innerHTML = items.map(item=>`
        <div class="reply-item">
          <div class="left-box">
            <img src="${item.avatar}" alt="">
          </div>
          <div class="right-box">
            <div class="right-box-left">
                <div class="line-1">
                    <span class="name-field">${item.nickName}</span>
                    <span class="desc-field">赞了我的视频</span>
                </div>
                <div class="line-2">
                    <span class="time-filed">${item.videoGoodTime}</span>
                </div>
            </div>
            <div class="right-box-right">${item.title}</div>
          </div>
        </div>
        `).join('')
        },100)
      }
    })
  });
})

// 4. 渲染“系统通知”页面
fetch('/api/notice/get') // 获取这个视频的数据
.then(res=>res.json())
.then(res=>{
  console.log(res.data)

  var notice = document.querySelector('.notice')
  notice.innerHTML = res.data.map(item=>`
  <div class="card">
    <div class="card-top">
      <span class="card-title">${item.title}</span>
      <span class="card-time">${item.time}</span>
    </div>
    <div class="card-bottom">${item.content}</div>
  </div>
  `).join('')
})

