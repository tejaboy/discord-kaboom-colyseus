import {Schema, MapSchema, type} from '@colyseus/schema';
import {TPlayerOptions, Player} from './Player';
import { BULLET_INTERVAL, BULLET_MAG_SIZE, GAME_HEIGHT, GAME_WIDTH, PLAYER_INITIAL_HEALTH } from '../shared/Constants';

export interface IState {
	roomName: string;
	channelId: string;
}

export class State extends Schema {
	@type({map: Player})
	players = new MapSchema<Player>();

	@type('string')
	public roomName: string;

	@type('string')
	public channelId: string;

	// Init
	constructor(attributes: IState) {
		super();
		this.roomName = attributes.roomName;
		this.channelId = attributes.channelId;
	}

	private _getPlayer(sessionId: string): Player | undefined {
		return Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
	}

	createPlayer(sessionId: string, playerOptions: TPlayerOptions) {
		let x = 200;
		let y = 200;

		const newPlayer = new Player({
			...playerOptions,
			sessionId,
			x,
			y
		});

		this.players.set(sessionId, newPlayer);

		return newPlayer;
	}

	removePlayer(sessionId: string) {
		const player = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
		if (player != null) {
			this.players.delete(player.userId);
		}
	}

	setTargetMove(sessionId: string, target_x: number, target_y: number) {
		const player = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
		if (player != null) {
			player.target_x = target_x;
			player.target_y = target_y;
		}
	}
}
