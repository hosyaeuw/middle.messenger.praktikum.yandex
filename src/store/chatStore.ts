import { TDialog } from 'entities/dialog';
import { TMessage } from 'entities/message';
import { IOpponent } from 'entities/user';

import chats from 'data/chats';
import openChat from 'data/openChat';
import NetworkStatus from 'utils/enums/NetworkStatus';

export type TOpenChatStore = {
    opponent: IOpponent[];
    messages: TMessage[];
};

type TChatStore = {
    dialogs: TDialog[];
    dialogsNetworkStatus: NetworkStatus;
    openChat: TOpenChatStore | null;
};

export const chatInitialState: TChatStore = {
    dialogs: chats.dialogs,
    dialogsNetworkStatus: NetworkStatus.pending,
    openChat: openChat,
};
