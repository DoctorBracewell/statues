import { generateCommand } from "./pillowGenerator.js";

// Set up dimensions for all the skin cubes (in order)
import { skins } from "../src/skins/skinData.js";

export function createSkins(imageData) {
  // Show progress
  document.querySelector(".progress").style.display = "flex";

  const skin = new Image();
  skin.src = imageData;

  skin.addEventListener("load", () => {
    if (![skin.height, skin.width].every((dim) => dim === 64))
      throw new Error("Skin must be 64x64 pixels!");

    const canvas = document.createElement("canvas");
    canvas.width = skin.width;
    canvas.height = skin.height;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // Step 1 - Copy outer layer onto inner layer to remove 3D effect (keeping transparency)

    // Head
    ctx.drawImage(skin, 0, 0, 32, 16, 0, 0, 32, 16);
    ctx.drawImage(skin, 32, 0, 32, 16, 0, 0, 32, 16);

    // right leg
    ctx.drawImage(skin, 0, 16, 16, 16, 0, 16, 16, 16);
    ctx.drawImage(skin, 0, 32, 16, 16, 0, 16, 16, 16);

    // torso
    ctx.drawImage(skin, 16, 16, 24, 16, 16, 16, 24, 16);
    ctx.drawImage(skin, 16, 32, 24, 16, 16, 16, 24, 16);

    // right arm
    ctx.drawImage(skin, 40, 16, 16, 16, 40, 16, 16, 16);
    ctx.drawImage(skin, 40, 32, 16, 16, 40, 16, 16, 16);

    // left leg
    ctx.drawImage(skin, 16, 48, 16, 16, 16, 48, 16, 16);
    ctx.drawImage(skin, 0, 48, 16, 16, 16, 48, 16, 16);

    // left arm
    ctx.drawImage(skin, 32, 48, 16, 16, 32, 48, 16, 16);
    ctx.drawImage(skin, 48, 48, 16, 16, 32, 48, 16, 16);

    // Save new image for splitting
    const layeredSkin = new Image();
    layeredSkin.src = canvas.toDataURL("image/png");

    layeredSkin.addEventListener("load", async () => {
      // Now we translate each body part onto a larger head and save in a new object
      const headSkins = {};

      for (const bodyPart in skins) {
        headSkins[bodyPart] = skins[bodyPart].map((head) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          head.forEach((patch) => {
            const positions = {
              front: [8, 8],
              back: [24, 8],
              top: [8, 0],
              bottom: [16, 0],
              right: [0, 8],
              left: [16, 8],
            };

            ctx.drawImage(
              layeredSkin,
              patch.x,
              patch.y,
              4,
              4,
              ...positions[patch.position],
              8,
              8
            );
          });

          return canvas.toDataURL("image/png");
        });
      }

      // now with our headSkins object, we send them off to the API

      const headsData = {};
      let skinTracker = 1;

      // For each body party
      for (const headSkin in headSkins) {
        // Init new array in new object
        headsData[headSkin] = [];

        // For each head that makes up the body party
        for (const head of headSkins[headSkin]) {
          // Track number of skins generated
          document.querySelector(
            ".info"
          ).textContent = `Generating skin ${skinTracker} out of 26...`;
          skinTracker++;

          // Create form data
          const blob = await fetch(head).then((res) => res.blob());
          const file = new File([blob], "skin.png", { type: "image/png" });

          const formData = new FormData();
          formData.append("file", file);

          // Send to API
          const apiResult = await fetch(
            "https://api.mineskin.org/generate/upload",
            {
              method: "POST",
              headers: {
                "User-Agent": "drbracewellpillow",
              },
              body: formData,
            }
          ).then((res) => res.json());

          // Save in object
          headsData[headSkin].push({
            value: apiResult.data.texture.value,
            id: apiResult.data.uuid,
          });

          // Wait 6 seconds in between each one for rate limit
          if (skinTracker !== 27) await new Promise((r) => setTimeout(r, 5000));
        }
      }

      // Create pillow with skin data
      document.querySelector(".info").textContent = "Generating command...";
      generateCommand(headsData);
    });
  });
}
