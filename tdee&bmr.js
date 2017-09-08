//var funcstep = 1;
exports.compute = function(event, funcstep){
        switch (funcstep){
            case 1:
                if (event.message.text = "男") _sex = 5; //變數若未經var宣告即為全域變數
                else _sex = -161;
                event.reply("好的，請輸入您的年齡(實歲)");
                funcstep += 1;
                // console.log(funcstep);
                break;

            case 2:
                _age = Number(event.message.text);
                if(_age == NaN || _age <0 || _age > 160){
                    event.reply("不好意思，請輸入正確的數字！");
                }
                else{
                    event.reply("好的，接下來請輸入您的身高(公分)");
                    funcstep += 1;
                }
                // console.log(funcstep);
                break;

            case 3:
                _height = Number(event.message.text);
                if(_height == NaN || _height <= 40 || _height >= 300){
                    event.reply("不好意思，請輸入正確的數字！");
                }
                else{
                    event.reply("最後請您請輸入您的體重(公斤)");
                    funcstep += 1;
                // console.log(funcstep);
                }
                break;

            case 4:
                _weight = Number(event.message.text);
                if(_weight == NaN || _weight <= 0 || _weight >= 300){
                    event.reply("不好意思，請輸入正確的數字！");
                }
                else{
                    bmr_result = (10 * _weight) + (6.25 * _height) - (5 * _age) + _sex;
                    console.log(bmr_result);
                    var msg = {
                        "type": "template",
                        "altText": "您的基礎代謝率是"+String(bmr_result) ,                
                        "template": {
                            "type": "buttons",
                            "text": "您的基礎代謝率是"+String(bmr_result)+"\n您想要知道您的每日總消耗熱量嗎？",
                            "actions":[
                                {
                                    "type": "message",
                                    "label": "好啊",
                                    "text": "好啊"
                                },
                                {
                                    "type": "message",
                                    "label": "什麼是每日總消耗熱量?",
                                    "text": "什麼是每日總消耗熱量?"
                                },
                                {
                                    "type": "message",
                                    "label": "免了，謝謝",
                                    "text": "免了，謝謝"
                                }
                            ]
                        }
                    }
                    event.reply(msg).then(function(data){
                        console.log(msg);
                    }).catch(function(error){
                        console.log("ERROR"+error);
                    });
                    funcstep += 1;
                    // console.log(funcstep);
                }
                break;

            case 5:
                if (event.message.text == "好啊"){
                    event.reply("好的，我還需要知道您的運動頻率是如何。\n請問您一週運動的天數約為幾天？");
                    funcstep += 1;
                    break;
         
                }
                else if (event.message.text == "免了，謝謝"){
                    event.reply("😊");
                }
                else if (event.message.text == "什麼是TDEE?"){
                    whatistdee(event);
                }
                funcstep = 0;
                return funcstep;
                console.log(funcstep);
                break; 

            case 6:
                
                switch (Number(event.message.text)){
                    case 0:
                        _traindeg = 1.2;
                        break;
                    case 1:
                    case 2:
                    case 3:
                        _traindeg = 1.375;
                        break;
                    case 4:
                    case 5:
                        _traindeg = 1.55;
                        break;
                    case 6:
                    case 7:
                        _traindeg = 1.725;
                        msg = {
                            "type": "template",
                            "altText": "那麼您每天的運動頻率有到2次以上嗎？",
                            "template": {
                                "type": "confirm",
                                "text": "那麼您每天的運動頻率有到2次以上嗎？",
                                "actions": [
                                    {
                                      "type": "message",
                                      "label": "有",
                                      "text": "有"
                                    },
                                    {
                                      "type": "message",
                                      "label": "沒有",
                                      "text": "沒有"
                                    }
                                ]
                            }
                          }
                        event.reply(msg);
                        break;
                    default:
                          event.reply("輸入錯誤，請重新輸入！");
                          funcstep -= 1;
                }
                funcstep += 1;
                break;
            case 7:
                if (event.message.text == "有"){
                    _traindeg = 1.9;
                }
                event.reply("您的每日總消耗熱量是"+ String(bmr_result * _traindeg));
                funcstep = 0;
                return funcstep;
            
                break;
            default:
                event.reply("程式錯誤，請重新操作。");
                console.log("step Error.");
                funcstep = 0;
                return funcstep;
                // console.log(funcstep);
        }
        
        
    
    console.log("inner funcstep = " + funcstep);
    return funcstep;
}

exports.whatistdee = function(event){
    event.reply(
        "TDEE(Total Daily Energy Expenditure)\n"
        +"代表的是「每日總消耗熱量」，\n"
        +"體重越重，每日需要的熱量就越高。\n"
        +"與BMR的差異在於BMR是在身體靜臥不動的條件下計算\n"
        +"而TDEE則是包含每日的運動量在其中。"         
    );
}