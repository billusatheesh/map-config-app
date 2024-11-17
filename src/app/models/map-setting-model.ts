import { IInputFileModel } from "./IInputFileModel";

export interface MapSettingModel {
    id?: number,
    type?: string,
    direction?: string,
    translationObj?: string,
    desc?: string,
    inputFiles?: IInputFileModel[]
}
