package ru.backend.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import ru.backend.annotation.NotRequireJwtParam;
import ru.backend.service.JwtService;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Autowired
    public JwtInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        if (request.getRequestURI().equals("/api/2/jwt")) {
            return true;
        }

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            NotRequireJwtParam notRequireJwtParamAnnotation = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), NotRequireJwtParam.class);
            if (notRequireJwtParamAnnotation != null) {
                return true;
            }
        }

        String jwt = request.getParameter("jwt");
        if (jwt == null || jwt.isEmpty() || jwtService.findUserByJWT(jwt) == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
            return false;
        }

        return true;
    }
}
