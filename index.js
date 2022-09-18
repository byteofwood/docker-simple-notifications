import { spawn } from "child_process";
import fetch from "node-fetch";
import * as dotenv from 'dotenv';

dotenv.config();
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

// Listen to docker events
const child = spawn("docker", ["events", "--format", "{{json .}},"]);
console.log('Listening to docker events...')
child.stdout.on("data", (dataBuffer) => {
    /* multiple events may be on one line, so we must put the entire line into an array,
       remove trailing whitespace, and remove the last comma because it would cause a 
       syntax error
    */
    const dockerEvents = JSON.parse("[" + dataBuffer.toString().trim().slice(0, -1) + "]");
    dockerEvents.forEach(processDockerEvent);
});
