<template>
  <div class="datePanelItem1 date_panel f_disselected" v-if="panelStatus">
    <div class="box-date-body">
      <div class="datepanelTit fs16 text-center">设置下次复诊时间</div>
      <div class="panel_head" >
        <span class="change_month monthLeft" @touchstart="changeMonth(-1)">&lt;</span>
        <span class="choose_btn yearchoose" @click="showPicker" @mouseout="hidePicker" choosetype="y">{{panelChoosed.year}}</span>
        <span class="choose_btn" @click="showPicker" @mouseout="hidePicker" choosetype="m">{{panelChoosed.month}}</span>
        <span class="change_month monthRight" @touchstart="changeMonth(1)">&gt;</span>
        <div class="choose_box"
             :class="{'choose_year_box':changeType === 'y'}"
             @mouseover="clearPickerTimer"
             @mouseout="hidePicker"
             v-show="showChooseBox">
          <p class="change_year" v-if="changeType === 'y'">
            <span @click="changeYearPage" changeval="-8">&lt;</span>
            <span @click="changeYearPage" changeval="8">&gt;</span>
          </p>
          <span class="item"
                v-for="(item,index) in items"
                @click="chooseYearMonth(item)"
          >{{item}}</span>
        </div>
      </div>
      <div class="panel_body">
        <p class="weekday_box"><span v-for="(weekday,index) in weekdayArry" class="weekday">{{ weekday }}</span></p>
        <div class="day_box">
                <span v-for="(item,index) in days"
                      :class="{'crn_month':item.isCurMonth,'only_day': item.isChoosed && item.isCurMonth, 'cur_day': item.isCurDay && curChooseDay , 'on':index == chooseDayIndex}"
                      @touchstart="choosDay(item.dayNum,item.isCurMonth, index)">{{ item.dayNum }}</span>
        </div>
      </div>
    </div>
    <div class="box-btn-date">
      <div class="btn-date-cancle" @click="closePicker">取消</div>
      <div class="btn-date-ok" @click="enterPicker">确定</div>
    </div>
  </div>
