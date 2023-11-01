
function get_copy<T>(rhs: T) : T {
    return JSON.parse(JSON.stringify(rhs)) as T;
}
export {get_copy};