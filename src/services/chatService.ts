import ChatController, {
    UsersToChatData,
    CreateDialogData,
    FetchDialogsData,
} from 'controllers/ChatController';
import MessageController, { MessageData } from 'controllers/MessageController';
import { SearchUserData } from 'controllers/UserController';
import { DialogType } from 'entities/dialog';
import { Profile } from 'entities/user';
import store from 'store';
import NetworkStatus from 'utils/enums/NetworkStatus';
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

const chatService = () => {
    const { searchUserByLogin } = userService();
    const { dialogs, openChat, dialogsNetworkStatus } = store.getState();

    const addUsersToChat = (data: UsersToChatData) => {
        return ChatController.addUsersToChat(data);
    };

    const fetchDialogs = (data?: FetchDialogsData) => {
        changeStatus(NetworkStatus.loading);
        ChatController.fetchDialogs(data).then(data => {
            setDialogs(data.response);
            changeStatus(NetworkStatus.ready);
        });
    };

    const createDialog = (data: CreateDialogData) => {
        return ChatController.createDialog(data).then(response => {
            return response.response;
        });
    };

    const getToken = (chatId: number) => {
        return ChatController.getToken(chatId).then(response => {
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
        return ChatController.deleteUsersFromChat(data);
    };

    const connectMessages = (token: string, chatId: number) => {
        const userId = store.getState().profile.id;

        MessageController.connect({
            userId,
            chatId,
            token,
        });
    };

    const sendMessage = (data: MessageData) => {
        MessageController.sendMessage(data);
    };

    const fetchUsersFromChat = (chatId: string | number) => {
        return ChatController.getChatUsers(chatId).then(response => {
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

export default chatService;
