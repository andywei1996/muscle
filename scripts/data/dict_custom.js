_custom_dict = [
	["大雞雞", 99999999, "adj"],["怎麼吃", 99999999, "n"],["吃什麼", 99999999, "n"],["吃什麼", 99999999, "n"]
];

// 引用設定檔案，以下不用變更
if (typeof(define) === "function") {
    define(function (require) {
        return _custom_dict;
    });
}
else {
    module.exports = _custom_dict;
}