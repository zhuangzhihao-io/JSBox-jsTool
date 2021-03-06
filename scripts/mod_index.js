let modDir = "/scripts/mod/",
    loadModJson = () => {
        const modJson = $file.read(`${modDir}mod.json`).string;
        if (modJson) {
            try {
                return JSON.parse(modJson);
            } catch (error) {
                $console.error("loadModJson:failed");
                $console.error(error);
                return undefined;
            }
        } else {
            return undefined;
        }
    },
    loadMod = modName => {
        return require(`${modDir}${modName}`);
    },
    initMod = modName => {
        let fileName = `${modDir}${modName}`;
        if (!fileName.endsWith(".js")) {
            fileName += ".js";
        }
        if ($file.exists(fileName)) {
            if ($file.isDirectory(fileName)) {
                $ui.error("这是目录");
            } else {
                const modData = require(fileName);
                if (modData) {
                    try {
                        modData.init();
                        $console.info(`Mod加载完毕:${modName}`);
                    } catch (error) {
                        $ui.alert({
                            title: `${modName}加载失败`,
                            message: error.message,
                            actions: [
                                {
                                    title: "OK",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }
                            ]
                        });
                    }
                } else {
                    $ui.error("请确认是否为mod文件");
                }
            }
        } else {
            $ui.error("不存在该文件");
        }
    },
    getModList = () => {
        let modList = [],
            fileList = $file.list(modDir);
        fileList.sort();
        fileList.map(f => {
            if (!$file.isDirectory(f)) {
                if (f.endsWith(".js")) {
                    modList.push(f);
                }
            }
        });
        return modList;
    },
    showModList = () => {
        let modList = getModList(),
            modJson = loadModJson(),
            modJsonObj = {},
            pinModList = [],
            otherModList = [];
        if (modJson) {
            modJson.map(mod => (modJsonObj[mod.file] = mod));
        }
        $console.info(modJsonObj);
        if (modList) {
            if (modList.length > 0) {
                modList.map(mod => {
                    modJsonObj[mod]
                        ? pinModList.push(mod)
                        : otherModList.push(mod);
                });
                $ui.push({
                    props: {
                        title: "Mod列表"
                    },
                    views: [
                        {
                            type: "list",
                            props: {
                                data: [
                                    {
                                        title: "常用Mod",
                                        rows: pinModList.map(
                                            mod => modJsonObj[mod].name
                                        )
                                    },
                                    {
                                        title: "其他Mod",
                                        rows: otherModList
                                    }
                                ]
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (
                                    _sender,
                                    indexPath,
                                    _data
                                ) {
                                    const section = indexPath.section;
                                    const row = indexPath.row;
                                    $console.info(_data);
                                    initMod(
                                        section === 0
                                            ? pinModList[row]
                                            : otherModList[row]
                                    );
                                }
                            }
                        }
                    ]
                });
            } else {
                $ui.alert({
                    title: "Mod列表",
                    message: "空白",
                    actions: [
                        {
                            title: "OK",
                            disabled: false, // Optional
                            handler: function () {}
                        }
                    ]
                });
            }
        } else {
            $ui.error("返回错误列表");
        }
    };
module.exports = {
    loadMod,
    initMod,
    getModList,
    showModList
};
