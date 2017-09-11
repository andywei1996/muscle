  _custom_dict = [
	["什麼時候", 99999999, "n"],
	["脂肪量", 99999999, "adj"],
	["怎麼吃", 99999999, "n"],
	["低GI", 99999999, "n"],
	["高GI", 99999999, "n"],
	["總消耗", 99999999, "n"],
	["熱量", 99999999, "n"],
	//["健身前", 99999999, "n"],
	["減脂", 99999999, "n"],
	["吃多少", 99999999, "n"],
	["增肌", 99999999, "n"],
	["基礎代謝率", 99999999, "n"],
	["BMR", 99999999, "n"],
	["ＢＭＲ", 99999999, "n"],
	["碳水化合物", 99999999, "n"],
	["簡單碳水化合物", 99999999, "n"],
	["複雜碳水化合物", 99999999, "n"],
	["GI", 99999999, "n"],
	["TDEE", 99999999, "n"],
	["ＴＤＥＥ", 99999999, "n"]
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