/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var apt = apt || {};
apt.ui = apt.ui ||{};
/**
 *
 * 取得appPath
 */
apt.appPath = location.pathname.substring(0, location.pathname.indexOf('/', 1));

/**
 * @class 共用元件SearchForm 包含套用style 以及查詢之後產生grid顯示
 * @param {String} form 表單名稱 form name.ex:
 * &#60;form name='dat003'><br />
 * ...
 * &#60;/form>
   <br/>則輸入dat003
 * @param {Object} gridOptions jqGrid 的客制化設定項目
 * @param {Object} validateOptions validation plugin 的客制化設定項目
 */
apt.ui.SearchForm = function(form, gridOptions, validateOptions){
    var searchForm = this;
    /**
     *群組驗證名稱，相同名稱視為同一組
     */
    this.groupName= 'g1';
    this.forms = $(document[form]);
    /**
     *表單
     */
    this.form = document[form];
    /**
     *表單名稱
     */
    this.formName = this.form.getAttribute('name');
    /**
     * grid id 名稱
     */
    this.result = '#'+this.formName+'_result';
    /**
 * 分頁 id 名稱
 */
    this.pager='#'+this.formName+'_pager';
    /**
     * message id 名稱
     *@type String
     */
    this.message = '#'+this.formName+'_message';
    /**
     * searchFields 表單必填輸入欄位
     * @type jQuery
     */
    this.searchFields = $(':input',this.form).filter(':not(:button)').filter('[type!="hidden"]').filter(':not(:submit)').filter(':not(:reset)').filter(':not(:checkbox)')
    .not('.ignoreGroup').attr('atLeastOne', this.groupName).addClass(this.groupName);
    /**
     *預設的 jQuery 選項
     *@type {Object}
     */
    this.myGridOptions={
        ajaxGridOptions:{
            contentType:'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url:this.form.action,
        mtype:this.form.method,
        datatype:'json',
        rowNum:20,
        autowidth: true,
        height:'auto',
        altRows:true,
        toppager:true,
        rowList:[10,20,50,100],
        pager: this.pager,
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
                return
            }
            if(data.rows.length === 0){
                $(this).GridUnload();
            }
            if(undefined === data.message){
                data.message="查詢完成";
            }
            searchForm.messageBox.updateMessage(data.message);
            $(searchForm.result).focus();
        },
        gridComplete:function(){
            var postData = $(this).jqGrid('getGridParam','postData');
            //用以識別該 request 是否透過 submit button 或 enter event  送出，
            //若為 sorting 或 paging event 送出則不帶該 parameter
            delete postData.action;
        }
    };
    /**
     *預設的 validation 選項
     */
    this.myValidateOptions= {
        debug:true,
        onfocusout: false,
        onkeyup: false,
        onblur:false,
        onchange:false,
        onclick:false,
        errorPlacement:function(error){
            searchForm.messageBox.errorMessage(error.text());
        },
        submitHandler:function(){
            searchForm.createOrUpdateGrid.call(searchForm);
            return false;
        }
    };
    this.init(gridOptions, validateOptions);
};

