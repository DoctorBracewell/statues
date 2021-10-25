import { createSkins } from "./skinTranslator.js";

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(document.querySelector("#skin").files[0]);

    fileReader.addEventListener("load", (e) => {
      document.querySelector(".progress").style.display = "flex";
      createSkins(e.target.result);
    });
  } catch (error) {
    document.querySelector(".progress").style.display = "none";
    alert("Something went wrong! Reload to try again\n" + error);
  }
});
