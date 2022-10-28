import { IProfile } from 'entities/user';

import profile from 'data/profile';
import NetworkStatus from 'utils/enums/NetworkStatus';

type TChatStore = {
    profile: IProfile | null;
    profileNetworkStatus: NetworkStatus;
};

export const profileInitialState: TChatStore = {
    profile: profile,
    profileNetworkStatus: NetworkStatus.pending,
};
