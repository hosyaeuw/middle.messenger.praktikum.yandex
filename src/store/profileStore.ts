import { IProfile } from 'entities/user';

import profile from 'data/profile';
import NetworkStatus from 'utils/enums/NetworkStatus';

type ChatStore = {
    profile: IProfile | null;
    profileNetworkStatus: NetworkStatus;
};

export const profileInitialState: ChatStore = {
    profile: profile,
    profileNetworkStatus: NetworkStatus.pending,
};
