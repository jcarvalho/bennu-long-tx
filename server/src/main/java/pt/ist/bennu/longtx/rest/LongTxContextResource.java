package pt.ist.bennu.longtx.rest;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import pt.ist.bennu.core.rest.BennuRestResource;
import pt.ist.bennu.longtx.servlet.filter.LongTxFilter;
import pt.ist.fenixframework.longtx.TransactionalContext;

@Path("longTxContext")
@Produces(MediaType.APPLICATION_JSON)
public class LongTxContextResource extends BennuRestResource {

    @Context
    HttpServletRequest request;

    @GET
    public String view() {
        accessControl("logged");
        TransactionalContext context =
                (TransactionalContext) request.getSession().getAttribute(LongTxFilter.LONG_TX_SESSION_PARAM);
        return view(context);
    }

    @PUT
    public Response setContext(@FormParam("oid") String oid) {
        return Response.ok().build();

    }
}
