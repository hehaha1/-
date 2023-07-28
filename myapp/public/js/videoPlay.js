//1. goTop部分
 var mainReplyBox = document.querySelector('.main-reply-box')
// var nav = document.querySelector('.nav')
// var header = document.querySelector('.header')
var goTop = document.querySelector('.goTop')

  //1. 绑定滚动事件
  window.onscroll = function(){
    //2-1.获取浏览器卷去的高度
    var height = document.documentElement.scrollTop || document.body.scrollTop

    //3-2-1.判断卷去的高度
    if(height >= 255){
        // navContainer.className = 'nav-container nav-container-fix'
        goTop.style.display = 'block'
      }else{
        // navContainer.className = 'nav-container'
        goTop.style.display = 'none'
      }
    //3-2-1.判断卷去的高度
    if(height >= 900){
        mainReplyBox.className = 'main-reply-box main-reply-box-fix'
      }else{
        mainReplyBox.className = 'main-reply-box'
      }
  }

  //goTop事件
  goTop.onclick = function(){
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
  }

// 2. 搜索框事件
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

//3. 实现模糊查询
//3-1. 获取
var searchHelper = document.querySelector('.search-helper');//获取搜索的下拉列表

//3-2. 定义数组，存储搜索的内容
var searchArr = ['特色美食', '美食测评', '地方美食', '美食推荐', '物超所值']

//3-3. 给输入框绑定内容改变事件
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
}

