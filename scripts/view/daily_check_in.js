let acfun = require("../api/acfun.js"),
    bilibili = require("../api/bilibili.js"),
    _BILI = require("../api/bilibili/check_in.js");
let initView = () => {
    $ui.push({
        props: {
            title: "每日签到"
        },
        views: [{
            type: "list",
            props: {
                data: ["Acfun", "Bilibili漫画", "Bilibili银瓜子兑换硬币"]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (sender, indexPath, data) {
                    let row = indexPath.row;
                    switch (row) {
                        case 0:
                            acfun.signIn();
                            break;
                        case 1:
                            _BILI.mangaClockin();
                            break;
                        case 2:
                            _BILI.getWallet();
                            break;
                        default:
                            $ui.error("暂不支持该功能");
                    }
                }
            }
        }]
    });
};
module.exports = {
    initView
};