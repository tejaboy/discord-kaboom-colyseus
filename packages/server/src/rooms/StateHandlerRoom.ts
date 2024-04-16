import {Room, Client} from 'colyseus';
import {State, IState} from '../entities/State';
import { Player, TPlayerOptions } from '../entities/Player';
import { GAME_WIDTH, SPEED } from '../shared/Constants';

export class StateHandlerRoom extends Room<State> {
	maxClients = 1000;

	onCreate(options: IState) {
		this.setState(new State(options));

		this.onMessage('move', (client, data) => {
			this.state.setTargetMove(client.sessionId, data.x, data.y);
		});

		// Game Loop
		this.setSimulationInterval((deltaTime) => {
			// Loop through all players
			this.state.players.forEach((player, sessionId) => {
				// Move player towards target position (linear interpolation)
				player.x += (player.target_x - player.x) * SPEED * (deltaTime / 1000);
				player.y += (player.target_y - player.y) * SPEED * (deltaTime / 1000);;
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