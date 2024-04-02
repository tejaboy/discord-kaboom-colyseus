import {Room, Client} from 'colyseus';
import {State, IState} from '../entities/State';
import { Player, TPlayerOptions } from '../entities/Player';
import { GAME_WIDTH } from '../shared/Constants';

export class StateHandlerRoom extends Room<State> {
	maxClients = 1000;

	onCreate(options: IState) {
		this.setState(new State(options));

		this.onMessage('movement', (client, data) => {
			// this.state.setMovement(client.sessionId, data.value);
		});

		// Game Loop
		this.setSimulationInterval((deltaTime) => {
			// Loop through all players
			this.state.players.forEach((player, sessionId) => {
				const speed = 300;
				const nextX = Math.cos(0 * Math.PI / 180) * speed * (deltaTime / 1000);
				const nextY = Math.sin(0 * Math.PI / 180) * speed * (deltaTime / 1000);
				player.x += nextX;
				player.y += nextY;

				/* BOUNDS */
				// When reaches end, restart at 0
				if (player.x > GAME_WIDTH) {
					player.x = 0;
				} else if (player.x < 0) {
					player.x = GAME_WIDTH;
				}
			});
		});
	}

	onAuth(_client: any, _options: any, _req: any) {
		return true;
	}

	onJoin(client: Client, options: TPlayerOptions) {
		let newPlayer: Player = this.state.createPlayer(client.sessionId, options);
		this.broadcast("create-player", newPlayer);
	}

	onLeave(client: Client) {
		this.state.removePlayer(client.sessionId);
	}

	onDispose() {
		console.log('Dispose StateHandlerRoom');
	}
}