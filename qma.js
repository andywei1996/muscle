exports.whatistdee = function(event){
    event.reply(
        "TDEE(Total Daily Energy Expenditure)\n"
        +"代表的是「每日總消耗熱量」，\n"
        +"體重越重，每日需要的熱量就越高。\n"
        +"與BMR的差異在於BMR是在身體靜臥不動的條件下計算\n"
        +"而TDEE則是包含每日的運動量在其中。"         
    );
}
exports.whatisprotein = function(event){
    event.reply(
        "蛋白質是身體構造的必要組成成分。\n"
        +"不論你想要進行增肌或是減脂，都一定要攝取足夠的蛋白質去修復肌肉。\n"
        +"蛋白質1公克含有4大卡的熱量。\n"
        +"攝取方面可以選擇瘦牛肉、魚(鮭魚)、雞胸肉，\n"
        +"也可以使用乳清蛋白、脫脂牛奶或是低脂肪的奶酪。"         
    );
}
exports.whatisCarbohydrates = function(event){
    event.reply(
        "碳水化合物是身體主要的能源來源，主要分為簡單碳水化合物和複合碳水化合物。\n"
        +"不同的碳水化合物對血糖的影響都是不一樣的，通常會使用GI值去進行評估，1公克含有4大卡熱量。"         
    );
}
exports.whatisSimpleCarbohydrates = function(event){
    event.reply(
        "簡單碳水就是單純的葡萄糖、果糖、蔗糖及乳糖及其它糖類等等。\n"
        +"因為經過加工以及精製，其纖維質、維生素與礦物質都被去除，只剩下簡單的醣類，例如:白麵包、零食餅乾、糖果以及含有糖分的飲料。"
    );
}
exports.whatisComplexCarbohydrates = function(event){
    event.reply(
        "複合碳水化合物則含有需要更多時間消化的澱粉，以及難以消化的膳食纖維等等。\n"
        +"可以減少血糖的驟升與驟降。如燕麥片、全麥麵包、小麥麵食、番薯…等。"
    );
}
exports.whatisGI = function(event){
    event.reply(
        "GI(Glycaemic index) 升糖指數，用來評估碳水化合物影響血糖濃度的指數。\n"
        +"低GI的食物對血糖的影響較為緩慢，被認為對健康有較多的益處。\n"
        +"但是不論GI高低，都是有熱量的，不能夠認為低GI的食物大量食用不會使體重上升！"
    );
}



//HOW
exports.howtoeat = function(event){
    event.reply(
        "健身需要的是營養均衡，所以主要的營養素都要均衡的攝取。\n"
        +"分成含有熱量的三大營養素分別是碳水化合物、蛋白質、脂肪，以及不含有熱量的維生素、礦物質、水。\n"
        +"最重要的是要吃得乾淨。\n"
        +"吃得乾淨就是不能有太多的醬料、添加物還有避免加工食品，\n"
        +"盡量吃沒有加工過的原形食物。"         
    );
}