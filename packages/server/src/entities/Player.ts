import {Schema, type} from '@colyseus/schema';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUri' | 'x' | 'y'>;

export class Player extends Schema {
	@type('string')
	public sessionId: string;

	@type('string')
	public userId: string;

	@type('string')
	public avatarUri: string;

	@type('string')
	public name: string;

	@type("number")
	public x: number = 0;

	@type("number")
	public y: number = 0;

	@type("number")
	public target_x: number = 0;

	@type("number")
	public target_y: number = 0;

	// Init
	constructor({name, userId, avatarUri, sessionId, x, y}: TPlayerOptions) {
		super();
		this.userId = userId;
		this.avatarUri = avatarUri;
		this.name = name;
		this.sessionId = sessionId;
		this.x = x;
		this.y = y;
		this.target_x = x;
		this.target_y = y;
	}
}
