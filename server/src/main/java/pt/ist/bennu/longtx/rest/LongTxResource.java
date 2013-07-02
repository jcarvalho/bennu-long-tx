package pt.ist.bennu.longtx.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import pt.ist.bennu.core.rest.BennuRestResource;
import pt.ist.bennu.core.security.Authenticate;
import pt.ist.bennu.longtx.servlet.filter.LongTxFilter;
import pt.ist.fenixframework.Atomic;
import pt.ist.fenixframework.Atomic.TxMode;
import pt.ist.fenixframework.FenixFramework;
import pt.ist.fenixframework.longtx.LongTransaction;
import pt.ist.fenixframework.longtx.TransactionalContext;

@Path("longTx")
@Produces(MediaType.APPLICATION_JSON)
public class LongTxResource extends BennuRestResource {

    @Context
    private HttpServletRequest request;

    @GET
    public String view() {
        accessControl("logged");
        return view(Authenticate.getUser().getLongTransactionSet(), "longTx");
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(String model) {
        accessControl("logged");
        TransactionalContext context = createIt(model);
        return view(context);
    }

    @Atomic(mode = TxMode.WRITE)
    private TransactionalContext createIt(String model) {
        TransactionalContext context = create(model, TransactionalContext.class);
        context.setOwner(Authenticate.getUser());
        return context;
    }

    @GET
    @Path("/activate/{oid}")
    public Response activate(@PathParam("oid") String oid) {
        if (LongTransaction.getContextForThread() != null) {
            return Response.serverError().build();
        }
        TransactionalContext context = getAndCheckContext(oid);
        request.getSession(true).setAttribute(LongTxFilter.LONG_TX_SESSION_PARAM, context);
        return Response.ok().build();
    }

    @GET
    @Path("/deactivate")
    public Response deactivate() {
        TransactionalContext context = LongTransaction.getContextForThread();
        if (context == null) {
            return Response.serverError().build();
        }
        request.getSession().setAttribute(LongTxFilter.LONG_TX_SESSION_PARAM, null);
        return Response.ok().build();
    }

    @GET
    @Path("/commit/{oid}")
    public Response commit(@PathParam("oid") String oid) {
        if (LongTransaction.getContextForThread() != null) {
            return Response.serverError().build();
        }
        commitIt(getAndCheckContext(oid));
        return Response.ok().build();
    }

    @GET
    @Path("/rollback/{oid}")
    public Response rollback(@PathParam("oid") String oid) {
        if (LongTransaction.getContextForThread() != null) {
            return Response.serverError().build();
        }
        rollbackIt(getAndCheckContext(oid));
        return Response.ok().build();
    }

    @Atomic(mode = TxMode.WRITE)
    private void commitIt(TransactionalContext context) {
        context.commit(false);
        context.setOwner(null);
    }

    @Atomic(mode = TxMode.WRITE)
    private void rollbackIt(TransactionalContext context) {
        context.rollback(false);
        context.setOwner(null);
    }

    private TransactionalContext getAndCheckContext(String oid) {
        TransactionalContext context = FenixFramework.getDomainObject(oid);
        if (context.getOwner() != Authenticate.getUser()) {
            throw new WebApplicationException(403);
        }
        return context;
    }

}
