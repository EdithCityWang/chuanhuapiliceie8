var page = {
    data: {

    },
}

$(function(){
    $("#layoutTitle").html(app.getQueryString('name'));
    $("#cucolorisDetail").html('<img src='+ app.getQueryString('Address') + ' />');
});