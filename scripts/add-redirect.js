//@auth
//@req(nodeId, port)

var envName = '${env.envName}';

var resp = jelastic.env.control.AddEndpoint(envName, session, nodeId, port, "TCP", "Node-RED WS");
if (resp.result != 0) return resp;

var redirect = "require('http').createServer(function (req, res) { res.writeHead(301, {'Location': 'http://' + req.headers.host + ':'" + resp.object.publicPort + " + req.url}); res.end(); }).listen(7654, '0.0.0.0');"

resp = jelastic.env.file.ReplaceInBody(envName, session, "/usr/src/node-red/node_modules/node-red/red.js", "var http = ", "require('./redirect.js'); var http = ", 1, null, "cp", true, nodeId);
return resp;