</template>
<script>

  var curDate = new Date();
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth() + 1;
  var curDay = curDate.getDate();

  export default {
    name: 'dataPanel1',
    props: ['panelStatus','clearPanelTimer','hidePanel','choosed','canclePanel'],
    data () {
      return {
        weekdayArry: ['日','一','二','三','四','五','六'],
        showChooseBox: false,
        changeYear: '',
        //渲染切换年或者月的标记，''表示不渲染，'y'表示年，‘m’表示切换月
        changeType: '',
        panelChoosed:{
          year: this.choosed.year ? this.choosed.year : curYear,
          month: this.choosed.month ? this.choosed.month : curMonth
        },
        hidePickerTimer: '',
        curChooseDay: true,
        chooseDayIndex:null
      }
    },
    computed: {
      days: function () {
        return getDayArry(this.panelChoosed,this.choosed)
      },
      items: function () {
        var type = this.changeType;
        var reslt = [];
        var start = 0, end = 0;

        if(type === 'y' && this.changeYear) {
          start = this.changeYear - 4;
          end = this.changeYear + 4;
        };
        if(type === 'm') {
          start = 1;
          end = 12;
        };
        for(var i = start; i <= end; i++){
          reslt.push(i);
        };
        return reslt;
      }
    },
    methods: {
      changeMonth: function (_val, ele) {
        var _self = this;
        if(!_val || isNaN(_val)) return;
        if(_val == -1){
          $(".monthRight").removeClass("on");
          $(".monthLeft").addClass("on");
        }else{
          $(".monthRight").addClass("on");
          $(".monthLeft").removeClass("on");
        }
//          $(ele).addClass("on").siblings().removeClass("on");
        this.chooseDayIndex = null;
        var month = _self.panelChoosed.month + _val;
        switch (month) {
          case (0):{
            _self.panelChoosed.year = _self.panelChoosed.year - 1;
            _self.panelChoosed.month = 12;
            break;
          };
          case (13):{
            _self.panelChoosed.year = _self.panelChoosed.year + 1;
            _self.panelChoosed.month = 1;
            break;
          };
          default:{
            _self.panelChoosed.month = _self.panelChoosed.month + _val;
            break;
          }
        }
      },
      showPicker: function(event){

        event.stopPropagation();
        var type = event.target.getAttribute('choosetype');
        this.clearPickerTimer();
        this.changeType = type ? type : 'm';
        this.changeYear = this.panelChoosed.year;
        this.showChooseBox = true;
      },
      hidePicker: function(){
        var _self = this;
        _self.clearPickerTimer();
        _self.hidePickerTimer = setTimeout(function(){
          _self.showChooseBox = false;
        }, 500)
      },
      hidePickerNow: function(){
        this.clearPickerTimer();
        this.showChooseBox = false;
      },
      clearPickerTimer: function(){
        clearTimeout(this.hidePickerTimer);
      },
      chooseYearMonth: function(_val){
        this.changeType === 'y' ? this.panelChoosed.year = _val : this.panelChoosed.month = _val;
        this.showChooseBox = false;
      },
      changeYearPage: function(event){
        event.stopPropagation();
        var _val = parseInt(event.target.getAttribute('changeval'));
        console.log(_val)
        this.changeYear = this.changeYear + _val;
      },
      choosDay: function (_day,_isCurMonth,index) {

//        console.log(_day,_isCurMonth,index);
//        alert(_isCurMonth);
        if(!_isCurMonth) return;

        this.chooseDayIndex = index;
        this.choosed.year = this.panelChoosed.year;
        this.choosed.month = this.panelChoosed.month;
        this.choosed.day = _day;
        if ( this.panelChoosed.year == getCurYear() && this.panelChoosed.month == getCurMonth() && _day == getCurMonthDays() ) {
          this.curChooseDay = true;
        }else {
          this.curChooseDay = false;
        }
        console.log(this.choosed);

      },
      enterPicker: function(){
        this.hidePanel(4);
        event.stopPropagation();
        return false;
      },
      closePicker: function(){
        this.canclePanel();
      }
    }
  };
  //-------------------------月份数组拼接 START------------------------------------
  function getDayArry(showDate, chooseReslt) {

    var year = showDate.year;
    var month = showDate.month;
    var day = showDate.day;
    var chooseDateArry = chooseReslt.year && chooseReslt.month && chooseReslt.day ? [chooseReslt.year,chooseReslt.month,chooseReslt.day] : [curYear,curMonth,curDay];
     console.log ( "year:"+year  )
     console.log ( "month:"+month )
     console.log ( day )
     console.log ( chooseDateArry )

    //获取当前月天数数组
    var curMonthDays = getMonthDays(month);
    var preMonthDays = getMonthDays(month == 0 ? 11 : month - 1);
    var firstDay = getDayInWeek(year, (month - 1), 1); //当前月第一天是星期几
    var allDays =  Math.ceil((+curMonthDays + firstDay) / 7) * 7;
    var curDays = getCurMonthDays();
    var curMonth = getCurMonth();
    var curYear = getCurYear();

    let dayArry = [];
    console.log ( 'curDays===' +curDays )
    console.log ( 'firstDay===' +firstDay )
    console.log ( 'curMonthDays===' +curMonthDays )
    console.log ( 'curYear=='+curYear )
    console.log ( 'curMonth=='+curMonth )
    console.log ( 'preMonthDays=='+preMonthDays )
    console.log ( 'allDays=='+allDays )

    for(var i = 1; i <= allDays; i++){

      var isPre = i <= firstDay;
      var isNxt = i > (firstDay + curMonthDays);
      var isCenter = i < (firstDay+curDays+1);
      var isCurDay = '';
      // 如果距离现在以前是灰色的 当前月 以前 的 年 或 月 都为灰色
      var isCurMonth = '';
      if ( month < curMonth && year <= curYear ) {
        isCurMonth = false;
      }else if ( month == curMonth ){
        isCurMonth = !isPre && !isNxt && !isCenter;
      }else{

        isCurMonth = !isPre && !isNxt
      }

      if ( year == curYear && month == curMonth && i == (firstDay+curDays) ) {
        isCurDay = true;
      }else {
        isCurDay = false;
      }

      var day = isPre ? preMonthDays - firstDay + i : isNxt ? i - firstDay - curMonthDays : i - firstDay;
      // console.log ( day )
      // console.log ( isCurMonth )
      dayArry.push({
        dayNum: day,
        isChoosed: (chooseDateArry[0] == year && chooseDateArry[1] == month && chooseDateArry[2] == (i - firstDay)),
        isSpecailDay: false,
        isCurMonth: isCurMonth,
        color: false,
        isCurDay: isCurDay
      })
    };
    console.log("----------------------------------------------------------------------");
    console.log(dayArry);
    return dayArry;

  };

  function getMonthDays(month) {
    //获取某年某月有多少天
    if(!!!month) return;
    var tempDate = new Date(2016, month, 0).getDate();
    return tempDate;
  };

  function getDayInWeek(year, month, day) {
    //返回某年某月某日是星期几
    if(!!!year || !!!month || !!!day || month - 1 < 0) return 0;
    var tempDate = new Date(year, month, day).getDay();
    return tempDate;
  };
  function getCurMonthDays() {
    var tempDate = new Date().getDate();
    return tempDate;
  }
  function getCurMonth() {
    var tempDate = new Date().getMonth()+1;
    return tempDate;
  }
  function getCurYear() {
    var tempDate = new Date().getFullYear();
    return tempDate;
  }
  //-------------------------月份数组拼接 END------------------------------------
