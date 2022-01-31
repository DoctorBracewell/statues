// Set up dimensions for all the skin cubes (in order)
import { bodyPartsData } from "./bodyPartsData.js";

import { PROGRESS_ELEMENT } from "../constants.js";

// Create canvas and context to draw on
const canvas = document.createElement("canvas");
canvas.setAttribute("height", 64);
canvas.setAttribute("width", 64);

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

function createImage(imageSrc) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
  });
}

function copyOuterInner(context, skin) {
  // Head
  context.drawImage(skin, 0, 0, 32, 16, 0, 0, 32, 16);
  context.drawImage(skin, 32, 0, 32, 16, 0, 0, 32, 16);

  // right leg
  context.drawImage(skin, 0, 16, 16, 16, 0, 16, 16, 16);
  context.drawImage(skin, 0, 32, 16, 16, 0, 16, 16, 16);

  // torso
  context.drawImage(skin, 16, 16, 24, 16, 16, 16, 24, 16);
  context.drawImage(skin, 16, 32, 24, 16, 16, 16, 24, 16);

  // right arm
  context.drawImage(skin, 40, 16, 16, 16, 40, 16, 16, 16);
  context.drawImage(skin, 40, 32, 16, 16, 40, 16, 16, 16);

  // left leg
  context.drawImage(skin, 16, 48, 16, 16, 16, 48, 16, 16);
  context.drawImage(skin, 0, 48, 16, 16, 16, 48, 16, 16);

  // left arm
  context.drawImage(skin, 32, 48, 16, 16, 32, 48, 16, 16);
  context.drawImage(skin, 48, 48, 16, 16, 32, 48, 16, 16);
}

function mapHeads(layeredSkin) {
  const positions = {
    front: [8, 8],
    back: [24, 8],
    top: [8, 0],
    bottom: [16, 0],
    right: [0, 8],
    left: [16, 8],
  };

  // Now for each body part, map over all of the heads it is made up of
  const bodyPartsSkins = bodyPartsData.map(({ name, heads }) => {
    // For each head, reset the canvas
    const headsSkins = heads.map((head) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // For each side of the head, use the position data to scale and map the 4x4 area into the 8x8 area on the head area of the canvas
      for (const side of head) {
        ctx.drawImage(
          layeredSkin,
          side.x,
          side.y,
          4,
          4,
          ...positions[side.position],
          8,
          8
        );
      }

      // Then return the image data of this scaled up head
      return canvas.toDataURL("image/png");
    });

    // Then for each body part return a new object that has the skins for each head instead of just the positions
    return {
      name,
      skins: headsSkins,
    };
  });

  return bodyPartsSkins;
}

async function generateHeads(bodyPartsSkins) {
  const bodyPartsHeads = [];
  let indexTracker = 1;

  for (const { name, skins } of bodyPartsSkins) {
    const heads = [];

    // Map over all the heads in the body part
    for (const skin of skins) {
      // Update tracker
      PROGRESS_ELEMENT.textContent = `Generating skin ${indexTracker} out of 26...`;
      indexTracker++;

      // Create form data
      const blob = await fetch(skin).then((res) => res.blob());
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
      heads.push({
        value: apiResult.data.texture.value,
        id: apiResult.data.uuid,
      });
    }

    bodyPartsHeads.push({
      name,
      heads,
    });
  }

  return bodyPartsHeads;
}

export async function createSkins(imageData) {
  // Create Image object from skin
  const skin = await createImage(imageData);

  // Check skin dimensions and
  if (![skin.height, skin.width].every((dim) => dim === 64))
    throw new Error("Skin must be 64x64 pixels!");

  copyOuterInner(ctx, skin);

  // Save new image for splitting
  const layeredSkin = await createImage(canvas.toDataURL("image/png"));
  const bodyPartsSkins = mapHeads(layeredSkin);
  const bodyPartsHeads = await generateHeads(bodyPartsSkins);

  console.log(bodyPartsHeads);

  // // Create pillow with skin data
  // document.querySelector(".info").textContent = "Generating command...";
  // generateCommand(headsData);
}
