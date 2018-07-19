define(function(){
    var url = location.search;

    var params = {}; // {type:female,age:18}

    if(url.indexOf('?') != -1){
        url = url.substr(1);
        var arr = url.split('&');
        arr.forEach(function(item){
            var itemArr = item.split('='); // [type,female] [age,18]
            params[itemArr[0]] = itemArr[1];
        })
    }
    
    console.log(params)
    
    return params
})