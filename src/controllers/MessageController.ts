import api, { BASE_WS_URL } from 'httpClient/api';
import store from 'store';
import WSEvents from 'utils/enums/WSEvents';
import URLHelper from 'utils/URLHelper';

const ABNORMAL_CLOSURE = 1006;

type WSOptions = {
    userId: number;
    chatId: number;
    token: string;
};

type GetMessagesOptions = {
    offset: number;
};

export type MessageData = {
    message?: string;
};

class MessageController {
    private _ws: WebSocket | undefined;

    private _userId: number | undefined;

    private _chatId: number | undefined;

    private _token: string | undefined;

    private _ping: any;

    constructor() {
        this._onOpen = this._onOpen.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._onError = this._onError.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    private _addEvents() {
        if (this._ws) {
            this._ws.addEventListener(WSEvents.open, this._onOpen);
            this._ws.addEventListener(WSEvents.message, this._onMessage);
            this._ws.addEventListener(WSEvents.error, this._onError);
            this._ws.addEventListener(WSEvents.close, this._onClose);
        }
    }

    private _removeEvents() {
        if (this._ws) {
            this._ws.removeEventListener(WSEvents.open, this._onOpen);
            this._ws.removeEventListener(WSEvents.message, this._onMessage);
            this._ws.removeEventListener(WSEvents.error, this._onError);
            this._ws.removeEventListener(WSEvents.close, this._onClose);
        }
    }

    private _onOpen() {
        this.getMessages({ offset: 0 });
        this._ping = setInterval(() => {
            if (this._ws) {
                this._ws.send('');
            }
        }, 15000);
    }

    private _onMessage(response: MessageEvent) {
        const data = JSON.parse(response.data);
        if (Array.isArray(data)) {
            store.setState({
                openChat: {
                    messages: data,
                },
            });
        } else if (typeof data === 'object' && data.type === 'message') {
            const messages = [...store.getState().messages, data];
            store.setState({ messages });
        }
    }

    private _onError() {}

    private _onClose(event: CloseEventInit) {
        this._removeEvents();
        if (event.wasClean) {
            console.log('Connection closed', 'error');
        } else {
            console.log('Network error', 'error');
        }

        if (event.code === ABNORMAL_CLOSURE) {
            this._reconnect();
        }
    }

    private _reconnect() {
        if (this._userId && this._chatId && this._token) {
            this.connect({
                userId: this._userId,
                chatId: this._chatId,
                token: this._token,
            });
        }
    }

    public connect(options: WSOptions) {
        this._userId = options.userId;
        this._chatId = options.chatId;
        this._token = options.token;
        this._ws = new WebSocket(
            URLHelper.buildUrl(
                `${BASE_WS_URL}${api.chat.domain}${api.chat.connectToMessageServer}`,
                {
                    userId: options.userId,
                    chatId: options.chatId,
                    token: options.token,
                },
            ),
        );
        this._addEvents();
    }

    public getMessages(options: GetMessagesOptions) {
        if (this._ws) {
            this._ws.send(
                JSON.stringify({
                    content: options.offset.toString(),
                    type: 'get old',
                }),
            );
        }
    }

    public closeConnection() {
        clearInterval(this._ping);
        if (this._ws) {
            this._ws.close();
            this._removeEvents();
        }
    }

    public sendMessage(data: MessageData) {
        if (this._ws && data.message) {
            this._ws.send(
                JSON.stringify({
                    content: data.message,
                    type: 'message',
                }),
            );
        }
    }
}

export default new MessageController();
