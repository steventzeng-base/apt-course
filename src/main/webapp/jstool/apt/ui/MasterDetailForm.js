/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var apt = apt || {};
apt.ui = apt.ui || {};
/**
 *功能：共用元件 包含綁定style，查詢後點擊grid可切換tab檢視明細資料的UI
 *@param {String} formName 表單名稱
 *@param {Object} options 帶入查詢明細資料設定(放入要post的參數)
 *@param {Object} gridOptions jqgrid設定
 *@class
 */
apt.ui.MasterDetailForm = function(formName, options, gridOptions){
    var masterDetailPanel = this;
    /**
     *searchForm 元件
     */
    this.searchForm = undefined;
    /**
     *分頁傳送的資料
     */
    this.postData = undefined;
    /**
     *表單名稱
     */
    this.formName = formName;
    /**
     *masterDetailFrom 的選項
     */
    this.options = {
        /**
         * 回傳要 POST 的資料參數，回傳 JSON 資料格式
         * rowData 為選取的一筆資料(row)
         * @returns JSON 資料格式
         */
        treatRowData:function(rowData){
        }
    };
    /**
     * 表單
     */
    this.form = document.forms[this.formName];
    /**
     * 分頁容器
     */
    this.tabContainer = $(this.form).closest('div');
    /**
     * 預設的 jqGird 選項
     */
    this.myGridOptions={
        onSelectRow: function(id){
            masterDetailPanel.selectId = id;
            var rowData = $(this).jqGrid('getRowData', id);
            masterDetailPanel.postData = masterDetailPanel.options.treatRowData.call(masterDetailPanel, rowData);
            masterDetailPanel.enableDetailTab();
            masterDetailPanel.diableTabCache();
            masterDetailPanel.tabContainer.tabs({
                selected: 1
            });
            masterDetailPanel.enableCache();
        },
        gridComplete:function(){
            var postData = $(this).jqGrid('getGridParam','postData');
            //用以識別該 request 是否透過 submit button 或 enter event  送出，
            //若為 sorting 或 paging event 送出則不帶該 parameter
            delete postData.action;
            if ($(this).jqGrid('getGridParam','records') == 1) {
                var id = $(this).jqGrid('getDataIDs')[0];
                masterDetailPanel.tabContainer.tabs('option', 'disabled' , []);
                //ie bug
                //太快切換 IE 會留下殘影，故延遲事件解發時間為 0.5 秒
                window.setTimeout(function () {
                    $(masterDetailPanel.form).find('#'+id).trigger('click');
                    masterDetailPanel.tabContainer.tabs({
                        selected: 1
                    });
                }, 500);
            }
        }
    };
    this.options = $.extend(this.options, options);
    this.init(gridOptions);
};

apt.ui.MasterDetailForm.prototype = {
    /**
     * 產生 tag 容器
     */
    makeTab:function(){
        var masterDetailPanel = this;
        var searFormTabId = this.formName+'_searForm_tab';
        $(this.form).wrap($('<div/>').attr('id',searFormTabId));
        this.tabContainer.attr('id',this.formName+'_tabs')
        .find('ul li:first-child')
        .wrapInner($('<a/>').attr('href','#'+searFormTabId))
        .end().tabs({
            cache:true,
            select:function(){
                masterDetailPanel.onSelectTab();
            }
        }).closest('div.ui-tabs-panel').css('padding', '1px');
    },
    /**
     * 當使用者點選不同 tag 的行為
     */
    onSelectTab:function(){
        var tabContainer = this.tabContainer;
        this.tabContainer.tabs('option','ajaxOptions',{
            contentType:'application/x-www-form-urlencoded; charset=UTF-8',
            type:'post',
            data:this.postData,
            success:function(){},
            error:function(jqXHR){
                tabContainer.html(jqXHR.responseText)
            }
        });
    },
    /**
     * 關閉 tag 分頁標籤
     */
    disableDetailTab:function(){
        var detailTabIndex = [];
        for(var i=1; i < this.tabContainer.tabs('length'); i++){
            detailTabIndex.push(i);
        }
        this.tabContainer.tabs('option','disabled', detailTabIndex);
    },
    /**
     * 啟用 tag 分頁標籤
     */
    enableDetailTab:function(){
        this.tabContainer.tabs('option','disabled', []);
    },
    /**
     * 關閉 tag 快取
     */
    diableTabCache:function(){
        this.tabContainer.tabs("option", "cache", false );
    },
    /**
     * 啟用 tag 快取
     */
    enableCache:function(){
        this.tabContainer.tabs("option", "cache", true );
    },
    init:function(gridOptions){
        this.makeTab();
        this.disableDetailTab();
        $.extend(this.myGridOptions, gridOptions);
        var masterDetailPanel = this;
        this.searchForm = new apt.ui.SearchForm(this.formName,this.myGridOptions);
        this.searchForm.masterDetailPanel = this;
        $('input:submit',this.form).add(this.searchForm.form.clean).click(function(){
            masterDetailPanel.disableDetailTab.call(masterDetailPanel);
        });
        $('input[name=clean]',this.form).add(this.searchForm.form.clean).click(function(){
            masterDetailPanel.disableDetailTab.call(masterDetailPanel);
        });
        
        $(this.searchForm.form).keypress(function(evt){
            if(evt.which == 13){
                evt.stopPropagation();
                masterDetailPanel.disableDetailTab.call(masterDetailPanel);
            }
        });
    }
};
