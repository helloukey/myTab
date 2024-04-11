// Date Document Queries
const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");

setInterval(() => {
  timeContainer.textContent = dayjs().format("h:mm A");
}, 1000);

setInterval(() => {
  dateContainer.textContent = dayjs().format("MMMM D, YYYY");
}, 1000);

export { timeContainer, dateContainer }