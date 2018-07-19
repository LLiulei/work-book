require(['jquery','render','text!listTpl','getRequest','lazyload'],function($,render,listTpl,getRequest,lazyload){
    $('body').append(listTpl);

    var type = getRequest.type;

    // 缓存变量
    var _listContent = $('.list-content');
    // console.log(getRequest.type);

    getList();

    function getList(){
        $.ajax({
            url:'/api/list?type=female',
            dataType:'json',
            success:function(res){
                // console.log(res)
                if(res.code === 1){
                    render('#list-tpl','.list-wrap',res.data.items)
                    $('img[data-original]').lazyload({
                        container:_listContent
                    })
                    _listContent.on('scroll',loadmore);
                }
            },
            error:function(error){
                console.log(error)
            }
        })
    }
    // 原生的上拉加载
    var listConHeight = _listContent.height(); // 盒子
    function loadmore(){
        var conHeight = $('.list-wrap').height(); // 内容

        var maxScrollHeight = conHeight - listConHeight;
        // console.log(_listContent.scrollTop())
    
        if(_listContent.scrollTop() > maxScrollHeight - 40){
            _listContent.off('scroll');
            getList();
        }
    }

    // 点击icon-back返回主页面
    $('.icon-back').on('click',function(){
        location.href = '/';
    })

    // 点击icon-home返回主页面
    $('.icon-home').on('click',function(){
        location.href = '/';
    })
})