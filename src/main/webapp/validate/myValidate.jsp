<%--
    Document   : showErrors
    Created on : Jul 10, 2012, 5:58:24 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="/common/header.jsp" %>
        <title>My validate</title>
    </head>
    <body>
        <form>
            <input type="text" class="required" name="email" />
            <br />
            <input type="submit" />
        </form>
        <script type="text/javascript">
            $(document.forms[0]).validate({
                showErrors:function(){}
            })
        </script>
    </body>
</html>