import { JT808Message } from "./jt808.message";

export default class JT808 {
    readonly message: JT808Message;

    constructor(data: string) {
        this.message = new JT808Message(data);
    }
}