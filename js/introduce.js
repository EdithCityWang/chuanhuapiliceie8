var page = {
    data: {

    },
    netGetAbout: function() {
        getAbout({
            success: function(res) {
                if (res.state === 'success') {
                    var aboutDetail = res.data[0];
                    var html = '<img class="about_image" src="'+ (postUrl + aboutDetail.Image) +'" alt="">'+
                                '<div class="about_content">'+ aboutDetail.Content +'</div>';

                    $("#aboutPage").html(html);
                }
            }
        })
    }
}

$(function(){
    page.netGetAbout();
});