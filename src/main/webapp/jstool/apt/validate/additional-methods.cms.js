(function($){
    /**
     * 客制化預設訊息
     */
    jQuery.extend(jQuery.validator.messages, {
        required:apt.messages['CRM-CMM01-00016']
    })
    /**
     * 驗證條件 atLeastOne 同群組中至少輸入一項資料
     */
    var dateType = /^(19|20)\d\d\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
    jQuery.validator.addMethod("atLeastOne", function(value, element, options) {
        var groupName = options;
        if($(element).hasClass('ignoreGroup')){
            return true
        }
        var group = $('.'+groupName, element.form).not('.ignoreGroup');
        return group.filter(':filled').length;
    }, jQuery.format(apt.messages['CRM-CMM01-00008']));
    /**
     * 模糊查詢錯誤訊息
     */
    jQuery.validator.addMethod('likelength', $.validator.methods.minlength ,apt.messages['CRM-CMM01-00004']);
    /**
     * 模糊查詢長度
     */
    jQuery.validator.addClassRules("like", {
        likelength:2
    });
    /**
     *驗證日期格式 YYYY/MM/DD 空字串不驗證
     */
    jQuery.validator.addMethod("dateType",function (value, element) {
        return '' === value || dateType.test(value);
    },
    jQuery.validator.format(apt.messages['CRM-CMM01-00014'],'時間日期'));

    /**
     *判斷結束日期是否小於起啟日期
     */
    jQuery.validator.addMethod("endDate", function(value, element){
        var startDate = moment($('.startDate', element.form).val());
        var endDate = moment(value)
        if(startDate == null && endDate ==null){ //如果起始值與結束值皆為 null 不驗證
            return true;
        }else if(startDate == null || endDate == null){ //其中一個為 null 時，回傳驗證失敗
            return false;
        }else{
            return startDate <= endDate;
        }
    }, apt.messages['CRM-CMM02-00001']);

    /**
     *最大日期限制條件,以屬性方式設相對最大日期
     *ex maxDate="months:2" 為起始日加2個月
     * maxDate="weeks:3" 為起始日加3周
     */
    jQuery.validator.addMethod("maxDate", function(value, element, options){
        var startDate = moment($('.startDate', element.form).val());
        var endDate = moment(value);
        if(startDate == null && endDate ==null){ //如果起始值與結束值皆為 null 不驗證
            return true;
        }else if(startDate == null || endDate == null){ //其中一個為 null 時，回傳驗證失敗
            return false;
        }
        var opt = options.split(':');
        var unit = opt[0], amount = parseInt(opt[1]);
        var maxValue = startDate.add(unit, amount);
        return endDate <= maxValue;
    },
    apt.messages['CRM-CMM02-00002']);


    jQuery.validator.addMethod("has_required",function (value, element) {
        return !($.trim(value) == '');
    },
    apt.messages['CRM-CMM01-00016']);

    /**
     *可檢查多筆 email 格式
     */
    jQuery.validator.addMethod('check_email',function (value, element, options) {
        if(value.search(";") != -1){
            var eMail = new Array();
            eMail = value.split(";");
            for(var s = 0 ; s < eMail.length ; s++ ){
                var val = eMail[s];
                if(this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(val)){
                }else{
                    return false;
                }
            }
            return true;
        }else{
            return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
        }
    },
    jQuery.validator.format(apt.messages['CRM-CMM01-00014'],'EMail')
        );

    //file validate init
    /**
     * 上傳檔案規則驗證
     */
    jQuery.validator.addMethod('fileName', function(value, element, options) {
        var pattern = $.datepicker.formatDate('yymmdd', new Date())+ '_' + options['agentId'] + '_';
        var prefix = options['prefix'];
        var ext = options['ext'];
        pattern = prefix? prefix + '_' + pattern:pattern;
        pattern = '^' + pattern;
        pattern += '\\d{2}' + '.' + ext + '$';
        var fileName = value.replace(/^.*\\/, '').replace(/^.*\//,'');
        return this.optional(element) || new RegExp(pattern, 'i').test(fileName)
    }, apt.messages['CRM-FIL01-00001']);
    /**
     * 下載檔案規則驗證
     */
    jQuery.validator.addMethod('fileNameResult', function(value, element, options) {
        var pattern = '\\d{8}' + '_' + options['agentId'] + '_';
        var prefix = options['prefix'];
        var result = options['result'];
        var ext = options['ext'];
        var fileName = value.replace(/^.*\\/, '').replace(/^.*\//,'');
        pattern = prefix? prefix + '_' + pattern:pattern;
        pattern = '^' + pattern;
        if(result == "C"){
            var patterns = pattern + '\\d{2}' + '_' + result + 'ONT.' + ext + '$';
            if(this.optional(element) || new RegExp(patterns, 'i').test(fileName)){
                return true;
            }else{
                var pattern2 = pattern = pattern + '\\d{2}' + '_' + result + 'UST.' + ext + '$';
                if(this.optional(element) || new RegExp(pattern2, 'i').test(fileName)){
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            pattern = result? pattern + '\\d{2}' + '_' + result + '.' + ext + '$':pattern + '\\d{2}' + '.' + ext + '$';
            return this.optional(element) || new RegExp(pattern, 'i').test(fileName)
        }
    },apt.messages['CRM-FIL01-00001']);
})(jQuery)