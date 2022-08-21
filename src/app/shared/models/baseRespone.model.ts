import { BaseModel } from "./baseModel.model";

export interface BaseResponse<T extends BaseModel> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}