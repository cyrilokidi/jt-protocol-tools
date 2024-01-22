import { EJT808MessageId, IJT808MessageBodyAttributes } from "./header/jt808.header";
import { JT808ResponseHeader } from "./header/jt808.response.header";
import { JT808Error } from "./jt808.error";
import { JT808Message } from "./jt808.message";
import { JT808Tools } from "./jt808.tools";
import { JT808TerminalAuthenticationResponse } from "./terminal-management/terminal-authentication/jt808.terminal-authentication.response";
import { JT808TerminalRegistrationResponse } from "./terminal-management/terminal-registration/jt808.terminal-registration.response";

export type TJT808Response = JT808TerminalRegistrationResponse | JT808TerminalAuthenticationResponse;

export interface IJT808Response {
    readonly message: JT808Message;
    readonly messageId: EJT808MessageId;
    readonly messageBodyLength: number;
    readonly subPackage: boolean;
    readonly messageBodyAttributes: IJT808MessageBodyAttributes;
    readonly header: JT808ResponseHeader;
    readonly body: TJT808Response;
    readonly checkCode: number;
    readonly response: string;
}

export class JT808Response implements IJT808Response {
    readonly message: JT808Message;

    constructor(message: JT808Message) {
        this.message = message;
    }

    get messageId(): EJT808MessageId {
        switch (this.message.header.content.messageId) {
            case EJT808MessageId.TERMINAL_REGISTRATION:
                return EJT808MessageId.TERMINAL_REGISTRATION_RESPONSE;

            case EJT808MessageId.TERMINAL_AUTHENTICATION:
                return EJT808MessageId.PLATFORM_GENERAL_RESPONSE;

            default:
                throw new JT808Error('Invalid message id.');;
        }
    }

    get messageBodyLength(): number {
        return JT808Tools.calcBodyLength(this.body.message) as number;
    }

    get subPackage(): boolean {
        return false;
    }

    get messageBodyAttributes(): IJT808MessageBodyAttributes {
        return {
            messageBodyLength: this.messageBodyLength,
            subPackage: this.subPackage,
        };
    }

    get header(): JT808ResponseHeader {
        return new JT808ResponseHeader({
            messageId: this.messageId,
            messageBodyAttributes: this.messageBodyAttributes,
            terminalPhoneNumber: this.message.header.content.terminalPhoneNumber,
            messageSerialNumber: this.message.header.content.messageSerialNumber,
        });
    }

    get body(): TJT808Response {
        switch (this.message.header.content.messageId) {
            case EJT808MessageId.TERMINAL_REGISTRATION:
                return new JT808TerminalRegistrationResponse({
                    terminalPhoneNumber: this.message.header.content.terminalPhoneNumber,
                    responseSerialNumber: this.message.header.content.messageSerialNumber,
                    result: 0,
                });

            case EJT808MessageId.TERMINAL_AUTHENTICATION:
                return new JT808TerminalAuthenticationResponse({
                    terminalPhoneNumber: this.message.header.content.terminalPhoneNumber,
                    responseSerialNumber: this.message.header.content.messageSerialNumber,
                    result: 0,
                });

            default:
                throw new JT808Error('Invalid message id.');
        }
    }

    get checkCode(): number {
        return JT808Tools.calcCheckCode(this.header.message + this.body.message);
    }

    get response(): string {
        return JT808Tools.serialize((this.header.message + this.body.message) + JT808Tools.decimalToHex(this.checkCode, 2));
    }
}