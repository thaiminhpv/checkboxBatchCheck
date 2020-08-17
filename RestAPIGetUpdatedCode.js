// (async function () {
//     var j = document.createElement('script');
//     j.src = "https://code.jquery.com/jquery-3.3.1.min.js";
//     document.getElementsByTagName('head')[0].appendChild(j);
//     console.log("jQuery loaded");
//     const code = $.ajax({
//         type: "GET",
//         cache: false,
//         url: "https://raw.githubusercontent.com/thaiminhpv/checkboxBatchCheck/master/quizCheckBox.js",
//         async: false,
//         success: function () { }
//     }).responseText;
//     eval(code)
//     console.log("Done!!");
// })//()

// trang web nhà trường dùng jQuery bản cũ không hỗ trợ ajax, nhưng nếu nạp dùng bản mới thì lại gây xung đột object jQuery trong quá trình nộp bài
// -> phải gọi RestAPI (ajax) bằng JS thuần

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
            eval(xmlhttp.responseText);
        } else {
            console.log("oops, something went wrong!");
        }
    }
};
let url = "https://raw.githubusercontent.com/thaiminhpv/checkboxBatchCheck/master/quizCheckBox.js";
xmlhttp.open("GET", url, true);
xmlhttp.send();