$(function(){

  // 当前页
  var currentPage = 1;
  // 一页多少条
  var pageSize = 5;
  var currentId;
  var isDelete;
render()
function render(){

 
$.ajax({
  type:'get',
  url:'/user/queryUser',
  data: {
    page: currentPage,
    pageSize: pageSize
  },
  success:function(info){
    console.log(info);
    // 参数2 必须是一个对象
        // 在模板中可以任意使用对象中的属性
        // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
        var htmlStr = template( "tpl", info );
        $('.container-fluid tbody').html( htmlStr );


        // 配置分页
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),

          // 当页面被点击时触发
          onPageClicked: function( a, b, c, page ) {
 a           // page 当前点击的页码
            currentPage = page;
            // 调用 render 重新渲染页面
            render();
          }
        });

      }
    });
  }


  // 2. 通过事件委托给 按钮注册点击事件
 $('tbody').on('click','.btn',function(){
  //  alert(1);
  $('#userModal').modal('show');
  currentId= $(this).parent().data('id');
  // console.log(id);
  isDelete = $(this).hasClass('btn-danger')?'0':'1';
 })
// 点击模态框的确认按钮 实现数据更改
  $('#submitBtn').on('click',function(){
    // alert(1);
    // 向后台获取发送数据
  $.ajax({
    type:'POST',
    url:'/user/updateUser',
    data:{
      id:currentId,
      isDelete:isDelete
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.success){
        // 关闭模态框
     $('#userModal').modal('hide'); 
           // 渲染
           render();
      }
   

    }

    })
  })


})