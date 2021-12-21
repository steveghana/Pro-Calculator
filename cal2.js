let mainScreen = document.querySelector("#mainscreen");
let numButtons = document.querySelector("#Number");
let allInputs = document.querySelectorAll("span");
let numScreen = document.getElementById("calcScreen");
let answerBox = document.getElementById("Answerbox");
let firstNum = [];
let secondNum = [];
let total1 = [];
let operator = [];
let total = [];

allInputs.forEach((input) => {});
allInputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    input.style.transform = "scale(0.8, 0.8)";
    setTimeout(() => {
      input.style.transform = "scale(1, 1)";
    }, 100);
    (function reset(clicked) {
      if (clicked == "AC") {
        numScreen.innerText = 0;
        answerBox.innerText = "";
        firstNum = [];
        secondNum = [];
        operator = [];
        total = [];
      }
    })(input.innerText);

    /////////////////
    (function delet(clickedValue) {
      if (clickedValue === "C") {
        numScreen.innerText = numScreen.innerText.slice(0, -1);

        if (numScreen.innerText.length == 0) {
          numScreen.innerText = 0;
        }
      }
    })(input.innerText);

    ///////////////
    (function InputConfig(clickedValue) {
      if (numScreen.innerText == "0") {
        //start up characaters
        if (
          input.className == "numbers" &&
          clickedValue != "." &&
          clickedValue != "C" &&
          clickedValue != "AC"
        )
          numScreen.innerText = clickedValue;
      } else {
        if (
          input.className != "operators" &&
          clickedValue != "=" &&
          clickedValue != "C"
        )
          numScreen.innerText += input.innerText;
      }
    })(input.innerText);

    (function authenticateOperators(clickedValue) {
      if (input.className == "operators") {
        if (numScreen.innerText == "0" && firstNum.length == 0) {
          answerBox.innerText = "";
          firstNum = [];
        } else {
          secondNum = [];

          let operate;
          if (clickedValue === "x") {
            operator.push("*");
            operate = clickedValue;
          } else {
            operator.push(clickedValue);
            operate = operator[operator.length - 1];
          }

          if (firstNum.length == 0) {
            firstNum.push(parseFloat(numScreen.innerText)); //first num to use for resolving

            numScreen.innerText = "0";
          }
          if (operator.length == 3) {
            //to control the operator array when we overclick or click more than once
            operator.shift(); //new operators are pushed to the end, so previous ones shold be removed (shift)
          }
          answerBox.innerText = firstNum[0] + " " + operate;
        }
      }
    })(input.innerText);

    (function customiZero() {
      if (input.innerText == "0" && firstNum.length != 0) {
        secondNum = [];
        if (numScreen.innerText == "0") {
          numScreen.innerText = input.innerText;
        }
        secondNum.push(parseFloat(input.innerText));
      }
    })();

    ////////
    (function resolveOnOperators() {
      if (
        input.className === "operators" &&
        firstNum.length != 0 &&
        numScreen.innerText != "0"
      ) {
        secondNum = [];
        if (input.innerText == "0") {
          numScreen.innerText = input.innerText;
          secondNum.push(parseFloat(numScreen.innerText));
        } else {
          secondNum.push(parseFloat(numScreen.innerText));
        }

        let resolved = `${firstNum[0]}${operator[operator.length - 2]}${
          secondNum[0]
        }`;
        let resolve = eval(resolved);
        answerBox.innerText = resolve + " " + input.innerText;
        firstNum = [];
        firstNum.push(resolve);
        numScreen.innerText = "0";
      }
    })();

    //UTILITY FUNCTION
    function customizedResolve(index) {
      let res = `${parseFloat(firstNum[0])}${
        operator[operator.length - index]
      }${parseFloat(secondNum[0])}`;
      let resolve = eval(res);
      numScreen.innerText = resolve;
      answerBox.innerText = "";
    }

    //  //////////

    (function resolve() {
      if (input.innerText == "=") {
        if (firstNum == [] && secondNum == []) {
          total.push(numScreen.innerText);
        }

        if (secondNum.length == 1) {
          //we dont need second num more than once
          secondNum = [];
          secondNum.push(numScreen.innerText);
          customizedResolve(1);
        }

        if (secondNum.length == 0 && firstNum.length != 0) {
          if (numScreen.innerText != "0") {
            secondNum.push(parseFloat(numScreen.innerText));
            customizedResolve(1);
          } else {
            secondNum = [];
            numScreen.innerText = firstNum;
            answerBox.innerText = "";
          }
        }
        firstNum = [];
        secondNum = [];
      }
    })();
  });
});
