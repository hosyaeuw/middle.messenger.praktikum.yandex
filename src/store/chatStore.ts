import { DialogType } from 'entities/dialog';
import { MessageType } from 'entities/message';
import { IOpponent } from 'entities/user';

import openChat from 'data/openChat';
import { NetworkStatus } from 'utils/enums/NetworkStatus';

export type OpenChatStore = {
    opponent: IOpponent[];
    messages: MessageType[];
};

type ChatStore = {
    dialogs: DialogType[];
    dialogsNetworkStatus: NetworkStatus;
    openChat: OpenChatStore | null;
    messages: MessageType[];
};

export const chatInitialState: ChatStore = {
    dialogs: [],
    dialogsNetworkStatus: NetworkStatus.pending,
    openChat: openChat,
    messages: [],
};
