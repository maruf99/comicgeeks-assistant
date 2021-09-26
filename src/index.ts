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

const assistant = conversation();

assistant.handle(Events.SetUsername, handleUsername);
assistant.handle(Events.ViewPullList, handlePullList);

const handler: VercelApiHandler = (req, res) => assistant(req, res);

export default handler;
