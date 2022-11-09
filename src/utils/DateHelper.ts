type TimeFields = 'day' | 'month' | 'year' | 'hour' | 'minute';

export class DateHelper {
    static defaultOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    static getMessageTime(date: Date, fields?: TimeFields[]) {
        const options = fields
            ? Object.fromEntries(fields.map(key => [key, DateHelper.defaultOptions[key]]))
            : DateHelper.defaultOptions;

        return date.toLocaleTimeString('en-US', { ...options, hour12: true });
    }
}
