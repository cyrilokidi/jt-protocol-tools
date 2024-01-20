import { JT808Message } from "./jt808.message";

export class JT808 {
    readonly message: JT808Message;

    constructor(data: Buffer) {
        this.message = new JT808Message(data);
    }
}