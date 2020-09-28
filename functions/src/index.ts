const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();

app.post('/', async (req: any, res: any) => {
    const user = req.body.user;
    const actionMissed = req.body.actionMissed;
    const actionShortcut = req.body.actionShortcut;
    const eventTime = req.body.eventTime;

    console.log("Received =>", req.body);

    try {
        const writeResult = await admin.firestore().collection('reports').add(
            {
                user: user,
                actionMissed: actionMissed,
                actionShortcut: actionShortcut,
                eventTime: eventTime,
            });

        console.log(`Data added to DB. Data Id ${writeResult.id}`);
        res.json(
            {
                result: "Success",
            });
    } catch (error) {
        res.json(
            {
                result: `Error - ${error}`,
            });
    }
});

exports.reports = functions.https.onRequest(app);
