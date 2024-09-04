const startTimeInput = document.getElementById('start-time');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const calculationsElement = document.getElementById('calculations');
const form = document.querySelector('form');
const darkModeToggle = document.getElementById('dark-mode-toggle');

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

calculateBtn.addEventListener('click', calculateEndTime);
clearBtn.addEventListener('click', clearCalculations);

function calculateEndTime() {
  const startTime = startTimeInput.value;
  if (!isValidTime(startTime)) {
    alert('Invalid start time. Please enter a time in the format H:MM or HH:MM');
    return;
  }
  const endTime = calculateEndTimeFromStartTime(startTime);
  const endTime12 = convertTo12HourFormat(endTime);
  const fifthHourTime = calculateFifthHourTime(startTime);
  const fifthHourTime12 = convertTo12HourFormat(fifthHourTime);
  addCalculation(endTime, endTime12, fifthHourTime, fifthHourTime12);
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

function calculateFifthHourTime(startTime) {
  const timeParts = startTime.split(':');
  const startHours = parseInt(timeParts[0]);
  const startMinutes = parseInt(timeParts[1]);
  const totalMinutes = startHours * 60 + startMinutes;
  const fifthHourMinutes = totalMinutes + 5 * 60;
  const fifthHourHours = Math.floor(fifthHourMinutes / 60);
  const fifthHourMinutesRemainder = fifthHourMinutes % 60;
  const fifthHourTimeHours = fifthHourHours % 24;
  const fifthHourTimeMinutes = fifthHourMinutesRemainder.toString().padStart(2, '0');
  const fifthHourTime = `${fifthHourTimeHours.toString().padStart(2, '0')}:${fifthHourTimeMinutes}`;
  return fifthHourTime;
}

function convertTo12HourFormat(time) {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const hours12 = hours % 12 === 0? 12 : hours % 12;
  const ampm = hours < 12? 'am' : 'pm';
  return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

function addCalculation(endTime, endTime12, fifthHourTime, fifthHourTime12) {
  const calculationElement = document.createElement('li');
  calculationElement.style.fontSize = '24px';
  calculationElement.style.paddingRight = '4vh';
  calculationElement.style.borderBlockColor = "#000";
  const endTimeElement = document.createElement('span');
  endTimeElement.style.fontWeight = 'bold';
  endTimeElement.textContent = endTime;
  const endTime12Element = document.createElement('span');
  endTime12Element.style.fontWeight = 'bold';
  endTime12Element.textContent = endTime12;
  const fifthHourTimeElement = document.createElement('span');
  fifthHourTimeElement.style.fontWeight = 'sbold';
  fifthHourTimeElement.textContent = fifthHourTime;
  const fifthHourTime12Element = document.createElement('span');
  fifthHourTime12Element.style.fontWeight = 'bold';
  fifthHourTime12Element.textContent = fifthHourTime12;
  calculationElement.textContent = `take lunch before `;
  calculationElement.appendChild(fifthHourTime12Element);
  calculationElement.appendChild(document.createElement('br')); // Add a line break
  calculationElement.appendChild(document.createTextNode('go home at '));
  calculationElement.appendChild(endTime12Element);
  calculationsElement.appendChild(calculationElement);
  calculationsElement.appendChild(document.createElement('br')); // Add a line break after every calculation
}

function clearCalculations() {
  calculationsElement.innerHTML = '';
  startTimeInput.value = '';
}

function isValidTime(time) {
  const timeParts = time.split(':');
  if (timeParts.length!== 2) {
    return false;
  }
  const hours = timeParts[0];
  const minutes = timeParts[1];
  if (minutes.length!== 2) {
    return false;
  }
  const hoursValue = parseInt(hours);
  const minutesValue = parseInt(minutes);
  if (isNaN(hoursValue) || isNaN(minutesValue)) {
    return false;
  }
  if (hoursValue < 0 || hoursValue > 23) {
    return false;
  }
  if (minutesValue < 0 || minutesValue > 59) {
    return false;
  }
  return true;
}

const storedDarkMode = localStorage.getItem('darkMode');
if (storedDarkMode === 'true') {
  darkModeToggle.checked = true;
  document.body.classList.add('dark-mode');
} else {
  darkModeToggle.checked = false;
  document.body.classList.remove('dark-mode');
}

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
  }
});
