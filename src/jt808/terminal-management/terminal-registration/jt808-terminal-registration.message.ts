import { IJT808Body } from "../../jt808.body";
import { JT808Tools } from "../../jt808.tools";

export enum EJT808TerminalRegistrationDataFieldWordCount {
    PROVINCE_DOMAIN_ID = 4,
    CITY_AND_COUNTY_DOMAIN_ID = 4,
    MANUFACTURER_ID = 10,
    TERMINAL_TYPE = 40,
    TERMINAL_ID = 14,
    LICENCE_PLATE_COLOR = 2,
}

export interface IJT808TerminalRegistrationMessageData {
    readonly provinceDomainId: number;
    readonly cityAndCountyDomainId: number;
    readonly manufacturerId: string;
    readonly terminalType: string;
    readonly terminalId: string;
    readonly licencePlateColor: string;
    readonly vehicleIdentificationNumber: string;
}

export class JT808TerminalRegistrationMessage implements IJT808Body<IJT808TerminalRegistrationMessageData> {
    readonly message: string;

    constructor(message: string) {
        this.message = message;
    }

    get data(): IJT808TerminalRegistrationMessageData {
        return {
            provinceDomainId: this.provinceDomainId,
            cityAndCountyDomainId: this.cityAndCountyDomainId,
            manufacturerId: this.manufacturerId,
            terminalType: this.terminalType,
            terminalId: this.terminalId,
            licencePlateColor: this.licencePlateColor,
            vehicleIdentificationNumber: this.vehicleIdentificationNumber,
        }
    }

    private get provinceDomainId(): number {
        return JT808Tools.hexToDecimal(this.message.slice(0, EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID));
    }

    private get cityAndCountyDomainId(): number {
        return JT808Tools.hexToDecimal(this.message.slice(EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID, (EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID)));
    }

    private get manufacturerId(): string {
        return this.message.slice((EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID), (EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID));
    }

    private get terminalType(): string {
        return this.message.slice((EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID), (EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE));
    }

    private get terminalId(): string {
        return this.message.slice((EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE), (EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_ID));
    }

    private get licencePlateColor(): string {
        return this.message.slice((EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_ID), (EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_ID + EJT808TerminalRegistrationDataFieldWordCount.LICENCE_PLATE_COLOR));
    }

    private get vehicleIdentificationNumber(): string {
        return this.message.slice(EJT808TerminalRegistrationDataFieldWordCount.PROVINCE_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.CITY_AND_COUNTY_DOMAIN_ID + EJT808TerminalRegistrationDataFieldWordCount.MANUFACTURER_ID + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_TYPE + EJT808TerminalRegistrationDataFieldWordCount.TERMINAL_ID + EJT808TerminalRegistrationDataFieldWordCount.LICENCE_PLATE_COLOR);
    }
}