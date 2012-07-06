/**
 * 功能：處理ajax連線錯誤時顯示錯誤訊息
 */
$(document).ajaxError(function(e, xhr, settings, exception) {
    if(xhr.responseText){
        $('#'+$selected).html(xhr.responseText)
    } else{
        $('#'+$selected).html(xhr.responseXML.body.parentElement.innerHTML);
    }
});