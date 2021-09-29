import type { ConversationV3 } from '@assistant/conversation';
import { fetchPulls, SortTypes } from 'comicgeeks';

export const handlePullList = async (conv: ConversationV3) => {
	const userID = conv.user.params.comicUserID;

	if (typeof userID !== 'number') {
		conv.add(
			'You do not have your League of Comic Geeks username set. Use the "Set my username" command to add your League of Comic Geeks account.'
		);
	} else {
		const pullList = await fetchPulls(userID, new Date(), { sort: SortTypes.AlphaAsc });

		const result = pullList.length ? pullList.map((issue) => issue.name).join('\n') : 'You have no comics pulled this week.';

		conv.add(result);
	}

	conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
};
