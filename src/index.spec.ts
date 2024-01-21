import { JT } from './index';
import { JT808MessageHeader } from './jt808/header/jt808.message.header';

describe("JT808", function () {
    const data = "7e0100002c202203100001000000000000000074730000004d5630340000000000000000000000000000000033313030303031014b43443737374b277e";

    test("JT808 message", function () {
        const result = "7e8100001120220310000100010000003833323032323033313030303000ba7e";

        expect(new JT.JT808(data).message.header).toBeInstanceOf(JT808MessageHeader);

        new JT.JT808(data).message.body;
    });
});