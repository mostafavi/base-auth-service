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