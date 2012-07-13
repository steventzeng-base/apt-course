<%--
    Document   : errorLabelContainer
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
        <title>Error Label Container</title>
    </head>
    <body>
        <ul id="errors"></ul>
        <form>
            <label>First Name</label>:<input type="text" class="required" name="firstName" />
            <br />
            <label>Last Name</label>:<input type="text" class="required" name="lastName" />
            <br />
            <label>E-Mail</label>:<input type="text" class="required" name="email" />
            <br />
            <input type="submit" />
        </form>
        <div id="summary"/>
        <script type="text/javascript">
            $(document.forms[0]).validate({
                errorLabelContainer:'#errors',
                wrapper: "li"
            })
        </script>
    </body>
</html>