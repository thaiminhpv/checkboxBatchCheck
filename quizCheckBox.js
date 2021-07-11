const intervalChecking = 1000 * 60;

function subset(arra, arra_size = 1) {
    let result_set = [],
        result;
    for (let x = 0; x < Math.pow(2, arra.length); x++) {
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
        if (checkbox.children[0].checked === true) checkbox.click()
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getContext(question, checkBoxLength) {
    let checkBoxArray;
    if (document.querySelectorAll('.vert').length === 1) {
        // one submit button
        checkBoxArray = document.querySelectorAll('fieldset')[question].querySelectorAll('div>label');
    } else {
        //multiple submit button
        checkBoxArray = document.querySelectorAll('.vert')[question+1].querySelectorAll('div>label');
    }
    let allPossibleAnswer = checkBoxLength === 0 ? subset(checkBoxArray) : subset(checkBoxArray).filter((e) => e.length === checkBoxLength);
    allPossibleAnswer.reverse();
    return {checkBoxArray, allPossibleAnswer};
}

function getInput() {
    let question = parseInt(prompt("Câu số:")) - 1
    let checkBoxLength = parseInt(prompt("fixed length?")) || 0
    return {question, checkBoxLength};
}

function submitAnswer(question) {
    let listAllSubmitButton = document.querySelectorAll('button[data-submitting="Submitting"]');
    if (listAllSubmitButton.length === 1) {
        //just click
        listAllSubmitButton[0].click();
    } else {
        listAllSubmitButton[question - 1].click();
    }
}

async function exec() {
    const {question, checkBoxLength} = getInput();
    let {checkBoxArray, allPossibleAnswer} = getContext(question, checkBoxLength);

    //show off
    for (const currentAnswer of allPossibleAnswer) {
        clearAnswer(checkBoxArray)
        currentAnswer.forEach(checkbox => checkbox.click());
        await sleep(100)
    }

    // real check
    const length = allPossibleAnswer.length;
    for (let i = 0; i < length; i++) {
        let {checkBoxArray, allPossibleAnswer} = getContext(question, checkBoxLength); // renew these 2 object
        let currentAnswer = allPossibleAnswer[i]
        clearAnswer(checkBoxArray)

        currentAnswer.forEach(checkbox => checkbox.click()); // select answer
        await sleep(100)

        while (true) {
            submitAnswer(question);
            await sleep(3000) // wait server respond
            if (document.getElementsByClassName('notification-message')[0].innerText.trim() === "") break

            console.log("please wait until next submission");
            await sleep(intervalChecking);
        }

        console.log("submited!")

        let result;
        if (document.querySelectorAll('.vert').length === 1) {
            // one submit button
            result = document.querySelectorAll('fieldset')[question].parentElement.querySelectorAll('.incorrect')[0] === undefined;
        } else {
            //multiple submit button
            let x = [...document.querySelectorAll('.vert')];
            x.shift();
            result = x[question].querySelectorAll('.incorrect')[0] === undefined;
        }

        if (result) {
            // if the answer is correct, then:
            console.log("correct!");
            break;
        } else {
            console.log("incorrect!");
        }
        await sleep(1000 * 60 * 10) // 10 minutes
    }
    console.log("Done!");
}

exec();
