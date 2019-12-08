// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
    //获取管理员在表单中的内容
    var formData = $(this).serialize();
    //获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})