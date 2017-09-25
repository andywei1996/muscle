exports.whatistdee = function(event){
    event.reply(
        "TDEE(Total Daily Energy Expenditure)\n"
        +"代表的是「每日總消耗熱量」，\n"
        +"體重越重，每日需要的熱量就越高。\n"
        +"與BMR的差異在於BMR是在身體靜臥不動的條件下計算\n"
        +"而TDEE則是包含每日的運動量在其中。"         
    );
}
//蛋白質
exports.whatisprotein = function(event){
    event.reply(
        "蛋白質是身體構造的必要組成成分。\n"
        +"不論你想要進行增肌或是減脂，都一定要攝取足夠的蛋白質去修復肌肉。\n"
        +"蛋白質1公克含有4大卡的熱量。\n"
        +"攝取方面可以選擇瘦牛肉、魚(鮭魚)、雞胸肉，\n"
        +"也可以使用乳清蛋白、脫脂牛奶或是低脂肪的奶酪。"         
    );
}
//碳水化合物
exports.whatisCarbohydrates = function(event){
    event.reply(
        "碳水化合物是身體主要的能源來源，主要分為簡單碳水化合物和複合碳水化合物。\n"
        +"不同的碳水化合物對血糖的影響都是不一樣的，通常會使用GI值去進行評估，1公克含有4大卡熱量。"         
    );
}
//簡單碳水化合物
exports.whatisSimpleCarbohydrates = function(event){
    event.reply(
        "簡單碳水化合物就是單純的葡萄糖、果糖、蔗糖及乳糖及其它糖類等等。\n"
        +"因為經過加工以及精製，其纖維質、維生素與礦物質都被去除，只剩下簡單的醣類，例如:白麵包、零食餅乾、糖果以及含有糖分的飲料。"
    );
}
//複雜碳水化合物
exports.whatisComplexCarbohydrates = function(event){
    event.reply(
        "複合碳水化合物則含有需要更多時間消化的澱粉，以及難以消化的膳食纖維等等。\n"
        +"可以減少血糖的驟升與驟降。如燕麥片、全麥麵包、小麥麵食、番薯…等。"
    );
}
//升糖指數GI
exports.whatisGI = function(event){
    event.reply(
        "GI(Glycaemic index) 升糖指數，用來評估碳水化合物影響血糖濃度的指數。\n"
        +"低GI的食物對血糖的影響較為緩慢，被認為對健康有較多的益處。\n"
        +"但是不論GI高低，都是有熱量的，不能夠認為低GI的食物大量食用不會使體重上升！"
    );
}
//脂肪
exports.whatisFat = function(event){
    event.reply(
        "脂肪是不可少的，健康的脂肪食物更是有許多功用，像是大腦和心臟活動、激素調節和能量來源，都是靠脂肪來供應。\n"
        +"主要分成在肉類以及動物副產品如奶油以及豬油中的飽和脂肪酸，以及在油質魚、蔬菜和堅果油中的不飽和脂肪酸，後者擁有較高的營養價值，1公克含有9大卡熱量。"
    );
}


//WHEN...?
//何時吃
exports.whentoEat = function(event){
    event.reply(
        "不論是健身前還是健身後都應該補充營養，\n"
        +"如此一來身體才有足夠的能源去訓練以及修復肌肉。"
    );
}
//鍛鍊前吃
exports.eatbftrain = function(event){
    event.reply(
        "應該讓身體有時間消化以及把食物轉換成能量，如果時間足夠讓身體有兩個小時去消化，那是最讚的。\n"
        +"但如果時間不多的話，可以選高GI的食物，比較容易消化以及吸收。"
    );
}
//鍛鍊後吃
exports.eatafttrain = function(event){
    event.reply(
        "健身後需要補充足夠的蛋白質以及碳水化合物，以補充身體在訓練過程中的損耗。\n"
        +"如果能在健身後半小時內補充的話是最好，因為重量訓練後身體的各項激素水平都處於高峰，正是攝取營養來合成肌肉的好時機。"
    );
}

//HOW to...?
exports.howtoeat = function(event){
    event.reply(
        "健身需要的是營養均衡，所以主要的營養素都要均衡的攝取。\n"
        +"分成含有熱量的三大營養素分別是碳水化合物、蛋白質、脂肪，以及不含有熱量的維生素、礦物質、水。\n"
        +"最重要的是要吃得乾淨。\n"
        +"吃得乾淨就是不能有太多的醬料、添加物還有避免加工食品，\n"
        +"盡量吃沒有加工過的原形食物。"         
    );
}
exports.dietctrl = function(event){
    var msg = {
        "type": "template",
        "altText": "減脂時期或者增肌時期的飲食控制方式並不相同喲！請問您目前處於哪一個時期呢？",
        "template": {
            "type": "buttons",
            "text": "減脂時期或者增肌時期的飲食控制方式並不相同喲！請問您目前處於哪一個時期呢？",
            "actions": [
                {
                  "type": "message",
                  "label": "減脂",
                  "text": "減脂期如何控制飲食呢？"
                },
                {
                    "type": "message",
                    "label": "增肌",
                    "text": "增肌期如何控制飲食呢？"
                }
            ]
        }
    }
    event.reply(msg);
}
exports.dietctrlforlessfat = function(event){
    var msg = {
        "type": "template",
        "altText": "減脂時期的飲食控制共有蛋白質、熱量、營養素控管三個面向，您想詢問哪一個呢？",
        "template": {
            "type": "buttons",
            "text": "減脂時期的飲食控制共有三個面向，您想詢問哪一個呢？",
            "actions": [
                {
                  "type": "message",
                  "label": "蛋白質控制",
                  "text": "蛋白質控制"
                },
                {
                    "type": "message",
                    "label": "熱量控制",
                    "text": "熱量控制"
                },
                {
                    "type": "message",
                    "label": "營養素控制",
                    "text": "營養素控制"
                }
            ]
        }
      }
    event.reply(msg);
}
exports.dietforlessfat_protein = function(event){
    event.reply(
        "為了避免在減脂時期肌肉被身體代謝消耗掉，蛋白質攝取的量不能減少，\n"
        +"甚至要增加到自身體體重(公斤換算成公克)2.5~2.8倍的量，以補充肌肉在重量訓練過程中受到的微小傷害。"
    );
}
exports.dietforlessfat_heat = function(event){
    event.reply(
        "建議在減脂時攝取比TDEE低約15%~25%的熱量，例如一個人的TDEE在2500大卡，\n"
        +"那在減脂時應該攝取1875大卡到2125大卡中間的熱量。"
    );
}
exports.dietforlessfat_heat = function(event){
    event.reply(
        "當人體攝取的熱量比消耗掉的熱量要低的時候，體重自然會下降，\n"
        +"因此需要攝取比TDEE還低的熱量。不過不能減少蛋白質的攝取量，\n"
        +"而脂肪對身體的許多功能也有相當重要的作用，所以減少碳水化合物的攝取是最好的選擇。"
    );
}