export enum EJT808MessageId {
    PLATFORM_GENERAL_RESPONSE = 32769,
    TERMINAL_REGISTRATION = 256,
    TERMINAL_AUTHENTICATION = 258,
    TERMINAL_REGISTRATION_RESPONSE = 33024,
    LOCATION_INFORMATION_REPORT = 512,
}

export enum EJT808MessageBodyAttributesFieldWordCount {
    MESSAGE_BODY_LENGTH = 10,
    DATA_ENCRYPTION_WAY = 3,
    SUB_PACKAGE = 1,
    RESERVE = 2,
}

export enum EJT808DataEncryptionWay {
    RSA = 'RSA',
}

export interface IJT808MessageBodyAttributes {
    readonly messageBodyLength: number;
    readonly dataEncryptionWay?: EJT808DataEncryptionWay;
    readonly subPackage: boolean;
}

export enum EJT808HeaderContentFieldWordCount {
    MESSAGE_ID = 4,
    MESSAGE_BODY_ATTRIBUTES = 4,
    TERMINAL_PHONE_NUMBER = 12,
    MESSAGE_SERIAL_NUMBER = 4,
}

export interface IJT808Header<TContent> {
    readonly content: TContent;
    readonly message: string;
}