// 4. 渲染视频数据
// (1) 拿到id值
var id = location.search.replace(/[^\d]/g, "")
// console.log(id)
// (2) 向后端拿数据-渲染页面
fetch(`/api/videoPlay/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res.data[0])
        var item = res.data[0]
        // 渲染页面
        var videoTitle = document.querySelector('.video-title')
        videoTitle.innerText = item.title 

        // var playNum = document.querySelector('.playNum')
        // playNum.innerText = item.

        var time = document.querySelector('.time')
        time.innerText = item.time

        var video = document.querySelector('video')
        video.setAttribute("src", item.video); // 获取并设置img的src属性

        var username = document.querySelector('.username')
        username.innerText = item.nickName
        // console.log(item.nickName)

        // 渲染视频发布者的数据
        fetch("/api/get/userInfo",{
          method:"POST",
          body:JSON.stringify({
            userId:item.userId
          }),
          headers:{
              "Content-Type":"application/json"
          }
        }).then(res=>res.json())
        .then(res=>{
          var desc = document.querySelector('.desc')
          desc.innerText = res.data[0].label
        })

        // 拿到视频发布者的头像
        fetch(`/api/getFace/${item.userId}`)
       .then(res=>res.json())
       .then(res=>{
        // console.log(res.data)
        var avatarImg = res.data[0].avatar
        // 渲染页面
        var videoUpImg = document.querySelector('#videoUpImg')
        videoUpImg.setAttribute("src", avatarImg); // 获取并设置img的src属性
    })
    })

  // 5. 推荐其他视频
  fetch('/api/video/get?page=1&limit=20')
    .then(res=>res.json())
    .then(res=>{
        console.log(res.data)
        // 渲染页面 (注意：map只能渲染Array类型的数据)
        var recList = document.querySelector('.rec-list')
        recList.innerHTML = res.data.map(item=>` 
        <div class="video-page-card-small" onclick="bindEvent('${item.videoId}')">
          <div class="pic-box">
            <img src="${item.img}" alt="">
          </div>
        <div class="info">
            <div>
                <p class="title">${item.title}</p>
            </div>
            <div class="upname">
                <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z"></path></svg>
                <span class="name">${item.nickName}</span>
            </div>
            <div class="playinfo">
                <div class="playinfo-1">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="play"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M3.67735 2.2798C4.98983 2.1725 6.85812 2.0625 9 2.0625C11.1421 2.0625 13.0105 2.17252 14.323 2.27983C15.2216 2.3533 15.9184 3.04049 15.9989 3.9318C16.0962 5.00837 16.1875 6.43614 16.1875 8C16.1875 9.56386 16.0962 10.9916 15.9989 12.0682C15.9184 12.9595 15.2216 13.6467 14.323 13.7202C13.0105 13.8275 11.1421 13.9375 9 13.9375C6.85812 13.9375 4.98983 13.8275 3.67735 13.7202C2.77861 13.6467 2.08174 12.9593 2.00119 12.0678C1.90388 10.9908 1.8125 9.56273 1.8125 8C1.8125 6.43727 1.90388 5.00924 2.00119 3.93221C2.08174 3.04067 2.77861 2.35327 3.67735 2.2798ZM9 0.8125C6.81674 0.8125 4.9136 0.924562 3.5755 1.03395C2.07738 1.15643 0.892104 2.31616 0.756257 3.81973C0.656505 4.92379 0.5625 6.39058 0.5625 8C0.5625 9.60942 0.656505 11.0762 0.756256 12.1803C0.892104 13.6838 2.07738 14.8436 3.5755 14.966C4.9136 15.0754 6.81674 15.1875 9 15.1875C11.1835 15.1875 13.0868 15.0754 14.4249 14.966C15.9228 14.8436 17.108 13.6841 17.2438 12.1807C17.3435 11.077 17.4375 9.61052 17.4375 8C17.4375 6.38948 17.3435 4.92296 17.2438 3.81931C17.108 2.31588 15.9228 1.15645 14.4249 1.03398C13.0868 0.924583 11.1835 0.8125 9 0.8125ZM11.1876 8.72203C11.7431 8.40128 11.7431 7.59941 11.1876 7.27866L8.06133 5.47373C7.50577 5.15298 6.81133 5.55392 6.81133 6.19542V9.80527C6.81133 10.4468 7.50577 10.8477 8.06133 10.527L11.1876 8.72203Z" fill="var(--text3)"></path></svg>
                   <span>62.6万</span>
                </div>
                <div class="playinfo-2">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="dm"><path fill-rule="evenodd" clip-rule="evenodd" fill="#9499a0" d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4 6.4375C4 6.09232 4.27982 5.8125 4.625 5.8125H4.9375C5.28268 5.8125 5.5625 6.09232 5.5625 6.4375C5.5625 6.78268 5.28268 7.0625 4.9375 7.0625H4.625C4.27982 7.0625 4 6.78268 4 6.4375ZM6.5 6.4375C6.5 6.09232 6.77982 5.8125 7.125 5.8125H12.125C12.4702 5.8125 12.75 6.09232 12.75 6.4375C12.75 6.78268 12.4702 7.0625 12.125 7.0625H7.125C6.77982 7.0625 6.5 6.78268 6.5 6.4375ZM5.875 8.9375C5.52982 8.9375 5.25 9.21732 5.25 9.5625C5.25 9.90768 5.52982 10.1875 5.875 10.1875H6.1875C6.53268 10.1875 6.8125 9.90768 6.8125 9.5625C6.8125 9.21732 6.53268 8.9375 6.1875 8.9375H5.875ZM8.375 8.9375C8.02982 8.9375 7.75 9.21732 7.75 9.5625C7.75 9.90768 8.02982 10.1875 8.375 10.1875H13.375C13.7202 10.1875 14 9.90768 14 9.5625C14 9.21732 13.7202 8.9375 13.375 8.9375H8.375Z" fill="var(--text3)"></path></svg>
                    <span>699</span>
                </div>
            </div>
        </div>
    </div>
        `).join(' ')
    })

// 点击图片跳转到详情页
function bindEvent(rid) {
  location.href=`/videoPlay?id=${rid}`
}

// 6. 获取当前登录用户的头像
var userId = localStorage.getItem('userId')
fetch(`/api/getFace/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res.data)
        var avatarImg = res.data[0].avatar
        // 渲染页面
        var myImg = document.querySelector('#myImg')
        myImg.setAttribute("src", avatarImg); // 获取并设置img的src属性
    })

// 7. 当前用户发表评论
var myComments = document.querySelector("#myComments")
var sendComments = document.querySelector("#sendComments")

