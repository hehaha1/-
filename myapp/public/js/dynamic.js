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

var hist = document.querySelector('#hist')
hist.onclick = ()=>{
  location.href='/history'
}

var upVideo = document.querySelector('#upVideo')
upVideo.onclick = ()=>{
  location.href='/upVideo'
}
// 头部部分结束

// 1. 获取个人信息
// 1-1. 获取我的头像
var userId = localStorage.getItem('userId')
fetch(`/api/getFace/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        var avatarImg = res.data[0].avatar
        // 渲染头像
        var myFace = document.querySelector('.myFace>img')
        myFace.setAttribute("src", avatarImg); // 获取并设置img的src属性
    })

// 1-2. 获取我的个人信息
fetch(`/api/info/get/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        var item = res.data[0]
        // 渲染页面
        var myNickname = document.querySelector('.myNickname')
        myNickname.innerText = item.nickName;
    })

// 1-3. 获取我关注的作者的人数
fetch(`/api/my/attention/get/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        // 渲染页面
        var count1 = document.querySelector('.count-1')
        count1.innerText = res.data;
    })

// 1-4. 获取我的粉丝数量
fetch(`/api/attention/get/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        // 渲染页面
        var count2 = document.querySelector('.count-2')
        count2.innerText = res.data;
    })

// 1-5. 获取我发布的视频数量
fetch(`/api/my/videoinfo/find/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        // 渲染页面
        var count3 = document.querySelector('.count-3')
        count3.innerText = res.data;
    })

// 2. 获取我所关注的博主的头像和昵称
fetch(`/api/dynamic/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        var items = res.data
        items.map((item,index) => {
          // 2-1. 获取博主头像
          fetch(`/api/getFace/${item.up}`)
              .then(res=>res.json())
              .then(res=>{
                var avatarImg = res.data[0].avatar
                items[index]['avatarImg'] = avatarImg
          })
          // 2-2. 获取博主昵称
          fetch(`/api/info/get/${item.up}`)
              .then(res=>res.json())
              .then(res=>{
                var item = res.data[0].nickName 
                items[index]['nickname'] = item
            })
        })
        // console.log(items)
        setTimeout(() => {
           // 2-3. 渲染页面
           var upInfo = document.querySelector('#upInfo')
           upInfo.innerHTML = items.map(item=>`
           <li class="up-list-item">
             <div class="item-face">
               <img src="${item.avatarImg}" alt="">
             </div>
             <div class="item-name">${item.nickname}</div>
           </li>
           `)
        }, 100);
    })

// 点击跳转到详情页
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

