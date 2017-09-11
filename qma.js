exports.whatistdee = function(event){
    event.reply(
        "TDEE(Total Daily Energy Expenditure)\n"
        +"代表的是「每日總消耗熱量」，\n"
        +"體重越重，每日需要的熱量就越高。\n"
        +"與BMR的差異在於BMR是在身體靜臥不動的條件下計算\n"
        +"而TDEE則是包含每日的運動量在其中。"         
    );
}
exports.howtoeat = function(event){
    event.reply(
        "健身需要的是營養均衡，所以主要的營養素都要均衡的攝取。\n"
        +"分成含有熱量的三大營養素分別是碳水化合物、蛋白質、脂肪，以及不含有熱量的維生素、礦物質、水。\n"
        +"最重要的是要吃得乾淨。\n"
        +"吃得乾淨就是不能有太多的醬料、添加物還有避免加工食品，\n"
        +"盡量吃沒有加工過的原形食物。"         
    );
}