<%--
    Document   : submitHandler
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
        <title>submitHandler</title>
    </head>
    <body>
        <p>
            設定表單驗証無誤後的送出程序。可增加額外程序以改變原瀏灠器的送出行為。
        </p>
        <form>
            <label>Customer name</label><input name="customer_name" class="required"/>
            <label>phone</label><input name="phone" minlength="7"/>
            <label>password</label><input name="password1"/>
            <label>repeat password</label><input name="password_1" equalTo="input[name=password1]"/>
            <label>password2</label><input name="password2"/>
            <label>repeat password2</label><input name="password_2"/>
            <label>email</label><input name="email" remote="${path}/action/validate/mail"/>
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $('input').after("<br/>")
                $(document.forms[0]).validate({
                    submitHandler:function(form){
                        console.info('submit... ')
                        form.submit();
                    }
                });
            }());
        </script>
    </body>
</html>
