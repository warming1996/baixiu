// //时间格式化
// template.defaults.imports.defaults = function(d) {
// 	return d.slice(0,10)
// }

// 向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        var html = template('commentsTpl', response);
        console.log(html);
        $('#commentsBox').html(html);
        
        var pageHTML = template('pageTpl', response);
        $('#pageBox').html(pageHTML);   
    }
});

//实现分页功能
function changePage (page) {
    $.ajax({ 
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function (response) {
			console.log(response)
			var html = template('commentsTpl', response);
			$('#commentsBox').html(html);
			var pageHTML = template('pageTpl', response);
			$('#pageBox').html(pageHTML)
		}
	});
}