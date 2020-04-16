var page = {
    data: {
        postdata: {
            Page: 1,
            PerPage: 12,
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
    netGetDiplomaList: function () {
        var _this = this;
        getDiplomaList({
            data: this.data.postdata,
            success: function(res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<a class="layout_col layout_col_2" href="../html/starsDetail.html?id='+ item.Id +'">'+
                                    '<div class="stars_box">'+
                                        '<div class="stars_image">'+
                                            '<img class="avatar avatar_square" src="'+ item.Address +'" />'+
                                            '<img class="avatar avatar_circle" src="'+ item.Address1 +'" />'+
                                        '</div>'+
                                        '<div class="starts_info">'+ 
                                            (item.AwardData ? moment(item.AwardData).format('LL') : '') +
                                            '<h4>'+ item.Name +'</h4>'+
                                            (item.DiplomaTitle ? item.DiplomaTitle.Name : '' ) +
                                        '</div>'+
                                        '<p class="star_detail">事迹简介：'+ item.Content +'</p>'+
                                    '</div>'+
                                '</a>';
                    }
                    _this.data.listObj.list = res.data || [];
                    _this.data.listObj.pages = res.pageInfo.TotalPage;
                    _this.data.listObj.total = res.pageInfo.Total;
                    $(".stars_list").html(html);

                    // 分页
                    $("#myPage").sPage({
                        page: _this.data.postdata.Page,//当前页码，必填
                        total: _this.data.listObj.total,//数据总条数，必填
                        pageSize: _this.data.postdata.PerPage,//每页显示多少条数据，默认10条
                        showTotal: true,//是否显示总条数，默认关闭：false
                        totalTxt: "共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                        noData: false,//没有数据时是否显示分页，默认false不显示，true显示第一页
                        showSkip: true,//是否显示跳页，默认关闭：false
                        showPN: true,//是否显示上下翻页，默认开启：true
                        prevPage:"上一页",//上翻页文字描述，默认“上一页”
                        nextPage:"下一页",//下翻页文字描述，默认“下一页”
                        fastForward: 5,//快进快退页数，默认0表示不开启快进快退
                        backFun:function(page){
                            _this.data.postdata.Page = page;
                            //点击分页按钮回调函数，返回当前页码
                            $("#pNum").text(page);
                            _this.netGetDiplomaList();
                        }
                    });
                }
            }
        })
    }
}

$(function(){
    // localStorage.setItem('aaa', 1111);
    console.log(window)
    page.netGetDiplomaList(); // 获取警营之星
});