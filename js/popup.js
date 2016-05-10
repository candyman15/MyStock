var interestCompanyName = [];
var interestCompanyCode = [];
var STORAGE_KEY_COMPANY_NAME = "company_name";
var STORAGE_KEY_COMPANY_CODE = "company_code";

$(document).ready(function() {
    //searchCompanyCode();
    attachEvent();

    //localStorage.setItem("save","");
    //localStorage.clear();
    interestCompanyName.push(localStorage.getItem(STORAGE_KEY_COMPANY_NAME));
    interestCompanyCode.push(localStorage.getItem(STORAGE_KEY_COMPANY_CODE));
    
    console.info(localStorage.getItem(STORAGE_KEY_COMPANY_NAME));
    console.info(localStorage.getItem(STORAGE_KEY_COMPANY_CODE));
    makeInterestList();
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

                var innerHtml = "<div class='col-sm-3 col-md-4'>"+
                    "<div class='thumbnail' style='height:100px;'>"+
                    "<input type='hidden'  class='link'>" +
                    "<div class='caption'>" +
                    "<p style='cursor: pointer; !important;'>"+items[1]+"</p>" +
                    "<p style='cursor: pointer; !important;'>"+items[0]+"</p>" +
                    "<button onclick=javascript:addInterest('"+items+"')>추가</button>" +
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

function makeInterestList(){
    var code = JSON.parse(localStorage.getItem(STORAGE_KEY_COMPANY_CODE));
    var name = JSON.parse(localStorage.getItem(STORAGE_KEY_COMPANY_NAME));

    for(var i in code){

        var innerHtml = "<div class='col-sm-3 col-md-4'>"+
            "<div class='thumbnail' style='height:100px;'>"+
            "<input type='hidden'  class='link'>" +
            "<div class='caption'>" +
            "<p style='cursor: pointer; !important;'>"+code[i]+"</p>" +
            "<p style='cursor: pointer; !important;'>"+name[i]+"</p>" +
            "</div>" +
            "</div>" +
            "</div>";

        $("#body").append(innerHtml);
    }
}

function addInterest(items){
    console.info("items :" + items);
    //var company = [];
    var value = items.split(',');
    //for(var i=0; i < value.length; i++){
    //    company.push(value[i]);
    //}

    interestCompanyCode.push(value[0]);
    interestCompanyName.push(value[1]);

    console.info("value[0] :" + value[0]);
    console.info("value[1] :" + value[1]);

    localStorage.setItem(STORAGE_KEY_COMPANY_CODE, JSON.stringify(interestCompanyCode));
    localStorage.setItem(STORAGE_KEY_COMPANY_NAME, JSON.stringify(interestCompanyName));

    //
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