// 点击“发布”，将评论存储在数据库
sendComments.onclick = ()=>{
  console.log(myComments.value)
  // 获取当前时间
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

  fetch("/api/videoCom/add",{
    method:"POST",
    body:JSON.stringify({
      userId:userId,
      comment:myComments.value,
      time:time,
      videoId:id
    }),
    headers:{
        "Content-Type":"application/json"
    }
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.ok == 1){
      alert("成功发表评论！")
      window.location.reload(); // 在成功发布评论后，刷新页面
    }
    if(res.ok == 0){
      alert("请您先设置个人信息再发表评论！")
    }
  })
}

// ************ 解决异步造成的渲染页面问题 **********
async function fn1() {
	console.log("fn1")
	await fn2() // 获取用户的评论
	fn3() // 查看用户是否有点赞该评论，同时获取点赞量
  fn4() // 点赞评论事件
}
fn1()

// 8. 从数据库获取用户的评论
function fn2(){
  console.log("fn2")
  return new Promise(resolve => {
    fetch(`/api/videoCom/get/${id}`)
      .then(res=>res.json())
      .then(res=>{
          // console.log(res.data[0]._id)
          // 渲染页面
          var replyList = document.querySelector('.reply-list')
          replyList.innerHTML = res.data.map(item=>` 
          <div class="reply-item">
              <div class="root-reply-avatar">
                  <img src="${item.avatar}" alt="">
              </div>
          <div class="content-warp">
              <div class="user-info">
                  <span>${item.nickName}</span>
              </div>
              <div class="root-reply">
                  <span class="root-reply-container">${item.comment}</span>
                  <div class="reply-info">
                      <span class="reply-time">${item.time}</span>
                      <span class="reply-like">
                          <svg t="1671903807660" class="icon" id="commentgood" commentid="${item._id}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2683" width="16" height="16"><path d="M595.393939 81.842424c-46.545455 0-87.143434 31.806061-95.676767 76.8 0 0-13.834343 70.464646-21.074748 95.806061-11.894949 41.761616-53.527273 87.919192-83.652525 102.658586-22.755556 11.248485-107.313131 11.377778-112.484848 11.377777h-115.070708C135.757576 368.484848 110.028283 394.084848 110.028283 425.890909v459.248485c0 31.676768 25.6 57.406061 57.40606 57.406061h529.842425c85.20404 0 157.608081-62.319192 170.278788-146.618182L911.90303 500.363636c10.472727-69.430303-43.313131-131.749495-113.519192-131.749495h-130.585858s19.393939-64.258586 29.220202-172.735353c4.913131-54.949495-34.00404-107.313131-91.151515-113.260606-3.490909-0.517172-6.981818-0.775758-10.472728-0.775758zM339.523232 885.010101V424.080808c37.624242-2.456566 64.775758-7.757576 80.808081-15.773737 42.278788-20.945455 96.323232-78.351515 113.389899-138.343435 7.628283-26.763636 20.686869-92.961616 22.238384-100.719192 3.361616-17.325253 19.911111-30.125253 39.30505-30.125252 1.551515 0 3.10303 0.129293 4.654546 0.258586 27.280808 2.844444 41.890909 28.70303 39.951515 50.941414-9.050505 100.460606-26.892929 160.969697-27.151515 161.357576l-22.367677 73.955555h208.032323c16.937374 0 32.452525 7.111111 43.571718 19.911111 11.119192 12.8 15.773737 29.220202 13.187878 46.028283l-44.218181 295.563637c-8.533333 56.630303-56.242424 97.745455-113.519192 97.745454H339.523232z m-172.088889 0V425.761616h114.682829v459.248485H167.434343z m0 0" fill="#9499a0" p-id="2684"></path></svg>
                          <span id="commentGoodNum" commentid="${item._id}">214</span>
                      </span>
                      <span class="reply-unlike">
                          <svg t="1671904095381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3548" width="14" height="14"><path d="M128 0a128 128 0 0 0-128 128v448a128 128 0 0 0 128 128h155.904l276.672 288a103.872 103.872 0 0 0 144.576 4.992c42.88-38.784 50.88-103.232 18.752-151.36l-61.44-91.84a32 32 0 0 1 26.624-49.792h206.336a128 128 0 0 0 119.808-172.992l-136.96-364.928A256 256 0 0 0 638.72 0H128z m128 640H128a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h128v576z m350.72 307.584L320 649.28V64L638.656 64a192 192 0 0 1 179.712 124.544l136.96 364.992A64 64 0 0 1 895.424 640h-206.336a96 96 0 0 0-79.808 149.312l61.44 91.904c14.464 21.76 10.88 50.816-8.512 68.352a39.872 39.872 0 0 1-55.488-1.92z" fill="#9499a0" p-id="3549"></path></svg>
                      </span>
                      <span class="reply-report" onclick="rrEvent('${item._id}')">
                          <svg t="1680627699461" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4942" width="16" height="16"><path d="M814 926.1H227.1c-57.4 0-108.8-29.7-137.4-79.3-28.7-49.7-28.7-109 0-158.7l293.5-508.3c28.7-49.7 80.1-79.4 137.5-79.4 57.4 0 108.8 29.7 137.5 79.4L951.5 688c28.7 49.7 28.7 109 0 158.7-28.7 49.7-80.1 79.4-137.5 79.4zM520.6 190.6c-24.8 0-46.9 12.8-59.3 34.2L167.8 733.1c-12.4 21.4-12.4 47 0 68.5 12.4 21.4 34.5 34.2 59.3 34.2H814c24.7 0 46.9-12.8 59.3-34.2 12.4-21.4 12.4-47 0-68.5L579.8 224.8c-12.3-21.4-34.5-34.2-59.2-34.2z m-98.4 11.7h0.2-0.2z" fill="#9499a0" p-id="4943"></path><path d="M520.6 712.5m-50.8 0a50.8 50.8 0 1 0 101.6 0 50.8 50.8 0 1 0-101.6 0Z" fill="#9499a0" p-id="4944"></path><path d="M520.6 622.2c-24.9 0-45.1-20.2-45.1-45.1V439.5c0-24.9 20.2-45.1 45.1-45.1 24.9 0 45.1 20.2 45.1 45.1v137.6c0 24.9-20.2 45.1-45.1 45.1z" fill="#9499a0" p-id="4945"></path></svg>
                      </span>
                  </div>
              </div>
          </div> 
        </div>
          `).join(' ')
          resolve()
      })
    })
}

