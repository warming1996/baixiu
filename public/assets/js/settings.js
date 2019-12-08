//当管理员设置logo图片时
$('#logo').on('change', function() {
    //获取管理员选择的图片
    var file = this.files[0];
    //创建formData对象 实现二进制上传
    var formData = new FormData();
    //将选择的图片添加到FormData对象中
    formData.append('logo', file);

    //发送请求实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        
    })
})