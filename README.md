# docker-simple-notifications
Tiny project to get notified about issues with your docker containers. A docker image may be created in the future but for now this must run as a regular program.

## Instructions
- Have node/npm and Docker installed.
- Pull this repo onto the (Linux) machine that you choose to run this on. This might work on Windows or MacOS but it has not been tested.
- Create a `.env` file based on `example.env` and change `NTFY_TOPIC` to a topic you are subscribed to on [ntfy](https://ntfy.sh/). Change `NTFY_SERVER` if you need to.
- Run `npm i` to retrieve the dependencies, then run the script with `npm start`.

## Testing
You can manually test this script by running `docker-compose --file test.docker-compose.yml up -d`. You should get notified at the topic you specified about the test container dying and starting. When you are done, you can run `docker-compose --file test.docker-compose.yml down` to stop and remove the container.

## Disclaimer
Do not use this anywhere important. It is almost certainly not good enough for a production environment. I just threw this together in an hour. For example, I have no idea what will happen if the docker daemon restarts while this script is running.

Feel free to do whatever you want with this code as long as you follow the dependencies' licences.