// 3. 获取动态数据（这个用户关注了哪些up, up是否发布新视频）
// (1) 知道这个用户关注了哪些up
function pageRender(){
  return new Promise(resolve => {
  fetch(`/api/dynamic/${userId}`)
    .then(res=>res.json())
    .then(res=>{
      var items = []
      console.log(1)

      // (2) 获取每个博主发布的视频
      let arr = res.data;
      function pro(item) {
        return new Promise((resolve, reject) => {
          fetch(`/api/videoinfo/find/${item.up}`)
        .then(res=>res.json())
        .then(res=>{
          console.log(2)
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
      console.log(3)

      // (3) 将博主们发布的视频按时间进行排序
        items.sort(function(a, b) {
          console.log(4)
          return new Date(b.time) < new Date(a.time) ? -1 : 1
        })
        
        // (4) 获取博主头像 
        function pro2(item,index) {
          return new Promise((resolve, reject) => {
              fetch(`/api/getFace/${item.userId}`)
              .then(res=>res.json())
              .then(res=>{
                console.log(5)
                var avatarImg = res.data[0].avatar
                items[index]['avatarImg'] = avatarImg
                resolve();
              })  
          });
        }
        let asyncFuns2 = [];
        items.map((item,index) => {
          asyncFuns2.push(pro2(item,index));
        });
        Promise.all(asyncFuns2).then(() => {
          // console.log('res', items); // 打印
          console.log(6)
 
          // 渲染页面
        var dtItems = document.querySelector('.dt-items')
        dtItems.innerHTML = items.map(item=>
          `
        <div class="dt-item">
        <div class="dt-item-header">
            <div class="up-face">
                <img src="${item.avatarImg}" alt="">
            </div>
            <div class="dt-item-header-right">
                <div class="video-up">${item.nickName}</div>
                <div class="video-desc">${item.time} 投稿了该视频</div>
            </div>
        </div>
        <div class="dt-item-body">
            <div class="dt-item-body-left" onclick="bindEvent(${item.videoId})">
                <img src="${item.img}" alt="">
            </div>
            <div class="dt-item-body-right">
                <div class="video-title">${item.title}</div>
                <div class="video-info">
                    <div class="video-plays">
                        <svg t="1678885926485" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3351" width="14" height="14"><path d="M809.068266 126.803757l4.046144 0.12689 3.981677 0.25685 3.916185 0.321317 3.980653 0.449231 3.851717 0.512675 3.920278 0.578167 3.787249 0.708126 3.851716 0.83297 3.724827 0.833993 3.789296 0.963952 3.659335 1.091866 3.658313 1.156333 3.599984 1.218756 3.593844 1.28527 3.530399 1.347691 3.53347 1.477651 3.402486 1.541097 3.402486 1.60454 3.338018 1.734501 3.341088 1.733477 3.210105 1.86139 3.210106 1.926882 3.147683 1.925859 3.145637 2.055818 3.017724 2.182707 2.955302 2.183731 2.952233 2.24513 2.890834 2.312667 2.825343 2.376112 2.695383 2.440581 2.698453 2.504025 2.631938 2.568493 2.568494 2.631939 2.504025 2.698453 2.440581 2.760874 2.311644 2.823297 2.31062 2.826366 2.247176 2.953255 2.120287 2.95428 2.053771 3.017723 1.989303 3.017724 1.927905 3.146661 1.862414 3.145637 1.797945 3.212151 1.670033 3.274574 1.603517 3.27355 1.543143 3.339041 1.411136 3.402486 1.346669 3.405557 1.28527 3.466954 1.219778 3.530399 1.092889 3.531423 1.026374 3.533469 0.899484 3.658313 0.831947 3.596914 0.708126 3.659335 0.640589 3.724828 0.578166 3.72278 0.449231 3.789295 0.321317 3.788272 0.25685 3.85274 0.192381 3.787249v478.628005l-0.192381 3.853764-0.25685 3.788272-0.321317 3.788271-0.449231 3.787249-0.578166 3.726874-0.640589 3.72278-0.708126 3.661383-0.831947 3.660359-0.899484 3.59282-1.026374 3.531423-1.092889 3.597938-1.219778 3.465931-1.28527 3.467977-1.346669 3.40351-1.411136 3.402486-1.543143 3.341088-1.603517 3.27355-1.670033 3.27355-1.797945 3.213175-1.862414 3.143591-1.927905 3.14666-1.989303 3.017724-2.053771 3.018747-2.120287 2.952233-2.247176 2.953256-2.31062 2.827389-2.311644 2.825343-2.440581 2.762921-2.504025 2.695383-2.568494 2.632962-2.631938 2.568493-2.698453 2.503002-2.695383 2.442627-2.825343 2.372019-2.890834 2.313691-2.952233 2.246152-2.955302 2.186801-3.017724 2.180661-3.145637 2.054795-3.147683 1.926882-3.210106 1.925858-3.210105 1.861391-3.341088 1.735523-3.338018 1.730408-3.402486 1.606587-3.402486 1.540073-3.53347 1.478675-3.530399 1.346668-3.593844 1.284247-3.599984 1.219778-3.658313 1.156334-3.659335 1.090842-3.789296 0.964976-3.724827 0.831946-3.851716 0.835016-3.787249 0.70608-3.920278 0.57919-3.851717 0.513699-3.980653 0.449231-3.916185 0.31927-3.981677 0.25685-4.046144 0.128936-4.044098 0.063445H219.036207l-4.045121-0.063445-3.981676-0.128936-4.044098-0.25685-3.917209-0.31927-3.981676-0.449231-3.85274-0.513699-3.915162-0.57919-3.790319-0.70608-3.851716-0.835016-3.725851-0.831946-3.787249-0.964976-3.658312-1.090842-3.660359-1.156334-3.597937-1.219778-3.595891-1.284247-3.529376-1.346668-3.470024-1.478675-3.466955-1.540073-3.403509-1.606587-3.339042-1.730408-3.339041-1.735523-3.208059-1.861391-3.212152-1.925858-3.14666-1.926882-3.144614-2.054795-3.017724-2.180661-3.01977-2.186801-2.888788-2.246152-2.889811-2.313691-2.826366-2.372019-2.695383-2.442627-2.69743-2.503002-2.630915-2.568493-2.571563-2.632962-2.501979-2.695383-2.441603-2.762921-2.375089-2.825343-2.24513-2.827389-2.248199-2.953256-2.118239-2.952233-2.057865-3.018747-2.053771-3.017724-1.925859-3.14666-1.798969-3.143591-1.796922-3.213175-1.669009-3.27355-1.605564-3.27355-1.540073-3.341088-1.476628-3.402486-1.348714-3.40351-1.28527-3.467977-1.154288-3.465931-1.092888-3.597938-1.027398-3.531423-0.899484-3.59282-0.83297-3.660359-0.771571-3.661383-0.641612-3.72278-0.512675-3.726874-0.450254-3.787249-0.386809-3.788271-0.256849-3.788272-0.12689-3.853764-0.064468-3.854787V276.606276l0.064468-3.918232 0.12689-3.787249 0.256849-3.85274 0.386809-3.788272 0.450254-3.789295 0.512675-3.72278 0.641612-3.724828 0.771571-3.659335 0.83297-3.596914 0.899484-3.658313 1.027398-3.533469 1.092888-3.531423 1.154288-3.530399 1.28527-3.466954 1.348714-3.405557 1.476628-3.402486 1.540073-3.339041 1.605564-3.27355 1.669009-3.274574 1.796922-3.212151 1.798969-3.145637 1.925859-3.146661 2.053771-3.017724 2.057865-3.017723 2.118239-2.95428 2.248199-2.953255 2.24513-2.826366 2.375089-2.823297 2.441603-2.760874 2.501979-2.698453 2.571563-2.631939 2.630915-2.568493 2.69743-2.504025 2.695383-2.440581 2.826366-2.376112 2.889811-2.312667 2.888788-2.24513 3.01977-2.183731 3.017724-2.182707 3.144614-2.055818 3.14666-1.925859 3.212152-1.926882 3.208059-1.86139 3.339041-1.733477 3.339042-1.734501 3.403509-1.60454 3.466955-1.541097 3.470024-1.477651 3.529376-1.347691 3.595891-1.28527 3.597937-1.218756 3.660359-1.156333 3.658312-1.091866 3.787249-0.963952 3.725851-0.833993 3.851716-0.83297 3.790319-0.708126 3.915162-0.578167 3.85274-0.512675 3.981676-0.449231 3.917209-0.321317 4.044098-0.25685 3.981676-0.12689 4.045121-0.066514h585.987961l4.044098 0.066514z m-589.646273 64.145821h-2.890834l-2.438534 0.127913-2.44058 0.12689-2.439557 0.193405-2.377136 0.256849-2.375089 0.321317-2.311644 0.386809-2.312667 0.448208-2.311645 0.451277-2.246152 0.512675-2.247176 0.641612-2.246153 0.578167-2.184754 0.707103-2.184754 0.705056-2.116193 0.770548-2.11824 0.833993-2.057865 0.899485-2.053771 0.898461-2.052748 0.963952-1.99135 1.026374-1.99135 1.026374-1.925858 1.093912-1.861391 1.154288-1.86446 1.156333-1.860367 1.219779-1.799992 1.286293-1.796922 1.281177-1.669009 1.350761-1.7345 1.347692-1.604541 1.413183-1.604541 1.41216-1.607611 1.476628-1.540073 1.476627-1.476628 1.540073-1.475604 1.605564-1.347692 1.54212-1.413183 1.669009-1.283223 1.605564-1.28527 1.669009-1.218756 1.734501-1.220801 1.669009-1.091866 1.798968-1.092889 1.732454-1.089819 1.798969-0.963952 1.796922-0.96293 1.863437-0.899484 1.796922-0.833993 1.926882-0.835016 1.860367-0.769525 1.926882-0.70608 1.926881-0.644681 1.925859-0.57612 1.925858-0.578167 1.99135-0.513699 1.990327-0.450254 1.991349-0.448207 2.052749-0.321317 2.055818-0.319271 2.053771-0.258896 2.120286-0.192381 2.053772-0.12689 2.120286-0.067538 2.182708-0.062422 2.56747V747.012032l0.062422 2.57054 0.067538 2.181684 0.12689 2.12131 0.192381 2.117216 0.258896 2.053772 0.319271 2.056841 0.321317 2.054795 0.448207 2.053771 0.450254 1.99135 0.513699 1.987257 0.578167 1.992373 0.57612 1.926882 0.644681 1.990326 0.70608 1.862414 0.769525 1.925858 0.835016 1.925858 0.833993 1.862414 0.899484 1.797945 0.96293 1.862414 0.963952 1.798969 1.089819 1.794875 1.092889 1.736547 1.091866 1.796922 1.220801 1.66901 1.218756 1.7345 1.28527 1.669009 1.283223 1.603518 1.413183 1.670032 1.348715 1.541096 1.475605 1.605564 1.476627 1.541096 1.540073 1.476628 1.543143 1.476628 1.669009 1.41216 1.604541 1.41216 1.7345 1.350761 1.669009 1.344622 1.796923 1.286293 1.799992 1.283224 1.797945 1.218755 1.926882 1.15838 1.86139 1.154287 1.925858 1.091866 1.99135 1.027397 1.99135 1.027397 2.052748 0.964976 2.053772 0.899485 2.057864 0.897437 2.11824 0.83297 2.116193 0.772595 2.184754 0.705056 2.184755 0.70608 2.246152 0.57612 2.247176 0.642635 2.246153 0.513699 2.311644 0.44923 2.312667 0.449231 2.311644 0.383739 2.375089 0.321318 2.377136 0.256849 2.439557 0.193404 2.44058 0.12689 2.438534 0.127913H807.529216l2.439557-0.127913 2.440581-0.12689 2.439557-0.193404 2.375089-0.256849 2.376112-0.321318 2.312667-0.383739 2.312668-0.449231 2.31062-0.44923 2.247176-0.513699 2.246153-0.642635 2.248199-0.57612 2.182708-0.70608 2.183731-0.705056 2.117216-0.772595 2.119263-0.83297 2.055818-0.897437 2.054795-0.899485 2.054795-0.964976 1.989303-1.027397 1.99135-1.027397 1.926882-1.091866 1.86139-1.154287 1.860367-1.15838 1.863437-1.218755 1.796922-1.283224 1.7345-1.286293 1.733478-1.344622 1.733477-1.350761 1.605564-1.41216 1.604541-1.41216 1.603518-1.476628 1.542119-1.476628 1.475605-1.541096 1.413183-1.542119 1.412159-1.604541 1.350762-1.603518 1.344621-1.670032 1.287317-1.669009 1.218755-1.671056 1.154287-1.732454 1.156334-1.735523 1.091866-1.797946 1.027397-1.794875 1.027397-1.798969 0.96293-1.799992 0.899484-1.860367 0.833993-1.862414 0.835016-1.925858 0.705057-1.86139 0.705056-1.926882 0.70608-1.990326 0.577143-1.926882 0.578167-1.992373 0.513699-1.987257 0.448207-1.99135 0.385786-2.053771 0.387832-2.054795 0.25685-2.056841 0.256849-2.053772 0.192381-2.117216 0.193405-2.12131 0.064468-2.181684V274.422545l-0.064468-2.182708-0.193405-2.120286-0.192381-2.053772-0.256849-2.120286-0.25685-2.053771-0.387832-2.055818-0.385786-2.052749-0.448207-1.991349-0.513699-1.990327-0.578167-1.99135-0.577143-1.925858-0.70608-1.99135-0.705056-1.925859-0.705057-1.862413-0.835016-1.925859-0.833993-1.86139-0.899484-1.796922-0.96293-1.863437-1.027397-1.796922-1.027397-1.798969-1.091866-1.796922-1.156334-1.7345-1.154287-1.733477-1.218755-1.670033-1.287317-1.669009-1.344621-1.670032-1.350762-1.604541-1.412159-1.604541-1.413183-1.543143-1.475605-1.540073-1.542119-1.476627-1.603518-1.476628-1.604541-1.41216-1.605564-1.413183-1.733477-1.347692-1.733478-1.350761-1.7345-1.281177-1.796922-1.286293-1.863437-1.219779-1.860367-1.156333-1.86139-1.154288-1.926882-1.093912-1.99135-1.026374-1.989303-1.026374-2.054795-0.963952-2.054795-0.898461-2.055818-0.899485-2.119263-0.833993-2.117216-0.770548-2.183731-0.705056-2.182708-0.707103-2.248199-0.578167-2.246153-0.641612-2.247176-0.512675-2.31062-0.451277-2.312668-0.448208-2.312667-0.386809-2.376112-0.321317-2.375089-0.256849-2.439557-0.193405-2.440581-0.12689-2.439557-0.127913H219.421993z" fill="#8a8a8a" p-id="3352"></path><path d="M655.809026 467.284678L419.774713 331.004101a51.623648 51.623648 0 0 0-77.411936 44.723508v272.548875a51.599089 51.599089 0 0 0 25.798521 44.697925 51.625695 51.625695 0 0 0 51.613415 0.02763l236.03329-136.279554a51.637974 51.637974 0 0 0 25.824103-44.725555 51.628764 51.628764 0 0 0-25.82308-44.712252" fill="#8a8a8a" p-id="3353"></path></svg>
                        <span id="playNum" videoid="${item.videoId}">1910</span>
                    </div>
                    <div class="video-comments">
                        <svg t="1678886203136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4579" width="14" height="14"><path d="M916.74 865.89h-808.1c-20.71 0-37.47-16.76-37.47-37.47V197.35c0-20.71 16.76-37.47 37.47-37.47h808.1c20.71 0 37.47 16.76 37.47 37.47v631.06c0.01 20.72-16.75 37.48-37.47 37.48z m-770.63-74.95h733.16V234.83H146.11v556.11z" fill="#8a8a8a" p-id="4580"></path><path d="M289.45 554.36h-49.62c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h49.62c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z" fill="#8a8a8a" p-id="4581"></path><path d="M781.38 728.44h-49.66c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h49.66c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z" fill="#8a8a8a" p-id="4582"></path><path d="M781.38 554.36H472.71c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h308.67c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z" fill="#8a8a8a" p-id="4583"></path><path d="M548.5 728.44H239.83c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47H548.5c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z" fill="#8a8a8a" p-id="4584"></path></svg>
                        <span id="commentNum" videoid="${item.videoId}">1910</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="dt-item-footer">
            <div class="video-forward">
                <svg t="1678886855234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6528" width="16" height="16"><path d="M865.922728 583.211878c-16.276708 0-29.580712 13.246699-29.667693 29.727045l0 215.125569c0 17.992793-14.58723 32.637328-32.520671 32.637328L181.762717 860.70182c-17.935488 0-32.520671-14.645558-32.520671-32.637328L149.242046 292.155966c0-17.992793 14.586207-32.637328 32.520671-32.637328l291.230897 0c16.304338-0.029676 29.580712-13.363356 29.580712-29.724998 0-16.392342-13.276375-29.727045-29.610388-29.727045l-295.336402 0c-48.358381 0-87.721901 39.450501-87.721901 87.925538l0 544.205493c0 48.475038 39.36352 87.925538 87.721901 87.925538l630.239961 0c48.358381 0 87.720877-39.450501 87.720877-87.925538L895.588375 612.762915C895.501394 596.458577 882.19739 583.211878 865.922728 583.211878z" fill="#8a8a8a" p-id="6529"></path><path d="M930.818761 338.183256l0-0.318248L727.07645 133.511783l-6.435573-6.259564-0.814552 0.844228c-4.511757-2.532683-9.606799-3.873214-14.876826-3.873214-16.974603 0-30.774911 13.829983-30.774911 30.832216 0 5.298679 1.338485 10.393721 3.873214 14.907525l-0.903579 0.931209 141.845589 142.224212-145.573493 0.057305C436.396091 342.726735 378.197598 489.375723 361.049033 717.050096c0 17.004279 13.800307 30.832216 30.772864 30.832216 13.858636 0 25.620517-9.229199 29.464055-21.893636l1.397836-8.181333c18.022469-215.329207 60.470233-321.567833 251.839749-342.937536l144.466276 0L683.433464 510.804778l-5.502317 7.744381c-1.951445 4.104481-2.969635 9.112542-2.969635 13.654998 0 17.002232 13.799284 30.832216 30.772864 30.832216 4.832052 0 10.160407-1.164522 14.439874-3.37691L929.954067 350.740246c1.860371-1.305739 4.140297-4.52506 4.140297-6.970762C934.093341 341.323782 932.679132 339.488994 930.818761 338.183256z" fill="#8a8a8a" p-id="6530"></path></svg>
                <span>转发</span>
            </div>
            <div class="video-shoucang">
                <svg t="1678886907147" class="icon" id="collect1" videoid="${item.videoId}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7708" width="16" height="16"><path d="M132.251 431.527c0 14.736 5.167 20.09 12.692 27.881 4.363 4.521 9.199 9.524 14.571 16.198 5.936 7.373 20.46 23.638 37.345 42.541 36.79 41.204 83.895 93.933 86.544 108.021 4.833 25.604-1.011 63.376-7.314 104.124-4.903 31.713-10.125 65.434-10.125 94.088 0 29.109 5.905 51.046 26.812 51.046 10.352 0 53.335-19.032 80.123-30.891 6.659-2.944 12.45-5.507 18.875-8.158 23.896-9.866 41.78-18.057 55.863-24.498 31.519-14.421 46.767-21.391 67.949-20.049 18.642 1.171 35.364 8.873 67.654 23.758 20.391 9.386 47.581 21.911 84.124 37.023h0.106l5.514 2.294c19.017 7.971 33.729 14.119 54.958 7.336 36.283-11.599 26.719-86.337 19.691-141.221-1.317-10.33-2.587-20.172-3.311-27.158-0.731-7.043-1.968-17.112-3.009-25.588-3.066-25.092-4.409-36.08 1.708-50.639 4.457-10.598 10.939-17.552 22.439-29.907 9.484-10.183 23.107-24.79 41.099-47.263l0.699-0.903 64.36-73.274 0.806-0.901c5.677-5.923 10.061-11.871 13.168-17.656 2.497-4.636 4.123-9.034 4.904-13.084v-10.83c-0.797-3.566-2.538-6.849-5.132-9.665-3.498-3.784-8.695-6.98-15.52-9.285-6.555-2.216-12.916-3.401-19.642-4.646-4.506-0.842-9.175-1.71-14.112-2.822-5.197-1.173-14.713-3.192-26.327-5.641-53.226-11.228-148.591-31.361-163.687-46.651l-2.114-2.153-1.603-2.664-100.037-167.133-0.098-0.199c-4.352-7.391-9.102-13.207-14.03-17.424-3.246-2.78-6.491-4.774-9.663-5.978h-14.305c-3.166 1.204-6.425 3.198-9.668 5.978-4.927 4.217-9.677 10.033-14.03 17.424l-0.096 0.199-83.437 139.208-0.016-0.01-5.549 9.433c-10.884 18.616-15.677 26.782-28.188 33.823-8.644 4.857-17.043 6.423-31.973 9.205-8.225 1.529-19.14 3.57-35.911 7.493-8.197 1.916-16.995 3.978-35.623 8.213-12.216 2.782-24.533 5.514-37.05 8.147l0.006 0.031-71.009 16.59c-6.728 2.393-11.936 5.264-14.976 8.969-2.849 3.47-4.455 8.957-4.455 17.268z m-24.236 63.394c-16.096-16.663-27.137-28.091-27.137-63.394 0-21.009 5.868-37.072 16.287-49.771 10.029-12.233 23.439-20.078 39.287-25.458l1.318-0.445 1.086-0.254 72.194-16.869 0.606-0.095a2350.64 2350.64 0 0 0 36.836-8.083c5.378-1.22 20.013-4.652 35.224-8.212 15.72-3.674 28.605-6.086 38.319-7.894 9.331-1.734 14.589-2.721 16.125-3.585 0.555-0.307 3.172-4.78 9.126-14.963l5.663-9.622 0.098-0.199 83.435-139.208 0.019 0.012c7.348-12.45 15.732-22.574 24.744-30.281 10.334-8.847 21.613-14.736 33.315-17.611l3.27-0.805h27.105l3.262 0.805c11.704 2.875 22.977 8.764 33.314 17.611 9.012 7.707 17.397 17.831 24.75 30.281l0.017-0.012 97.617 163.08c11.639 5.332 90.981 22.086 136.301 31.647 11.225 2.369 20.472 4.327 27.142 5.832 4.311 0.974 8.271 1.71 12.11 2.424 8.882 1.649 17.275 3.208 26.856 6.448 15.153 5.126 27.516 13.105 36.788 23.138 10.15 10.986 16.413 24.224 18.487 38.794l0.301 2.121V437.157l-0.301 2.259c-1.448 10.801-5.026 21.802-10.834 32.601-5.189 9.659-12.257 19.335-21.236 28.728L845.8 573.277l-0.017-0.008c-19.951 24.88-33.396 39.301-42.79 49.387-7.653 8.215-11.973 12.851-12.811 14.859-0.683 1.635 0.163 8.613 2.106 24.53 0.708 5.808 1.578 12.852 3.01 26.597 0.976 9.305 2.017 17.397 3.106 25.962 9.313 72.746 21.993 171.779-55.006 196.398-39.252 12.551-61.416 3.278-90.078-8.734l-5.515-2.294 0.017-0.041c-39.195-16.202-65.955-28.532-86.044-37.78-26.572-12.248-40.318-18.584-49.409-19.154-8.516-0.536-19.902 4.669-43.457 15.446-14.565 6.669-33.064 15.136-57.676 25.295-2.127 0.878-9.136 3.985-17.666 7.759-30.612 13.551-79.73 35.3-100.792 35.3-60.979 0-78.185-44.019-78.185-102.417 0-31.313 5.632-67.703 10.921-101.904 5.59-36.145 10.777-69.639 7.52-86.881-0.024-0.155-41.727-46.857-74.297-83.336-17.962-20.114-33.41-37.405-39.16-44.547-3.953-4.916-7.961-9.058-11.562-12.793z" fill="#bfbfbf" p-id="7709"></path></svg>
                <span id="collectNum" videoid="${item.videoId}">1910</span>
            </div>
            <div class="goods">
                <svg t="1678886952887" class="icon" id="good" videoid="${item.videoId}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8968" width="16" height="16"><path d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z" p-id="8969" fill="#bfbfbf"></path></svg>
                <span id="goodNum" videoid="${item.videoId}">1910</span>
            </div>
        </div>
    </div>
          `).join('')
          console.log(7)
          resolve()
          // 在页面渲染之后才执行函数内的fetch!!!!!!
        });
      })
      
    })
    })
}

// ************ 解决异步造成的渲染页面问题 **********
async function fn1() {
	console.log("fn1")
	await pageRender() // 渲染页面
	fn3() // 查看用户是否有点赞和收藏视频，同时获取播放量、评论量、点赞量和收藏量
  fn4() // 用户点赞和收藏视频事件
}

// var colNum = 0
// var goodNum = 0

function fn3() {
	console.log("fn3")

  // 页面一渲染完毕，(1) 查看用户之前是否有收藏该视频
  var collect1 = document.querySelectorAll('#collect1')
  var collectP = document.querySelectorAll('#collect1>path')
  // console.log(collect1[0])
  // console.log(collect1[0].getAttribute('videoid'))
  collect1.forEach((item,index)=>{
    fetch("/api/user/collect/get",{
      method:"POST",
      body:JSON.stringify({
        userId:userId, // 已经拿到了
        videoId:item.getAttribute('videoid')
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      // console.log(res)
      if(res.ok == 1){
        collectP[index].setAttribute("fill","#00aeec") // 收藏
        // colNum = 1
      }else{
        collectP[index].setAttribute("fill","#61666d") // 没收藏
      }
    })
  })

  // console.log("colNum="+colNum)
  // (2) 查看页面之前是否有点赞视频
  var good1 = document.querySelectorAll('#good')
  var goodP = document.querySelectorAll('#good>path')
  good1.forEach((item,index)=>{
    fetch("/api/user/good/get",{
      method:"POST",
      body:JSON.stringify({
        userId:userId,
        videoId:item.getAttribute('videoid')
      }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      // console.log(res)
      if(res.ok == 1){
        goodP[index].setAttribute("fill","#00aeec") // 点过赞
        // goodNum = 1
      }else{
        goodP[index].setAttribute("fill","#61666d") // 没点赞
      }
    })
  })

  // (3) 获取视频的播放量
  var playNum = document.querySelectorAll('#playNum')
  playNum.forEach((item,index)=>{
    id = item.getAttribute('videoid')
    fetch(`/api/videoview/number/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data)
      playNum[index].innerText = res.data
    })
  })

  // (4) 获取视频的评论量
  var commentNum = document.querySelectorAll('#commentNum')
  commentNum.forEach((item,index)=>{
    id = item.getAttribute('videoid')
    fetch(`/api/videoCom/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      // console.log(res.data)
      commentNum[index].innerText = res.data.length
    })
  })

  // (5) 获取视频的收藏量
  var collectNum = document.querySelectorAll('#collectNum')
  collectNum.forEach((item,index)=>{
    id = item.getAttribute('videoid')
    fetch(`/api/user/collect/number/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      collectNum[index].innerText = res.data
    })
  })

  // (6) 获取视频的点赞量
  var goodNum = document.querySelectorAll('#goodNum')
  goodNum.forEach((item,index)=>{
    id = item.getAttribute('videoid')
    fetch(`/api/user/good/number/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      goodNum[index].innerText = res.data
    })
  })
}

function changeCollectNum(index){
  var collectNum = document.querySelectorAll('#collectNum')
  id = collectNum[index].getAttribute('videoid')
  console.log(id)
  fetch(`/api/user/collect/number/get/${id}`)
  .then(res=>res.json())
  .then(res=>{
    collectNum[index].innerText = res.data
  })
}

function changeGoodNum(index){
  var goodNum = document.querySelectorAll('#goodNum')
  id = goodNum[index].getAttribute('videoid')
  fetch(`/api/user/good/number/get/${id}`)
    .then(res=>res.json())
    .then(res=>{
      goodNum[index].innerText = res.data
    })
}

function fn4(){
  // (1) 用户点击收藏视频事件
  var collect1 = document.querySelectorAll('#collect1')
  var collectP = document.querySelectorAll('#collect1>path')

  collect1.forEach((item,index)=>{
    collect1[index].onclick = ()=>{
      // （1）收藏视频事件
      id = item.getAttribute('videoid')
      fetch(`/api/videoPlay/get/${id}`) // 获取这个视频的数据
      .then(res=>res.json())
      .then(res=>{
          const item = res.data[0]
  
          fetch("/api/user/collect/add",{ // 用户收藏这个视频
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
            // console.log(res)
          })
      })

       // （2）根据icon的颜色判断
       setTimeout(()=>{
        if(collectP[index].getAttribute("fill") == "#00aeec"){
          collectP[index].setAttribute("fill","#61666d") // 取消收藏
          changeCollectNum(index)
        }else{
          collectP[index].setAttribute("fill","#00aeec") // 收藏
          changeCollectNum(index)
        }
       },50)
    }
  })

  // (2) 用户点击点赞视频事件
  var good1 = document.querySelectorAll('#good')
  var goodP = document.querySelectorAll('#good>path')
  good1.forEach((item,index)=>{
    good1[index].onclick = ()=>{

       // 根据icon的颜色判断
       if(goodP[index].getAttribute("fill") == "#00aeec"){
        goodP[index].setAttribute("fill","#61666d") // 取消点赞
        changeGoodNum(index)
      }else{
        goodP[index].setAttribute("fill","#00aeec") // 点赞
        changeGoodNum(index)
      }

      id = item.getAttribute('videoid')
      // 点赞视频
      fetch("/api/user/good/add",{
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
        // console.log(res)
      })
    }
  })
}

fn1()
