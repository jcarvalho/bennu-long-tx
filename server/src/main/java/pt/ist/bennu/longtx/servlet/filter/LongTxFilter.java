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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import pt.ist.fenixframework.longtx.LongTransaction;
import pt.ist.fenixframework.longtx.TransactionalContext;

@WebFilter(urlPatterns = "/api/*")
public class LongTxFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(LongTxFilter.class);

    public static final String LONG_TX_SESSION_PARAM = "__LONG_TX__";

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpSession session = ((HttpServletRequest) request).getSession(false);
        TransactionalContext context =
                session == null ? null : (TransactionalContext) session.getAttribute(LONG_TX_SESSION_PARAM);
        if (context == null) {
            logger.debug("Chaining request with no Transactional Context");
            chain.doFilter(request, response);
        } else {
            try {
                logger.debug("Setting Transactional Context for thread: {}", context);
                LongTransaction.setContextForThread(context);
                chain.doFilter(request, response);
            } finally {
                logger.debug("Removing Transactional Context from thread");
                LongTransaction.removeContextFromThread();
            }
        }
    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}
