var linebot = require('linebot');
var express = require('express');
require('./scripts/main.js');
dict1 = require('./scripts/data/dictionary.js');
dict2 = require('./scripts/data/dict_custom.js');
var funccode = "home"; //自定義參數：功能代碼
var funcstep = 0;   //自定義參數：功能步驟代號

var bmrcount = require('./tdee.js');

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
    //console.log(event);
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//express預設是走port 3000，而heroku不是，所以以下程式碼將進行轉換
var server = app.listen(process.env.PORT || 8080,function(){
    var port = server.address().port;
    console.log("App now running on port", port);

});

//回復一模一樣的訊息
bot.on('message',function(event){
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
    if (event.message.type == 'text' && funccode == "home"){  //接收純文字內容
        //var msg = event.message.text + " 收到！";
        
        //使用Jieba方法將接收到的文字內容(event.message.text)進行斷詞，並逐詞儲存至(_result)陣列
        //同時將斷詞結果輸出到log中。
		node_jieba_parsing([dict1, dict2], event.message.text, function (_result) {
            //先去除停止詞（停止詞庫：./scripts/data/stopwords.txt）========
            for (i = 0; i < _result.length ; i++){
                for (j=0;j<stopwords.length;j++){
                    if(_result[i] == stopwords[j]){
                        _result.splice(i,1);
                        //splice用來將陣列中的元素去除，並將去除後空下來的內容予以補位
                        //splice(清除元素的索引, 清除幾項元素)
                    }
                }
            }
            //==========================================================
            console.log(_result.join("/"));
            
            var BMR = ["BMR","基礎代謝率", "bmr"];
            for (i = 0; i < _result.length; i++){
                for(j = 0; j < BMR.length; j++){
                    if(_result[i] == BMR[j]){
                        //計算BMR
                        funccode = "BMR";
                        funcstep = 1;
                        event.reply("好的，那先請問您的性別？");
                    }
                    break;
                }
            }
        });
        //=======================
    }
    else if(event.message.type = 'text' && funccode == "BMR"){

        bmrcount.bmrcount(funcstep);

        
        // if (funcstep == 1){
        //     if (event.message.text = "男") _sex = 5; //變數若未經var宣告即為全域變數
        //     else _sex = -161;
        //     event.reply("好的，請輸入您的年齡(實歲)");
        //     funcstep = 2;
        // }
        // else if (funcstep == 2){
        //     _age = Number(event.message.text);
        //     event.reply("好的，接下來請輸入您的身高(公分)");
        //     funcstep = 3;
        // }
        // else if (funcstep == 3){
        //     _height = Number(event.message.text);
        //     event.reply("最後請您請輸入您的體重(公斤)");
        //     funcstep = 4;
        // }
        // else if (funcstep == 4){
        //     _weight = Number(event.message.text);
        //     bmr_result = (10 * _weight) + (6.25 * _height) - (5 * _age);// + _sex;
        //     console.log(bmr_result);
        //     var msg = {
        //         "type": "template",
        //         "altText": "BMR result replying template.",                
        //         "template": {
        //             "type": "buttons",
        //             "text": "您的基礎代謝率是"+String(bmr_result)+"\n您想要知道您的TDEE嗎？",
        //             "actions":[
        //                 {
        //                     "type": "message",
        //                     "label": "好R",
        //                     "text": "好R"
        //                 },
        //                 {
        //                     "type": "message",
        //                     "label": "什麼是TDEE?",
        //                     "text": "什麼是TDEE?"
        //                 },
        //                 {
        //                     "type": "message",
        //                     "label": "免了，謝謝",
        //                     "text": "免了，謝謝"
        //                 }
        //             ]
        //         }
        //     }
        //     event.reply(msg).then(function(data){
        //         console.log(msg);
        //     }).catch(function(error){
        //         console.log("ERROR"+error);
        //     });
        //         //"您的基礎代謝率是"+String(bmr_result)
        //     //funccode = "home";
        //     funcstep = 5;
        // }
        // else if (funcstep == 5){
        //     if (event.message.text == "好R"){
        //         event.reply("您的TDEE是"+(bmr_result - _sex)).then(function(data){
        //             console.log(bmr_result - _sex);
        //         }); 
                
        //     }
            
        //     funccode = "home";
        //     funcstep = 0;
            
        // }
    }
    
});

