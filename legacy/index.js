import { createSkins } from "./skinTranslator.js";

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    if (document.querySelector("#skin").disabled) {
      const username = document.querySelector("#username").value;

      const {
        textures: {
          skin: { data },
        },
      } = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`).then(
        (res) => res.json()
      );

      createSkins(`data:image/png;base64,${data}`);
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(document.querySelector("#skin").files[0]);

      fileReader.addEventListener("load", (e) => {
        createSkins(e.target.result);
      });
    }
  } catch (error) {
    document.querySelector(".progress").style.display = "none";
    alert("Something went wrong! Reload to try again\n" + error);
  }
});

document.querySelector("#username").addEventListener("input", (event) => {
  if (event.target.value === "")
    return (document.querySelector("#skin").disabled = false);

  document.querySelector("#skin").disabled = true;
});

document.querySelector("#skin").addEventListener("change", () => {
  document.querySelector("#username").disabled = true;
});
