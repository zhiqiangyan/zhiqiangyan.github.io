/* Global Variables */
const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const subID = jsPsych.randomization.randomID(8)     
     
const groupID = jsPsych.randomization.sampleWithReplacement([1,2,3], 1)[0];

/* Blocks: HTML DOM Settings */
var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

/* Blocks: Basics */
var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    实验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在实验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    湖师大教科院心理系<br/>2021年</p>`,
    choices: [' '],
    post_trial_gap: 100
}

var warmup = {
    type: 'html-button-response',
    stimulus: '<p>请做好准备……</p>',
    choices: ['<span id="timer">5</span>秒后继续'],
    button_html: btn_html_timer
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}

/* Blocks: Experiments */
//Basic info
var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女', '其他'],
}

var Birth = {
    type: 'survey-html-form',
    data: { varname: 'Birth' },
    preamble: '你的生日',
    html: '<p><input name="Q0" type="date" value="2000-01-01" required /></p>',
    button_label: '继续',
}

// Instructions
/* groupChoice */
var groupDebrief = {
    type: 'html-keyboard-response',
    stimulus: function() {
        return `
        <p style="font: bold 32pt 微软雅黑; color: #B22222">
        实验组别</p>
        <p style="font: 20pt 微软雅黑; color: black"><br/>
        你被分配到了：第${groupID}组！<br/>
        （按任意键继续）</p>`
    }
}

/* SSS priming */
var primepic = {
    type: 'preload',
    images:['img/SSS.jpg','img/SSS_H.png','img/SSS_L.png']
}

var SSSprime = {
    type: 'image-keyboard-response',
    stimulus:'img/SSS.jpg',
    data: {
        task: 'SSSpriming',
    }
}

/* CheckInstr */
var Check_SSS1 = {
    type: 'html-slider-response',
    data: { varname: 'Check_SSS1' },
    on_load: function() { setSliderAttr() },
    stimulus: function(){
        if (groupID == 1) {
            var letter = `<p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
                         <b>1.你认为材料呈现的是社会阶梯中哪一级人群的生活？请在下面的数字画圈。<br/>
                         (1级代表社会最低层，10级代表社会最高层) <br/><br/>
                         </b></p>`
        } else {
        if (groupID == 2) {
            var letter = `<p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
                         <b>1.你认为你的生活水平处于社会阶梯中哪一级？请在下面的数字画圈。<br/>
                         (1级代表社会最低层，10级代表社会最高层) <br/><br/>
                         </b></p>`
        } else {
            var letter = `<p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
                         <b>1.你认为你的生活水平处于社会阶梯中哪一级？请在下面的数字画圈。<br/>
                        (1级代表社会最低层，10级代表社会最高层) <br/><br/>
                        </b></p>`
        }
        }
        return letter
    },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10'],
    min: 1,
    max: 10,
    start: 5,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

/* Combine Timelines */
var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    groupDebrief,
    Sex,
    Birth,
    SSSprime,
    Check_SSS1,
    close_fullscreen,
]

/* Launch jsPsych */
jsPsych.init({
    timeline: main_timeline,
    override_safe_mode: true,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `${groupID}_${subID}_data_exp.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
    }
})