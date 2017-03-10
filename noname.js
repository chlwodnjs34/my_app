var request = require("request");
var cheerio = require("cheerio");

var url = "http://comic.naver.com/webtoon/weekday.nhn";
var url2;
var value = new Array();
var check = new Array();

play = setInterval(function(){
	request(url, function(error, response, body) {  
	  if (error) throw error;

	  var $ = cheerio.load(body);

	  var postWeek = $("div.col li");

	  postWeek.each(function(index) {
	  	var postTitle = $(this).find(".title").text();
	  	var postLink = $(this).find("a").attr("href");
	  	value[index] = new Array();
	  	value[index][0] = postTitle;
	  	
	  	var url2 = "http://comic.naver.com" + postLink;
	  	
	  	if($(this).find('.ico_updt').length>=1  && check[index] != true){
	  		
	  		request(url2, function(error, response, body) {  
				if (error) throw error;

				var $ = cheerio.load(body);

				var postWeek = $("tr td.title").eq(0);
				
				postWeek.each(function(){
					var a = $(this).find("a").text();

					if($("tr td").eq(0).find("a").attr("href")=="#"){
						var b = $("tr td").eq(1).find("a").attr("href");
					}else{
						var b = $("tr td").eq(0).find("a").attr("href");
					}
					
					value[index][1] = a;
					value[index][2] = "http://comic.naver.com" + b;
					check[index] = false;
				})
			});	
	  	}
	  });
	})
	function uploadWebtoon(){
		for (var i = 0; i < value.length; i++) {
			if(check[i] != true && check[i] == false){
				console.log(value[i][0]);
				/*console.log(value[i][0] + " " + value[i][1] + " 업로드 되었습니다." + value[i][2]);*/
				check[i] = true;
			}else{
				
			}
		}
	}
	uploadWebtoon();
	console.log("--------------------------------------------------------------------------");
},5000);