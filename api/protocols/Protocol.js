exports.encaps = (messageType, code, data) => {
    let message = {};
    if (messageType === 'ERR') {
        message = {
            HttpCode: code,
            messageFrame: {
                type: 'ERR',
                message: data.message,
                info: data.info,
                ref: data.ref
            }
        }
    } else if (messageType === 'CTL') {
        message = {
            HttpCode: code,
            messageFrame: {
                type: 'CTL',
                status: data.status,
                info: data.info,
                ref: data.ref
            }
        }
    } else if (messageType === 'DATA') {
        message = {
            HttpCode: code,
            messageFrame: {
                type: 'DATA',
                status: data.status,
                data: data.data,
                ref: data.ref
            }
        }
    }
    return message;
}