$(function () {
    let ems = document.getElementsByTagName('em')
    for (let i = 0; i < ems.length; i++) {
        if (ems[i].innerText == '已读完') {
            ems[i].style.color = '#025952'
        } else if (ems[i].innerText == '正在读') {
            ems[i].style.color = '#FCA521'
        } else if (ems[i].innerText == '计划中') {
            ems[i].style.color = '#F27B35'
        }
    }
})