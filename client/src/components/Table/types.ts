export interface ITableActions {
    label : string,
    icon: string,
    action : ()=>void
}

export interface ITableProps<T> {
    pagination : boolean,
    sorting : boolean,
    sortableColumns : Array<string>,
    actions : Array<ITableActions>
    multiselection : boolean,
    data : Array<T>
    multiSelectionSetter : (entry : T, checkStatus : boolean)=>void
}