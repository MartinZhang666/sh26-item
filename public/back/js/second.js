$(function(){
 var pageSize=5;

 var currentPage=1; 

 render();

 function render(){
  $.ajax({
    type:'get',
    url:'/category/querySecondCategoryPaging',
    data:{
      page:currentPage,
      pageSize: pageSize
    },
   dataType:'json',
   success:function(info){
     console.log(info);
   
    var htmlStr =template('secondTpl',info);
    // console.log(htmlStr);
    
    $('tbody').html(htmlStr);  
    // 引入分页
    $('#paginator').bootstrapPaginator({
       // 版本号
       bootstrapMajorVersion: 3,
       // 当前页
       currentPage: info.page,
       // 总页数
       totalPages: Math.ceil( info.total / info.size ),

       // 给页码添加点击事件
       onPageClicked: function( a, b, c, page ) {
         // 将选中的页码更新到 currentPage
         currentPage = page;
        
         
         // 重新渲染
         render();
       }


    })

   } 
  })
  
   



}
//  给分类按钮注册点击事件 点击 创建
$('.lt_content .btn').click(function(){
  //  alert(1);
  $('#addModal').modal('show'); 
   // 下拉框向后台发送
 $.ajax({
  type:'get',
  url:'/category/queryTopCategoryPaging',
  data:{
    page:1,
    pageSize:100
  },
  dataTy:'json',
  success:function(info){
    console.log(info);
   var htmlStr =template('dropdownTpl',info);
   $('.dropdown-menu').html(htmlStr);
  }
})
 })
// 给下拉框的A注册点击事件
$('.dropdown-menu').on('click','a',function(){
  // alert(1);
  var txt=$(this).text();
  $('#dropdownText').text(txt);
// 获取当前A中的ID
  var id = $(this).data('id')
  $('[name="categoryId"]').val( id );
})
// 4.文件上传
$('#fileupload').fileupload({
  dataType:'json',
  done:function(e,data){
    console.log(data.result);
    var picUrl=data.result.picAddr;
      // 设置图片地址
      $('#imgBox img').attr("src", picUrl);
      // 将图片地址存在隐藏域中
      $('[name="brandLogo"]').val( picUrl );

      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
  }
})
// 5.表单效验初始化
  // 5. 配置表单校验
  $('#form').bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });
 // 6. 注册校验成功事件, 通过 ajax 进行添加
 $("#form").on("success.form.bv", function( e ) {
  // 阻止默认的提交
  e.preventDefault();

  $.ajax({
    url: "/category/addSecondCategory",
    type: "post",
    data: $('#form').serialize(),
    success: function( info ) {
      console.log( info )

      // 关闭模态框
      $('#addModal').modal("hide");
      // 重置表单里面的内容和校验状态
      $('#form').data("bootstrapValidator").resetForm( true );

      // 重新渲染第一页
      currentPage = 1;
      render();

      // 找到下拉菜单文本重置
      $('#dropdownText').text("请选择1级分类")

      // 找到图片重置
      $('#imgBox img').attr("src", "images/none.png")
    }
  })
})


})