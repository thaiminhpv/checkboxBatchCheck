# Quiz auto
Copy đoạn này dán vào bookmark browser
```javascript
javascript:let xmlhttp=new XMLHttpRequest();xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState===XMLHttpRequest.DONE){if(xmlhttp.status===200){console.log(xmlhttp.responseText);eval(xmlhttp.responseText);}else{console.log("oops, something went wrong!");}}};let url="https://raw.githubusercontent.com/thaiminhpv/checkboxBatchCheck/master/quizCheckBox.js";xmlhttp.open("GET",url,true);xmlhttp.send();
```
![example image](example.png)