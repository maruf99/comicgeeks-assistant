import type { ConversationV3 } from '@assistant/conversation';
import { fetchPulls, SortTypes } from 'comicgeeks';

export const handlePullList = async (conv: ConversationV3) => {
	const userID = conv.user.params.comicUserID;

	if (typeof userID !== 'number') {
		conv.add('You do not have your Comic Geeks username set.');
	} else {
		const pullList = await fetchPulls(userID, new Date(), { sort: SortTypes.AlphaAsc });

		const result = pullList.map((issue) => issue.name).join('\n');

		conv.add(result);
	}

	conv.scene.next = { name: 'actions.scene.END_CONVERSATION' };
};
