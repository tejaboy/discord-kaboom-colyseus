# Discord-Kaboom-Colyseus

![Screenshot of the discord kaboom colyseus example running](/preview.gif)

Bare minimum template to developer Discord activity with KaboomJS and Colyseus. Largely based on the [`react-colyseus`](https://github.com/discord/embedded-app-sdk/tree/main/examples/react-colyseus) template from Discord

1. [KaboomJS](https://kaboomjs.com/) - A javascript game engine
2. [Colyseus](https://www.colyseus.io/) - A full-stack state-management library

## Setting up your Discord Application

Video Tutorial: [https://www.youtube.com/watch?v=k6A2VUbIQio](https://www.youtube.com/watch?v=k6A2VUbIQio).

Before we write any code, lets follow the instructions [here](https://discord.com/developers/docs/activities/building-an-activity#step-1-creating-a-new-app) to make sure your Discord application is set up correctly.

## Setting up your environment variables

In order to run your app, you will need to create a `.env` file. Rename the file [/example.env](/example.env) to `.env` and fill it in with the appropriate OAuth2 variables. The OAuth2 variables can be found in the OAuth2 tab on the developer portal, as described [here](https://discord.com/developers/docs/activities/building-an-activity#find-your-oauth2-credentials)

```.env
# Example .env file
# Rename this from example.env to .env
VITE_CLIENT_ID=PASTE_OAUTH2_CLIENT_ID_HERE
CLIENT_SECRET=PASTE_OAUTH2_CLIENT_SECRET_HERE
```

## Running your app locally

As described [here](https://discord.com/developers/docs/activities/building-an-activity#step-4-running-your-app-locally-in-discord), we encourage using a tunnel solution such as [cloudflared](https://github.com/cloudflare/cloudflared#installing-cloudflared) for local development.
To run your app locally, run the following from this directory.

Run once only (set-up):

```
npm install
cd packages/client
npm install
cd ../server
npm install
```

Whenever you want to start the development server, run the following command from the root directory. Each command is for one terminal.
```
npm run dev
cloudflared tunnel --url http://localhost:3000 # from another terminal
```

Be sure to complete all the steps listed [here](https://discord.com/developers/docs/activities/building-an-activity) to ensure your development setup is working as expected.

## How to create new scene

To create new scene, you may look at how the lobby scene is structured in [/packages/client/src/scenes/lobby.ts](/packages/client/src/scenes/lobby.ts)
The lobby.ts is being imported to [/packages/client/src/App.ts](/packages/client/src/App.ts)

## How to add new server-side state?

For a server authoritative game, you may add new property to the player in [/packages/server/src/entities/Player.ts](/packages/server/src/entities/Player.ts).
Please take a look at how the server authoritative movement is being implemented in [/packages/server/src/rooms/StateHandlerRoom.ts](/packages/server/src/rooms/StateHandlerRoomlayer.ts).