apt.ui.SearchForm.prototype={
    /**
     * 建立表單基本元件
     * <ul>
     * <li>表單按鈕</li>
     * <li>jqGrid 分頁 div tag</li>
     * <li>jqGrid grid div tag</li>
     * <li>messageBox 元件</li>
     * </ul>
     */
    buildForm:function(){
        var formName = this.formName;
        $(this.form).find('table').addClass('formTable').append(
            $('<tr/>').append(
                $('<td/>').attr('colspan','8').addClass('commandBar')
                .append($('<input/>').attr('name','search').attr('type','submit').val('查詢')).append('&nbsp;')
                .append($('<input/>').attr('name','reset').attr('type','button').val('清除')).append('&nbsp;')
                .append($('<input/>').attr('name','clean').attr('type','button').val('清除查詢結果'))
                )
            );
        $(this.form).append($('<div/>').attr('id', formName+'_pager'))
        .append($('<table/>').attr('id',formName+'_result')).addClass('searchForm');
        /**
         * messageBox 資訊文字框
         * @type apt.ui.MessageBox
         */
        this.messageBox = new apt.ui.MessageBox($('<div/>').insertBefore(this.form));
    },
    /**
     * 依表單各元件屬性初始表單各項元件
     */
    initWidget:function(){
        $('input:submit',this.form).add('input:reset', this.form).add('input:button', this.form).button();
        var form = this.form;
        $('label.like', this.form).prepend('<span>＊</span>').each(function(){
            $(form[this.htmlFor]).addClass('like');
        });
        $('.dateType', this.form).datepicker({
            changeYear: true,
            changeMonth: true,
            dateFormat: 'yy/mm/dd',
            showOn: 'button',
            buttonImage: apt.appPath + "/images/calandar.png",
            buttonImageOnly: true
        });
        /*
         *加入開始日期,結束日期初始化相關設定設
         *並判斷如有最大日限定的限制會影嚮日曆的顯示設定
         */
        $('.endDate').datepicker('option', 'beforeShow',function(input, inst) {
            var form = this.form;
            var startDate = $('.startDate', form).datepicker('getDate');
            $(this).datepicker("option",'minDate', startDate);
            var duration = $(this).attr('maxDate');
            if(duration !== undefined){
                var maxDate = null
                if(startDate != null){
                    var amountUnit = duration.split(':');
                    maxDate = moment(startDate).clone().add(amountUnit[0], amountUnit[1]).toDate();
                }
                $(this).datepicker("option",'maxDate', maxDate);
            }
        });
    },
    /**
     * 取得目前輸入表格檢查項目清單
     * @param {Array} searchFields
     */
    getFieldName:function(searchFields){
        var fieldName = [];
        $.each(searchFields, function(){
            fieldName.push($(this).attr('name'));
        });
        return fieldName.join(' ');
    },
    /**
     * 當使用者按下清除結果鈕的行為
     */
    bindCleanResult:function(){
        var result = this.result;
        $(this.form).find("input[name=clean]").click(function(){
            if ($(result).GridUnload) {
                $(result).GridUnload();
            }
        });
    },
    /**
     * 當使用者按下清除鈕的行為, 清除所有輸入欄位
     * @function
     * @returns {boolean}
     */
    bindReset:function(){
        var searchFields = this.searchFields;
        var searchForm = this;
        $('input[name=reset]',this.form).click(function(){
            $.each(searchFields.add('.ignoreGroup'), function(){
                $(this).val('');
            });
            $(searchForm.form).validate().resetForm();
            return false;
        });
    },
    /**
     * 將游標移向第一個輸入欄位
     * @returns {void}
     */
    doFocus:function(){
        $('input:text',this.form)[0].focus();
    },
    /**
     * 合併客制化選項與預設選項
     * @function
     * @param {Object} gridOptions jqGrid 選項
     * @param  {Object} validateOptions validation 選項
     * @returns {void}
     */
    upateMyOptions:function(gridOptions, validateOptions){
        $.extend(this.myGridOptions, gridOptions);
        $.extend(this.myValidateOptions, validateOptions);
    },
    /**
     * 當使用者按下送出時，建立或更新 grid 的內容
     * ＠function
     * @returns {void}
     */
    createOrUpdateGrid:function(){
        var postData = $(this.form).serializeObject();
        //用以識別該 request 是否透過 submit button 或 enter event  送出，
        //若為 sorting 或 paging event 送出則不帶該 parameter
        postData.action='doQuery';
        if ($(this.result).GridUnload) {
            $(this.result).GridUnload();
        }
        this.myGridOptions.postData= postData;
        var grid = $(this.result).jqGrid(this.myGridOptions)[0];
        grid.searchForm = this;
    },
    /**
     * 進行初始化程序
     * @function
     * @param {Object} gridOptions jqGrid 選項
     * @param {Object} validateOptions validation 選項
     */
    init:function(gridOptions, validateOptions){
        this.upateMyOptions(gridOptions, validateOptions);
        $.extend(this.myValidateOptions, {
            'groups':{
                condition:this.getFieldName(this.searchFields)
            }
        });
        this.buildForm();
        this.initWidget();
        $(this.form).validate(this.myValidateOptions);
        this.bindCleanResult();
        this.bindReset();
        this.doFocus();
        new apt.page.selectInputStyle(this.formName);
    }
};