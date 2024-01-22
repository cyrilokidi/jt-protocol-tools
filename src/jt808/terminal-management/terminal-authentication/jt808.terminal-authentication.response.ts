import { EJT808MessageId } from "../../header/jt808.header";
import { IJT808Body } from "../../jt808.body";
import { JT808Tools } from "../../jt808.tools";

export interface IJT808TerminalAuthenticationResponseOptions {
    readonly terminalPhoneNumber: string;
    readonly responseSerialNumber: number;
    readonly result: 0 | 1 | 2 | 3 | 4;
}

export interface IJT808TerminalAuthenticationResponseData {
    readonly responseSerialNumber: string;
    readonly responseId: string;
    readonly result: string;
}

export class JT808TerminalAuthenticationResponse implements IJT808Body<IJT808TerminalAuthenticationResponseData> {
    private readonly options: IJT808TerminalAuthenticationResponseOptions;

    constructor(options: IJT808TerminalAuthenticationResponseOptions) {
        this.options = options;
    }

    get message(): string {
        return this.responseSerialNumber + this.responseId + this.result;
    }

    get data(): IJT808TerminalAuthenticationResponseData {
        return {
            responseSerialNumber: this.responseSerialNumber,
            responseId: this.responseId,
            result: this.result,
        };
    }

    private get responseSerialNumber(): string {
        return JT808Tools.decimalToHex(this.options.responseSerialNumber, 4);
    }

    private get responseId(): string {
        return JT808Tools.decimalToHex(EJT808MessageId.TERMINAL_AUTHENTICATION, 4);
    }

    private get result(): string {
        return JT808Tools.decimalToHex(this.options.result, 2);
    }
}