var linebot = require('linebot');
var express = require('express');
require('./scripts/main.js');
dict1 = require('./scripts/data/dictionary.js');
dict2 = require('./scripts/data/dict_custom.js');
var funccode = "home"; //自定義參數：功能代碼
var funcstep = 0;   //自定義參數：功能步驟代號

var tdeebmr = require('./tdee&bmr.js');
var qma = require('./qma.js');

var stopwords=[];
var fs = require("fs");

function readLines(input, func){
    var remaining = "";
    input.on("data", function(data){
        remaining += data;
        var i = 0;
        var index = remaining.indexOf("\n");  
        //indexOf : 回傳指定字串 在整個標的字串中首次出現的位置。
        while(index > -1){  //indexOf回傳-1時代表下面已經沒有指定字串
            var line = remaining.substring(0, index);
            //substring 可以回傳在兩個指定的關鍵字之間的資料
            stopwords[i] = line;
            remaining = remaining.substring(index+1);
            //將提取過後的資料去除，使remaining變數變成全部尚未處理的內容
            //func(stopwords[i]);
            i += 1;
            index = remaining.indexOf("\n");
        }
    });

    input.on("end", function(){
        if(remaining.length > 0){
            //func(remaining);
        }
    });
}
function showdata(data){
    console.log("Line:"+ data);
}
var input = fs.createReadStream("./scripts/data/stopwords.txt");
readLines(input,showdata);

var bot =linebot({
    channelId: "1523378933",  //註冊Line Bot的Channel ID
    channelSecret: "ae98c240a2aa06f654e873aefceb4e81",    //Channel Secret
    channelAccessToken: "jHRM9rD3O8NyJL8817rGwaWzimo15AUrWRj1oTnJLyjJC8L+guKxnO3KD1jfkBxXAvY75Xa1Pv/nW4GK0mvb9TpPp7Y53UPhuuf+KQdc9b2Vm60RwlrNFWwynvms+sOqQOZvfPGSAw1gOyLAKLwgBwdB04t89/1O/w1cDnyilFU="    //Channel Access Token
});

