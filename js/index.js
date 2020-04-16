var indexPage = {
    data: {
        // 快速导航
        quickMenus: [
            {
                title: '警综平台',
                icon: '../images/quick_img_1.png',
                path: 'http://tymh.gaj.nkg.js/loginOperate/toUserLogin'
            },{
                title: '行政平台',
                icon: '../images/quick_img_2.png',
                path: 'http://xzgl.gaj.nkg.js/njga_oa/platform/MainPage/login-for-usb.html'
            },{
                title: '情报平台',
                icon: '../images/quick_img_3.png',
                path: 'http://10.33.70.181/'
            },{
                title: '智慧搜',
                icon: '../images/quick_img_4.png',
                path: 'http://10.32.223.77/gwdp2.1/'
            },{
                title: '在逃人员',
                icon: '../images/quick_img_5.png',
                path: 'http://ztry-zyk.zx.ga/zhyy_zt//pages/xzztry/login.jsp?error=1'
            },{
                title: '法律法规',
                icon: '../images/quick_img_6.png',
                path: 'http://flfgcx.gat.js/law/home/begin1.cbs'
            },{
                title: '省厅联络',
                icon: '../images/quick_img_7.png',
                path: 'https://txll.js/app/;x-session-usap=6788B9CCE388295CBBC7B3268084C101?0'
            },{
                title: '网上考试',
                icon: '../images/quick_img_8.png',
                path: 'http://10.33.1.9/exam/'
            }
        ]
    },

    /**
     * @description 获取首页轮播图
     */
    getIndexSwiper: function(articleData) {
        var html = '<div class="swiper-wrapper">';
        for(var i = 0; i < articleData.Articles.length; i++) {
            var item = articleData.Articles[i];
            html += '<div class="swiper-slide">'+  
                        '<a href="../html/articleDetail.html?id='+ item.Id +'"><img class="index_banner_img" src="'+ item.Image +'" alt=""></img></a>' +
                    '</div>';
        }
        html += '</div>';
        html += '<div class="pagination"></div>';
        html += '<a class="arrow_left" href="javascript:;"></a>'
        html += '<a class="arrow_right" href="javascript:;"></a>'
        $("#indexSwiper").html(html);

        var layoutSwiper = new Swiper('.index-swiper', {
            pagination : '.pagination',
            autoplay: 5000, //可选选项，自动滑动
            loop: true, //可选选项，开启循环
            grabCursor: true,
            paginationClickable: true
        });

        $('#indexSwiper .arrow_left').on('click', function(e){
            e.preventDefault();
            layoutSwiper.swipePrev();
        });
        $('#indexSwiper .arrow_right').on('click', function(e){
            e.preventDefault();
            layoutSwiper.swipeNext();
        });
    },

    /**
     * @description 获取文章列表
     */
    getArticlesList: function(articleData) {
        var html =  '<div class="card_header">'+
                        '<p class="card_header_title">'+ articleData.Name +'</p>'+
                        '<a class="card_header_extra" href="../html/articleList.html?typeId='+ articleData.Id +'&typeName='+ encodeURI(articleData.Name) +'">更多》</a>'+
                    '</div>'+
                    '<div class="card_container">'+
                    '<ul class="news_list">';
        for(var i = 0; i < articleData.Articles.length; i++) {
            var item = articleData.Articles[i];
            if(i < 6) {
                html += '<li>'+
                            '<a href="../html/articleDetail.html?id='+ item.Id +'">•&nbsp;&nbsp;'+ item.Title+'</a>'+
                            '<span>'+ moment(item.CreateTime).format('MM-DD') +'</span>'
                        '</li>';
            }
        }
        html += '</ul>'+
                '</div>';
        
        $("#card_article_" + articleData.Id).html(html);
    },
    /**
     * @description 获取全部文章
     */
    netGetAllArticle: function(cb) {
        var _this = this;
        getAllArticle({
            data: {
                ShowIndex: 2, // 是否首页显示 1：不显示，2：显示
                Status: 2 // 发布状态 1：未发布，2：已发布
            },
            success: function(res) {
                if(res.state === 'success') {
                    for(var i = 0; i < res.data.length; i++) {
                        if(i == 0) {
                            _this.getIndexSwiper(res.data[i]);
                        } else {
                            _this.getArticlesList(res.data[i]);
                        }
                    }
                }
            }
        });
    },

    /**
     * @description 获取快速导航列表
     */
    netGetQuickList: function () {
        var _this = this;
        // getQuickList({
        //     data: {
        //         Status: 2 // 状态 1：未上架，2：已上架
        //     },
        //     success: function(res) {
        //         if(res.state === 'success') {
                    var html = '<h4><img src="../images/quick_bg.png" /><span>快速导航</span></h4>'+
                                '<ul>';
                    
                    for(var i = 0; i < this.data.quickMenus.length; i++) {
                        var item = this.data.quickMenus[i];
                        html += '<li>'+
                                    '<a target="_blank" href="' + item.path + '">'+
                                        '<img src="'+ item.icon +'" />'
                                    '</a>'+
                                '</li>';
                    }
                    html += '</ul>';

                    $("#quickNav").html(html);
                // }
            // }
        // });
    },

    /**
     * @description 获取排班列表
     */
    netGetProcessList: function () {
        getProcessList({
            data: {
                Status: 2 // 状态 1：未上架，2：已上架
            },
            success: function(res) {
                
                var html = '<h4 class="now_time">'+ moment().format('YYYY年MM月DD日 dddd HH:mm:ss') +'</h4>';
                if (res.state === 'success') {
                    var currentProcessObj = res.data[0];
                    html += '<p>值班领导：'+ (currentProcessObj ? currentProcessObj.Leader : '暂无') +'</p>'+
                                '<p>值班民警：'+ (currentProcessObj ? currentProcessObj.Police : '暂无') + '</p>'+
                                '<p>值班文员：'+ (currentProcessObj ? currentProcessObj.Clerk : '暂无') + '</p>'+
                                '<p>值班女文员：' + (currentProcessObj ? currentProcessObj.WomanClerk : '暂无') +'</p>';
                }
                $("#dutyBox .card_container").html(html);
            }
        })
    },

    /**
     * @description 获取通讯录
     */
    netGetAddressBook: function () {
        getAddressBook({
            success: function (res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        if(i < 6) {
                            html += '<p>'+ item.Name +'：'+ item.Phone +'</p>';
                        }
                    }
                    $("#dutyBox .card_container").html(html);
                }
            }
        })
    },

    /**
     * @description 获取警营之星列表
     */
    netGetDiplomaList: function () {
        getDiplomaList({
            data: {
                Status: 2, // 状态 1：未上架，2：已上架
                Page: 1,
                PerPage: 10
            },
            success: function(res) {
                var html = '<div class="swiper-wrapper">';
                for(var i = 0; i < res.data.length; i++) {
                    var item = res.data[i];
                    html += '<div class="swiper-slide">'+  
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
                                '</div>'+
                            '</div>';
                }
                html += '</div>';
                html += '<div id="starPagination" class="pagination"></div>';
                $("#starSwiper").html(html);
        
                var starSwiper = new Swiper('.star-swiper', {
                    pagination : '#starPagination',
                    autoplay: 5000, //可选选项，自动滑动
                    loop: true, //可选选项，开启循环
                    grabCursor: true,
                    paginationClickable: true
                });
            }
        })
    },

    /**
     * @description 获取剪影列表
     */
    netGetPhotogram: function () {
        getPhotogram({
            data: {
                Page: 1,
                PerPage: 20,
                Status: 2 // 状态 1：未上架，2：已上架
            },
            success: function(res) {
                if (res.state === 'success') {
                    var html = '<div class="swiper-wrapper">';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<div class="swiper-slide">'+  
                                    '<img src="'+ item.Address + '" alt="'+ item.Name +'">'+
                                    '<h3>'+ item.Name +'</h3>'+
                                '</div>';
                    }
                    html += '</div>';
                    $("#photogramSwiper").html(html);
            
                    var photogramSwiper = new Swiper('.photogram-swiper', {
                        autoplay: 5000, //可选选项，自动滑动
                        loop: true, //可选选项，开启循环
                        slidesPerView : 8,
                        // cssWidthAndHeight: true
                    });
                }
            }
        })
    },

    /**
     * @description 获取友情链接分类列表
     */
    netGetFirendTypeList: function () {
        var _this = this;
        getFirendTypeList({
            success: function(res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<a href="javascript:;" data-type="'+ item.Id +'">'+ item.Name +'</a>';
                    }
                    $("#firendLinkTypes").html(html);

                    $("#firendLinkTypes a").click(function(e){
                        $("#firendLinkTypes a").removeClass("active");
                        $(this).addClass("active");
                        var type = $(this).attr("data-type");
                        _this.netGetFirendLinksByType(type);
                    });
                }
            }
        })
    },

    /**
     * @description 获取友情链接
     * @param {Int} typeId 友情链接分类id
     */
    netGetFirendLinksByType: function (typeId) {
        getFirendLinksByType({
            data: {
                TabbarTypeId: Number(typeId)
            },
            success: function(res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<li>'+
                                    '<a target="_blank" href="'+ item.Address + '">'+ item.Name +'</a>'+
                                '</li>';
                    }
                    $("#friendLinksContent").html(html);
                }
            }
        })
    },
}

$(function(){
    // 获取首页轮播图
    // indexPage.getIndexSwiper();
    // 获取全部文章列表
    indexPage.netGetAllArticle();

    // 获取快速导航
    indexPage.netGetQuickList();

    // 获取排班列表
    indexPage.netGetProcessList();

    // 点击切换值班通勤type 0值班通勤；type 1 本所通讯
    // $("#dutyBox .layout_menu a").click(function(e) {
    //     var type = $(this).index();
    //     $("#dutyBox .layout_menu a").removeClass("active");
    //     $(this).addClass("active");
    //     $("#dutyBox .card_container").empty();

    //     if(type == 0) {
    //         $("#dutyBox .card_header_extra").css("display", 'none');
    //         indexPage.netGetProcessList();
    //     } else if(type == 1) {
    //         $("#dutyBox .card_header_extra").css("display", 'block');
    //         indexPage.netGetAddressBook();
    //     }
    // });

    // 获取警营之星列表
    indexPage.netGetDiplomaList();

    // 获取剪影列表
    indexPage.netGetPhotogram();

    // 获取友情链接类型
    indexPage.netGetFirendTypeList();

    // 默认获取所有有情链接
    indexPage.netGetFirendLinksByType();
});