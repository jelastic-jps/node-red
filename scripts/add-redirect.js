//@auth
//@req(nodeId, port)

var envName = '${env.envName}';

var resp = jelastic.env.control.AddEndpoint(envName, session, nodeId, port, "TCP", "Node-RED WS");
if (resp.result != 0) return resp;

var redirect = "//redirect from 80->1880\nrequire('http').createServer(function (req, res) { res.writeHead(301, {'Location': 'http://' + req.headers.host + ':'" + 1000 + " + req.url}); res.end(); }).listen(7654);\n//----\nvar http "

resp = jelastic.env.file.ReplaceInBody(envName, session, "/usr/src/node-red/node_modules/node-red/red.js", "var http ", redirect, 1, null, "cp", true, nodeId);
return resp;
