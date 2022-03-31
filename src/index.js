import "../style/index.css";
import "./base/toggleFileInput";
import { getSkinData } from "./base";
import { createSkins } from "./skinMapper";

import { PROGRESS_ELEMENT } from "./constants";

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    PROGRESS_ELEMENT.style.display = "flex";
    PROGRESS_ELEMENT.textContent = "Loading initial skin file...";

    const skinData = await getSkinData();
    const skins = createSkins(skinData);

    
  } catch (error) {
    document.querySelector(".progress").style.display = "none";

    alert("Something went wrong! Reload to try again\n" + error);
  }
});
