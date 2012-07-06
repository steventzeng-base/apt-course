var apt = apt || {};
apt.ui = apt.ui || {};
/**
 * 功能：共用元件 動態下拉Menu
 * @class
 * @param menuid ID前需要加上#號
 */
apt.ui.Menu = function(menuid){
    var inparent = false;//滑鼠是否在parent區塊狀態
    var insubmenu = false;//滑鼠是否在下拉menu區塊狀態
    $(menuid+' .dropdown').mouseenter(function() {

        $(menuid+' .dropdown'+' .sublinks').stop(false, true).hide();
        var parentBox = $(this).parent().parent();
        var submenu = $(this).parent().next();

        submenu.css({
            position : 'absolute',
            top : $(this).position().top + 26 + 'px',
            left :$(this).position().left + 'px',
            zIndex : 9999,//顯示在網頁最上層
            border : '1px solid #AED0EA',
            background :'#f6f6f6'
        });

        submenu.stop().show();
        submenu.mouseleave(function() {
            insubmenu = false;
        });
        submenu.mouseenter(function(){
            insubmenu = true;
        });
        parentBox.mouseleave(function() {
            inparent = false;
            submenu.stop().hide();//slideUp(500);
        });
    });
};