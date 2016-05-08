$(document).ready(function() {
    //searchCompanyCode();
    attachEvent();
});

function attachEvent(){
    $("#searchBtn").click(function(tab){
        moveOneshop(tab);
    });

    $('#searchText').on("input", function() {
        console.info("keypress:" + $("#searchText").val());
        searchCompanyCode($("#searchText").val());
    });
}

function searchCompanyCode(name){
    $("#body").html("");
    var requestUrl = "http://ac.finance.naver.com:11002/ac?_callback=&q="+name+"&q_enc=euc-kr&t_koreng=1&st=111&r_lt=111";
    console.info("requestUrl:"+requestUrl);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.info("xhr.responseText:"+xhr.responseText);
            var results = JSON.parse(xhr.responseText);
            console.info("results :" + results);

            for(var i in results.items[0]){


                var items = results.items[0][i];

                console.info("items :" + items);

                var innerHtml = "<div class='col-sm-3 col-md-4'>"+
                    "<div class='thumbnail' style='height:70px;'>"+
                    "<input type='hidden'  class='link'>" +
                    "<div class='caption'>" +
                    "<h6 style='cursor: pointer; !important;'>"+items[0]+"</h6>" +
                    "<p style='cursor: pointer; !important;'>"+items[1]+"</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#body").append(innerHtml);
            }
        }
    }
    xhr.send();


    /*
    showAlert("상품정보 로딩중...");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://lunchchart.com/oneshop/crawl", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            $("#alert").hide("fast");
            $("#alert .alert-info").text("");

            var results = JSON.parse(xhr.responseText);

            for(var i in results.goodsList){
                if(i >= 4){
                    break;
                }

                var innerGoodHtml = "<div class='col-sm-3 col-md-4'>"+
                    "<div class='thumbnail' style='height:290px;'>"+
                    "<input type='hidden' value='"+results.goodsList[i].link+"' class='link'>" +
                    "<img src='"+results.goodsList[i].imagePath+"' alt='' style='cursor: pointer; !important;'>" +
                    "<div class='caption'>" +
                    "<h6 style='cursor: pointer; !important;'>"+results.goodsList[i].title+"</h6>" +
                    "<p style='cursor: pointer; !important;'>"+results.goodsList[i].price+"</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#body").append(innerGoodHtml);

                $(".thumbnail").click(function (tab) {
                    chrome.tabs.update(tab.id, {url: "http://oneshop.co.kr"+$(this).find(".link").val()}, function(){
                        window.close();
                    });
                })
            }
        }
    }
    xhr.send();
    */
}



function moveOneshop(tab) {
    chrome.tabs.update(tab.id, {url: "http://oneshop.co.kr/goods/search?search_text=" + $("#searchText").val()}, function(){
        window.close();
    });
}

function showAlert(message){
    $("#alert").show("fast");
    $("#alert .alert-danger").text(message);
}