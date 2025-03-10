function load_html(file_name) {
    $.ajax({
        url: file_name,
        method: 'GET',
        dataType: 'html',
        success: function(data) {
            // 解析 HTML
            const $html = $(data);
            const $body = $html.filter('#body');
            // 或者，直接插入整个 HTML 内容
            $('#body').html($body.html());
        },
        error: function(xhr, status, error) {
            $('#body').html(status+'<br>'+error);
        }
    });
}