var page = {
    data: {

    },
    /**
     * @description 展示文章详情
     */
    netGetArticleListByType: function(id) {
        getArticleListByType({
            data: {
                Id: id
            },
            success: function(res) {
                if(res.state === 'success') {
                    var articleObj = res.data[0];

                    var html = '<img class="about_image" src="'+ articleObj.Image + '" alt="">'+
                                '<div class="about_content">'+ articleObj.Content +'</div>';

                    $("#articleTitle").html(articleObj.Title)
                    $("#layoutTitle").html('发布时间：' + articleObj.CreateTime);
                    $(".about_page").html(html);
                }
                
            }
        })
        
    }
}

$(function(){
    page.netGetArticleListByType(Number(app.getQueryString('id')));
});