document.querySelector("#username").addEventListener("input", (event) => {
  if (event.target.value === "")
    return (document.querySelector("#skin").disabled = false);

  document.querySelector("#skin").disabled = true;
});

document.querySelector("#skin").addEventListener("change", () => {
  document.querySelector("#username").disabled = true;
});
