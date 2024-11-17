export class TranslatorSettingModel {
    name: string;
    host: string;
    login: string;
    password: string;

    constructor(transResp: any){
        this.name = transResp.name;
        this.host = transResp.host;
        this.login = transResp.login;
        this.password = transResp.password;
    };
}