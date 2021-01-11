workSchedule = [];
workTime = [
  "9:00Am",
  "10:00Am",
  "11:00Am",
  "12:00Am",
  "1:00PM",
  "2:00PM",
  "3:00PM",
  "4:00PM",
  "5:00PM",
];
//append current time to the paragraph
currentDate = moment().format("dddd, MMMM Do");
$("#currentDay").append(currentDate);
//to refresh the webpage every hour to know the change
setTimeout(function () {
  location.reload();
}, 1000 * 60 * 60);
//create schedule and append to the dom
function displaySchedule() {
  for (var i = 0; i < workTime.length; i++) {
    var timePlanDiv = $("<div>").addClass("row");
    var container = $(".container");
    var timeScheduleDiv = $("<div>").addClass(
      "col-4 col-sm-3 col-md-2 col-lg-1 border-left-0 p-4"
    );
    var planDiv = $("<div>").addClass(
      "col-4 col-sm-6 col-md-8 col-lg-10 border-0 text-dark pl-0"
    );
    var savePlan = $("<div>").addClass(
      "col-4 col-sm-3 col-md-2 col-lg-1 saveBtn"
    );

    var planTime = $("<span>").text(workTime[i]);
    //get the schedule from the localstorage
    workSchedule = JSON.parse(localStorage.getItem("plans-to-do")) || [];
    var plan = " ";
    //push work plans to the workschedule array
    if (workSchedule[i]) {
      plan = workSchedule[i].plan;
    }
    var planTextP = $("<p>").text(plan);
    planTextP.addClass("planText");
    planDiv.append(planTextP);
    var saveIcon = $("<i>").addClass("fas fa-save");
    savePlan.append(saveIcon);
    timeScheduleDiv.append(planTime);
    //appending the plan time and save divs to the row class container div
    timePlanDiv.append(timeScheduleDiv, planDiv, savePlan);
    container.append(timePlanDiv);
    //save the current time in hour and second format and compare with the schedule time
    var currentTime = moment().format("LT");
    var beginningTime = moment(currentTime, "h:mma");
    planTime = planTime.text().trim();
    console.log(planTime);
    var endTime = moment(planTime, "h:mma");
    if (beginningTime.isBefore(endTime)) {
      planDiv.addClass("future");
      console.log("future");
    } else if (beginningTime.isAfter(endTime)) {
      planDiv.addClass("past");
      console.log("past");
    } else {
      planDiv.addClass("present");
      console.log("present");
    }
  }
}
//clicking the paragraph then it will change to textarea
$(".container").on("click", "p", function () {
  console.log("this is paragraph");
  var plan = $(this).text().trim();
  var planTextArea = $("<textarea>").val(plan);
  planTextArea.addClass("textarea");
  $(this).replaceWith(planTextArea);
});
//
$(".container").on("click", ".saveBtn", function () {
  //finding index of button parent
  var index = $(this).parent().index();

  //finding the value of sibling div which contains the textarea
  var planText = $(this).prev("div").children().val();

  console.log(planText);
  //check whether the schedule plan is paragraph or text area if it is paragraph then the plan text will be the value of it
  if (planText == "") {
    planText = $(this).prev("div").children().text().trim();
  }
  if (planText == "") {
    planText = " ";
  }
  var planTime = $(this).prev("div").prev("div").text().trim();
  //updating the array using the parent index
  workSchedule[index] = { plan: planText, time: planTime };
  savePlan();
  var planTextP = $("<p>").text(planText);
  planTextP.addClass("planText");
  planTextP.replaceWith(planText);
});
//save plan to local storage
function savePlan() {
  localStorage.setItem("plans-to-do", JSON.stringify(workSchedule));
}

// display the schedule plan
displaySchedule();
