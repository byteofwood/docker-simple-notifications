import { spawn } from "child_process";
import fetch from "node-fetch";
import * as dotenv from 'dotenv';

import { strToBool } from './utils.js'

dotenv.config();
const NOTIFY_STARTUP = strToBool(process.env.NOTIFY_STARTUP, true)
const N_SERVER = process.env.NTFY_SERVER
const N_TOPIC = process.env.NTFY_TOPIC;

const sendNotification = (content) => {
    console.log(`Sent notification: ${content}`);
    fetch(N_SERVER + N_TOPIC, {
        method: "POST",
        body: content,
    });
};


const processDockerEvent = (dockerEvent) => {
    const attributes = dockerEvent.Actor.Attributes;
    if (dockerEvent.Type === "container") {

        switch (dockerEvent.Action) {

            case "die":
                sendNotification(
                    `Container ${attributes.name} (${attributes.image}) died with code ${attributes.exitCode}.`
                );
                break;

            case "start":
                sendNotification(
                    `Container ${attributes.name} (${attributes.image}) started.`
                );
                break;

        }

    }
};


const main = () => {
    const startupMessage = 'docker-simple-notifications has started.'
    console.log(startupMessage)
    if (NOTIFY_STARTUP) sendNotification(startupMessage)

    // Listen to docker events
    const child = spawn("docker", ["events", "--format", "{{json .}},"]);
    child.stdout.on("data", (dataBuffer) => {
        /* multiple events may be on one line, so we must put the entire line into an array,
        remove trailing whitespace, and remove the last comma because it would cause a 
        syntax error
        */
        let dataString = dataBuffer.toString().trim()
        if (dataString.slice(-1) === ',') {
            // if the string ends in a comma, get rid of it
            // sometiems the string doesn't end in a comma for some reason
            dataString = dataString.slice(0, -1)
        }
        const dockerEvents = JSON.parse("[" + dataString + "]");
        dockerEvents.forEach(processDockerEvent);
    });
}

main()
