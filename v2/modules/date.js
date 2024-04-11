// Date Document Queries
const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");

setInterval(() => {
  // eslint-disable-next-line no-undef
  timeContainer.textContent = dayjs().format("h:mm A");
}, 1000);

setInterval(() => {
  // eslint-disable-next-line no-undef
  dateContainer.textContent = dayjs().format("MMMM D, YYYY");
}, 1000);

export { timeContainer, dateContainer };
