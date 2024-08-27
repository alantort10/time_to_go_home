const startTimeInput = document.getElementById('start-time');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const calculationsElement = document.getElementById('calculations');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

calculateBtn.addEventListener('click', calculateEndTime);
clearBtn.addEventListener('click', clearCalculations);

function calculateEndTime() {
  const startTime = startTimeInput.value;
  if (!isValidTime(startTime)) {
    alert('Invalid start time. Please enter a time in the format HH:MM.');
    return;
  }
  const endTime = calculateEndTimeFromStartTime(startTime);
  addCalculation(endTime);
}

function calculateEndTimeFromStartTime(startTime) {
  const startTimeParts = startTime.split(':');
  const startHours = parseInt(startTimeParts[0]);
  const startMinutes = parseInt(startTimeParts[1]);
  const totalMinutes = startHours * 60 + startMinutes;
  const endMinutes = totalMinutes + 8.5 * 60;
  const endHours = Math.floor(endMinutes / 60) % 24;
  const endMinutesRemainder = endMinutes % 60;
  const endTimeHours = endHours % 12;
  if (endTimeHours === 0) {
    endTimeHours = 12;
  }
  const endTimeMinutes = endMinutesRemainder.toString().padStart(2, '0');
  const endTimePeriod = endHours < 12? 'AM' : 'PM';
  if (endHours === 0) {
    endTimePeriod = 'AM';
  }
  const endTime = `${endTimeHours}:${endTimeMinutes} ${endTimePeriod}`;
  return endTime;
}

function addCalculation(endTime) {
  const calculationElement = document.createElement('li');
  calculationElement.textContent = `Start Time: ${startTimeInput.value}, Estimated End Time (including 30 minutes lunch): ${endTime}`;
  calculationsElement.appendChild(calculationElement);
}

function clearCalculations() {
  calculationsElement.innerHTML = '';
}

function isValidTime(time) {
  const timeParts = time.split(':');
  if (timeParts.length!== 2) {
    return false;
  }
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  if (isNaN(hours) || isNaN(minutes)) {
    return false;
  }
  if (hours < 0 || hours > 23) {
    return false;
  }
  if (minutes < 0 || minutes > 59) {
    return false;
  }
  return true;
}