// 9. 用户点击收藏视频事件
var collect1 = document.querySelector('#collect1')
var colNum = 0

// 9-1. 点击第一次收藏，第二次取消收藏
collect1.onclick = ()=>{

  colNum = Math.abs(colNum) - 1
  if(Math.abs(colNum) == 1){
    collect1.setAttribute("fill","#00aeec") // 收藏
  }else{
    collect1.setAttribute("fill","#61666d") // 没收藏
  }

  fetch(`/api/videoPlay/get/${id}`) // 获取这个视频的数据
    .then(res=>res.json())
    .then(res=>{
        const item = res.data[0]
    
        async function fetchCollect() {
          const response = await fetch("/api/user/collect/add",{ // 用户收藏这个视频
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
          });
          const res = await response.json();
          return res;
        }

        fetchCollect().then(res => {
          res; 
          collectVideoNum()
        });
  })
}

// 9-2. 查看用户是否收藏
function collectedVideo(){
  fetch("/api/user/collect/get",{
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
      collect1.setAttribute("fill","#00aeec") // 收藏
      colNum = 1
    }else{
      collect1.setAttribute("fill","#61666d") // 没收藏
    }
  })
}

collectedVideo()

// 9-3. 获取这个视频的收藏数
function collectVideoNum(){
  fetch(`/api/user/collect/number/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
    var collectNumber = document.querySelector('#collectNumber')
    collectNumber.innerText = res.data
    // console.log(res.data)
  })
}

collectVideoNum()

// 10. 实现点赞功能
var good = document.querySelector('#good')
var goodNum = 0

good.onclick = ()=>{

  goodNum = Math.abs(goodNum) - 1
  if(Math.abs(goodNum) == 1){
    good.setAttribute("fill","#00aeec") // 点赞
  }else{
    good.setAttribute("fill","#61666d") // 取消点赞
  }

  // 点赞视频
  async function fetchGoods() {
    const response = await fetch("/api/user/good/add",{
      method:"POST",
      body:JSON.stringify({
        userId:userId,
        videoId:id
      }),
      headers:{
        "Content-Type":"application/json"
      }
    });
    const res = await response.json();
    return res;
  }

  fetchGoods().then(res => {
    res; 
    goodsVideo()
  });
  
}

// 查看用户是否点赞
fetch("/api/user/good/get",{
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
    good.setAttribute("fill","#00aeec") // 点过赞
    goodNum = 1
  }else{
    good.setAttribute("fill","#61666d") // 没点赞
  }
})

// 获取这个视频的点赞数
function goodsVideo(){
  fetch(`/api/user/good/number/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
    var goodsNumber = document.querySelector('#goodsNumber')
    goodsNumber.innerText = res.data
  })
}

