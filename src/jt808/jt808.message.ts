import { JT808MessageHeader } from "./header/jt808.message.header";
import { JT808Error } from "./jt808.error";
import { JT808Tools } from "./jt808.tools";

export interface IJT808MessageHeader {
    readonly header: JT808MessageHeader;
}

export class JT808Message implements IJT808MessageHeader {
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
}