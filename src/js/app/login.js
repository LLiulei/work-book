require(['jquery','storage'],function($,storage){
    $('#login-btn').on('click',function(){
        var user = $('#user').val();
        var pwd = $('#pwd').val();
        
        if(!user){
            alert('用户名不能为空')
        }else{
            if(!pwd){
                alert('密码未填')
            }else{
                $.ajax({
                    url:'/api/login',
                    data:{
                        user:user,
                        pwd:pwd
                    },
                    type:'post',
                    dataType:'json',
                    success:function(res){
                        console.log(res)
                        if(res.code === 1){
                            storage.set('code',res.code);
                            history.go(-1);
                        }else{
                            alert(res.msg)
                        }
                    },
                    error:function(error){
                        console.warn(error)
                    }
                })
            }
        }
    })   
})