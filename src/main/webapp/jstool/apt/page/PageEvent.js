/**
 *功能：處理在ie中輸入到退鍵會回到上一頁的問題
 */
(function(){
    $(document).keydown(function(e) {
        var element = e.target.nodeName.toLowerCase();
        if (element != 'input' && element != 'textarea') {
            return  e.keyCode !== 8;
        }
    });
}());

/**
 * 綁定 fieldset 下拉功能事件
 */
$('fieldset legend.detail.trigger').live('click', function() {
    $(this).nextAll().slideToggle();
});