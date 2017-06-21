//@auth
//@req(nodeId, port)

var envName = '${env.envName}';

var resp = jelastic.env.control.AddEndpoint(envName, session, nodeId, port, "TCP", "Node-RED WS");
if (resp.result != 0) return resp;

var destPort = resp.object.publicPort;
var redirPort = 7654; 
var redirect = "require(\"http\").createServer(function (req, res) { res.writeHead(301, {\"Location\": \"http://\" + req.headers.host + \":" + destPort + "\" + req.url}); res.end(); }).listen(" + redirPort + ", \"0.0.0.0\");"

path = "/usr/src/node-red/node_modules/node-red/red.js";
resp = jelastic.env.file.ReplaceInBody(envName, session, path, "var http = ", redirect + "\nvar http = ", 1, null, null, true, nodeId);
return resp;
