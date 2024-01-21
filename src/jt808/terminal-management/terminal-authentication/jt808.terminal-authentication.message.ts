import { IJT808Body } from "../../jt808.body";

export interface IJT808TerminalAuthenticationData {
    readonly authenticationCode: string;
}

export class JT808TerminalAuthenticationMessage implements IJT808Body<IJT808TerminalAuthenticationData> {
    readonly message: string;

    constructor(message: string) {
        this.message = message;
    }

    get data(): IJT808TerminalAuthenticationData {
        return {
            authenticationCode: this.authenticationCode,
        }
    }

    private get authenticationCode(): string {
        return this.message;
    }
}