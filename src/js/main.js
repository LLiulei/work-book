require.config({
    baseUrl:'/js/',
    paths:{
        // 库文件
        'jquery':'./libs/jquery-3.2.1.min',
        'bscroll':'./libs/BScroll',
        'swiper':'./libs/swiper-4.2.2.min',
        'handlebars':'./libs/handlebars-v4.0.11',
        'text':'./libs/text',
        'lazyload':'./libs/jquery.lazyload',

        // 公用的
        'getSlideDirection':'./common/direction',
        'render':'./common/render',
        'storage':'./common/storage',

        // 页面js
        'index':'./app/index',
        'search':'./app/search',

        // 模板
        'bookTB':'../page/tpl/book-t-b.html',
        'bookLR':'../page/tpl/book-l-r-list.html',
        'indexTpl':'../page/tpl/index-tpl.html',
        'searchTpl':'../page/tpl/book-l-r-s-list.html'
    },
    shim:{
        'lazyload':{
            deps:['jquery']
        }
    }
})