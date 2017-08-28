  _custom_dict = [
	["脂肪量", 99999999, "adj"],
	["怎麼吃", 99999999, "n"],
	["吃什麼", 99999999, "n"],
	["吃什麼", 99999999, "n"],
	["總消耗熱量", 99999999, "n"],
	["健身前", 99999999, "n"],
	["減脂", 99999999, "n"],
	["吃多少", 99999999, "n"],
	["增肌", 99999999, "n"]
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