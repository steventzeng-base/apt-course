/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package apt.cms.course.controller;

import com.google.common.collect.ImmutableList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author steven
 */
@Controller
public class ValidateController {
    @RequestMapping("validate/mail")
    @ResponseBody
    public boolean email(String email){
            return ImmutableList.of("aa@base.tw", "bb@base.tw", "cc@base.tw", "bb@base.tw").contains(email);
    }
}
