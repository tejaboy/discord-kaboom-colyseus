import {Schema, MapSchema, type} from '@colyseus/schema';
import {TPlayerOptions, Player} from './Player';
import { GAME_HEIGHT, GAME_WIDTH } from '../shared/Constants';

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
		let x = Math.random() * GAME_WIDTH;
		let y = Math.random() * GAME_HEIGHT;

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
