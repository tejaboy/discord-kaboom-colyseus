import { setUpDiscordSdk } from './helper/setUpDiscordSdk';
import './index.css';
import kaboom from 'kaboom'
import { createLobbyScene } from './scenes/lobby';
import { GAME_HEIGHT, GAME_WIDTH } from '../../server/src/shared/Constants';

// Initialize Kaboom
export const k = kaboom({
	background: "41D9FF",
	width: GAME_WIDTH,
	height: GAME_HEIGHT
});

const text = k.add([
	k.text("Connecting ..."),
	k.pos(k.center()),
	k.anchor("center")
]);

// Create all scenes
createLobbyScene();

setUpDiscordSdk().then(({avatarUri, name, client, room}) => {
	text.text = "Set-up succes. Welcome, " + name + "!";
	k.go("lobby", room);
});