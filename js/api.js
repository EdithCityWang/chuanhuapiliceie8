var postUrl = 'http://111.229.110.45:8080/';

var api = {
    post: function(url, options) {
        options.data = options.data || {};
        this.ajax($.extend(options, {
            url: url,
            type: 'POST',
            data: JSON.stringify(options.data)
        }));
    },
    get: function(url, options) {
        options.data = options.data || {};
        this.ajax($.extend(options, {
            url: url,
            type: 'GET',
            data: JSON.stringify(options.data)
        }));
    },
    ajax: function (options) {
        options.type = options.type || 'POST';
        options.data = options.data || {};
        options.dataType = options.dataType || 'json';
        options.contentType = options.contentType || 'application/json;charset=UTF-8';
        $.support.cors = true; // 兼容ie8 手动开启cors
        $.ajax({
            url: postUrl + options.url,
            type: options.type,
            contentType: options.contentType,
            dataType: options.dataType,
            data: options.data,
            cache: false,
            success: options.success || function(result, status, xhr) {
                console.log(result, status, xhr)
            },
            error: options.error || function(xhr, status, error){
                console.log(xhr, status, error);
            }
        })
    }
}

// 查询文章分类
var getArticleTypeList = function(options) { api.post('/v1/article/queryArticleType', options) };

// 根据文章分类查询文章
var getArticleListByType = function(options) { api.post('/v1/article/queryArticle', options) };

// 查询友情链接分类
var getFirendTypeList = function(options) { api.post('/v1/tabbar/queryType', options) };

// 查询友情链接
var getFirendLinksByType = function(options) { api.post('/v1/tabbar/query', options) };

// 查询快速导航
var getQuickList = function(options) { api.post('/v1/navigation/query', options) };

// 查询简介
var getAbout = function(options) { api.post('/v1/about/query', options) };

// 查询剪影
var getPhotogram = function(options) { api.post('/v1/photogram/query', options)};

// 查询全部文章
var getAllArticle = function(options) { api.post('/v1/article/queryAllArticle', options) };

// 查询排班
var getProcessList = function(options) { api.post('/v1/process/query', options) };

// 查询通讯录
var getAddressBook = function(options) { api.post('/v1/addressBook/query', options) };

// 获取警营之星列表
var getDiplomaList = function(options) { api.post('/v1/diploma/query', options) };

