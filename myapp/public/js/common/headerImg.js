// 获取用户头像
var userId = localStorage.getItem('userId')
fetch(`/api/getFace/${userId}`)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res.data[0].avatar)
        var avatarImg = res.data[0].avatar
        // 渲染页面
        var headerImg = document.querySelector('#headerImg')
        headerImg.setAttribute("src", avatarImg); // 获取并设置img的src属性
    })