goodsVideo()

// 获取这个视频的总播放量
fetch(`/api/videoview/number/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
    var playNum = document.querySelector('.playNum')
    playNum.innerText = res.data
  })

// 11. 关注视频创作者
var btnPanel = document.querySelector('.btn-panel')
var attentionValue = document.querySelector('.attentionValue')
var attentionNum = 0

// 11-1. 点击关注，再次点击取关
btnPanel.onclick = ()=>{

  attentionNum = Math.abs(attentionNum) - 1
  if(Math.abs(attentionNum) == 1){
    btnPanel.style.backgroundColor = '#e3e5e7'
    btnPanel.style.color = '#9499a0'
    attentionValue.innerText = '已关注'
  }else{
    btnPanel.style.backgroundColor = '#00aeec'
    btnPanel.style.color = '#ffffff'
    attentionValue.innerText = '关注'
  }

  // 关注视频作者
  fetch(`/api/videoPlay/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
      const item = res.data[0]

      fetch("/api/attention/add",{
        method:"POST",
        body:JSON.stringify({
          fans:userId,
          up:item.userId
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

  attenNum()
}

// 11-2. 获取这个视频作者的粉丝数量
function attenNum(){
  fetch(`/api/videoPlay/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
      const up = res.data[0].userId

      fetch(`/api/attention/get/${up}`)
      .then(res=>res.json())
      .then(res=>{
        var fansNumber = document.querySelector('.fansNumber')
        fansNumber.innerText = res.data
      })
  })
}

attenNum()

// 11-3. 一进入页面，就判断当前用户是否关注过这个博主
fetch(`/api/videoPlay/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
      const up = res.data[0].userId

      fetch("/api/attention/get2",{
        method:"POST",
        body:JSON.stringify({
          fans:userId,
          up:up
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(res=>res.json())
      .then(res=>{
        if(res.ok == 1){
          // 已关注
          btnPanel.style.backgroundColor = '#e3e5e7'
          btnPanel.style.color = '#9499a0'
          attentionValue.innerText = '已关注'

          attentionNum = 1
        }else{
          // 没关注
          btnPanel.style.backgroundColor = '#00aeec'
          btnPanel.style.color = '#ffffff'
          attentionValue.innerText = '关注'
        }
      })
  })

//12. header 点击跳转
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

var hist = document.querySelector('#hist')
hist.onclick = ()=>{
  location.href='/history'
}

var upVideo = document.querySelector('#upVideo')
upVideo.onclick = ()=>{
  location.href='/upVideo'
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

// 13. 获取该视频的评论量
var totalReply = document.querySelector('.total-reply')
fetch(`/api/videoCom/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data)
      totalReply.innerText = res.data.length
    })

// 14. 实现点赞视频的留言的功能
function fn4(){
  console.log("fn4")
  var commentgood = document.querySelectorAll('#commentgood')
  var commentgoodP = document.querySelectorAll('#commentgood>path')
  
  commentgood.forEach((item,index)=>{
    commentgood[index].onclick = ()=>{
      let commentid = item.getAttribute('commentid') // 这条评论的id
      
      // 点赞视频
      fetch('/api/comment/good',{
        method:"POST",
        body:JSON.stringify({
          commentid:commentid, // 这条评论的id
          guserId:userId // 点赞者的id
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(res=>res.json())
      .then(res=>{
        // console.log(res)
      })

      setTimeout(()=>{
        // 根据icon的颜色判断
        if(commentgoodP[index].getAttribute("fill") == "#00aeec"){
          commentgoodP[index].setAttribute("fill","#61666d") // 取消点赞
          CommentGoodNum(index,commentid)
        }else{
          commentgoodP[index].setAttribute("fill","#00aeec") // 点赞
          CommentGoodNum(index,commentid)
        }
      },50)
    }
  })
}

// 获取评论的点赞数量
function CommentGoodNum(index,commentid){
  var cgn = document.querySelectorAll('#commentGoodNum')
  fetch(`/api/comment/goodnum/get/${commentid}`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.data)
      cgn[index].innerText = res.data
    })
}

// 获取这个评论的点赞数量
function fn3() {
  console.log("fn3")
  // (1) 获取视频的点赞量
  var cgn = document.querySelectorAll('#commentGoodNum')
  cgn.forEach((item,index)=>{
    commentid = item.getAttribute("commentid") // 这条评论的id
    fetch(`/api/comment/goodnum/get/${commentid}`)
    .then(res=>res.json())
    .then(res=>{
      cgn[index].innerText = res.data
    })
  })

  // (2) 获取当前用户是否有点赞视频
  var commentgood = document.querySelectorAll('#commentgood')
  var commentgoodP = document.querySelectorAll('#commentgood>path')
  commentgood.forEach((item,index)=>{
    commentid = item.getAttribute("commentid") // 这条评论的id
    fetch("/api/user/comment/good/get",{
      method:"POST",
      body:JSON.stringify({
        guserId:userId,
        commentid:commentid
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      // console.log(res)
      if(res.ok == 1){
        commentgoodP[index].setAttribute("fill","#00aeec") // 点过赞
        // goodNum = 1
      }else{
        commentgoodP[index].setAttribute("fill","#61666d") // 没点赞
      }
    })
  })
}

// 视频投诉事件
var manuscript = document.querySelector('.manuscript')
var ts = document.querySelector('.ts')
var cancel = document.querySelector('.cancel')
var sure = document.querySelector('.sure')

manuscript.onclick = ()=>{
  ts.style.display = 'block'

  // 4-4. 提交投诉
  sure.onclick = function(){
    fetch('/api/video/complaints/',{
        method:"POST",
        body:JSON.stringify({
            userId:userId,
            videoId:id,
            questionsText:questionsText
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.ok){
            alert("反馈成功")
            ts.style.display = 'none'
        }
    })
  }
}

// 取消投诉
cancel.onclick = ()=>{
  ts.style.display = 'none'
}

// 单选事件
var questions = document.getElementsByName('questions');
var questionsText = '违法违禁'

for (var i = 0; i < questions.length; i++) {
 questions[i].onclick = function () {
        if (this.checked == true) {
         questionsText = this.value
        console.log(questionsText)
        }
    }
}

// 评论投诉事件
var replyReport = document.querySelector('.reply-report')
var ts2 = document.querySelector('.ts2')
var cancel2 = document.querySelector('.cancel2')
var sure2 = document.querySelector('.sure2')

function rrEvent(id){
    ts2.style.display = 'block'

    console.log(id) // onclick传递的参数是字符串时，记得加''
  
    // 提交投诉
    sure2.onclick = function(){
      fetch('/api/comments/complaints/',{
          method:"POST",
          body:JSON.stringify({
              userId:userId, // 举报者
              commentId:id, 
              questionsText:questionsText2
          }),
          headers:{
              "Content-Type":"application/json"
          }
      })
      .then(res=>res.json())
      .then(res=>{
          if(res.ok){
              alert("反馈成功")
              ts2.style.display = 'none'
          }
      })
    }
}

// 取消投诉
cancel2.onclick = ()=>{
  ts2.style.display = 'none'
}

// 单选事件
var questions2 = document.getElementsByName('questions2');
var questionsText2 = '违法违禁'

for (var i = 0; i < questions2.length; i++) {
 questions2[i].onclick = function () {
        if (this.checked == true) {
         questionsText2 = this.value
        // console.log(questionsText2)
        }
    }
}