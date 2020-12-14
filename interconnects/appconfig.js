let apps = {};

apps['vsgahfa743vfgsahjg'] = {
    config:
    {
        appName: "Remosi Web Authetication",
        appStatus: true,
        database: "remosi-users"
    }
}

exports.getAppConfig = (appKey) => {
    return apps[appKey];
}
exports.inject = (req, res, next) => {
    if ((req.header('appKey') === undefined) || (apps[req.header('appKey')] === undefined)) {
        next({
            code: 400,
            message: 'Invalid app key!',
            ref: 'APPCONFIG'
        });
    } else {
        req.config = apps[req.header('appKey')];
        next();
    }
}