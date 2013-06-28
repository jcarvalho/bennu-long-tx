package pt.ist.bennu.longtx.rest;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import pt.ist.bennu.core.rest.BennuRestResource;
import pt.ist.bennu.core.security.Authenticate;
import pt.ist.fenixframework.longtx.TransactionalContext;

@Path("longTx")
@Produces(MediaType.APPLICATION_JSON)
public class LongTxResource extends BennuRestResource {

    @GET
    public String view() {
        accessControl("logged");
        return view(Authenticate.getUser().getLongTransactionSet(), "longTx");
    }

    @POST
    public String create(@FormParam("model") String model) {
        accessControl("logged");
        return view(create(model, TransactionalContext.class));
    }

}
