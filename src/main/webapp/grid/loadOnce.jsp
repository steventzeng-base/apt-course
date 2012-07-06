<%--
    Document   : loadOnce
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
        <title>Load Once Grid</title>
    </head>
    <body>
        <table id="myGrid"/>
        <div id="pager"/>
        <script>
            $(function(){$('#myGrid').jqGrid({
                    url:'${path}/action/grid/loadOnce',
                    datatype: "json",
                    colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
                    colModel:[
                        {name:'id',index:'id', width:60, sorttype:"int"},
                        {name:'invdate',index:'invdate', width:90, sorttype:"date"},
                        {name:'name',index:'name', width:100},
                        {name:'amount',index:'amount', width:80, align:"right",sorttype:"float"},
                        {name:'tax',index:'tax', width:80, align:"right",sorttype:"float"},
                        {name:'total',index:'total', width:80,align:"right",sorttype:"float"},
                        {name:'note',index:'note', width:150, sortable:false} ],
                    rowNum:20,
                    autowidth:true,
                    rowList:[10,20,30],
                    pager: '#pager', sortname: 'id', viewrecords: true, sortorder: "desc", loadonce: true, caption: "Load Once Example"
                })})
        </script>
    </body>
</html>