</script>
<style lang="scss" scoped>
  .date_panel{
    text-align: center;
  }
  .doc-visi-container-box .date_picker{
    width: 100%;
    margin: 0px auto;
    position: absolute;
    bottom:0px;

  }
  .datePanelItem1 {
    width: 94vw;
    background: #fff;
    position: fixed;
    bottom:3vw;
    left:50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    z-index: 1000;
    background-color:transparent;
  .datepanelTit{

  }
  .box-date-body{
    background: #fff;
    padding:30px 0;
    border-radius:5px;
  }

  .panel_head {
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 0;
    width:320px;
    margin:0 auto;
    margin-bottom: 5px;
    margin-top:10px;

  span {
    display: inline-block;
    font-size: 16px;
    color: #666;
    cursor: pointer;

  }
  .change_month {
    width: 50px;
    font-family: sans-serif;
    font-weight: bold;
    color:#000;
  }
  .choose_btn {
    width: 60px !important;
    color:#666;
  }
  .yearchoose{
    margin-left:10px;
  }
  }

  .choose_box {
    position: absolute;
    top: 45px;
    left: 175px;
    width: 120px;
    background: #fff;
    border: 1px solid #9D94B0;
    font-size: 0;
    line-height: 25px;
  span {
    display: inline-block;
    width: 40px;
    height: 25px;
    font-size: 12px;
  }
  .change_year span {
    width: 50%;
    font-size: 16px;
  }
  &.choose_year_box {
     left: 55px;
   }
  }

  .panel_body {
    font-size: 0;
    span {
      display: inline-block;
      width: 10vw;
      height: 10vw;
      margin:1.2vw;
      line-height: 10vw;
      font-size: 12px;
      color: #666;
    }
  span:nth-child(7n),
  span:nth-child(7n+8),
  span:first-child{
    color: red;
  }
  .day_box{
    margin:0 auto;
  }
  .day_box span {
    text-align: center;
    padding: 0;
    border-radius: 50%;
    cursor: pointer;

  }
  .day_box span:not(.crn_month) {
    color: #999;
  }
  .day_box .only_day, .crn_month.on {
    background: #ff3b30;
    color: #fff !important;
  }
  .day_box .cur_day {
    background: #ff3b30;
    color: #fff !important;

  }

  }
  .box-btn-date{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin:0 auto;
    background-color:#fff;
    line-height:62px;
    text-align: center;
    margin-top:3vw;
    border-radius:5px;

  .btn-date-cancle{
    width: 50%;
    height: 62px;
  }
  .btn-date-ok{
    width: 50%;
    height: 62px;
    color:#2bb5b0;
  }
  }
  }
</style>

