// Document Queries
const container = document.querySelector(".container");

// Draggable Container
const drag = ({ movementX, movementY }) => {
    const getStyles = window.getComputedStyle(container);
    const left = parseInt(getStyles.left);
    const top = parseInt(getStyles.top);
    container.style.left = `${left + movementX}px`;
    container.style.top = `${top + movementY}px`;
  };
  container.addEventListener("mousedown", () => {
    container.addEventListener("mousemove", drag);
  });
  container.addEventListener("mouseup", () => {
    container.removeEventListener("mousemove", drag);
  });

export { container, drag }