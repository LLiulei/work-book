require(['jquery','render','text!searchTpl','lazyload','storage','bscroll'],function($,render,searchTpl,lazyload,storage,bscroll){
    $('body').append(searchTpl);

    var _searchList = $('.search-list');
    var _tagWrap = $('.tag-wrap');
    var _ipt = $('.ipt');

    // 点击back 返回首页
    $('.icon-back').on('click',function(){
        location.href = '/';
    })
    // 获取热门搜索关键词
    $.ajax({
        url:'/api/searchHot',
        dataType:'json',
        success:function(res){
            console.log(res)
            if(res.code === 1){
                render('#tag-tpl','.hot',res.data.ads)
            }
        },
        error:function(error){
            console.warn(error)
        }
    })

    // 点击搜索
    $('.search-btn').on('click',function(){
        var val = _ipt.val();

        if(!val){
            _searchList.html('<p>您未输入内容</p>');
            $('.tag-wrap').hide();
            _searchList.show();
            _tagWrap.hide();
        }else{
            searchResult(val);
        }
        _tagWrap.hide();
        _searchList.show();
    })

    var history = storage.get('history') || [];
    if(history.length > 0){
        $('.history-title').show();
        render('#tag-tpl','.history',history,true);
    }

    function searchResult(val){
        var isHas = history.some(function(item){
            return item.ad_name === val;
        })
        if(!isHas){
            history.push({ad_name:val});
            storage.set('history',history);
        }
        $.ajax({
            url:'/api/search?key=' + val,
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code === 1){
                    if(!res.data){
                        _searchList.html('<p>很遗憾,没有您想要的数据!</p>');
                    }else{
                        render('#search-template','.search-list',res.data.items,true)
                        // 懒加载
                        $('img[data-original]').lazyload({
                            effect:'fadeIn',
                            container:_searchList
                        });
                    }
                }
            },
            error:function(error){
                console.warn(error)
            }
        })
    }

    // input
    _ipt.on('input',function(){
        if(!$(this).val()){
            _tagWrap.show();
            _searchList.hide();
            
            $('.history-title').show();
            render('#tag-tpl','.history',history,true);
        }
    })

    // 点击热门关键词
    $('.tag-wrap').on('click','li',function(){
        var txt = $(this).text();
        _ipt.val(txt);
        searchResult(txt);
        _tagWrap.hide();
        _searchList.show();
    })
})