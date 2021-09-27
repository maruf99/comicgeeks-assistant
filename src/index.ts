import { conversation } from '@assistant/conversation';
import type { VercelApiHandler } from '@vercel/node';
import { Events } from './constants';
import { handlePullList } from './handlers/pull-list';
import { handleUsername } from './handlers/username';

declare module '@assistant/conversation' {
	interface JsonObject {
		comicUsername: string;
		comicUserID: number;
	}
}

declare module 'http' {
	interface IncomingMessage {
		get(header: string): string | string[];
	}
}

const assistant = conversation();

assistant.handle(Events.SetUsername, handleUsername);
assistant.handle(Events.ViewPullList, handlePullList);

const handler: VercelApiHandler = (req, res) => {
	console.log(req.headers);
	console.log(req.body);

	// conversation() handler checks for req.get for express-like APIs
	req.get = (header) => req.headers[header.toLowerCase()];

	assistant(req, res);
};

export default handler;
