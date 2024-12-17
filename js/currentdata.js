// 返回当前时间
var today = document.querySelector('.today-time');
setInterval(getTime, 1000); // 开启计时器

function getTime() {
    var time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let dates = time.getDate();
    let day = time.getDay();
    let arr = ['日', '一', '二', '三', '四', '五', '六'];
    let h = time.getHours();
    h = h < 10 ? '0' + h : h;
    let m = time.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = time.getSeconds();
    s = s < 10 ? '0' + s : s;
    today.innerHTML = year + '年' + month + '月' + dates + '日，星期' + arr[day] + ' ' + h + ':' + m + ':' + s;
}