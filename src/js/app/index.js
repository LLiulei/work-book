require(['jquery','swiper','bscroll','getSlideDirection','text!bookTB','render','text!indexTpl','text!bookLR'],function($,swiper,bscroll,getSlideDirection,bookTB,render,indexTpl,bookLR){

    $('body').append(bookTB);
    $('body').append(indexTpl);
    $('body').append(bookLR);
    // 缓存变量
    var _line = $('.line');
    // 实例化wrap-swiper
    var wrapSwiper = new swiper('.wrap-swiper');
    //滑动处理
    var startX, startY;
    document.addEventListener('touchstart',function (ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;  
    }, false);
    document.addEventListener('touchend',function (ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = getSlideDirection(startX, startY, endX, endY);
        switch(direction) {
            case 3:
                swiperFun(1);
                break;
            case 4:
                swiperFun(0);
                break;
            default:           
        } 
    }, false);
    function swiperFun(num){
        wrapSwiper.slideTo(num);
        $('.tab-item').eq(num).addClass('active').siblings().removeClass('active');
        if(num === 1){
            _line.addClass('move');
        }else{
            _line.removeClass('move');
        }
    }
    // 点击tab-item
    $('.tab-wrap').on('click','span',function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        if(index === 1){
            _line.addClass('move');
        }else{
            _line.removeClass('move');
        }
        wrapSwiper.slideTo(index);
    })

    // 实例化bscroll
    var cityScroll = new bscroll('.book-city',{
        probeType:2,
        click:true,
        scrollY:true
    });

    var Parent = $('.book-city>div');
    var pagenum = 1;
    var total = 3;

    var hei = document.getElementsByTagName('html')[0].style.fontSize;
    var ruleHeight = parseInt(hei) * (44 / 37.5);
    cityScroll.on('scroll',function(){
        var y = this.y;
        var maxY = this.maxScrollY;
        if(y < maxY - ruleHeight){
            if(pagenum < total){
                Parent.attr('up','释放加载更多')
            }else{
                Parent.attr('up','加载完毕')
            }
        }else if(y < maxY - ruleHeight / 2){
            if(pagenum < total){
                Parent.attr('up','上拉加载')
            }else{
                Parent.attr('up','加载完毕')
            }
        }else if(y > ruleHeight){
            Parent.attr('down','释放刷新')
        }
    })

    cityScroll.on('touchEnd',function(){
        if(Parent.attr('up') === '释放加载更多'){
            console.log('请求数据，上拉加载')
            if(pagenum < total){
                pagenum++;
                getRecommend(pagenum);
                Parent.attr('up','上拉加载')
            }else{
                Parent.attr('up','加载完毕')
            }
        }else if(Parent.attr('down') === '释放刷新'){
            location.reload();
        }
    })

    getRecommend(pagenum);
    // 获取推荐数据
    function getRecommend(pagenum){
        $.ajax({
            url:'/api/recommend?pagenum=' + pagenum,
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code === 1){
                    renderRecommend(res.data);
                }
            },
            error:function(error){
                console.warn(error)
            }
        })
    }
    // 渲染推荐数据
    function renderRecommend(data){
        render('#l-r-tpl','.loadmore',data.items)
        cityScroll.refresh();
    }

    function loadMore(pagenum){
        $.ajax({
            url:'/api/recommend?pagenum=' + pagenum,
            dataType:'json',
            success:function(res){
                console.log(res)
            },
            error:function(error){
                console.warn(error)
            }
        })
    }
    

    // 请求index数据
    $.ajax({
        url:'/api/index',
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.code == 1){
                renderIndex(res.data);
            }
        },
        error:function(error){
            console.warn(error)
        }
    })

    // 渲染首页
    function renderIndex(res){
        // bannerswiper
        var swiperData = res.items[0].data.data.filter(function(item){
            return item.size != 0;
        })

        render('#banner-swiper-tpl','.banner',swiperData);
        // 实例化banner-swiper
        new swiper('.banner-swiper',{
            autoplay:true,
            loop:true
        });
        // type 数据
        var typeData = res.items[0].data.data.filter(function(item){
            return item.size == 0;
        })

        render('#types-tpl','.types',typeData);
        // console.log('swiperData',swiperData)
        // console.log('typeData',typeData)

        // 本周最火
        var hotData = res.items[1].data.data;
        render('#book-t-b','.hot',hotData);

        // 重磅推荐
        var recommendData = format(res.items[2].data.data,5);
        // 格式化重磅数据
        function format(data,num){
            var len = Math.ceil(data.length / num);
            var target = [];
            for(var i = 0;i < len;i++){
                target.push(data.splice(0,num))
            }
            return target;
        }

        var heavynum = 0;
        render('#recommend-tpl','.recommend',recommendData[heavynum],true)
        $('.change-btn').on('click',function(){
            heavynum++;
            if(heavynum == recommendData.length){
                heavynum = 0;
            }
            render('#recommend-tpl','.recommend',recommendData[heavynum],true)
        })
    }
    
    // 切换数据的样式
    $('.switch-btn').on('click',function(){
        $('.shelf-list').toggleClass('change-style');
    })
})