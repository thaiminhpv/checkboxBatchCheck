function subset(arra, arra_size = 1) {
    var result_set = [],
        result;
    for (var x = 0; x < Math.pow(2, arra.length); x++) {
        result = [];
        i = arra.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arra[i]);
            }
        } while (i--);
        if (result.length >= arra_size) {
            result_set.push(result);
        }
    }
    return result_set;
}

function clearAnswer(checkboxs) {
    checkboxs.forEach(checkbox => {
        if (checkbox.children[0].checked == true) {
            checkbox.click()
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const intervalChecking = 1000 * 60;
async function exec() {
    quesion = parseInt(prompt("Câu số:")) - 1
    checkBoxArray = document.querySelectorAll('fieldset')[quesion].querySelectorAll('div>label');
    checkBoxLengthFix = parseInt(prompt("fixed length?")) || 0
    if (checkBoxLengthFix == 0) {
        allPossibleAnswer = subset(checkBoxArray)
        allPossibleAnswer = allPossibleAnswer.reverse()
    } else {
        allPossibleAnswer = subset(checkBoxArray).filter((e) => e.length == checkBoxLengthFix)
    }
    //show off
    for (const currentAnswer of allPossibleAnswer) {
        clearAnswer(checkBoxArray)
        currentAnswer.forEach(checkbox => checkbox.click());
        await sleep(100)
    }
    // real check
    for (const currentAnswer of allPossibleAnswer) {
        // reset @checkBoxArray because the page has been reloaded
        checkBoxArray = document.querySelectorAll('fieldset')[quesion].querySelectorAll('div>label');
        clearAnswer(checkBoxArray)
        currentAnswer.forEach(checkbox => checkbox.click());
        await sleep(100)
        while (true) {
            // submit
            document.querySelectorAll('button[data-submitting="Submitting"]')[0].click()
            await sleep(3000) // wait server respond
            if (document.getElementsByClassName('notification-message')[0].innerText.trim() == "") break
            console.log("please wait until next submission");
            await sleep(intervalChecking);
        }
        console.log("submited!")
        // TODO: check if the answer is correct
        if (document.querySelectorAll('fieldset')[quesion].parentElement.querySelectorAll('.incorrect')[0] == undefined) {
            // nếu trả lời đúng thì:
            console.log("correct!");
            break;
        } else {
            console.log("incorrect!");
        }
        // if không bị trả về là fail - đang chờ
        await sleep(1000 * 60 * 10) // 10 minutes
    }
    console.log("Done!");
}

exec();
