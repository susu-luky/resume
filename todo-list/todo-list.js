// 按下添加按钮，任务框出现任务
var addbtn = document.getElementById("add-btn");
var text1 = document.getElementById("text1");
var list = document.querySelector(".list");
addbtn.addEventListener("click",addfun);
text1.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        addfun();
        // 这里只是阻止了Enter键的默认行为，不是所有键的默认行为（因为if条件只判断了Enter键）
        e.preventDefault();
    }
});
function addfun(){
    if(text1.value.trim() == ''){
        return;
    }
    else{
        // 动态添加li元素的同时，获取当前circle,edit,delete元素，不要获取所有元素
        var li =document.createElement("li"); 
        li.className = 'list-item';
        li.innerHTML = 
        `<span class='circle'></span> 
        <span class='item'>${text1.value}</span>
        <div class='icon'>
            <div class='edit'>✏️</div>
            <div class='delete'>❌️</div>
        </div>`
        // 注意：这里的li是当前添加的li元素，不是所有li元素，所以这里可以使用querySelector()方法
        // 这里li,edit,delect是函数内的局部变量，每次执行函数都会重新创建，只指向当前新建的 DOM 元素，不会冲突；
        // querySelector()方法获取第一个元素，因为querySelectorAll()方法会返回所有元素
        list.appendChild(li);
        var circles = li.querySelector('.circle');
        var edit = li.querySelector('.edit');
        var delect = li.querySelector('.delete');
        circles.addEventListener("click",handle);
        edit.addEventListener('click', editfun);
        delect.addEventListener('click', delfun);
        text1.value='';
    }
}
// 点击圆圈事件(注意：这里的circle不能在这里获取，因为这里是页面加载时执行，
// 而 circle 是按钮点击后才创建，所以此时获取不到任何 circle；)
function handle(){
    // classList.toggle()可以切换类名，如果有就删除，没有就添加
    // 注意：新添加的类只会修改与原本类一样的样式，其余的样式保留原来类不会变
    // this.classList.toggle("active") 本身就会返回一个布尔值
    //     如果元素原本没有该类 → 添加类，返回 true；
    //     如果元素原本有该类 → 移除类，返回 false。
    var isActive = this.classList.toggle("active");
    if(isActive){
        this.nextElementSibling.style.textDecoration = "line-through";
        this.nextElementSibling.style.color = "gray";
    }
    else{
        this.nextElementSibling.style.textDecoration = '';
        this.nextElementSibling.style.color = "black";
    }
}
// 点击编辑按钮
function editfun(){
    var editinput = document.createElement('input');
    var itemText = this.parentElement.previousElementSibling;
    editinput.type = 'text';
    editinput.value = itemText.textContent.trim();
    editinput.className = 'edit-input';
    itemText.parentNode.insertBefore(editinput,itemText);
    itemText.style.display = 'none';   
    editinput.focus(); 
    editinput.addEventListener('focusout', function(){
        itemText.textContent = this.value.trim() || itemText.textContent; 
        this.remove();
        itemText.style.display = 'block';
    })
}    
// 点击删除按钮
function delfun(){
    this.parentElement.parentElement.remove();
}
// 进度按钮管理
var btnall = document.querySelector('.btn-all');
var btnproceed = document.querySelector('.btn-proceed');
var btncomplete = document.querySelector('.btn-complete');
function clear(){
    btnall.style.background='white';
    btnproceed.style.background='white';
    btncomplete.style.background='white';
}
function display(){
    var circles = document.querySelectorAll('.circle');
    for(var i=0;i<circles.length;i++){
        // 注意这里circle的父元素是flex布局，如果将circle改为block布局，会导致flex布局失效
        circles[i].parentElement.style.display = 'flex';
    }
}
btnall.addEventListener('click', function(){
    clear();
    btnall.style.background='rgb(226, 134, 111)';
    display();
})
btnproceed.addEventListener('click', function(){
    clear();
    btnproceed.style.background='rgb(226, 134, 111)';
    var circles = document.querySelectorAll('.circle');
    display();
    for(var i=0;i<circles.length;i++){
        if(circles[i].classList.contains('active')){
            circles[i].parentElement.style.display = 'none';
        }
    }
})
btncomplete.addEventListener('click', function(){
    clear();
    btncomplete.style.background='rgb(226, 134, 111)';
    var circles = document.querySelectorAll('.circle');
    display();
    for(var i=0;i<circles.length;i++){
        if(!circles[i].classList.contains('active')){
            circles[i].parentElement.style.display = 'none';
        }
    }
})
// 动态时间显示
var time = document.querySelector('.time');
function updateTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var weekday = now.getDay();
    var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    time.textContent = `${year}年${month}月${day}日${week[weekday]}`;  
}
updateTime();
setInterval(updateTime, 3600 * 1000);
//动态显示任务完成度
var record = document.querySelector('.record');
function updateRecord(){
    var circles = document.querySelectorAll('.circle');
    var activeCount = 0;
    for(var i=0;i<circles.length;i++){
        if(circles[i].classList.contains('active')){
            activeCount++;
        }
    }
    record.textContent = `${activeCount}/${circles.length}完成`;
}
updateRecord();
setInterval(updateRecord, 1000);
