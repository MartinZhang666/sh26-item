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

 