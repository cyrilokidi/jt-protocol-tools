export enum EJT808EscapeCharacter {
    ['7e'] = '7e',
    ['7d'] = '7d',
    ['7d01'] = '7d01',
    ['7d02'] = '7d02',
}

export class JT808Tools {
    static deserialize(data: string): string {
        let result = "";

        const message = data
            .replace(/FLAGBIT/, "")
            .split("")
            .filter((_, i, a) => ((i > 1) && (i < a.length - (1 + 1))));

        for (let i = 0; i < message.length; i++) {
            if (message.slice(i, i + EJT808EscapeCharacter['7d01'].length).join("") === EJT808EscapeCharacter['7d01']) {
                result += EJT808EscapeCharacter['7d'];
                i += EJT808EscapeCharacter['7d01'].length - 1;
            } else if (message.slice(i, i + EJT808EscapeCharacter['7d02'].length).join("") === EJT808EscapeCharacter['7d02']) {
                result += EJT808EscapeCharacter['7e'];
                i += EJT808EscapeCharacter['7d02'].length - 1;
            } else result += message[i];
        }

        return result;
    }

    static calcCheckCode(message: any): number {
        const byteArray = message.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16));

        let checkCode = byteArray[0];

        for (let i = 1; i < byteArray.length; i++) {
            checkCode ^= byteArray[i];
        }

        return checkCode;
    }

    static hexToDecimal(data: string): number {
        return parseInt(data, 16);
    }

    static hexToBinary(data: string, padding: number): string {
        return (parseInt(data, 16).toString(2)).padStart(padding, '0');
    }

    static binaryToDecimal(data: string): number {
        return parseInt(data, 2);
    }

    static decimalToHex(data: number, padding: number): string {
        return data.toString(16).padStart(padding, '0');
    }

    static binaryToHexadecimal(data: string, padding: number): string {
        return (parseInt(data, 2).toString(16)).padStart(padding, '0');
    }

    static decimalToBinary(data: number): string {
        return data.toString(2);
    }
}