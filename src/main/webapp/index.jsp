<%--
    Document   : index
    Created on : Jul 4, 2012, 2:10:48 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <ul>
            <li>驗證模組</li>
            <ul>
                <li><a href="validate/validate.jsp">基本</a></li>
                <li><a href="validate/atLeastOne.jsp">群組</a></li>
                <li><a href="validate/dateType.jsp">日期</a></li>
                <li><a href="validate/validateOrder.jsp">日期</a></li>
            </ul>
            <li>Grid模組</li>
            <ul>
                <li><a href="grid/xmlGrid.jsp">XML Grid</a></li>
                <li><a href="grid/jsonGrid.jsp">Json Grid</a></li>
                <li><a href="grid/loadOnce.jsp">Load once</a></li>
            </ul>
        </ul>
    </body>
</html>
