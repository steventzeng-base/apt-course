/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var apt = apt || {};
apt.ui = apt.ui || {};
/**
 *@class
 * 功能：共用元件mseeagebox
 * @param selector
 * @param context
 * @returns {apt.ui.MessageBox}
 */
apt.ui.MessageBox = function(selector, context){
    /**
     * messageBox 元件
     */
    this.messageBox = $(selector, context);
    this.messageBox.addClass('messageBox ui-widget ui-corner-all');
    this.clearMessage();
};
/**
 * message訊息中插入參數之功能
 * 取代字串中的{數字} 數字從1開始
 * ex :
 * 		輸入 "你輸入的退郵[{1} {2}]判別碼{3}不正確", "zzzzzz","asdfasd","asdfasdfasdfasdf"));
 *		輸出 你輸入的退郵[zzzzzz asdfasd]判別碼asdfasdfasdfasdf不正確
 */
apt.ui.MessageBox.prototype = {
    /**
     *顯示一般訊息
     *@param message 一般訊息內容
     */
    updateMessage:function(message){
        this.messageBox.removeClass('ui-state-error').addClass('ui-state-highlight');
        var args = arguments;
        var message = String(message).replace(RegExp(/\{(\d+)\}/g), function(match, index) {
            return args[index];
        });
        this.render(message);
    },
    /**
     *顯項錯誤的訊息
     *@param message 錯誤訊息內容
     */
    errorMessage:function(message){
        this.messageBox.removeClass('ui-state-highlight').addClass('ui-state-error');
        var args = arguments;
        var message = String(message).replace(RegExp(/\{(\d+)\}/g), function(match, index) {
            return args[index];
        });
        this.render(message);
    },
    /**
     *呈現訊息的方法,呈現文字內容及外框樣式
     *@private
     */
    render:function(message){
        this.messageBox.empty().append($('<span/>').addClass('ui-icon ui-icon-info').css({
            'float': 'left',
            'margin-right': '.3em'
        })).append($('<label/>').html(message)).show();
        if ( $.browser.msie && $.browser.version == '6.0') {
            this.messageBox.removeClass('ui-state-error ui-state-highlight')
            this.messageBox.find('span').css('color','#000');
        }
    },
    /**
     * 清除訊息
     * @function
     */
    clearMessage:function(){
        this.messageBox.empty().append('&nbsp;').removeClass('ui-state-error ui-state-highlight')
    }
};
