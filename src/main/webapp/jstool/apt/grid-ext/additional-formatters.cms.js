jQuery.extend($.fn.fmatter , {
    moment:function(cellvalue, options, rowdata){
        var fmtOpts = options.colModel.formatoptions;
        if(!cellvalue || cellvalue ==='&nbsp;'){
            return '&nbsp';
        }
        if(!isNaN(cellvalue - 0)){
            var timestamp = moment(cellvalue);
        }else if($.type(cellvalue) === 'string' ){
            var srcfmt = fmtOpts['srcformat'];
            if(srcfmt === undefined){
                timestamp = moment(cellvalue);
            }else{
                timestamp  = moment(cellvalue, srcfmt)
            }
        }
        var newformat = fmtOpts['newformat'];
        if(newformat == undefined){
            return timestamp.format('YYYY/MM/DD');
        }else{
            return timestamp.format(newformat);
        }
        return '&nbsp';
    }
})
