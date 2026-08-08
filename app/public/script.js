console.log("script.js loaded");

const button = document.querySelector("button");

console.log(button);

button.addEventListener("click", () => {
    alert("✅ Application is running successfully!");
});