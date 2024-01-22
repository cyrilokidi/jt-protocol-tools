import { JT808Tools } from "../jt808.tools";
import { EJT808DataEncryptionWay, EJT808HeaderContentFieldWordCount, EJT808MessageBodyAttributesFieldWordCount, EJT808MessageId, IJT808Header, IJT808MessageBodyAttributes } from "./jt808.header";

export interface IJT808MessageHeaderContent {
    readonly messageId: EJT808MessageId;
    readonly messageBodyAttributes: IJT808MessageBodyAttributes;
    readonly terminalPhoneNumber: string;
    readonly messageSerialNumber: number;
}

export class JT808MessageHeader implements IJT808Header<IJT808MessageHeaderContent> {
    readonly message: string;

    constructor(message: string) {
        this.message = message.slice(0, (EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES + EJT808HeaderContentFieldWordCount.TERMINAL_PHONE_NUMBER + EJT808HeaderContentFieldWordCount.MESSAGE_SERIAL_NUMBER));
    }

    get content(): IJT808MessageHeaderContent {
        return {
            messageId: this.messageId,
            messageBodyAttributes: {
                messageBodyLength: this.messageBodyLength,
                dataEncryptionWay: this.dataEncryptionWay,
                subPackage: this.subPackage,
            },
            terminalPhoneNumber: this.terminalPhoneNumber,
            messageSerialNumber: this.messageSerialNumber,
        }
    }

    private get messageId(): EJT808MessageId {
        return JT808Tools.hexToDecimal(this.message.slice(0, EJT808HeaderContentFieldWordCount.MESSAGE_ID))
    }

    private get messageBodyAttributes(): string {
        return JT808Tools.hexToBinary(this.message.slice(EJT808HeaderContentFieldWordCount.MESSAGE_ID, (EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES)), (EJT808MessageBodyAttributesFieldWordCount.RESERVE + EJT808MessageBodyAttributesFieldWordCount.SUB_PACKAGE + EJT808MessageBodyAttributesFieldWordCount.DATA_ENCRYPTION_WAY + EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH));
    }

    private get messageBodyLength(): number {
        return JT808Tools.binaryToDecimal(this.messageBodyAttributes.slice(this.messageBodyAttributes.length - EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH, this.messageBodyAttributes.length))
    }

    private get dataEncryptionWay(): EJT808DataEncryptionWay | undefined {
        switch (this.messageBodyAttributes.slice(this.messageBodyAttributes.length - (EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH + EJT808MessageBodyAttributesFieldWordCount.DATA_ENCRYPTION_WAY), this.messageBodyAttributes.length - EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH)) {
            case '001':
                return EJT808DataEncryptionWay.RSA;

            default:
                return;
        }
    }

    private get subPackage(): boolean {
        return Boolean(Number(this.messageBodyAttributes.slice(this.messageBodyAttributes.length - (EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH + EJT808MessageBodyAttributesFieldWordCount.DATA_ENCRYPTION_WAY + EJT808MessageBodyAttributesFieldWordCount.SUB_PACKAGE), this.messageBodyAttributes.length - (EJT808MessageBodyAttributesFieldWordCount.MESSAGE_BODY_LENGTH + EJT808MessageBodyAttributesFieldWordCount.DATA_ENCRYPTION_WAY))));
    }

    private get terminalPhoneNumber(): string {
        return this.message.slice((EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES), (EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES + EJT808HeaderContentFieldWordCount.TERMINAL_PHONE_NUMBER))
    }

    private get messageSerialNumber(): number {
        return JT808Tools.hexToDecimal(this.message.slice((EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES + EJT808HeaderContentFieldWordCount.TERMINAL_PHONE_NUMBER), (EJT808HeaderContentFieldWordCount.MESSAGE_ID + EJT808HeaderContentFieldWordCount.MESSAGE_BODY_ATTRIBUTES + EJT808HeaderContentFieldWordCount.TERMINAL_PHONE_NUMBER + EJT808HeaderContentFieldWordCount.MESSAGE_SERIAL_NUMBER)))
    }
}