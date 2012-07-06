<%--
    Document   : validateOrder
    Created on : Jul 6, 2012, 8:30:43 AM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <%@include file="/common/header.jsp" %>
        <title>jQuery Validation Event</title>
    </head>
    <body>
        <form name="myform">
            <label>Customer name</label><input name="customer_name"/>
            <label>phone</label><input name="phone"/>
            <label>eMail</label><input name="email" class="required email"/>
            <label>money</label><input name="momey" minlength="6" min="999999" class="required number"/>
<!--            <label>money</label><input name="momey"/>-->
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $(document.myform).validate({
                });
            }());
        </script>
    </body>
</html>
