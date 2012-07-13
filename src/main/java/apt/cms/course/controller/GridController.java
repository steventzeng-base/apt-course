/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package apt.cms.course.controller;

import apt.cms.course.vo.GenericResponse;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author steven
 */
@Controller
public class GridController {

    @RequestMapping("grid/test")
    public @ResponseBody
    String test() {
        return "test";
    }

    @RequestMapping(value = "grid/json", produces = "application/json")
    @ResponseBody
    public GenericResponse jsonGrid() {
        List<Map<String, Object>> data = ImmutableList.<Map<String, Object>>of(
                ImmutableMap.<String, Object>of("id", "1", "k1", "v11", "k2", "v12", "k3", "v13", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "2", "k1", "v21", "k2", "v22", "k3", "v23", "k4", "v24"),
                ImmutableMap.<String, Object>of("id", "3", "k1", "v31", "k2", "v32", "k3", "v33", "k4", "v34"),
                ImmutableMap.<String, Object>of("id", "4", "k1", "v41", "k2", "v42", "k3", "v43", "k4", "v44"),
                ImmutableMap.<String, Object>of("id", "5", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "6", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "7", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "8", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "9", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "10", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "11", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "12", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"),
                ImmutableMap.<String, Object>of("id", "13", "k1", "v31", "k2", "v32", "k3", "v133", "k4", "v14"));
        GenericResponse genericResponse = new GenericResponse.Builder().withRows(data).withPageSize(10).withTotalRows(data.size()).withPageNo(1).build();
        return genericResponse;
    }

    @RequestMapping(value = "grid/xml", produces = "application/xml")
    @ResponseBody
    public String xmlGrid() throws IOException {
        return "<?xml version='1.0' encoding='utf-8'?><rows><page>1</page><total>2</total><records>13</records><userdata name='tamount'>3820.00</userdata><userdata name='ttax'>462.00</userdata><userdata name='ttotal'>4284.00</userdata><row id='13'><cell>13</cell><cell>2007-10-06</cell><cell><![CDATA[Client 3]]></cell><cell>1000.00</cell><cell>0.00</cell><cell>1000.00</cell><cell><![CDATA[]]></cell></row><row id='12'><cell>12</cell><cell>2007-10-06</cell><cell><![CDATA[Client 2]]></cell><cell>700.00</cell><cell>140.00</cell><cell>840.00</cell><cell><![CDATA[]]></cell></row><row id='11'><cell>11</cell><cell>2007-10-06</cell><cell><![CDATA[Client 1]]></cell><cell>600.00</cell><cell>120.00</cell><cell>720.00</cell><cell><![CDATA[]]></cell></row><row id='10'><cell>10</cell><cell>2007-10-06</cell><cell><![CDATA[Client 2]]></cell><cell>100.00</cell><cell>20.00</cell><cell>120.00</cell><cell><![CDATA[]]></cell></row><row id='9'><cell>9</cell><cell>2007-10-06</cell><cell><![CDATA[Client 1]]></cell><cell>200.00</cell><cell>40.00</cell><cell>240.00</cell><cell><![CDATA[]]></cell></row><row id='8'><cell>8</cell><cell>2007-10-06</cell><cell><![CDATA[Client 3]]></cell><cell>200.00</cell><cell>0.00</cell><cell>200.00</cell><cell><![CDATA[]]></cell></row><row id='7'><cell>7</cell><cell>2007-10-05</cell><cell><![CDATA[Client 2]]></cell><cell>120.00</cell><cell>12.00</cell><cell>134.00</cell><cell><![CDATA[]]></cell></row><row id='6'><cell>6</cell><cell>2007-10-05</cell><cell><![CDATA[Client 1]]></cell><cell>50.00</cell><cell>10.00</cell><cell>60.00</cell><cell><![CDATA[]]></cell></row><row id='5'><cell>5</cell><cell>2007-10-05</cell><cell><![CDATA[Client 3]]></cell><cell>100.00</cell><cell>0.00</cell><cell>100.00</cell><cell><![CDATA[no tax at all]]></cell></row><row id='4'><cell>4</cell><cell>2007-10-04</cell><cell><![CDATA[Client 3]]></cell><cell>150.00</cell><cell>0.00</cell><cell>150.00</cell><cell><![CDATA[no tax]]></cell></row></rows>";
    }

    @RequestMapping(value="grid/loadOnce", produces="application/json")
    @ResponseBody
    public String loadOnce() throws IOException {
        final String json = "{'page':'1','total':1,'records':'13','rows':[{'id':'13','cell':['13','2007-10-06','Client 3','1000.00','0.00','1000.00',null]},{'id':'12','cell':['12','2007-10-06','Client 2','700.00','140.00','840.00',null]},{'id':'11','cell':['11','2007-10-06','Client 1','600.00','120.00','720.00',null]},{'id':'10','cell':['10','2007-10-06','Client 2','100.00','20.00','120.00',null]},{'id':'9','cell':['9','2007-10-06','Client 1','200.00','40.00','240.00',null]},{'id':'8','cell':['8','2007-10-06','Client 3','200.00','0.00','200.00',null]},{'id':'7','cell':['7','2007-10-05','Client 2','120.00','12.00','134.00',null]},{'id':'6','cell':['6','2007-10-05','Client 1','50.00','10.00','60.00','']},{'id':'5','cell':['5','2007-10-05','Client 3','100.00','0.00','100.00','no tax at all']},{'id':'4','cell':['4','2007-10-04','Client 3','150.00','0.00','150.00','no tax']},{'id':'3','cell':['3','2007-10-02','Client 2','300.00','60.00','360.00','note invoice 3 & and amp test']},{'id':'2','cell':['2','2007-10-03','Client 1','200.00','40.00','240.00','note 2']},{'id':'1','cell':['1','2007-10-01','Client 1','100.00','20.00','120.00','note 1']}],'userdata':{'amount':3820,'tax':462,'total':4284,'name':'Totals:'}}";
        return json.replaceAll("'", "\"");
    }
}
