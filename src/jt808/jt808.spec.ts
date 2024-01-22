import JT808 from "./jt808";
import { JT808Message } from "./jt808.message";

describe("JT808", function () {
    const data = "7e0100002c202203100001000000000000000074730000004d5630340000000000000000000000000000000033313030303031014b43443737374b277e";

    test("Terminal registration", function () {
        const result = "7e8100001120220310000100010000003833323032323033313030303000ba7e";
        const { message, response } = new JT808(data);

        expect(message).toBeInstanceOf(JT808Message);

        console.log("response: ", response.response);

    });
});