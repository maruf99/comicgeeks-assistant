import type { ConversationV3 } from '@assistant/conversation';
import { fetchUser } from 'comicgeeks';

export const handleUsername = async (conv: ConversationV3) => {
	const username = conv.intent.query?.replace(/\s/g, '');

	const user = await fetchUser(username).catch(() => null);

	if (!user) {
		conv.add(
			'There is no account on League of Comic Geeks with that username. Please double check your spelling or create an account at leagueofcomicgeeks.com'
		);
	} else {
		conv.user.params.comicUsername = user.name;
		conv.user.params.comicUserID = user.id;

		conv.add(`Your username has been set to ${user.name}`);
	}

	conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
};
