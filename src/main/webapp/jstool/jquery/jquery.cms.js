(function($){
    $.isBlank = function(objName){
        var obj = $('input[name='+objName+']').val();
        return(!obj || $.trim(obj) === "");
    };
})(jQuery);
function imposeMaxLength(Object, MaxLen)
{
    return (Object.value.length < MaxLen);
}
