else if(event.message.type = 'text' && funccode == "BMR"){
        if (funcstep == 1){
            if (event.message.text = "男") _sex = 5; //變數若未經var宣告即為全域變數
            else _sex = -161;
            event.reply("好的，請輸入您的年齡(實歲)");
            funcstep = 2;
        }
        else if (funcstep == 2){
            _age = Number(event.message.text);
            event.reply("好的，接下來請輸入您的身高(公分)");
            funcstep = 3;
        }
        else if (funcstep == 3){
            _height = Number(event.message.text);
            event.reply("最後請您請輸入您的體重(公斤)");
            funcstep = 4;
        }
        else if (funcstep == 4){
            _weight = Number(event.message.text);
            bmr_result = (10 * _weight) + (6.25 * _height) - (5 * _age);// + _sex;
            console.log(bmr_result);
            var msg = {
                "type": "template",
                "altText": "BMR result replying template.",                
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
                //"您的基礎代謝率是"+String(bmr_result)
            //funccode = "home";
            funcstep = 5;
        }
        else if (funcstep == 5){
            if (event.message.text == "好R"){
                event.reply("您的TDEE是"+(bmr_result - _sex)).then(function(data){
                    console.log(bmr_result - _sex);
                }); 
                
            }
            
            funccode = "home";
            funcstep = 0;
            
        }
    }