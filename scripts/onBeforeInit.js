var resp, name, value, endpoint_markup = "",
    q = jelastic.billing.account.GetQuotas("environment.endpoint.enabled").array || [];

for (var i = 0, n = q.length; i < n; i++) {
    name = q[i].quota.name;
    value = q[i].value;
    
    if (name == "environment.endpoint.enabled") {
        endpoint = !! value;
        if (endpoint == false) {
            endpoint_markup = "Endpoints functionality is not available for user. Please contact support.";
        } 
        continue;
    }
}

resp = { result: 0, settings: {fields: []} };

if (endpoint_markup){
    resp.settings.fields.push(
        {"type": "displayfield", "cls": "warning", "height": 30, "hideLabel": true, "markup": endpoint_markup},
        {"type": "compositefield","height": 0,"hideLabel": true,"width": 0,"items": [{"height": 0,"type": "string","required": true}]}
    )
}

return resp;
