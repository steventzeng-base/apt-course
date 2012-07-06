/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var apt = apt || {};
apt.ui = apt.ui || {};
/**
 * 功能：帶入參數直接帶入網址回傳結果生成一張grid
 * 參數1：selector 指定產生Grid的html標籤位址
 * 參數2 gridOptions 對grid進行設定
 */
apt.ui.Grid = function(selector, gridOptions){
    this.grid = $(selector);
    this.messageBox = new apt.ui.MessageBox($('<div/>').insertBefore(this.grid)[0]);
    var messageBox = this.messageBox;
    this.pager = $('<div/>').attr('id', this.grid.attr('id') + '_pager').insertAfter(this.grid[0]);
    this.defaultGridOptions = {
        ajaxGridOptions:{
            contentType:'application/x-www-form-urlencoded; charset=UTF-8'
        },
        datatype:'json',
        rowNum:20,
        autowidth: true,
        height:'auto',
        altRows:true,
        toppager:true,
        rowList:[10,20,50,100],
        pager: this.pager.attr('id'),
        viewrecords: true,
        loadui:'block',//因為在ie6 會顯示false字樣
        jsonReader : {
            root: 'rows',
            page: 'pageNo',
            total: 'totalPages',
            records: 'totalRows',
            repeatitems: false
        },
        loadComplete:function(data){
            if ($.isEmptyObject(data)) {
                return;
            } 
            if($.isEmptyObject(data.rows)){
                $(this).GridUnload();
            }
            messageBox.updateMessage(data.message);
        },
        gridComplete:function(){
            var postData = $(this).jqGrid('getGridParam','postData');
            //用以識別該 request 是否透過 submit button 或 enter event  送出，
            //若為 sorting 或 paging event 送出則不帶該 parameter
            delete postData.action;
        }
    }
    this.init(gridOptions);
}
apt.ui.Grid.prototype = {
    init : function(gridOptions){
        var options = $.extend(this.defaultGridOptions, gridOptions);
        this.grid.jqGrid(options);
    }
}
