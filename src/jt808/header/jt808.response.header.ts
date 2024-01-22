import { JT808Tools } from "../jt808.tools";
import { EJT808DataEncryptionWay, IJT808Header, EJT808HeaderContentFieldWordCount, EJT808MessageBodyAttributesFieldWordCount, EJT808MessageId, IJT808MessageBodyAttributes } from "./jt808.header";

export interface IJT808ResponseHeaderContent {
    readonly messageId: string;
    readonly messageBodyAttributes: string;
    readonly terminalPhoneNumber: string;
    readonly messageSerialNumber: string;
}

export interface IJT808ResponseHeaderOptions {
    readonly messageId: EJT808MessageId;
    readonly messageBodyAttributes: IJT808MessageBodyAttributes;
    readonly terminalPhoneNumber: string;
    readonly messageSerialNumber: number;
}

export class JT808ResponseHeader implements IJT808Header<IJT808ResponseHeaderContent> {
    private readonly options: IJT808ResponseHeaderOptions;

    constructor(options: IJT808ResponseHeaderOptions) {
        this.options = options;
    }

    get content(): IJT808ResponseHeaderContent {
        return {
            messageId: this.messageId,
            messageBodyAttributes: this.messageBodyAttributes,
            terminalPhoneNumber: this.terminalPhoneNumber,
            messageSerialNumber: this.messageSerialNumber,
        }
    }

    get message(): string {
        return this.messageId + this.messageBodyAttributes + this.terminalPhoneNumber + this.messageSerialNumber;
    }

    private get messageId(): string {
        return JT808Tools.decimalToHex(this.options.messageId, EJT808HeaderContentFieldWordCount.MESSAGE_ID);
    }

    private get messageBodyAttributes(): string {
        return JT808Tools.binaryToHexadecimal(this.reserve + this.subPackage + this.dataEncryptionWay + this.messageBodyLength, EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES);
    }

    private get reserve(): string {
        return '00';
    }

    private get subPackage(): string {
        return this.options.messageBodyAttributes.subPackage ? JT808Tools.decimalToBinary(1) : JT808Tools.decimalToBinary(0);
    }

    private get dataEncryptionWay(): string {
        switch (this.options.messageBodyAttributes.dataEncryptionWay) {
            case EJT808DataEncryptionWay.RSA:
                return '001';

            default:
                return '000';
        }
    }

    private get messageBodyLength(): string {
        return JT808Tools.hexToBinary(JT808Tools.decimalToHex(this.options.messageBodyAttributes.messageBodyLength, 4), EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH)
    }

    private get terminalPhoneNumber(): string {
        return this.options.terminalPhoneNumber;
    }

    private get messageSerialNumber(): string {
        return JT808Tools.decimalToHex(this.options.messageSerialNumber + 1, EJT808HeaderContentFieldWordCount.MESSAGE_SERIAL_NUMBER);
    }
}