<%--
    Document   : index
    Created on : Jul 2, 2012, 11:33:29 AM
    Author     : steven
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
    <head>
        <%@include file="/common/header.jsp" %>
        <title>jQuery Validation</title>
    </head>
    <body>
        <form name="myform">
            <label>Customer name</label><input name="customer_name"/>
            <label>phone</label><input name="phone"/>
            <label>address</label><input name="address"/>
            <label>eMail</label><input name="email"/>
            <input type="submit"/>
        </form>
        <script type="text/javascript">
            (function(){
                $(document.myform).validate({
                rules:{
                    customer_name:'required',
                    phone:{maxlength:10, minlength:8},
                    email:{required:{depends:function(element){
                                return $(document.myform.phone).val() === ''}
                        }}
                }
            })
             $(document.myform.address).rules("add", 'required')
            }());
        </script>
    </body>
</html>