//印出從LINE收到的訊息
bot.on('message',function(event){
    console.log(event);
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express預設是走port 3000，而heroku不是，所以以下程式碼將進行轉換
var server = app.listen(process.env.PORT || 8080,function(){
    var port = server.address().port;
    console.log("App now running on port", port);

});
bot.on('message',function(event){
    var id  = event.source.userId;    
    //收到通關密語後，建立一個選單讓使用者選擇想要使用的功能
    if(event.message.type == 'text' && event.message.text == "fuckreset"){
        funccode = "home";funcstep = 0;
        event.reply("done.");
    }
    if (event.message.type == 'text' && event.message.text == "我想鍛鍊"){
        var msg = {
            "type": "template",
            "altText": "您好，初次見面！",
            "template":{
                "type": "buttons",
                "title": "您好，初次見面！",
                "text": "請問您想使用哪一項功能呢？",
                "thumbnailImageUrl": "https://farm3.staticflickr.com/2873/34376500995_622529550b_k.jpg",
                "actions":[
                    {
                        "type": "postback",
                        "label":"知識詢問",
                        "data": "#"
                    },
                    {
                        "type": "postback",
                        "label": "鍛鍊姿勢查詢",
                        "data": "#"
                    }
                ]
            }
        }
        event.reply(msg).then(function(data){
            colsole.log(msg);
        }).catch(function(error){
            console.log('error');   //若有錯誤，catch下來後註記在log中
        });
    }
    else if (event.message.type == 'text' && event.message.text =="我想鍛鍊腿部！"){
        event.reply("我知道了！讓我來助你一臂之力💪");
        msg ={ 
            type: 'text',
            text: '以下這個影片，將有效幫助你進行腿部的訓練，要注意觀看重點提示哦😉'
        };
        bot.push(id,msg);

    }

    if (event.message.type == 'text' && funccode == "home"){  //接收純文字內容
        //var msg = event.message.text + " 收到！";
        
        //使用Jieba方法將接收到的文字內容(event.message.text)進行斷詞，並逐詞儲存至(_result)陣列
        //同時將斷詞結果輸出到log中。
		node_jieba_parsing([dict1, dict2], event.message.text, function (_result) {
            //先去除停止詞（停止詞庫：./scripts/data/stopwords.txt）========
            for (i = 0; i < _result.length ; i++){
                _result[i] = _result[i].toUpperCase(); //將輸入的英文轉置為大寫
                for (j=0;j < stopwords.length;j++){
                    if(_result[i] == stopwords[j]){
                        _result.splice(i,1);
                        //splice用來將陣列中的元素去除，並將去除後空下來的內容予以補位
                        //splice(清除元素的索引, 清除幾項元素)
                    }
                }
            }
        
        //==========================================================
            console.log(_result.join("/"));

            var WHATIS = ["啥","什麼","?","？"]
            var WHEN = ["什麼時候","時候","時","啥時","能夠","前","後","之前","之後"]
            var HOW = ["如何","怎麼","怎樣"];            
            var BMR = ["BMR","基礎代謝率", "bmr", "ＢＭＲ","ｂｍｒ"];

            func : {
                for (i = 0; i < _result.length; i++){
                    for(j = 0; j < BMR.length; j++){
                        if(_result[i] == BMR[j]){
                            //計算BMR
                            funccode = "BMR";
                            funcstep = 1;
                            var msg = {
                                "type": "template",
                                "altText": "好的，那先請問您的性別？\n（男／女)",
                                "template": {
                                    "type": "confirm",
                                    "text": "好的，那先請問您的性別？",
                                    "actions": [
                                        {
                                            "type": "message",
                                            "label": "男",
                                            "text": "男"
                                        },
                                        {
                                            "type": "message",
                                            "label": "女",
                                            "text": "女"
                                        }
                                    ]
                                }
                            }
                            event.reply(msg);  
                            break;                      
                        }
                        
                    }

                    //詢問模式：什麼是...?
                    for(j = 0; j < WHATIS.length; j++){
                        if(_result[i] == WHATIS[j]){
                            //程式切換成詢問模式
                            funccode = "askQuestion";
                            console.log("now funccode :"+funccode);
                            _result.splice(i,1);
                            for (k = 0; k < _result.length; k++){
                                if(_result[k]=="TDEE"||_result[k]=="tdee"){
                                    qma.whatistdee(event);
                                    funccode = "home";
                                    break;
                                }
                                else if(_result[k]=="蛋白質"){
                                    qma.whatisprotein(event);
                                    funccode = "home";
                                    break;
                                }
                                else if(_result[k]=="碳水化合物"){
                                    qma.whatisCarbohydrates(event);
                                    funccode = "home";  
                                    break;  
                                }
                                else if(_result[k]=="簡單碳水化合物"||_result[k]=="低GI"){
                                    qma.whatisSimpleCarbohydrates(event);
                                    funccode = "home";  
                                    break;  
                                }
                                else if(_result[k]=="複雜碳水化合物"||_result[k]=="高GI"){
                                    qma.whatisComplexCarbohydrates(event);
                                    funccode = "home";  
                                    break;  
                                }
                                else if(_result[k]=="GI"||_result[k]=="升糖指數"){
                                    qma.whatisGI(event);
                                    funccode = "home";  
                                    break;  
                                }
                                else if(_result[k]=="脂肪"){
                                    qma.whatisFat(event);
                                    funccode = "home";  
                                    break;  
                                }

                                else if(_result[k]=="吃"||_result[k]=="吃什麼"){
                                    qma.howtoeat(event);
                                    funccode = "home";  
                                    break;  
                                }
                            }
                        }
                    }

                    //詢問模式：什麼時候該...?
                    for(j = 0; j< WHEN.length; j++){
                        if(_result[i] == WHEN[j]){  
                            console.log("WHEN");
                            funccode = "askQuestion";
                            console.log("now funccode :"+funccode);
                            for(m = 0; m < _result.length; m++){
                                if(_result[m] == "吃"){
                                    //詢問鍛鍊前飲食或鍛鍊後飲食
                                    for(n = 0; n< _result.length; n++){
                                        if(_result[n] == "前"||_result[n] == "之前"||_result[n] == "以前"){
                                            console.log("前");
                                            qma.eatbftrain(event);
                                            funccode = "home";
                                            break func;
                                        }
                                        else if(_result[n] == "後"||_result[n] == "之後"||_result[n] == "以後"){
                                            console.log("後");
                                            qma.eatafttrain(event);
                                            funccode = "home";
                                            break func;
                                        }
                                    }
                                    qma.whentoEat(event);
                                    funccode = "home";
                                    break func;        
                                }
                            }
                        }
                    }
                    //該如何...?
                    for(j = 0; j< HOW.length; j++){
                        if(_result[i] == HOW[j]){
                            console.log("HOW");
                            funccode = "askQuestion";
                            console.log("Now Funccode :"+funccode);
                            for(k = 0; k < _result.length; k++){
                                if(_result[k]== "飲食"){
                                    console.log("%%%1");
                                    for(l = 0; l < _result.length; l++){
                                        if(_result[l] == "控制"){
                                            for(m = 0 ; m < _result.length; m++){
                                                if(_result[m] == "減脂"){
                                                    console.log("%%%2");
                                                    //減脂期的飲食控制？
                                                    qma.dietctrlforlessfat(event);
                                                    funccode = "dietforlessfat";
                                                    funcstep = 1;
                                                    break func;
                                                }
                                            }
                                            //該如何控制飲食？
                                            console.log("%%%3");
                                            qma.dietctrl(event);
                                            funccode = "home";
                                            break func;
                                        }
                                    }
                                }
                            }    
                        }
                    }
                }
            }
        });
        //=======================
    }
    else if(event.message.type = 'text' && funccode == "BMR"){
        funcstep = tdeebmr.compute(event, funcstep);
        if(funcstep == 0){
            funcstep = 0;
            funccode = "home";
        }
        console.log("out funcstep = " + funcstep);    
    }
    //減脂的飲食控制
    else if(funccode=="dietforlessfat" && funcstep == 1){
        if(event.message.text == "蛋白質控制"){
            qma.dietforlessfat_protein(event);
        }
        else if(event.message.text == "熱量控制"){
            qma.dietforlessfat_heat(event);
        }
        else if(event.message.text == "營養素控制"){
            qma.dietforlessfat_nutrient(event);
        }
        funccode = "home";
        funcstep = 0;
    }
    
});

askQuestion = function(event,_result){
    for (i = 0; i < _result.length; i++){
        if(_result[i]=="TDEE"||_result[i]=="tdee"){
            tdeebmr.whatistdee(event);
            funccode = "home";
            break;
        }
        if(_result[i]=="TDEE"||_result[i]=="tdee"){
            tdeebmr.whatistdee(event);
            funccode = "home";
            break;
        }
    }

}

