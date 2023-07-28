// 1. 左侧点击跳转部分
var leftItems = document.querySelectorAll('.left>ul>li')
var right = document.querySelectorAll('.right')

leftItems.forEach((item,index)=>{
    item.onclick=()=>{
        leftItems.forEach((ite,inde)=>{
            ite.classList.remove('active')
            right[inde].style.display = 'none'
        })
        item.classList.add('active')
        right[index].style.display = 'block'

        localStorage.setItem("ManagerItemIndex",index)
    }
})

// 7. 刷新页面仍保留当前数据显示
var ItemI = localStorage.getItem("ManagerItemIndex")
if(ItemI){
    leftItems.forEach((ite,inde)=>{
        ite.classList.remove('active')
        right[inde].style.display = 'none'
    })
    leftItems[ItemI].classList.add('active')
    right[ItemI].style.display = 'block'
}

//2. 退出登录
var exit = document.querySelector('.exit')

exit.onclick = function(){
  if(confirm("确定要退出？")){
    fetch("/api/logout").then(res=>res.json()).then(res=>{
        if(res.ok === 1){
            location.href='/login'
            // 删除userId
            localStorage.removeItem('userId')
        }
    })
  }
}

// 3. 渲染“视频管理”页面
fetch('/api/video/complaints/get')
.then(res=>res.json())
.then(res=>{
    const items = res.data

    // 获取视频的其他数据
    items.map((item,index) => {
      async function fetchSnacks(){
        const response = await fetch(`/api/videoPlay/get/${item.videoId}`);
        const res = await response.json();
        return res;
      }

      fetchSnacks().then(res=>{
        // console.log(res.data)
        var img = res.data[0].img
        var title = res.data[0].title
        // 向items里添加数据
        items[index]['img'] = img
        items[index]['title'] = title
        // console.log(items)
        // 数据渲染
        var videoM = document.querySelector('.r-content-body')

        videoM.innerHTML = items.map(item=>` 
          <div class="item">
          <div class="item-left">
              <div class="item-img" onclick="bindEvent(${item.videoId})">
                <img src="${item.img}" alt="">
              </div>
              <div class="item-con">
                  <div class="item-title" onclick="bindEvent(${item.videoId})">${item.title}</div>
              </div>
          </div>
          <div class="item-center">${item.questionsText}</div>
          <div class="item-right">
          <div class="delete2" onclick="delVideo(${item.videoId})">
          <div class="del-icon2">
            <svg t="1680616108225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2948" width="16" height="16"><path d="M799.2 874.4c0 34.4-28.001 62.4-62.4 62.4H287.2c-34.4 0-62.4-28-62.4-62.4V212h574.4v662.4zM349.6 100c0-7.2 5.6-12.8 12.8-12.8h300c7.2 0 12.8 5.6 12.8 12.8v37.6H349.6V100z m636.8 37.6H749.6V100c0-48.001-39.2-87.2-87.2-87.2h-300c-48 0-87.2 39.199-87.2 87.2v37.6H37.6C16.8 137.6 0 154.4 0 175.2s16.8 37.6 37.6 37.6h112v661.6c0 76 61.6 137.6 137.6 137.6h449.6c76 0 137.6-61.6 137.6-137.6V212h112c20.8 0 37.6-16.8 37.6-37.6s-16.8-36.8-37.6-36.8zM512 824c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6m-175.2 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0.8 20.8 17.6 37.6 37.6 37.6m350.4 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6" fill="#707070" p-id="2949"></path></svg>
          </div>
          <div class="del-txt2">删除</div> 
        </div>
        <div class="clear2" onclick="hadReadVideo('${item.videoId}')">
          <div class="clear-icon2">
            <svg t="1680633865162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6651" width="20" height="20"><path d="M881.682 442.346v389.291c0 27.851-22.822 50.649-50.708 50.649h-639.028c-27.896-0.001-50.718-22.801-50.718-50.65v-401.386c0-0.645 0.176-1.24 0.196-1.884v-48.95h-0.196l285.209-207.484c41.334-40.959 108.351-40.959 149.674 0l306.191 207.485v62.931h-0.621zM183.563 820.155l163.349-171.953c9.902-9.894 25.953-9.894 35.856 0 9.902 9.884 9.902 25.925 0 35.809l-140.444 156.548h544.847l-140.445-156.548c-9.923-9.884-9.923-25.925 0-35.809 9.901-9.894 25.943-9.894 35.845 0l157.458 168.787v-359.207l-281.529 235.692c-14.306 14.309-23.401 24.922-43.742 24.922-20.372 0-32.61-10.611-46.946-24.922l-284.249-235.682v362.363zM818.561 400.393l-287.349-183.957c-16.538-16.388-43.339-16.388-59.865 0l-263.216 183.957-4.689-5.736 22.673 27.123h0.324l277.239 235.877c9.51 9.505 9.468 9.496 18.955 0l277.298-235.877 24.942-28.525-6.314 7.139z" fill="#707070" p-id="6652"></path></svg>
          </div>
          <div class="clear-txt2">已读</div>
        </div>
          </div>
        </div>
        `).join('')
    })
  })
})

