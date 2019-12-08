function serializeObj(form) {
    var arr = form.serializeArray();
    var obj = {};

    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
};


// 当表单发生提交行为的时候//添加用户
$('#userForm').on('submit', function () {
    // var formData = $(this).serialize();
    // console.log(formData);

    var obj = serializeObj($(this))
    console.log(obj);

    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: obj,
        success: function () {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    // 阻止表单的默认提交行为
    return false;
});

//处理头像上传功能//当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    // 构建一个formData对象
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    //发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,

        // 告诉$.ajax方法不要解析请求参数
        processData: false,

        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,

        success: function (response) {
            console.log(response);
            // 实现头像预览功能，设置给页面元素即可            
            $('#preview').attr('src', response[0].avatar);

            //设置一个隐藏域，这里的路径是需要发送给服务器的
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});



//列表展示功能//向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', { data: response });
        // 将拼接好的字符串显示在页面中，找到需要显示内容的这个容器，把内容添加到这个容器中即可
        $('#userBox').html(html)

    }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    //获取被点击用户的id
    var id = $(this).attr('data-id');//this-->指向编辑按钮 

    //根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});

//为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取用户修改后的表单内容
    var formData = serializeObj($(this));
    console.log(formData);

    //获取要修改的那个用户的id
    var id = $(this).attr('data-id');

    //发送请求 修改用户信息
    $.ajax({
        type: 'put',
        //告诉服务器,我们需要修改的用户
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            console.log(response);

            // 修改用户信息成功 重新加载页面
            location.reload();
        }
    })
    return false;
});

//当点击删除按钮时
$('#userBox').on('click', '.delete', function () {
    //如果管理员确定要删除用户
    if(confirm('确定要删除用户吗')){
        //获取要删除的用户的id
        var id = $(this).attr('data-id');
        //向服务器端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload(); //刷新页面
            }
        })
    }
});

//当全选按钮的状态发生改变时

// 获取全选按钮
var selectAll = $('#selectAll');

//获取批量删除按钮
var deleteMany = $('#deleteMany');

selectAll.on('change', function () {
    //获取全选按钮的状态
    var status = $(this).prop('checked');

    if(status) {
        //显示批量删除按钮
        deleteMany.show();
    }else {
        deleteMany.hide();
    }
    //获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status);    
});

//当用户前面的复选框发生改变时
$('#userBox').on('chenge', '.userStatus', function() {
   //获取复选按钮
    var inputs = $('#userBox').find('input');
    
    if(inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
       //alert('所有用户都是选中的');
    } else {
        //alert('不是所有用户都是选中的');
        selectAll.prop('checked', false)
    }

    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if(inputs.filter(':checked').length > 0) {
        deleteMany.show();
    }else {
        deleteMany.hide();
    }

});

