var funcstep = 1;
exports.bmrcount = function(event, init_funcstep){
    if(init_funcstep == 1){
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
                    bmr_result = (10 * _weight) + (6.25 * _height) - (5 * _age);// + _sex;
                    console.log(bmr_result);
                    var msg = {
                        "type": "template",
                        "altText": "您的基礎代謝率是"+String(bmr_result) ,                
                        "template": {
                            "type": "buttons",
                            "text": "您的基礎代謝率是"+String(bmr_result)+"\n您想要知道您的TDEE嗎？",
                            "actions":[
                                {
                                    "type": "message",
                                    "label": "好R",
                                    "text": "好R"
                                },
                                {
                                    "type": "message",
                                    "label": "什麼是TDEE?",
                                    "text": "什麼是TDEE?"
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
                if (event.message.text == "好R"){
                    event.reply("您的TDEE是"+(bmr_result - _sex)).then(function(data){
                        console.log(bmr_result - _sex);
                    }); 
                    
                }
                funcstep = 0;
                console.log(funcstep);
                break;  
            default:
                event.reply("程式錯誤，請重新操作。");
                console.log("step Error.");
                // console.log(funcstep);
        }
        
        
    }
    console.log("inner funcstep = " + funcstep);
    return funcstep;
}