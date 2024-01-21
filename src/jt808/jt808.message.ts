import { EJT808MessageId } from "./header/jt808.header";
import { JT808MessageHeader } from "./header/jt808.message.header";
import { JT808Error } from "./jt808.error";
import { JT808Tools } from "./jt808.tools";
import { JT808TerminalRegistrationMessage } from "./terminal-management/terminal-registration/jt808.terminal-registration.message";

export type TJT808MessageBody = JT808TerminalRegistrationMessage;

export class JT808Message {
    private readonly data: string;

    constructor(data: string) {
        const deserialized = JT808Tools.deserialize(data);

        if (JT808Tools.calcCheckCode(deserialized) !== 0)
            throw new JT808Error('Invalid message.');

        this.data = deserialized;
    }

    get header(): JT808MessageHeader {
        return new JT808MessageHeader(this.data);
    }

    private get rawBody(): string {
        return this.data.slice(this.data.length - ((this.header.content.messageBodyAttributes.messageBodyLength * 2) + (1 + 1)), this.data.length - (1 + 1));
    }

    get body(): TJT808MessageBody {
        switch (this.header.content.messageId) {
            case EJT808MessageId.TERMINAL_REGISTRATION:
                return new JT808TerminalRegistrationMessage(this.rawBody);

            default:
                throw new JT808Error('Invalid message.');
        }
    }
}