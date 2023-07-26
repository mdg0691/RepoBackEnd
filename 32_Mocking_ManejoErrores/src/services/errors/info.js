export const generateUserErrorInfo = (user) =>{
    return`One or more properties were incomplete or not valid.
    List of required properties:
    *first_name: need to be a string, received ${user.first_name}
    *last_name: need to be a string, received ${user.last_name}
    *email: need to be a string, received ${user.email}`
}