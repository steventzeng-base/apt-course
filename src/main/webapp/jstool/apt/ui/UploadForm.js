/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var apt = apt || {};
apt.ui = apt.ui || {};
/**
 * 功能1：共用元件UploadForm<檔案上傳功能>
 * 參數1：formName ex: <form name='dat042' /> 則輸入dat042
 *        當formName 為queryForm<檔案下載>，回傳下載檔案
 * 參數2：beforemessage 檔案上傳讀取等待訊息
 * 參數3：validateOptions 驗證設定
 * 參數4：path URL路徑<queryForm 使用>
 */
apt.ui.UploadForm = function(formName, beforemessage, validateOptions, path){
    var uploadForm = this;
    this.form = $(document.forms[formName]);
    this.messageBox = new apt.ui.MessageBox($('<div/>').insertBefore(this.form));
    this.form.addClass("searchForm");
    new apt.page.selectInputStyle(formName);
    //清除訊息and檔案下載and錯誤框and顯示備註
     this.form.find('input[type=reset]').click(function(){
         uploadForm.messageBox.clearMessage();
         uploadForm.form.find('[name=uploadFile],[name=outputFileName],#eMail').removeClass('error');
         if(formName.match("queryForm") == "queryForm"){
                    var s = formName.replace("queryForm","");
            $("#"+s+"mess").html("<a style='color: #0000FF;text-decoration: underline;' target='_blank' href='#'></a>");
                }
         if(formName == 'dat047_uploadForm'){
             uploadForm.form.find('#disable').show();
         }
         
    });
    var ajaxform_option = {
        dataType:'application/json',
        beforeSubmit : function(a, f, o) {
            o.dataType='json';
            uploadForm.messageBox.updateMessage(beforemessage);
        },
        success:function(data){
            if(data['status']=='success'){
                if(formName.match("queryForm") == "queryForm"){
                    var s = formName.replace("queryForm","");
                    $("#"+s+"mess").html("<a style='color: #0000FF;text-decoration: underline;' target='_blank' href='"+path+"/dat043/downFileNow.do?outputFileName="+data['message']+"'>點擊下載"+data['message']+"</a>");
                    uploadForm.messageBox.updateMessage("查詢完成");
                } else{
                    uploadForm.messageBox.updateMessage(data['message']);
                }
            }else if(data['status']== 'fail'){
                uploadForm.messageBox.errorMessage(data['message']);
            }
           // alert("success");
        }//,
        //error:function(jqXHR){
        //	event.cancelBubble=true;
        //	$('form[name="'+formName+'"]').parent().parent().html(jqXHR.responseXML.body.parentElement.innerHTML);

        //}
    };
    var defaultValidateOptions = {
        errorPlacement:function(error){
            uploadForm.messageBox.errorMessage(error.text());
        },
        submitHandler:function(form){
            $(form).ajaxSubmit(ajaxform_option);
            return false;
        }
    }
    this.form.validate($.extend(defaultValidateOptions, validateOptions));

}
