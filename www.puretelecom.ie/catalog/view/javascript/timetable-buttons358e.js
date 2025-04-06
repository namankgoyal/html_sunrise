function timetableButtons() {

    const checkButton = $('#checkButton, .checkButton');
    const callButton = $('#callButton, .callButton');

    var d = new Date();

    var bankHolidays = {
      month: 2,
      date: 17
    }

    var beforeNewYear = {
      month: 11,
      date: 31
    }

    function isItBankHolidays() {
      return (
        d.getMonth() == bankHolidays.month && d.getDate() == bankHolidays.date
      );
    }

    function isItBeforeNewYear() {
      return (
        d.getMonth() == beforeNewYear.month && d.getDate() == beforeNewYear.date
      );
    }

    if(isItBankHolidays()){
      if (d.getHours() >= 0 && d.getHours() <= 0) {
        checkButton.addClass('hidden');
      } else {
        callButton.addClass('hidden');
      }
    } else if(isItBeforeNewYear()) {
      if(d.getHours() >= 9 && d.getHours() <= 16){
        checkButton.addClass('hidden');
      } else {
        callButton.addClass('hidden');
      }
    }
    // MONDAY to FRIDAY
    else if (d.getDay() >= 1 && d.getDay() <= 5) {
      if (d.getHours() >= 8 && d.getHours() <= 19) {
        checkButton.addClass('hidden');
      } else {
        callButton.addClass('hidden');
      }
    } else if (d.getDay() == 6) {
      if (d.getHours() >= 9 && d.getHours() <= 16) {
        checkButton.addClass('hidden');
      } else {
        callButton.addClass('hidden');
      }
    } else if (d.getDay() == 0) {
      callButton.addClass('hidden');
    }
}
    
$(function() {
  
    const callButton = $('#callButton');
    // Buttons on Mobile
    if (window.screen.width <= 768) {
        timetableButtons();
        } else {
        callButton.addClass('hidden');
    }

});