function delVideo(id){
    fetch(`/api/video/del/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("删除视频成功")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}
function hadReadVideo(id){
    fetch(`/api/video/del2/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

function bindEvent(id) {
    location.href=`/videoPlay?id=${id}`
}

// 4. 渲染“snacks管理”页面
fetch('/api/snacks/complaints/get')
.then(res=>res.json())
.then(res=>{
    const items = res.data
    // console.log(items)

    // 获取snacks的其他数据
    items.map((item,index) => {
      async function fetchSnacks(){
        const response = await fetch(`/api/snacks/get2/${item.snacksId}`);
        const res = await response.json();
        return res;
      }

      fetchSnacks().then(res=>{
        // console.log(res.data)
        var img = res.data[0].img
        var title = res.data[0].title
        var classify = res.data[0].classify
        // 向items里添加数据
        items[index]['img'] = img
        items[index]['title'] = title
        items[index]['classify'] = classify

        // console.log(items)
        // 数据渲染
        var snacksM = document.querySelector('.r-content-body2')

        snacksM.innerHTML = items.map(item=>` 
          <div class="item">
          <div class="item-left">
              <div class="item-img">
                <img src="${item.img}" alt="">
              </div>
              <div class="item-con">
                  <div class="item-title">${item.title}</div>
                  <div class="item-classify">${item.classify}</div>
              </div>
          </div>
          <div class="item-center">${item.questionsText}</div>
          <div class="item-right">
          <div class="delete2" onclick="delSnacks('${item.snacksId}')">
          <div class="del-icon2">
            <svg t="1680616108225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2948" width="16" height="16"><path d="M799.2 874.4c0 34.4-28.001 62.4-62.4 62.4H287.2c-34.4 0-62.4-28-62.4-62.4V212h574.4v662.4zM349.6 100c0-7.2 5.6-12.8 12.8-12.8h300c7.2 0 12.8 5.6 12.8 12.8v37.6H349.6V100z m636.8 37.6H749.6V100c0-48.001-39.2-87.2-87.2-87.2h-300c-48 0-87.2 39.199-87.2 87.2v37.6H37.6C16.8 137.6 0 154.4 0 175.2s16.8 37.6 37.6 37.6h112v661.6c0 76 61.6 137.6 137.6 137.6h449.6c76 0 137.6-61.6 137.6-137.6V212h112c20.8 0 37.6-16.8 37.6-37.6s-16.8-36.8-37.6-36.8zM512 824c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6m-175.2 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0.8 20.8 17.6 37.6 37.6 37.6m350.4 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6" fill="#707070" p-id="2949"></path></svg>
          </div>
          <div class="del-txt2">删除</div> 
        </div>
        <div class="clear2" onclick="hadReadSnacks('${item.snacksId}')">
          <div class="clear-icon2">
            <svg t="1680633865162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6651" width="20" height="20"><path d="M881.682 442.346v389.291c0 27.851-22.822 50.649-50.708 50.649h-639.028c-27.896-0.001-50.718-22.801-50.718-50.65v-401.386c0-0.645 0.176-1.24 0.196-1.884v-48.95h-0.196l285.209-207.484c41.334-40.959 108.351-40.959 149.674 0l306.191 207.485v62.931h-0.621zM183.563 820.155l163.349-171.953c9.902-9.894 25.953-9.894 35.856 0 9.902 9.884 9.902 25.925 0 35.809l-140.444 156.548h544.847l-140.445-156.548c-9.923-9.884-9.923-25.925 0-35.809 9.901-9.894 25.943-9.894 35.845 0l157.458 168.787v-359.207l-281.529 235.692c-14.306 14.309-23.401 24.922-43.742 24.922-20.372 0-32.61-10.611-46.946-24.922l-284.249-235.682v362.363zM818.561 400.393l-287.349-183.957c-16.538-16.388-43.339-16.388-59.865 0l-263.216 183.957-4.689-5.736 22.673 27.123h0.324l277.239 235.877c9.51 9.505 9.468 9.496 18.955 0l277.298-235.877 24.942-28.525-6.314 7.139z" fill="#707070" p-id="6652"></path></svg>
          </div>
          <div class="clear-txt2">已读</div>
        </div>
          </div>
        </div>
        `).join('')
      });
    })
  })

function delSnacks(id){
    fetch(`/api/snacks/del/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("删除snacks成功")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

function hadReadSnacks(id){
    fetch(`/api/snacks/del2/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

// 5. 渲染“评论管理”页面
fetch('/api/comments/complaints/get')
.then(res=>res.json())
.then(res=>{
    const items = res.data
    // console.log(items)

    // 获取评论的其他数据
    items.map((item,index) => {
      async function fetchSnacks(){
        const response = await fetch(`/api/comments/get/${item.commentId}`);
        const res = await response.json();
        return res;
      }

      fetchSnacks().then(res=>{
        // console.log(res.data)
        var comment = res.data[0].comment
        // 向items里添加数据
        items[index]['comment'] = comment
        // console.log(items)
      
        // 数据渲染
        var commentsM = document.querySelector('.r-content-body3')

        commentsM.innerHTML = items.map(item=>` 
        <div class="comment-item">
        <div class="comment-item-left">
            <div class="comment-item-con">
                <div class="comment-item-title">${item.comment}</div>
            </div>
        </div>
        <div class="comment-item-center">${item.questionsText}</div>
        <div class="comment-item-right">
            <div class="delete" onclick="delComment('${item.commentId}')">
              <div class="del-icon">
                <svg t="1680616108225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2948" width="16" height="16"><path d="M799.2 874.4c0 34.4-28.001 62.4-62.4 62.4H287.2c-34.4 0-62.4-28-62.4-62.4V212h574.4v662.4zM349.6 100c0-7.2 5.6-12.8 12.8-12.8h300c7.2 0 12.8 5.6 12.8 12.8v37.6H349.6V100z m636.8 37.6H749.6V100c0-48.001-39.2-87.2-87.2-87.2h-300c-48 0-87.2 39.199-87.2 87.2v37.6H37.6C16.8 137.6 0 154.4 0 175.2s16.8 37.6 37.6 37.6h112v661.6c0 76 61.6 137.6 137.6 137.6h449.6c76 0 137.6-61.6 137.6-137.6V212h112c20.8 0 37.6-16.8 37.6-37.6s-16.8-36.8-37.6-36.8zM512 824c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6m-175.2 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0.8 20.8 17.6 37.6 37.6 37.6m350.4 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6" fill="#707070" p-id="2949"></path></svg>
              </div>
              <div class="del-txt">删除</div> 
            </div>
            <div class="clear" onclick="hadReadComment('${item.commentId}')">
              <div class="clear-icon">
                <svg t="1680633865162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6651" width="20" height="20"><path d="M881.682 442.346v389.291c0 27.851-22.822 50.649-50.708 50.649h-639.028c-27.896-0.001-50.718-22.801-50.718-50.65v-401.386c0-0.645 0.176-1.24 0.196-1.884v-48.95h-0.196l285.209-207.484c41.334-40.959 108.351-40.959 149.674 0l306.191 207.485v62.931h-0.621zM183.563 820.155l163.349-171.953c9.902-9.894 25.953-9.894 35.856 0 9.902 9.884 9.902 25.925 0 35.809l-140.444 156.548h544.847l-140.445-156.548c-9.923-9.884-9.923-25.925 0-35.809 9.901-9.894 25.943-9.894 35.845 0l157.458 168.787v-359.207l-281.529 235.692c-14.306 14.309-23.401 24.922-43.742 24.922-20.372 0-32.61-10.611-46.946-24.922l-284.249-235.682v362.363zM818.561 400.393l-287.349-183.957c-16.538-16.388-43.339-16.388-59.865 0l-263.216 183.957-4.689-5.736 22.673 27.123h0.324l277.239 235.877c9.51 9.505 9.468 9.496 18.955 0l277.298-235.877 24.942-28.525-6.314 7.139z" fill="#707070" p-id="6652"></path></svg>
              </div>
              <div class="clear-txt">已读</div>
            </div>
        </div>
    </div>
        `).join('')
      })
    })
  })

function delComment(id){
    fetch(`/api/comment/del/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("删除评论成功")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

function hadReadComment(id){
    fetch(`/api/comment/del2/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

// 6. 系统通知
var title = document.querySelector('#title')
var content = document.querySelector('#content')
var save = document.querySelector('.save')

// 发布通知事件
save.onclick = function(){
  fetch('/api/notice/add/',{
      method:"POST",
      body:JSON.stringify({
        title:title.value,
        content:content.value
      }),
      headers:{
          "Content-Type":"application/json"
      }
  })
  .then(res=>res.json())
  .then(res=>{
      if(res.ok){
          alert("成功发布")
      }
  })
}

// 7. 渲染“视频审核”页面
fetch('/api/audio/video')
.then(res=>res.json())
.then(res=>{
    const items = res.data
    // console.log(items)

    // 数据渲染
    var videoAudio = document.querySelector('.r-content-body4')

    videoAudio.innerHTML = items.map(item=>` 
      <div class="item">
        <div class="item-left">
            <div class="item-img" onclick="alertShow('${item.title}','${item.video}')">
              <img src="${item.img}" alt="">
            </div>
            <div class="item-con">
                <div class="item-title">${item.title}</div>
            </div>
        </div>
        <div class="item-center"></div>
        <div class="item-right">
        <div class="delete2" onclick="PassVideo('${item._id}')">
        <div class="del-icon2">
          <svg t="1683739395860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5163" width="20" height="20"><path d="M68 528.4s229.6 188 252.4 347.6c0 0 301.2-492.8 635.6-536.8 0 0-102-74.4-68.4-191.6 0 0-185.6 18.4-535.2 561.2l-164-278.4L68 528.4z m0 0" fill="#707070" p-id="5164"></path></svg>
        </div>
        <div class="del-txt2">通过</div> 
      </div>
      <div class="clear2" onclick="DisPassVideo('${item._id}')">
        <div class="clear-icon2">
          <svg t="1683739322915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3843" width="20" height="20"><path d="M811.974537 862.529445c-13.094226 0-26.187429-4.994758-36.177967-14.985296l-600.670505-600.623433c-19.9821-19.980054-19.983123-52.376904-0.00307-72.357981 19.980054-19.9821 52.377928-19.983123 72.357981-0.00307l600.670505 600.623433c19.9821 19.980054 19.983123 52.376904 0.00307 72.357981C838.164013 857.532641 825.06774 862.529445 811.974537 862.529445z" fill="#707070" p-id="3844"></path><path d="M211.303009 862.529445c-13.096273 0-26.189476-4.995781-36.180014-14.987343-19.980054-19.981077-19.97903-52.377928 0.00307-72.357981l600.670505-600.623433c19.981077-19.980054 52.378951-19.978007 72.357981 0.00307 19.980054 19.981077 19.97903 52.377928-0.00307 72.357981l-600.670505 600.623433C237.491461 857.533664 224.396211 862.529445 211.303009 862.529445z" fill="#707070" p-id="3845"></path></svg>
        </div>
        <div class="clear-txt2">否决</div>
      </div>
      </div>
    </div>
    `).join('')
    })

    // 视频弹窗
    function alertShow(t,v){
      var alert = document.querySelector('.alert')
      alert.style.display = 'flex'
      var video = document.querySelector('video') // 一打开页面，立即播放视频
      video.play()
      // 渲染页面
      var alertTitle = document.querySelector('.alert-title1')
      alertTitle.innerText = t
      video.src = v
    }

    function alertHide(){
      var alert = document.querySelector('.alert')
      alert.style.display = 'none'
      var video = document.querySelector('video') // 一关闭页面，立即暂停视频
      video.pause()
    }

    function PassVideo(id){
      fetch(`/api/video/add2/${id}`)
      .then(res=>res.json())
      .then(res=>{
          if(res.ok == 1){
              alert("video通过")
              window.location.reload(); // 在删除成功后，刷新页面
          }
      })
  }
  
  function DisPassVideo(id){
      fetch(`/api/audio/video/del/${id}`)
      .then(res=>res.json())
      .then(res=>{
          if(res.ok == 1){
              alert("video已否决")
              window.location.reload(); // 在删除成功后，刷新页面
          }
      })
  }

// 8. 渲染“审核snacks”页面
fetch('/api/audio/snacks')
.then(res=>res.json())
.then(res=>{
    const items = res.data
    // 数据渲染
    var snacksAudio = document.querySelector('.r-content-body5')

    snacksAudio.innerHTML = items.map(item=>` 
      <div class="item">
      <div class="item-left">
          <div class="item-img">
            <img src="${item.img}" alt="">
          </div>
          <div class="item-con">
              <div class="item-title">${item.title}</div>
          </div>
      </div>
      <div class="item-center">${item.classify}</div>
      <div class="item-right">
      <div class="delete2" onclick="PassSnacks('${item._id}')">
        <div class="del-icon2">
          <svg t="1683739395860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5163" width="20" height="20"><path d="M68 528.4s229.6 188 252.4 347.6c0 0 301.2-492.8 635.6-536.8 0 0-102-74.4-68.4-191.6 0 0-185.6 18.4-535.2 561.2l-164-278.4L68 528.4z m0 0" fill="#707070" p-id="5164"></path></svg>
        </div>
        <div class="del-txt2">通过</div> 
      </div>
    <div class="clear2" onclick="DisPassSnacks('${item._id}')">
      <div class="clear-icon2">
        <svg t="1683739322915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3843" width="20" height="20"><path d="M811.974537 862.529445c-13.094226 0-26.187429-4.994758-36.177967-14.985296l-600.670505-600.623433c-19.9821-19.980054-19.983123-52.376904-0.00307-72.357981 19.980054-19.9821 52.377928-19.983123 72.357981-0.00307l600.670505 600.623433c19.9821 19.980054 19.983123 52.376904 0.00307 72.357981C838.164013 857.532641 825.06774 862.529445 811.974537 862.529445z" fill="#707070" p-id="3844"></path><path d="M211.303009 862.529445c-13.096273 0-26.189476-4.995781-36.180014-14.987343-19.980054-19.981077-19.97903-52.377928 0.00307-72.357981l600.670505-600.623433c19.981077-19.980054 52.378951-19.978007 72.357981 0.00307 19.980054 19.981077 19.97903 52.377928-0.00307 72.357981l-600.670505 600.623433C237.491461 857.533664 224.396211 862.529445 211.303009 862.529445z" fill="#707070" p-id="3845"></path></svg>
      </div>
      <div class="clear-txt2">否决</div>
    </div>
      </div>
    </div>
    `).join('')
    })

function PassSnacks(id){
    fetch(`/api/snacks/add2/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("snacks通过")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

function DisPassSnacks(id){
    fetch(`/api/audio/snacks/del/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("snacks已否决")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
}

// 9. 渲染 “用户管理” 页面
fetch('/api/user/get')
.then(res=>res.json())
.then(res=>{
    const items = res.data
    // 数据渲染
    var ucb = document.querySelector('.user-content-body')

    ucb.innerHTML = items.map(item=>` 
    <div class="user-item">
      <div class="uitem-1">
          <img src="${item.avatar}" alt="">
      </div>
      <div class="uitem-2">${item.username}</div>
      <div class="uitem-3">${item.regtime}</div>
      <div class="uitem-4">${ item.role == 1 ? "普通用户" : "管理员" }</div>
      <div class="uitem-4-1" style="display:none">
        <select>
          <option value="1">普通用户</option>
          <option value="2">管理员</option>
        </select>
      </div>

      <div class="uitem-5-1" style="display:none">
        <div class="edit-change" Uid="${item._id}">
          <div class="change-icon">
            <svg t="1683739395860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5163" width="20" height="20"><path d="M68 528.4s229.6 188 252.4 347.6c0 0 301.2-492.8 635.6-536.8 0 0-102-74.4-68.4-191.6 0 0-185.6 18.4-535.2 561.2l-164-278.4L68 528.4z m0 0" fill="#707070" p-id="5164"></path></svg>
          </div>
          <div class="change-text">修改</div> 
        </div>
    
        <div class="edit-nochange">
          <div class="nochange-icon">
            <svg t="1683739322915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3843" width="20" height="20"><path d="M811.974537 862.529445c-13.094226 0-26.187429-4.994758-36.177967-14.985296l-600.670505-600.623433c-19.9821-19.980054-19.983123-52.376904-0.00307-72.357981 19.980054-19.9821 52.377928-19.983123 72.357981-0.00307l600.670505 600.623433c19.9821 19.980054 19.983123 52.376904 0.00307 72.357981C838.164013 857.532641 825.06774 862.529445 811.974537 862.529445z" fill="#707070" p-id="3844"></path><path d="M211.303009 862.529445c-13.096273 0-26.189476-4.995781-36.180014-14.987343-19.980054-19.981077-19.97903-52.377928 0.00307-72.357981l600.670505-600.623433c19.981077-19.980054 52.378951-19.978007 72.357981 0.00307 19.980054 19.981077 19.97903 52.377928-0.00307 72.357981l-600.670505 600.623433C237.491461 857.533664 224.396211 862.529445 211.303009 862.529445z" fill="#707070" p-id="3845"></path></svg>
          </div>
          <div class="nochange-text">取消</div>
        </div>
      </div>

      <div class="uitem-5">
          <div class="edit">
              <div class="edit-icon">
                  <svg t="1683875887904" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2805" width="22" height="22"><path d="M499.2 281.6l243.2 243.2L413.866667 853.333333H170.666667v-243.2l328.533333-328.533333z m0 123.733333L256 648.533333V768h119.466667l243.2-243.2-119.466667-119.466667zM614.4 170.666667L853.333333 413.866667l-72.533333 72.533333-243.2-243.2L614.4 170.666667z" fill="#707070" p-id="2806"></path></svg>
              </div>
              <div class="edit-text">编辑</div>
          </div>
          <div class="del" onclick="DelUser('${item._id}')">
              <div class="del-icon">
                  <svg t="1680616108225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2948" width="16" height="16"><path d="M799.2 874.4c0 34.4-28.001 62.4-62.4 62.4H287.2c-34.4 0-62.4-28-62.4-62.4V212h574.4v662.4zM349.6 100c0-7.2 5.6-12.8 12.8-12.8h300c7.2 0 12.8 5.6 12.8 12.8v37.6H349.6V100z m636.8 37.6H749.6V100c0-48.001-39.2-87.2-87.2-87.2h-300c-48 0-87.2 39.199-87.2 87.2v37.6H37.6C16.8 137.6 0 154.4 0 175.2s16.8 37.6 37.6 37.6h112v661.6c0 76 61.6 137.6 137.6 137.6h449.6c76 0 137.6-61.6 137.6-137.6V212h112c20.8 0 37.6-16.8 37.6-37.6s-16.8-36.8-37.6-36.8zM512 824c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6m-175.2 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0.8 20.8 17.6 37.6 37.6 37.6m350.4 0c20.8 0 37.6-16.8 37.6-37.6v-400c0-20.8-16.8-37.6-37.6-37.6s-37.6 16.8-37.6 37.6v400c0 20.8 16.8 37.6 37.6 37.6" fill="#707070" p-id="2949"></path></svg>
              </div>
              <div class="del-text">删除</div>
          </div>
      </div>
    </div>
    `).join('')
    })

// 删除用户
function DelUser(id){
  if(confirm("确定要删除？")){
    fetch(`/api/user/del/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.ok == 1){
            alert("该用户已被永久删除！")
            window.location.reload(); // 在删除成功后，刷新页面
        }
    })
  }
}

setTimeout(()=>{
  // 编辑用户 => 修改用户角色
  var edit = document.querySelectorAll('.edit')
  var uitem4 = document.querySelectorAll('.uitem-4')
  var uitem41 = document.querySelectorAll('.uitem-4-1')
  var uitem5 = document.querySelectorAll('.uitem-5')
  var uitem51 = document.querySelectorAll('.uitem-5-1')

  edit.forEach((item,index)=>{
    item.onclick = ()=>{
      uitem4[index].style.display = 'none'
      uitem41[index].style.display = 'block'

      uitem5[index].style.display = 'none'
      uitem51[index].style.display = 'flex'
    }
  })

  // 取消编辑
  var NoEdit = document.querySelectorAll('.edit-nochange')
  var uitem4 = document.querySelectorAll('.uitem-4')
  var uitem41 = document.querySelectorAll('.uitem-4-1')
  var uitem5 = document.querySelectorAll('.uitem-5')
  var uitem51 = document.querySelectorAll('.uitem-5-1')

  NoEdit.forEach((item,index)=>{
    item.onclick = ()=>{
      uitem4[index].style.display = 'block'
      uitem41[index].style.display = 'none'
  
      uitem5[index].style.display = 'flex'
      uitem51[index].style.display = 'none'
    }
  })

  // 确定修改
  var myselect = document.querySelectorAll("select")
  var editChange = document.querySelectorAll(".edit-change")

  editChange.forEach((item,index)=>{
    item.onclick = ()=>{
      var id = editChange[index].getAttribute("Uid")
      var ind = myselect[index].selectedIndex;
      if(confirm("确定要修改？")){
        fetch('/api/user/edit',{
          method:"POST",
          body:JSON.stringify({
            id:id,
            role:myselect[index].options[ind].value
          }),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.ok == 1){
            window.location.reload(); // 在修改成功后，刷新页面
          }
        })
      }
    }
  })
},500)
