export class JT808Error extends Error {
    constructor(message: string, ...params: any[]) {
        super(...params);

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, JT808Error);

        this.name = 'JT808Error';

        this.message = message;
    }
}