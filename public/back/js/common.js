// NProgress.start();
//   setTimeout(function(){
//  NProgress.stop();
//   },1000)
// 需求变了 变成发送ajax 的时候开始进度条 ajax 成功后结束进度条
$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  NProgress.done();
})



//  公共
// 1.二级菜单切换功能
// 2.左侧菜单栏切换
// 3.退出功能
$(function(){
 // 1.二级菜单切换功能
 $('.category').click(function(){
   $('.lt_aside .child').stop().slideToggle();
 })
// 2.左侧菜单栏切换
 $('.icon_menu').click(function(){
   $('.lt_aside').toggleClass('hidemenu');
   $('.lt_topbar').toggleClass('hidemenu');
   $('.lt_main').toggleClass('hidemenu');

 })
 
 $('.icon_logout').click(function(){
   $('#logoutModal').modal('show');
 })



})