require(['jquery','render','getRequest','text!detailTpl','text!bookTB','storage'],function($,render,getRequest,detailTpl,bookTB,storage){

    $('body').append(detailTpl);
    $('body').append(bookTB);

    var fiction_id = getRequest.fiction_id;
    // console.log(fiction_id) 编号

    $.ajax({
        url:'/api/detail?fiction_id=' + fiction_id,
        dataType:'json',
        success:function(res){
            // console.log(res)
            if(res.code === 1){

                // 渲染top
                render('#detail-template','#detail',res.data.item);

                // 渲染类别
                render('#tag-template','.type-tags',res.data.item);

                // 渲染作者其他书籍
                render('#book-t-b','#other-list',res.data.related);

                // 版权信息
                render('#copyright-template','.copyright',res.data.item);

                // 点击开始阅读 判断是否登陆
                $('#start-btn').on('click',function(){
                    var code = storage.get('code') || 0;
                    if(code){
                        location.href = '../../page/aritcal.html';
                    }else{
                        location.href = '../../page/login.html';
                    }
                })
            }
        },
        error:function(error){
            console.warn(error)
        }
    })

    // 点击开始阅读 判断是否登陆 登录 跳转到目录页 未登录跳转登录页


    // 点击icon-back icon-home 返回主页
    $('.icon-back').on('click',function(){
        location.href = '/';
    })

    $('.icon-home').on('click',function(){
        location.href = '/';
    })
})