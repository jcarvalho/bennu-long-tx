package pt.ist.bennu.longtx.servlet.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import pt.ist.fenixframework.longtx.LongTransaction;
import pt.ist.fenixframework.longtx.TransactionalContext;

@WebFilter(urlPatterns = "*")
public class LongTxFilter implements Filter {

    public static final String LONG_TX_SESSION_PARAM = "__LONG_TX__";

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        System.out.println("Filtro!");
        HttpSession session = ((HttpServletRequest) request).getSession(false);
        TransactionalContext context =
                session == null ? null : (TransactionalContext) session.getAttribute(LONG_TX_SESSION_PARAM);
        if (context == null) {
            chain.doFilter(request, response);
        } else {
            try {
                LongTransaction.setContextForThread(context);
                chain.doFilter(request, response);
            } finally {
                LongTransaction.removeContextFromThread();
            }
        }
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}
