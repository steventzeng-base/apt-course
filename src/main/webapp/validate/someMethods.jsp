<%--
    Document   : someMethod
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
        <title>some validate methods</title>
    </head>
    <body>
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
                $(document.forms[0]).validate({
                    rules:{
                        password_2:{equalTo:document.forms[0].password2}
                    }
                });
            }());
        </script>
    </body>
</html>
