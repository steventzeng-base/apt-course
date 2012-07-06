<%--
    Document   : jsonGrid
    Created on : Jul 5, 2012, 4:39:47 PM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="/common/header.jsp" %>
        <title>Json Grid</title>
    </head>
    <body>
        <table id="myGrid"/>
        <div id="pager"/>
        <script>
            $(function(){$('#myGrid').jqGrid({
                    url:'${path}/action/grid/json',
                    datatype: "json",
                    colNames:['col1','col2', 'col3', 'col4','col5'],
                    colModel:[
                        {name:'id',index:'id', width:75},
                        {name:'k1',index:'invdate', width:90},
                        {name:'k2',index:'name', width:100},
                        {name:'k3',index:'amount', width:80, align:"right"},
                        {name:'k4',index:'tax', width:80, align:"right"}
                    ],
                    jsonReader : {
                        root: 'rows',
                        page: 'pageNo',
                        total: 'totalPages',
                        records: 'totalRows',
                        repeatitems: false
                    },
                    rowNum:10, autowidth: true, rowList:[10,20,30],
                    pager: '#pager',
                    sidx:'id',
                    viewrecords: true,
                    sortorder: "desc",
                    caption:"Json Example"
                })})
        </script>
    </body>
</html>
