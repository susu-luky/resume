// 一、首先把输入的数据存储下来（因为如果直接写在显示器上只是字符串，没办法直接计算）

/* 数字用字符串存储的原因
   点 “1”→点 “2”	"12"（直接拼接）	12（需 1*10+2）
   点 “0”→点 “0”	"00"（显示 00）	0（显示 0，丢失输入）
   点 “-”→点 “5”	"-5"（先存 "-" 再拼 "5"）	报错（- 不是合法数字）*/
let currentInput = '0';
let previousInput = '';
// 这里null和“”不是一个意思，null表示变量 “无值、未赋值“，而”“变量表示 “有值，是空字符串”
// 当输入没有输入运算符时，默认为''
let operator = null;
let currentexpression = '';

//二、获取显示区
const expression = document.getElementById("expression");
const result = document.getElementById("result");

// 三、把变量内容显示到表达区
function updateDisplay(){
    expression.textContent = currentexpression;
    result.textContent = currentInput;
}
function init(){
    updateDisplay();
}
window.onload = init;

// 四、输入数字的函数
let butnumbers = document.getElementsByClassName("butnumber");
for(let i = 0;i < butnumbers.length; i++){
    butnumbers[i].addEventListener("click", funnumber);
}
function funnumber(){
    // 第一个数字就先存储起来（只有在初始为0并且不是小数点的时候输入的数字可以存储）
    // 如果是小数点那么替换之后就变成.234这种情况
    const num = this.textContent;
    if(num === "." && currentInput.includes(".")){
        // 每次只输入一个数字，重复的小数点不执行
        return;
    }
    if(currentInput === "0" && num !== "."){
        currentInput = num;
    }
    //显示区不为0，也就是输入数字后，后面的数字依次追加
    else{
        currentInput += num;
    }
    updateDisplay();
}

// 五、写入正负号
const sign = document.getElementById("sign");
sign.addEventListener("click", funsign);
function funsign(){
    if(currentInput === "0"){
        return;
    }
    else if(!currentInput.includes("-")){
        currentInput = "-" + currentInput;
    }else{
        currentInput = currentInput.slice(1);
    }
    updateDisplay();
}

// 六、写退格和清空函数
const back = document.getElementById("back");
const clearall = document.getElementById("clearAll");
back.addEventListener("click", funback);
clearall.addEventListener("click", funclear);
function funback(){
    if(currentInput.length > 1){
        currentInput = currentInput.slice(0, -1);
    }else{
        currentInput = "0";
    }
    updateDisplay();
}
function funclear(){
    if(currentInput !== "0"){
        currentInput = "0";
        previousInput = '';
        operator = null;
        currentexpression = '';
    }
    updateDisplay();
}

// 七、写运算符函数
const operates = document.getElementsByClassName("operate");
for(let i = 0; i < operates.length; i++){
    operates[i].addEventListener("click", funoper);
}
function funoper(){
    if(currentInput === ""){
        return;
    }
    // 相当于1+2+先算1+2
    if(previousInput !== ''){
        calculate();
    }
    operator = this.textContent;
    previousInput = currentInput;
    currentInput = '';
    currentexpression = `${previousInput} ${operator}`;
    updateDisplay();
}

// 八、写计算函数（也就是等于号这步）
const equal = document.getElementById("equal");
equal.addEventListener("click", calculate);
function calculate(){
    if (currentInput === "" || currentInput === "-") {
        return;
    }
    // 2. 无运算符/无上一个数 → 没发计算，直接返回
    if (!operator || previousInput === "") {
        return;
    }
    let result;
    const currenNumber = parseFloat(currentInput);
    const previousNumber = parseFloat(previousInput);
    switch(operator)
    {
        case '+':
            result = previousNumber + currenNumber;
            break;
        case '-':
            result = previousNumber - currenNumber;
            break;
        case '×':
            result = previousNumber * currenNumber;
            break;
        case '÷':
            if(currenNumber === 0){
                result = 'Error';
            }
            else{
                result = previousNumber / currenNumber;
            }
            break;
    }
    currentexpression = `${previousInput} ${operator} ${currentInput} =`
    currentInput = result.toString();
    previousInput = '';
    operator = null;
    updateDisplay();
}

// 写%函数
const percentage = document.getElementById("percentage");
percentage.addEventListener("click", funpercen);
function funpercen(){
    if(currentInput === '' || currentInput === '0'){
        return;
    }
    let curnumber = parseFloat(currentInput)/100;
    currentInput = curnumber.toString();
    updateDisplay();
}
window.onload = init;