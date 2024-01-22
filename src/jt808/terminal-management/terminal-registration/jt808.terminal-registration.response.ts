import { IJT808Body } from "../../jt808.body";
import { JT808Tools } from "../../jt808.tools";

export interface IJT808TerminalRegistrationResponseOptions {
    readonly terminalPhoneNumber: string;
    readonly responseSerialNumber: number;
    readonly result: 0 | 1 | 2 | 3 | 4;
}

export interface IJT808TerminalRegistrationResponseData {
    readonly responseSerialNumber: string;
    readonly result: string;
    readonly authenticationCode: string;
}

export class JT808TerminalRegistrationResponse implements IJT808Body<IJT808TerminalRegistrationResponseData> {
    private readonly options: IJT808TerminalRegistrationResponseOptions;

    constructor(options: IJT808TerminalRegistrationResponseOptions) {
        this.options = options;
    }

    get message(): string {
        return this.responseSerialNumber + this.result + this.authenticationCode;
    }

    get data(): IJT808TerminalRegistrationResponseData {
        return {
            responseSerialNumber: this.responseSerialNumber,
            result: this.result,
            authenticationCode: this.authenticationCode,
        }
    }

    private get responseSerialNumber(): string {
        return JT808Tools.decimalToHex(this.options.responseSerialNumber, 4);
    }

    private get result(): string {
        return JT808Tools.decimalToHex(this.options.result, 2);
    }

    // private get authenticationCode(): string {
    //     return JT808Tools.textToHex('83' + Number(this.options.terminalPhoneNumber.slice(0, this.options.terminalPhoneNumber.length - 1))) + '00';
    // }

    private get authenticationCode(): string {
        return JT808Tools.textToHex(this.options.terminalPhoneNumber);
    }
}