import { JT } from './index';
import { JT808MessageHeader } from './jt808/header/jt808.message.header';

describe("JT808", function () {
    const data = "7e02000026123456789012007d02000000010000000200ba7f0e07e4f11c0028003c00001810151010100104000000640202007d01137e";

    test("JT808 message", function () {
        const result = "02000026123456789012007e000000010000000200ba7f0e07e4f11c0028003c00001810151010100104000000640202007d13";

        expect(new JT.JT808(data).message.header).toBeInstanceOf(JT808MessageHeader);
    });
});