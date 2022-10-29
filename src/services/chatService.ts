import {
    UsersToChatData,
    CreateDialogData,
    FetchDialogsData,
    chatController,
} from 'controllers/ChatController';
import { messageController, MessageData } from 'controllers/MessageController';
import { SearchUserData } from 'controllers/UserController';
import { DialogType } from 'entities/dialog';
import { Profile } from 'entities/user';
import { store } from 'store';
import { NetworkStatus } from 'utils/enums/NetworkStatus';
import userService from './userService';

const setDialogs = (items: DialogType[]) => {
    store.setState({
        dialogs: items,
    });
};

const changeStatus = (networkStatus: NetworkStatus) => {
    store.setState({
        dialogsNetworkStatus: networkStatus,
    });
};

export const chatService = () => {
    const { searchUserByLogin } = userService();
    const { dialogs, openChat, dialogsNetworkStatus } = store.getState();

    const addUsersToChat = (data: UsersToChatData) => {
        return chatController.addUsersToChat(data);
    };

    const fetchDialogs = (data?: FetchDialogsData) => {
        changeStatus(NetworkStatus.loading);
        chatController.fetchDialogs(data).then(data => {
            setDialogs(data.response);
            changeStatus(NetworkStatus.ready);
        });
    };

    const createDialog = (data: CreateDialogData) => {
        return chatController.createDialog(data).then(response => {
            return response.response;
        });
    };

    const getToken = (chatId: number) => {
        return chatController.getToken(chatId).then(response => {
            return response.response.token;
        });
    };

    const searchAndAddUsers = (data: SearchUserData, chatId: number) => {
        return searchUserByLogin(data).then(data => {
            const usersData: UsersToChatData = {
                chatId,
                users: [data[0].id],
            };
            return addUsersToChat(usersData);
        });
    };

    const deleteUsersFromChat = (data: UsersToChatData) => {
        return chatController.deleteUsersFromChat(data);
    };

    const connectMessages = (token: string, chatId: number) => {
        const userId = store.getState().profile.id;

        messageController.connect({
            userId,
            chatId,
            token,
        });
    };

    const sendMessage = (data: MessageData) => {
        messageController.sendMessage(data);
    };

    const fetchUsersFromChat = (chatId: string | number) => {
        return chatController.getChatUsers(chatId).then(response => {
            return response.response.map(user => new Profile(user));
        });
    };

    return {
        dialogs: dialogs,
        openChat,
        createDialog,
        searchAndAddUsers,
        fetchDialogs,
        networkStatus: dialogsNetworkStatus,
        getToken,
        connectMessages,
        sendMessage,
        addUsersToChat,
        deleteUsersFromChat,
        fetchUsersFromChat,
    };
};
