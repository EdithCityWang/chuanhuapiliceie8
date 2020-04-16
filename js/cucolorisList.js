var page = {
    data: {
        postdata: {
            Page: 1,
            PerPage: 12,
            Status: 2, // 状态 1：未上架，2：已上架
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
    netGetPhotogram: function () {
        var _this = this;
        getPhotogram({
            data: this.data.postdata,
            success: function(res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<div class="layout_col layout_col_2">'+
                                    '<a href="../html/cucolorisDetail.html?address='+ item.Address +'&name='+ item.Name +'">'+
                                        '<img src="'+ item.Address +'" alt="'+ item.Name +'" />'+
                                    '</a>'+
                                '</div>';
                    }
                    _this.data.listObj.list = res.data || [];
                    _this.data.listObj.pages = res.pageInfo.TotalPage;
                    _this.data.listObj.total = res.pageInfo.Total;
                    $("#cucolorisList").html(html);

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
                            _this.netGetPhotogram();
                        }
                    });
                }
            }
        })
    }
}

$(function(){
    page.netGetPhotogram();
});