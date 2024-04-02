# Discord-Kaboom-Colyseus

![Screenshot of the discord kaboom colyseus example running](/preview.gif)

Bare minimum template to developer Discord activity with KaboomJS and Colyseus. Largely based on the [`react-colyseus`](https://github.com/discord/embedded-app-sdk/tree/main/examples/react-colyseus) template from Discord

1. [KaboomJS](https://kaboomjs.com/) - A javascript game engine
2. [Colyseus](https://www.colyseus.io/) - A full-stack state-management library

## How to create new scene

To create new scene, you may look at how the lobby scene is structured in [/packages/client/src/scenes/lobby.ts](/packages/client/src/scenes/lobby.ts)
The lobby.ts is being imported to [/packages/client/src/App.ts](/packages/client/src/App.ts)

## How to add new server-side state?

For a server authoritative game, you may add new property to the player in [/packages/server/src/entities/Player.ts](/packages/server/src/entities/Player.ts).
Please take a look at how the server authoritative movement is being implemented in [/packages/server/src/rooms/StateHandlerRoom.ts](/packages/server/src/rooms/PStateHandlerRoomlayer.ts).