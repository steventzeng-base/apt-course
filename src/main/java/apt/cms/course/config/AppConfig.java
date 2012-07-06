/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package apt.cms.course.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 *
 * @author steven
 */
@EnableWebMvc
@Configuration
public class AppConfig {

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("WEB-INF/view");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
