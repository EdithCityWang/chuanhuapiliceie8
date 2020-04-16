var app = {
    data: {
        // header 轮播图
        banners: [
            {
                bgUrl: '../images/title_bg_1.png',
                sloganUrl: '../images/title_slogan_1.png'
            },
            {
                bgUrl: '../images/title_bg_2.png',
                sloganUrl: '../images/title_slogan_2.png'
            },
            {
                bgUrl: '../images/title_bg_3.png',
                sloganUrl: '../images/title_slogan_3.png'
            }
        ],
        // menu菜单
        menus: [
            {
                name: 'index',
                path: '../html/index.html',
                title: '网站首页',
                type: 1,
                target: '_self',
            },
            {
                name: 'introduce',
                path: '../html/introduce.html',
                title: '本所简介',
                type: 1,
                target: '_self',
                children: []
            },
            {
                name: 'Phones',
                path: 'http://10.33.199.12/txl/txl.asp',
                title: '电话号码',
                type: 1,
                target: '_blank',
                children: []
            },
            {
                name: 'Duty',
                path: 'http://10.33.199.12/txl/index.asp',
                title: '警务报备',
                type: 1,
                target: '_blank',
                children: []
            },
            {
                name: 'Resource',
                path: 'ftp://50.35.0.253/',
                title: '资源下载',
                type: 1,
                target: '_blank',
                children: []
            },
            {
                name: 'FTP',
                path: 'ftp://50.35.29.16/',
                title: '本所FTP',
                type: 1,
                target: '_blank',
                children: []
            }
        ]
    },
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    /**
     * @description 获取header轮播图
     */
    getLayoutSwiper: function() {
        var html = '<div class="swiper-wrapper">';
        for(var i = 0; i < this.data.banners.length; i++) {
            var item = this.data.banners[i];
            html += '<div class="swiper-slide">'+  
                        '<img class="layout_bg" src="'+ item.bgUrl +'" alt=""></img>' +
                        '<img class="company_logo" src="../images/company_logo.png" />'+
                        '<img class="company_slogan" src="'+ item.sloganUrl +'" alt="">'+
                    '</div>';
        }
        html += '</div>';
        $("#layoutSwiper").html(html);

        var layoutSwiper = new Swiper('.layout-swiper', {
            autoplay: 10000, //可选选项，自动滑动
            loop: true, //可选选项，开启循环
        });
    },
    /**
     * @description 展示菜单
     */
    getLayoutMenus: function() {
        var html = '';
        for(var i = 0; i < this.data.menus.length; i++) {
            var item = this.data.menus[i];
            html += '<a class="'+ (location.pathname.indexOf(item.name) != -1 ? 'active' : '') +'" target="'+ item.target +'" href="'+ item.path +'">'+ item.title +'</a>';
        }
        $("#layoutMenu").html(html);
    },

    /**
     * @description 显示当前时间
     */
    showNowTime: function() {
        $(".now_time").html(moment().format('YYYY年MM月DD日 dddd HH:mm:ss'));
    }
}

$(function(){
    // 展示首页轮播图
    app.getLayoutSwiper();
    // 展示首页menu菜单
    app.getLayoutMenus();

    moment.locale('zh-cn'); 
    // 显示当前时间
    setInterval(app.showNowTime, 1000);
});