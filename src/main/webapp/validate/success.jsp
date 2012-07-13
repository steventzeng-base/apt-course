<%--
    Document   : success
    Created on : Jul 10, 2012, 5:48:07 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <%@include file="/common/header.jsp" %>
    </head>
    <body>
        <form>
            <input type="text" name="email" class="required" />
            <br/>
            <input type="submit" value="Submit" />
        </form>
        <script type="text/javascript">
            $(document.forms[0]).validate()
        </script>
    </body>