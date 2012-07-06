var apt = apt || {};
apt.page = apt.page || {};
/**
 * 功能：綁定fieldset style
 * 參數：sourceId (欲影響頁面區塊之ID ID需要加#號)
 */
apt.page.accordionFieldSet = function(sourceId){
    var sourcePath = sourceId+' .visibleFalse .slide';
    var handCursorPath = sourceId+' fieldset legend.detail.trigger,'+sourceId+' fieldset legend.integrationTrigger';
    $(handCursorPath).css("cursor", "pointer").css('padding', '0.4em 0.8em').addClass('ui-state-default ui-widget ui-corner-top ui-widget-header').parent('fieldset').addClass('ui-widget-content ui-corner-all');
    $(sourcePath).hide();
};
/**
 * 功能：綁定fieldset 批次開關功能
 * 參數1：sourceId (欲影響頁面區塊之ID ID需要加#號)
 * 參數2：integrationClass class前需要加. (在同一區塊內，class名稱相同會進行同時開啟關閉的動作)
 */
apt.page.accordionFieldSetIntegration = function(sourceId,integrationClass){
    $(sourceId+" fieldset legend"+integrationClass).click(function(){
        $(sourceId+" fieldset legend"+integrationClass).nextAll().slideToggle();
    });
};

/**
 * 功能：連動機制前端功能
 * 參數： formName 輸入連動post的formname
 */
apt.page.bindAutoPost = function(formName) {
    var form = document[formName];
    var hasCascadeData = false;
    $.each($(form).find('.autoPost'), function(){
        if(this.value !== null && this.value !== ''){
            hasCascadeData = true;
        }
    })
    if(hasCascadeData){
        $(form).find('[name="cascadeQuery"]').val('true');
        $(form).find('[name=search]').trigger('click');
    }else{
        $(form).find('[name="cascadeQuery"]').val('false');
    }
    $('form[name="'+formName+'"] input[type="text"]').change(function() {
        $('form[name="'+formName+'"] input[name="cascadeQuery"]').val('false');
    });
};
/**
 * 功能：綁定按鈕style
 * 參數： sourceId (欲影響頁面區塊之ID ID需要加#號)
 */
apt.page.bindUIStyle = function(sourceId){
    var inputButtonPath = sourceId+' input[type="button"],input[type="reset"],input[type="submit"]';
    var buttonPath =sourceId+' button';
    $(buttonPath).addClass('ui-widget').button();
    $(inputButtonPath).addClass('ui-widget').button();
    $(sourceId+' fieldset legend').addClass('ui-widget-header');
};
/**
 * 功能：將指定區塊中的table中的空白欄塞入一個空白字元
 * 參數： sourceId (欲影響頁面區塊之ID ID需要加#號)
 */
apt.page.renderEmptyCell = function(sourceId){
    var sourcePath = sourceId+' table tr td';
    $(sourcePath).each(function(){
        $(this).append("&nbsp;");
    });
    sourcePath = sourceId+' table tr th';
    $(sourcePath).each(function(){
        $(this).append("&nbsp;");
    });
};
/**
 * 功能：綁定input select style
 * 參數：formName
 *
 */
apt.page.selectInputStyle = function(formName) {
    this.form = $(document.forms[formName]);
    this.form.find('[class*=required]').each(function(){
        $(this).parent().prev().find('label').css('color','red');
    });
    this.form.find('[class*=start_end_date]').each(function(){
        $(this).parent().prev().find('label').css('color','red');
    });
    this.form.find('input[type=text]').each(function(){
        $(this).css("width","100%");
    });
    this.form.find('input[class*=dateType]').each(function(){
        $(this).css("width","80px");
    });
    this.form.find('input[type=button]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    this.form.find('input[type=submit]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    this.form.find('input[type=reset]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    this.form.find('input[type=file]').each(function(){
        $(this).css("width","550px");
    });
    this.form.find("#eMail").each(function(){
        $(this).css("width","200px");
    });
    this.form.find("select").each(function(){
        $(this).css("width","100%");
        $(this).css("font-size","14px");
    });
    this.form.find("input[class*=searchBtn]").each(function(){
        $(this).css("width","180px");
    });
};
/**
 * 功能：綁定input select style
 * 參數：sourceId
 */
apt.page.selectInputStyleDetail = function(sourceId) {
    $(sourceId).find('[class*=required]').each(function(){
        $(this).parent().prev().find('label').css('color','red');
    });
    $(sourceId).find('input[type=text]').each(function(){
        $(this).css("width","100%");
        $(this).css("height","50px");
    });
    $(sourceId).find('input[class*=dateType]').each(function(){
        $(this).css("width","80px");
    });
    $(sourceId).find('input[type=button]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    $(sourceId).find('input[type=submit]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    $(sourceId).find('input[type=reset]').each(function(){
        $(this).parent().addClass("commandBar");
    });
    $(sourceId).find('input[type=file]').each(function(){
        $(this).css("width","550px");
    });
    $(sourceId).find("#eMail").each(function(){
        $(this).css("width","200px");
    });
    $(sourceId).find("select").each(function(){
        $(this).css("font-size","14px");
        $(this).parent().css("padding","4px 4px 4px 12px");
    });
    $(sourceId).find('input[type=radio]').each(function(){
        $(this).css("height","14px");
    });
    $(sourceId).find('input[type=checkbox]').each(function(){
        $(this).css("height","14px");
    });
};
/**
 * 功能；彈跳出一個嵌入ifram的視窗
 * 參數1： _iframeSrc iframe路徑
 * 參數2： _id 視窗id
 * 參數3： _title 視窗title
 * 參數4： _setting 視窗細部設定(詳細請參照javascript window.open用法)
 */
apt.page.openNewWindow=function(_iframeSrc,_id,_title,_setting){
    var iframeObj = "<html><head><title>"+_title+"</title></head><body><iframe style='border:0px' allowtransparency='true' border='0' frameborder='0' src='"+_iframeSrc+"' width='100%' height='100%'></iframe></body></html>";
    var WinObj = window.open('',_id,_setting);
    WinObj.document.open();
    WinObj.document.write(iframeObj);
    WinObj.document.close();
};
/**
 *
 * 功能：HTML TABLE 轉 JQGRID
 *
 *參數1 _id table id
 *參數2 _paggerId pagger(DIV) id
 *
 */
apt.page.tableToGrid = function(_id,_paggerId){
    tableToGrid(_id,{
        pager:_paggerId,
        height:'auto',
        width:1655,
        rowNum:20,
        altRows:true,
        toppager:true,
        rowList:[10,20,50,100],
        viewrecords:true
    });
    jQuery(_id).jqGrid('setGridParam', {
        page: 1
    }).trigger("reloadGrid");
};