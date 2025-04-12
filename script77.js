const monthYearElement = document.getElementById('month-year');
const calendarDaysElement = document.getElementById('calendar-days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const reminderDetails = document.getElementById('reminder-details');
const selectedDateDisplay = document.getElementById('selected-date-display');
const reminderTextInput = document.getElementById('reminder-text');
const saveReminderButton = document.getElementById('save-reminder');
const deleteReminderButton = document.getElementById('delete-reminder');

let currentDate = new Date();
let selectedDate = null;
let selectedDateString = null;

const reservedDates = JSON.parse(localStorage.getItem('reservedDates')) || {};
const reminders = JSON.parse(localStorage.getItem('reminders')) || {};

function generateDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderCalendar(year, month) {
  calendarDaysElement.innerHTML = '';
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  monthYearElement.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

  const today = new Date();
  const todayKey = generateDateKey(today);

  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    calendarDaysElement.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    const currentDayDate = new Date(year, month, day);
    const dateKey = generateDateKey(currentDayDate);

    dayCell.textContent = day;
    dayCell.classList.add('day');
    dayCell.dataset.date = dateKey;

    if (dateKey === todayKey) {
      dayCell.classList.add('today');
    }

    if (reservedDates[dateKey]) {
      dayCell.classList.add('selected');
    }

    if (reminders[dateKey]) {
      dayCell.classList.add('has-reminder');
    }

    dayCell.addEventListener('click', () => handleDateClick(dayCell, dateKey));
    calendarDaysElement.appendChild(dayCell);
  }

  const totalCells = startDayOfWeek + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;

  for (let i = 0; i < remainingCells; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    calendarDaysElement.appendChild(emptyCell);
  }

  updateReminderSection();
}

function handleDateClick(dayCell, dateKey) {
  if (selectedDate === dayCell) {
    selectedDateString = dateKey;
    selectedDateDisplay.textContent = dateKey;
    reminderTextInput.value = reminders[dateKey] || '';
    updateReminderSection(true);
    return;
  }

  if (selectedDate) {
    selectedDate.classList.remove('selected');
    if (!reservedDates[selectedDate.dataset.date]) {
      selectedDate.classList.remove('selected');
    }
  }

  selectedDate = dayCell;
  selectedDateString = dateKey;
  selectedDateDisplay.textContent = dateKey;

  if (reservedDates[dateKey]) {
    delete reservedDates[dateKey];
    dayCell.classList.remove('selected');
  } else {
    reservedDates[dateKey] = true;
    dayCell.classList.add('selected');
  }

  localStorage.setItem('reservedDates', JSON.stringify(reservedDates));

  reminderTextInput.value = reminders[dateKey] || '';
  updateReminderSection();
}

function updateReminderSection(forceShow = false) {
  if (selectedDateString && forceShow) {
    reminderDetails.style.display = 'block';
  } else if (selectedDateString) {
    reminderDetails.style.display = 'block';
  } else {
    reminderDetails.style.display = 'none';
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  selectedDate = null;
  selectedDateString = null;
  updateReminderSection();
}

function saveReminder() {
  if (!selectedDateString) return;

  const reminderText = reminderTextInput.value.trim();
  const dayCell = calendarDaysElement.querySelector(`[data-date="${selectedDateString}"]`);

  if (reminderText) {
    reminders[selectedDateString] = reminderText;
    if (dayCell) dayCell.classList.add('has-reminder');
    console.log(`Reminder saved for ${selectedDateString}: ${reminderText}`);
  } else {
    deleteReminder();
    return;
  }

  localStorage.setItem('reminders', JSON.stringify(reminders));
  alert('Reminder saved!');
}

function deleteReminder() {
  if (!selectedDateString) return;

  const dayCell = calendarDaysElement.querySelector(`[data-date="${selectedDateString}"]`);

  if (reminders[selectedDateString]) {
    delete reminders[selectedDateString];
    if (dayCell) dayCell.classList.remove('has-reminder');
    reminderTextInput.value = '';
    localStorage.setItem('reminders', JSON.stringify(reminders));
    console.log(`Reminder deleted for ${selectedDateString}`);
    alert('Reminder deleted!');
  } else {
    alert('No reminder to delete for this date.');
  }

  updateReminderSection(true);
}

// --- Event Listeners ---
prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));
saveReminderButton.addEventListener('click', saveReminder);
deleteReminderButton.addEventListener('click', deleteReminder);

// --- Initial Render ---
renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
updateReminderSection();
