var http = require('http');

let fire_kea_api = function (ca_addr, ca_port, req_data) {
    req_data = JSON.stringify(req_data);
    var options = {
        host: ca_addr,
        port: ca_port,
        path: '/',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': req_data.length
        },
        method: 'POST'
    };
    return new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('Status Code : ' + res.statusCode));
            }
            res.setEncoding('utf8');

            var response_data = '';
            res.on('data', function (body) {
                response_data += body;
            });
            res.on('end', function () {
                try {
                    resolve(JSON.parse(response_data)[0]);
                } catch (error) {
                    reject(error);
                }
            });
        });
        req.on('error', (e) => {
            console.error(`Request Error: ${e.message}`);
            reject(e);
        });
        req.write(req_data);
        req.end();
    });
}

let call_kea_api = function(cmd, service, args) {
    return new Promise(function (resolve, reject) {
        fire_kea_api(global.settings.kea.addr, global.settings.kea.port, {
            command: cmd,
            service: [service],
            arguments: args
        }).then((response) => {
            if (response.result != 0) return reject(response.text)
            resolve(response.arguments);
        }, reject)
    });
}

module.exports = {
    fire_kea_api,
    call_kea_api
};      