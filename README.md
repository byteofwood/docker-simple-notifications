# docker-simple-notifications
Tiny project to get notified about issues with your docker containers. 

## Instructions
Have node/npm and Docker installed.
Pull this repo onto the (Linux) machine that you choose to run this on. This might work on Windows or MacOS but it has not been tested.
Create a `.env` file based on `example.env` and change `NTFY_TOPIC` to a topic you are subscribed to on [ntfy](https://ntfy.sh/). Change `NTFY_SERVER` if you need to.
Run `npm i` to retrieve the dependencies, then run the script with `npm start`.

## Disclaimer
Do not use this anywhere important. It is almost certainly not good enough for a production environment. I just threw this together in an hour. For example, I have no idea what will happen if the docker daemon restarts while this script is running.

Feel free to do whatever you want with this code as long as you follow the dependencies' licences.