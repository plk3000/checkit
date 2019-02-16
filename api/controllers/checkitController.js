'use strict';


var mongoose = require('mongoose'),
    Resource = mongoose.model('Resources'),
    Transaction = mongoose.model('Transactions'),
    Request = require("request"),
    moment = require('moment');

exports.handleRequest = function (req, res) {
    let params = req.body.text.replace(/\s{2,}/, ' ').split(' ');
    let action = params.shift();
    switch (action) {
        case 'add':
            createResource(req, res, params);
            break;
        case 'list':
            listResources(res);
            break;
        case 'out':
            checkOut(req, res, params);
            break;
        case 'in':
            checkIn(req, res, params);
            break;
        default:
            res.send('Wrong action your majesty').end();
            break;
    }
}

function listResources(res) {
    Resource.find({}, function (err, resources) {
        if (err)
            res.send(err);
        let response = '';
        for (const resource of resources) {
            let occupied = resource.status == 'occupied';
            response += resource.name + ' *status:* ' + resource.status;
            response += occupied ? ' *by* ' + resource.user : '';
            response += occupied ? ' *Since* ' + moment(resource.checkOutDate).fromNow() : '';
            response += resource.checkOutComment ? ' *comment:* ' + resource.checkOutComment : ''
            response += '\n'
        }
        res.json({
            text: 'This are the current resources boss',
            attachments: [{
                text: response
            }]
        });
    });
};
/*
{
    "text": "It's 80 degrees right now.",
    "attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
    ]
}
*/

function createResource(req, res, params) {
    let slackInfo = req.body;
    if (params.length >= 1) {
        res.status(200).send('As you wish chief').end();
        var newResource = new Resource({
            name: params.shift(),
            createdBy: '<@' + slackInfo.user_id + '>'
        });

        newResource.save(function (err, resource) {
            console.log(resource);
            // TODO: erro handling
            var response = {
                "response_type": "in_channel",
                "text": 'chief <@' + slackInfo.user_id + '>' + ' created ' + resource.name
            }

            sendResponse(slackInfo, response);
        });
    } else {
        res.status(200).send('Please check usage boss').end();
    }
};

function removeResource(req, res, params) {
    
}

function checkOut(req, res, params) {
    let slackInfo = req.body;
    let user = '<@' + slackInfo.user_id + '>';
    if (params.length >= 1) {
        let name = params.shift();
        let comment = '';
        while (params.length > 0) {
            comment += params.shift() + ' ';
        }
        res.status(200).end();
        Resource.findOne({
            name: name
        }, function (err, doc) {
            let response = {
                "text": '',
                "response_type": "ephemeral"
            };
            if (err) {
                response.text = "Ups couldn't do that boss";
                sendResponse(slackInfo, response);
            } else if (doc.status == 'occupied') {
                response.text = "Ups couldn't do that boss, this resource is being used by " + doc.user;
                sendResponse(slackInfo, response);
            } else {
                doc.status = 'occupied';
                doc.checkOutDate = new Date();
                doc.user = user
                doc.checkOutComment = comment;
                doc.save(function (err, resource) {
                    response.response_type = 'in_channel'
                    response.text = 'chief ' + user + ' just checked out ' + doc.name
                    if (comment != '') {
                        response.text += ' for ' + comment;
                    }

                    sendResponse(slackInfo, response);

                    let transaction = new Transaction({
                        resourceName: doc.name,
                        status: 'occupied',
                        user: '<@' + slackInfo.user_id + '>',
                        comment: comment
                    })

                    transaction.save();
                })
            }
        });
    } else {
        res.status(200).send('Please check usage').end();
    }
}

function sendResponse(slackInfo, response) {
    Request.post({
        "headers": {
            "content-type": "application/json"
        },
        "url": slackInfo.response_url,
        "body": JSON.stringify(response)
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
    });
}

function checkIn(req, res, params) {
    let slackInfo = req.body;
    if (params.length >= 1) {
        let name = params.shift();
        let user = '<@' + slackInfo.user_id + '>';
        res.status(200).end();

        Resource.findOne({
            name: name,
            user: user
        }, function (err, resource) {
            let response = {
                "text": '',
                "response_type": "ephemeral"
            };
            if (err) {
                response.text = "Ups couldn't do that boss";
                sendResponse(slackInfo, response);
            } else if (resource == null) {
                response.text = 'You have not check out this resource chief';
                sendResponse(slackInfo, response);
            } else {
                resource.status = 'free';
                resource.user = null;
                resource.checkOutDate = null;
                resource.checkOutComment = null;

                resource.save(function (err, resource) {
                    if (!err) {
                        response.text = user + ' just freed resource ' + resource.name;
                        response.response_type = 'in_channel';
                        sendResponse(slackInfo, response);
                    } else {
                        response.text = 'something bad happend boss ' + err;
                        sendResponse(slackInfo, response);
                    }
                });
            }
        });
    } else {
        res.status(200).send('Please check usage').end();
    }

}
// Request.post({
//     "headers": { "content-type": "application/json" },
//     "url": "http://httpbin.org/post",
//     "body": JSON.stringify({
//         "firstname": "Nic",
//         "lastname": "Raboy"
//     })
// }, (error, response, body) => {
//     if(error) {
//         return console.dir(error);
//     }
//     console.dir(JSON.parse(body));
// });