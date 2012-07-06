<%--
    Document   : dateType
    Created on : Jul 4, 2012, 1:56:33 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="/common/header.jsp" %>
        <title>DateType</title>
    </head>
    <body>
        <form>
            <label>Customer name</label><input name="customer_name"/>
            <label>birthday</label><input name="birthday" class="dateType"/>
            <label>startDate</label><input name="startDate" class="startDate"/>
            <label>endDate</label><input name="endDate" class="endDate" maxDate="months:1"/>
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $(document.forms[0]).validate();
            }());
        </script>
    </body>
</html>
