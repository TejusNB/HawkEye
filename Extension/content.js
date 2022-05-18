let res = {};

function having_IP_Address(){
    var reg =/\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}/;
    var url = window.location.href
    if(reg.exec(url)==null){
        return -1;
    }
    else{
        return 1;
    }
}

function URL_Length(){
    var url = window.location.href;    
    if(url.length<54){
        return -1;
    } 
    else if(url.length>=54 && url.length<=75){
        return 0;
    }
    else{
        return 1;
    }
}

function Shortining_Service(){
    var url = window.location.href;    
    if(url.length>21){
        return -1;
    } 
    else{
        return 1;
    }
}

function having_At_Symbol(){
    var search ="@";
    var url = window.location.href; 
    if(url.match(search)==null){
        return -1;
    }
    else{
        return 1;
    }
}


function double_slash_redirecting(){
    var reg1 = /^http:/
    var reg2 = /^https:/
    var srch ="//";
    var url = window.location.href; 
    if(url.search(srch)==5 && reg1.exec(url)!=null && (url.substring(7)).match(srch)==null){
        return -1;
    }
    else if(url.search(srch)==6 && reg2.exec(url)!=null && (url.substring(8)).match(srch)==null){
        return -1;
    }
    else{
        return 1;
    }
}


function Prefix_Suffix(){
    var reg = /[a-zA-Z]\//;
    var srch ="-";
    var url = window.location.href; 
    if(((url.substring(0,url.search(reg)+1)).match(srch))==null){
        return -1;
    }    
    else{
        return 1;
    }
}


function having_Sub_Domain(){
    var reg = /[a-zA-Z]\//;
    var url = window.location.href; 
    if((url.substring(0,url.search(reg)+1)).split('.').length < 5){
        return -1;
    }    
    else{
        return 1;
    }
}


function Favicon(){
    var reg = /[a-zA-Z]\//;
    var url = window.location.href; 
    if(document.querySelectorAll("link[rel*='shortcut icon']").length>0){            
        var faviconurl = document.querySelectorAll("link[rel*='shortcut icon']")[0].href;
        if((url.substring(0,url.search(reg)+1))==(faviconurl.substring(0,faviconurl.search(reg)+1))){
            return -1;
        }    
        else{
            return 1;
        }
    }
    else{
        return -1;
    }
}

function HTTPS_token(){
    var srch1 ="//";   
    var srch2 = "https";   
    var url = window.location.href; 
    if(((url.substring(url.search(srch1))).match(srch2))==null){
        return -1;
    }    
    else{
        return 1;
    }
}

function getIdenticalDomainCount(tag){    
    var i;
    var identicalCount=0;
    var reg = /[a-zA-Z]\//;    
    var url = window.location.href;
    var mainDomain = url.substring(0,url.search(reg)+1);    
    var nodeList = document.querySelectorAll(tag);
    if(tag=="img" || tag=="script"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].src
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }   
      });
    }  
    else if(tag=="form"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].action
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }   
      });
    }  
    else if(tag=="a"){
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].href
        if((mainDomain==(i.substring(0,i.search(reg)+1))) && ((i.substring(0,i.search(reg)+1))!=null) && ((i.substring(0,i.search(reg)+1))!="")){
           identicalCount++;
        }    
      });
    } 
    else{
        nodeList.forEach(function(element,index) {        
        i = nodeList[index].href
        if(mainDomain==(i.substring(0,i.search(reg)+1))){
           identicalCount++;
        }    
      });
    }  
    return identicalCount;
} 

function Request_URL(){
  var totalCount = document.querySelectorAll("img").length
  var identicalCount = getIdenticalDomainCount("img");
  if(((totalCount-identicalCount)/totalCount)<0.22){
        return -1;
    } 
  else if((((totalCount-identicalCount)/totalCount)>=0.22) && (((totalCount-identicalCount)/totalCount)<=0.61)){
        return 0;
    }   
    else{
        return 1;
    }
}


function URL_of_Anchor(){
  var totalCount = document.querySelectorAll("a").length
  var identicalCount = getIdenticalDomainCount("a");
  if(((totalCount-identicalCount)/totalCount)<0.31){
        return -1;
    } 
  else if((((totalCount-identicalCount)/totalCount)>=0.31) && (((totalCount-identicalCount)/totalCount)<=0.67)){
        return 0;
    }   
    else{
        return 1;
    }
}


function SFH(){
    var totalCount = document.querySelectorAll("form").length
  var identicalCount = getIdenticalDomainCount("form");
  if(document.querySelectorAll('form[action]').length<=0){
        return -1;
  } 
  else if(identicalCount!=totalCount){
        return 0;
    }   
    else if(document.querySelectorAll('form[action*=""]').length>0){
        return 1;
    } 
    else{
        return -1;
    } 
}

function Submitting_to_email(){
    if(document.querySelectorAll('a[href^=mailto]').length<=0){
        return -1;
    }   
    else{
        return 1;
    }
}

function on_mouseover(){
    if((document.querySelectorAll("a[onmouseover*='window.status']").length<=0) || (document.querySelectorAll("a[onclick*='location.href']").length<=0)){
        return -1;
    }
    else{
        return 1;
    } 
}

function Iframe(){
    if(document.querySelectorAll('iframe').length<=0){
        return -1;
    }
    else{
        return 1;
    }
}

function main() {
    res = {
        having_IP_Address: having_IP_Address(),
        URL_Length: URL_Length(),
        Shortining_Service: Shortining_Service(),
        having_At_Symbol: having_At_Symbol(),
        double_slash_redirecting: double_slash_redirecting(),
        Prefix_Suffix: Prefix_Suffix(),
        having_Sub_Domain: having_Sub_Domain(),
        Favicon: Favicon(),
        HTTPS_token: HTTPS_token(),
        getIdenticalDomainCount: getIdenticalDomainCount(),
        Request_URL: Request_URL(),
        URL_of_Anchor: URL_of_Anchor(),
        SFH: SFH(),
        Submitting_to_email: Submitting_to_email(),
        on_mouseover: on_mouseover(),
        Iframe: Iframe(),
        url: window.location.href
    }
}


main();

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        switch(message.type) {
            case "getFeatures":
                sendResponse(res);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);