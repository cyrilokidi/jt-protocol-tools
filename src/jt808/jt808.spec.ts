import JT808 from "./jt808";

describe("JT808", function () {

    test("Terminal registration", function () {
        const data = "7e0100002c202203100001000000000000000074730000004d5630340000000000000000000000000000000033313030303031014b43443737374b277e";
        const result = "7e8100000f20220310000100000000003230323230333130303030319f7e";

        expect(new JT808(data).response.response).toBe(result);
    });
});