import { JT808Message } from "./jt808.message";
import { JT808Response } from "./jt808.response";

export default class JT808 {
    readonly message: JT808Message;

    constructor(data: string) {
        this.message = new JT808Message(data);
    }

    get response(): JT808Response {
        return new JT808Response(this.message);
    }
}