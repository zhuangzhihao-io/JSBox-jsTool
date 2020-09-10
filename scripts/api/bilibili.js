let _BILIURL = require("./bilibili/api_url.js").BILIBILI,
    _urlCheck = require("./urlCheck.js"),
    _AVBV = require("./bilibili/av_bv.js"),
    _CHECKIN = require("./bilibili/check_in.js"),
    _GIFT = require("./bilibili/gift.js"),
    _LIVE = require("./bilibili/live.js"),
    _USER = require("./bilibili/user.js"),
    _VIDEO = require("./bilibili/video.js"),
    _ACCOUNTS = require("./bilibili/accounts.js");

let DEBUG_DEFAULT = {
    BVID: "BV17x411w7KC",
    VID: "90035938",
    VIDEO_LINK: _BILIURL.B23_TV_VIDEO + "90035938"
};

module.exports = {
    checkAccessKey: _USER.isLogin,
    checkBiliUrl: _urlCheck.isBilibiliVideoUrl,
    DEBUG_DEFAULT,
    getAccessKey: _USER.getAccessKey,
    getAccessKeyByUid: _ACCOUNTS.getAccessKey,
    getAccessKeyList: _ACCOUNTS.getAccessKeyList,
    getAv: _AVBV.getAv,
    getAvOnline: _AVBV.getAvOnline,
    getBv: _AVBV.getBv,
    getBvOnline: _AVBV.getBvOnline,
    getCoverFromGalmoe: _VIDEO.getCoverFromGalmoe,
    getFansMedalList: _LIVE.getFansMedalList,
    getLiveGiftList: _GIFT.getLiveGiftList,
    getLiveroomInfo: _LIVE.getLiveroomInfo,
    getMyInfo: _USER.getMyInfo,
    getOfflineLiver: _LIVE.getOfflineLiver,
    getOnlineLiver: _LIVE.getOnlineLiver,
    getUidList: _ACCOUNTS.getUidList,
    getUserInfo: _USER.getUserInfo,
    getVideo: _VIDEO.getVideo,
    getVideoData: _VIDEO.getVideoData,
    getVideoInfo: _VIDEO.getVideoInfo,
    getVidFromUrl: _VIDEO.getVidFromUrl,
    getWallet: _LIVE.getWallet,
    isLogin: _USER.isLogin,
    laterToWatch: _VIDEO.laterToWatch,
    mangaCheckin: _CHECKIN.mangaCheckin,
    mangaClockin: _CHECKIN.mangaCheckin,
    openLiveDanmuku: _LIVE.openLiveDanmuku,
    removeLoginData: _USER.removeLoginCache,
    saveAccessKey: _USER.setAccessKey,
    vipCheckin: _CHECKIN.vipCheckin
};