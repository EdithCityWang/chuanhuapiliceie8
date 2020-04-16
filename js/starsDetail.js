var page = {
    data: {
        postdata: {
            ArticleTypeId: 0, // 分类ID
            Page: 1,
            PerPage: 10,
            Status: 2 // 发布状态 1：未发布，2：已发布
        },
        listObj: {
            list: [],
            pages: 0,
            total: 0
        }
    },
    /**
     * @description 获取文章列表
     */
    netGetDiplomaList: function (id) {
        var _this = this;
        getDiplomaList({
            data: {
                Id: id
            },
            success: function(res) {
                if (res.state === 'success') {
                    var item = res.data[0];
                    var html = '<div class="stars_box">'+
                                    '<div class="starts_info">'+ 
                                        (item.AwardData ? moment(item.AwardData).format('LL') : '') +
                                        '<h4>'+ item.Name +'</h4>'+
                                        (item.DiplomaTitle ? item.DiplomaTitle.Name : '' ) +
                                    '</div>'+
                                    '<div class="stars_image">'+
                                        '<img class="avatar avatar_square" src="'+ item.Address +'" />'+
                                        '<img class="avatar avatar_circle" src="'+ item.Address1 +'" />'+
                                    '</div>'+
                                    '<p class="star_detail">事迹简介：'+ item.Content +'</p>'+
                                '</div>';
                    $(".stars_detail_page").html(html);
                }
            }
        })
    }
}

$(function(){
    page.netGetDiplomaList(Number(app.getQueryString('id'))); // 获取文章列表
});