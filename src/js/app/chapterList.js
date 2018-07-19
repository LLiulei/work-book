require(['jquery','render','getRequest','bscroll'],function($,render,getRequest,bscroll){
    var fiction_id = getRequest.fiction_id;

    $.ajax({
        url:'/api/chapterList?fiction_id=' + fiction_id,
        dataType:'json',
        success:function(res){
            console.log(res)
            if(res.code === 1){
                render('#chapter-template','.chapter-list',res.data.item.toc);
                var chapterScroll = new bscroll('.chapter-wrap',{
                    click:true
                })
                var last = $('.chapter-list li').length - 1;
                var lastTxt = $('.chapter-list li').eq(last)[0];
                lastTxt.style = 'color:#ff6600'
                chapterScroll.scrollToElement(lastTxt);
            }
        },
        error:function(error){
            console.warn(error)
        }
    })

    // 点击icon-home 返回首页
    $('.icon-home').on('click',function(){
        location.href = '/';
    })

    // 点击icon-back 返回书籍详情
    $('.icon-back').on('click',function(){
        location.href = '/page/detail.html?fiction_id=' + fiction_id;
    })
})