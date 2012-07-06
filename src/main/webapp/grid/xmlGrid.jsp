<%--
    Document   : xmlGrid
    Created on : Jul 5, 2012, 11:48:53 AM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="/common/header.jsp" %>
        <title>XML Grid</title>
    </head>
    <body>
        <table id="myGrid"/>
        <div id="pager"/>
        <script>
            $(function(){$('#myGrid').jqGrid({
                url:'/cms-course/action/grid/xml',
                datatype: "xml",
                colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
                colModel:[ {name:'id',index:'id', width:75},
                    {name:'invdate',index:'invdate', width:90},
                    {name:'name',index:'name', width:100},
                    {name:'amount',index:'amount', width:80, align:"right"},
                    {name:'tax',index:'tax', width:80, align:"right"},
                    {name:'total',index:'total', width:80,align:"right"},
                    {name:'note',index:'note', width:150, sortable:false} ],
                rowNum:10, autowidth: true, rowList:[10,20,30],
                pager: '#pager',
                sidx:'id',
                viewrecords: true,
                sortorder: "desc",
                caption:"XML Example"
            })})
        </script>
    </body>
</html>
