import { DialogType } from 'entities/dialog';
import { IProfile } from 'entities/user';
import { api } from 'httpClient/api';
import { URLHelper } from 'utils/URLHelper';
import { httpClient } from '../httpClient';

export type CreateDialogData = {
    title: string;
};

export type FetchDialogsData = {
    offset?: number;
    limit?: number;
    title?: string;
};

export type UsersToChatData = {
    users: number[];
    chatId: number;
};

type TokenResponse = {
    token: string;
};

type NewChatResponse = {
    id: number;
};

class ChatController {
    public async createDialog(data: CreateDialogData) {
        return httpClient.post<NewChatResponse>(`${api.chat.domain}${api.chat.createDialog}`, {
            data,
        });
    }

    public async addUsersToChat(data: UsersToChatData) {
        return httpClient.put(`${api.chat.domain}${api.chat.addUsersToChat}`, { data });
    }

    public async fetchDialogs(data?: FetchDialogsData) {
        return httpClient.get<DialogType[]>(`${api.chat.domain}${api.chat.getDialogs}`, {
            data,
        });
    }

    public async getToken(chatId: number | string) {
        return httpClient.post<TokenResponse>(
            URLHelper.buildUrl(`${api.chat.domain}${api.chat.getChatToken}`, {
                id: chatId,
            }),
        );
    }

    public async getChatUsers(chatId: number | string) {
        return httpClient.get<IProfile[]>(
            URLHelper.buildUrl(`${api.chat.domain}${api.chat.getChatUsers}`, {
                chatId,
            }),
        );
    }

    public async deleteUsersFromChat(data: UsersToChatData) {
        return httpClient.delete(`${api.chat.domain}${api.chat.deleteUsersFromChat}`, { data });
    }
}

export const chatController = new ChatController();
