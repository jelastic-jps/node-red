//@auth

var envName = '${env.envName}';
var nodeId = '${nodes.cp.first.id}';

var resp = jelastic.env.control.AddEndpoint(envName, session, nodeId, 1880, "TCP", "Node-RED WS");
if (resp.result != 0) return resp;

var redirect = "require('http').createServer(function (req, res) { res.writeHead(301, {'Location': 'http://' + req.headers.host + ':'" + resp.object.publicPort + " + req.url}); res.end(); }).listen(7654);\n/**"

resp = jelastic.env.file.ReplaceInBody(envName, session, "/usr/src/node-red/node_modules/node-red/red.js", "/**", redirect, 1, null, "cp", true, nodeId);
return resp;
