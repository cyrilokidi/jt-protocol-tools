import { JT808Message } from "./jt808.message";

export interface IJT808 {
    readonly message: JT808Message;
}

export default class JT808 implements IJT808 {
    readonly message: JT808Message;

    constructor(data: string) {
        this.message = new JT808Message(data);
    }
}