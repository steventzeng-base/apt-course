package apt.cms.course;

import apt.cms.course.config.AppConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * Hello world!
 *
 */
public class App implements WebApplicationInitializer{

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(AppConfig.class);
        Dynamic cmsweb = servletContext.addServlet("cmsweb Servlet", new DispatcherServlet(context));
        cmsweb.setLoadOnStartup(1);
        cmsweb.addMapping("/action/*");
    }
}
