import { Room } from "colyseus.js";
import { Player } from "../../../server/src/entities/Player";
import { State } from "../../../server/src/entities/State";
import { k } from "../App";
import { GameObj } from "kaboom";

export function createLobbyScene() {
    k.scene("lobby", (room: Room<State>) => {
        k.setBackground(120, 120, 222);
        let loadedPlayer: Array<string> = [];

        room.onStateChange((state) => {
            state.players.forEach((player) => {
                if (loadedPlayer.includes(player.sessionId)) return;

                createPlayer(player, room);
                loadedPlayer.push(player.sessionId);
            })
        });

        k.onClick(() => {
            room.send("move", k.mousePos());
        })
    });
}

function createPlayer(player: Player, room: Room<State>) {
    k.loadSprite(player.sessionId, player.avatarUri);

    // Add player plane
    const playerSprite = k.add([
        // List of components, each offers a set of functionalities
        k.sprite(player.sessionId),
        k.pos(player.x, player.y),
        k.anchor("center"),
        k.scale(0.5)
    ]);

    playerSprite.onUpdate(() => {
        let serverPlayer = room.state.players.get(player.sessionId);
        if (serverPlayer == null) return;

        playerSprite.pos.x += (serverPlayer.x - playerSprite.pos.x) * 12 * k.dt();
        playerSprite.pos.y += (serverPlayer.y - playerSprite.pos.y) * 12 * k.dt();
    });

    return playerSprite;
}