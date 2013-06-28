package pt.ist.bennu.longtx.rest.json;

import pt.ist.bennu.core.annotation.DefaultJsonAdapter;
import pt.ist.bennu.json.JsonBuilder;
import pt.ist.bennu.json.JsonCreator;
import pt.ist.bennu.json.JsonViewer;
import pt.ist.fenixframework.longtx.TransactionalContext;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

@DefaultJsonAdapter(TransactionalContext.class)
public class TransactionalContextAdapter implements JsonCreator<TransactionalContext>, JsonViewer<TransactionalContext> {

    @Override
    public TransactionalContext create(JsonElement json, JsonBuilder builder) {
        String name = json.getAsJsonObject().get("name").getAsString();
        return new TransactionalContext(name);
    }

    @Override
    public JsonElement view(TransactionalContext context, JsonBuilder builder) {
        JsonObject json = new JsonObject();
        json.addProperty("id", context.getExternalId());
        json.addProperty("name", context.getName());
        return json;
    }

}
