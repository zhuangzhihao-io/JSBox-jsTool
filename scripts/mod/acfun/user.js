class Auth {
    constructor() {}
    loginBySetting() {
        const prefId = {
            id: "mod.acfun.auth.login.id",
            password: "mod.acfun.auth.login.password"
        };
        const _acfunLogin = {
            uid: $prefs.get(prefId.id) || "",
            password: $prefs.get(prefId.password) || ""
        };
        $console.info(_acfunLogin);
        if (_acfunLogin.uid && _acfunLogin.password) {
            $prefs.set(prefId.id, undefined);
            $prefs.set(prefId.password, undefined);
            this.login(_acfunLogin.uid, _acfunLogin.password);
        } else {
            $ui.alert({
                title: "Acfun登录失败",
                message: "请确保账号密码已设置",
                actions: [{
                    title: "关闭",
                    disabled: false,
                    handler: function () {}
                }]
            });
        }
    }
    async login(login_id, password) {
        $ui.loading(true);
        const $Local = require("./local_data"),
            $LoginData = new $Local.Login(),
            $Api = require("./api").API_USER,
            $Common = require("./common"),
            postBody = {
                username: login_id,
                password: password
            };
        const httpPost = await $Common.postAwait(
            $Api.LOGIN,
            postBody,
            $Common.HEADERS
        );
        $ui.loading(false);
        if (httpPost.error) {
            $console.error(httpPost.error);
        } else {
            const httpData = httpPost.data;
            $console.info(httpData);
            if (httpData.result == 0) {
                if (httpData.result == 0) {
                    $ui.alert({
                        title: "登录结果",
                        message: JSON.stringify(httpData)
                    });
                    $LoginData.saveLoginData(httpData);
                } else {
                    $ui.alert({
                        title: `错误${httpData.result}`,
                        message: httpData.error_msg,
                    });
                }
            } else {
                $ui.alert({
                    title: "登录失败",
                    message: httpData.error_msg
                });
            }
        }
    }

}
class Daily {
    checkIn = async () => {
        $ui.loading(true);
        const $localData = require("./local_data"),
            $Api = require("./api").API_USER,
            $Common = require("./common"),
            $LoginData = new $localData.Login(),
            userData = $LoginData.loadLoginData(),
            _acPassToken = userData.acPassToken,
            _auth_key = userData.acPassToken;
        const headers = $Common.HEADERS;
        headers["Cookie"] = `acPasstoken=${_acPassToken};`;
        // headers["Cookie"] = `acPasstoken=${_acPassToken};auth_key=${_auth_key}`;
        const result = await $Common.getAwait(_ACFUN.SIGN_IN, headers);
        $console.info(result);
        if (result.error) {
            $ui.loading(false);
            $ui.alert({
                title: "签到发生错误",
                message: result.error.message,
                actions: [{
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                }]
            });
        } else {
            const signinResult = result.data;
            if (signinResult) {
                $ui.loading(false);
                signinResult.result == 0 ?
                    $ui.alert({
                        title: "签到成功",
                        message: signinResult.msg
                    }) :
                    $ui.alert({
                        title: `错误代码${signinResult.result}`,
                        message: signinResult.msg ?
                            signinResult.msg : signinResult.error_msg
                    });
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: "签到失败",
                    message: result,
                    actions: [{
                        title: "OK",
                        disabled: false, // Optional
                        handler: function () {}
                    }]
                });
            }
        }
    };
    dailyCheckIn = () => {
        this.checkIn();
    };
}
module.exports = {
    Auth,
    Daily
};