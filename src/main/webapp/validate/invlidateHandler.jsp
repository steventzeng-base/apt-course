<%--
    Document   : invlidateHandler
    Created on : Jul 4, 2012, 12:31:19 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="/common/header.jsp" %>
        <title>invalid handler</title>
    </head>
    <body>
        <div class="error"><span></span></div>
        <form>
            <label>Customer name</label><input name="customer_name" type="text"/>
            <label>phone</label><input name="phone" type="text" class="required"/>
            <label>address</label><input name="address" type="text"/>
            <label>eMail</label><input name="email" type="text" class="email"/>
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $('input').after('<br/>');
                $(document.forms[0]).validate({
                    success:'valid',
                    invalidHandler:function(form, validator){
                        console.info(validator);
                        var errors = validator.numberOfInvalids();
                        if (errors) {
                            var message = errors == 1
                                ? 'You missed 1 field. It has been highlighted'
                            : 'You missed ' + errors + ' fields. They have been highlighted';
                            $("div.error span").html(message);
                            $("div.error").show();
                        } else {
                            $("div.error").hide();
                        }
                    }
                });
            }());
        </script>
    </body>
</html>
