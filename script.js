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
  const endTime12 = convertTo12HourFormat(endTime);
  addCalculation(endTime, endTime12);
}

function calculateEndTimeFromStartTime(startTime) {
  const timeParts = startTime.split(':');
  const startHours = parseInt(timeParts[0]);
  const startMinutes = parseInt(timeParts[1]);
  const totalMinutes = startHours * 60 + startMinutes;
  const endMinutes = totalMinutes + 8.5 * 60;
  const endHours = Math.floor(endMinutes / 60);
  const endMinutesRemainder = endMinutes % 60;
  const endTimeHours = endHours % 24;
  const endTimeMinutes = endMinutesRemainder.toString().padStart(2, '0');
  const endTime = `${endTimeHours.toString().padStart(2, '0')}:${endTimeMinutes}`;
  return endTime;
}

function convertTo12HourFormat(time) {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const hours12 = hours % 12 === 0? 12 : hours % 12;
  const ampm = hours < 12? 'AM' : 'PM';
  return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

function addCalculation(endTime, endTime12) {
  const calculationElement = document.createElement('li');
  calculationElement.style.fontSize = '24px';
  const endTimeElement = document.createElement('span');
  endTimeElement.style.fontWeight = 'bold';
  endTimeElement.textContent = endTime;
  const endTime12Element = document.createElement('span');
  endTime12Element.style.fontWeight = 'bold';
  endTime12Element.textContent = endTime12;
  calculationElement.textContent = `${startTimeInput.value} start time, you can go home at `;
  calculationElement.appendChild(endTimeElement);
  calculationElement.appendChild(document.createTextNode(' ('));
  calculationElement.appendChild(endTime12Element);
  calculationElement.appendChild(document.createTextNode(').'));
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
