var page = {
    data: {
    },
    /**
     * @description 获取文章列表
     */
    netGetAddressBook: function () {
        var _this = this;
        getAddressBook({
            success: function(res) {
                if (res.state === 'success') {
                    var html = '';
                    for(var i = 0; i < res.data.length; i++) {
                        var item = res.data[i];
                        html += '<tr>'+
                                    '<td>'+ item.AddressBookType.Name +'</td>'+
                                    '<td>'+ item.Name +'</td>'+
                                    '<td>'+ item.Level +'</td>'+
                                    '<td>'+ item.Phone +'</td>'+
                                '</tr>';
                    }
                    $(".address_book_table tbody").html(html);
                }
            }
        })
    }
}

$(function(){
    page.netGetAddressBook(); // 获取文章列表
});