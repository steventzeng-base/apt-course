<%--
    Document   : atLeastOne
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
        <title>atLeastOne</title>
    </head>
    <body>
        <form>
            <label>Customer name</label><input name="customer_name"/>
            <label>phone</label><input name="phone" atLeastOne="g1" class="g1"/>
            <label>address</label><input name="address"/>
            <label>eMail</label><input name="email" atLeastOne="g1" class="g1"/>
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $(document.forms[0]).validate();
            }());
        </script>
    </body>
</html>
