module.exports = errors => {
    let errorObject = {}

    errors.forEach(e => {
        errorObject[e.path] = e.message
    })

    return errorObject
}
