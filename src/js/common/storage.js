define(function(){
    var storage = window.localStorage;

    var storageObj = {
        set:function(key,val){
            if(!val){
                storage.removeItem(key);
            }else{
                storage.setItem(key,JSON.stringify(val));
            }
        },
        get:function(key){
            var val = JSON.parse(storage.getItem(key));
            return val;
        },
        remove:function(key){
            storage.removeItem(key);
        },
        clear:function(){
            storage.clear()
        }
    };
    return storageObj;
})