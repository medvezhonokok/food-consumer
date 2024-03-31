const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const publicKey = 'BE2FvJH3DfNGUwUw2dVZ5b9P2Lk79f2BK0T3WP0pXMUgtwX_aNfP3rAzcya326eKv429Lbm0Ik9CDfoRgK6WDao';
const privateKey = 'Locy435WS3XZ7xd-N38ZuD-9kKmPK5GCD1E674eQb-o';
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicKey,
    privateKey
);

const subscriptions = {};

app.post('/subscribe', (req, res) => {
    const {subscription, id} = req.body;
    subscriptions[id] = subscription;
    return res.status(201).json({data: {success: true}});
});

app.post('/send', (req, res) => {
    const {message, title, id} = req.body;
    const subscription = subscriptions[id];
    const payload = JSON.stringify({ title, message });
    webPush.sendNotification(subscription, payload).catch(error => {
        return res.status(400).json({data: {success: false}});
    }).then((value) => {
        return res.status(201).json({data: {success: true}});
    });
});

app.get('/info', (req, res) => {
    return res.status(200).json({data: JSON.stringify(subscriptions)});
});


app.listen(3002, () => {
    console.log('Server started on port 3002');
});
