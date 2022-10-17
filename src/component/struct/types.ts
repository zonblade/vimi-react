import { US_projectListState } from "./interface";

type T_dataQuery<S>=(
    uri:S,
    sortDate:S
)=>US_projectListState[];

export type {
    T_dataQuery
}