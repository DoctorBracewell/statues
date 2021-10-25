import { generateCommand } from "./pillowGenerator.js";

// Set up dimensions for all the skin cubes (in order)

const skins = {
  body: [
    [
      // Bottom left
      {
        x: 20,
        y: 60,
        position: "front",
      },
      {
        x: 16,
        y: 60,
        position: "right",
      },
      {
        x: 24,
        y: 60,
        position: "left",
      },
      {
        x: 28,
        y: 60,
        position: "back",
      },
      {
        x: 24,
        y: 48,
        position: "bottom",
      },
    ],
    [
      // Middle left
      {
        x: 20,
        y: 56,
        position: "front",
      },
      {
        x: 16,
        y: 56,
        position: "right",
      },
      {
        x: 24,
        y: 56,
        position: "left",
      },
      {
        x: 28,
        y: 56,
        position: "back",
      },
    ],
    [
      // Top left
      {
        x: 20,
        y: 52,
        position: "front",
      },
      {
        x: 16,
        y: 52,
        position: "right",
      },
      {
        x: 24,
        y: 52,
        position: "left",
      },
      {
        x: 28,
        y: 52,
        position: "back",
      },
      {
        x: 20,
        y: 48,
        position: "top",
      },
    ],
    [
      // Bottom torso left
      {
        x: 24,
        y: 28,
        position: "front",
      },
      {
        x: 28,
        y: 28,
        position: "left",
      },
      {
        x: 32,
        y: 28,
        position: "back",
      },
    ],
    [
      // Middle torso left
      {
        x: 24,
        y: 24,
        position: "front",
      },
      {
        x: 28,
        y: 24,
        position: "left",
      },
      {
        x: 32,
        y: 24,
        position: "back",
      },
    ],
    [
      // Top torso left
      {
        x: 24,
        y: 20,
        position: "front",
      },
      {
        x: 28,
        y: 20,
        position: "left",
      },
      {
        x: 32,
        y: 20,
        position: "back",
      },
      {
        x: 24,
        y: 16,
        position: "top",
      },
    ],
    [
      // Bottom right
      {
        x: 4,
        y: 28,
        position: "front",
      },
      {
        x: 0,
        y: 28,
        position: "right",
      },
      {
        x: 8,
        y: 28,
        position: "left",
      },
      {
        x: 12,
        y: 28,
        position: "back",
      },
      {
        x: 8,
        y: 16,
        position: "bottom",
      },
    ],
    [
      // Middle right
      {
        x: 4,
        y: 24,
        position: "front",
      },
      {
        x: 0,
        y: 24,
        position: "right",
      },
      {
        x: 8,
        y: 24,
        position: "left",
      },
      {
        x: 12,
        y: 24,
        position: "back",
      },
    ],
    [
      // Top right
      {
        x: 4,
        y: 20,
        position: "front",
      },
      {
        x: 0,
        y: 20,
        position: "right",
      },
      {
        x: 8,
        y: 20,
        position: "left",
      },
      {
        x: 12,
        y: 20,
        position: "back",
      },
      {
        x: 4,
        y: 16,
        position: "top",
      },
    ],
    [
      // Bottom torso Right
      {
        x: 20,
        y: 28,
        position: "front",
      },
      {
        x: 16,
        y: 28,
        position: "right",
      },
      {
        x: 36,
        y: 28,
        position: "back",
      },
    ],
    [
      // Middle torso Right
      {
        x: 20,
        y: 24,
        position: "front",
      },
      {
        x: 16,
        y: 24,
        position: "right",
      },
      {
        x: 36,
        y: 24,
        position: "back",
      },
    ],
    [
      // Top torso Right
      {
        x: 20,
        y: 20,
        position: "front",
      },
      {
        x: 16,
        y: 20,
        position: "right",
      },
      {
        x: 36,
        y: 20,
        position: "back",
      },
      {
        x: 20,
        y: 16,
        position: "top",
      },
    ],
  ],
  rightArm: [
    // Bottom
    [
      {
        x: 44,
        y: 28,
        position: "front",
      },
      {
        x: 40,
        y: 28,
        position: "right",
      },
      {
        x: 48,
        y: 28,
        position: "left",
      },
      {
        x: 52,
        y: 28,
        position: "back",
      },
      {
        x: 48,
        y: 16,
        position: "bottom",
      },
    ],
    // Middle
    [
      {
        x: 44,
        y: 24,
        position: "front",
      },
      {
        x: 40,
        y: 24,
        position: "right",
      },
      {
        x: 48,
        y: 24,
        position: "left",
      },
      {
        x: 52,
        y: 24,
        position: "back",
      },
    ], // Top
    [
      {
        x: 44,
        y: 20,
        position: "front",
      },
      {
        x: 40,
        y: 20,
        position: "right",
      },
      {
        x: 48,
        y: 20,
        position: "left",
      },
      {
        x: 52,
        y: 20,
        position: "back",
      },
      {
        x: 44,
        y: 16,
        position: "top",
      },
    ],
  ],
  leftArm: [
    // Bottom
    [
      {
        x: 36,
        y: 60,
        position: "front",
      },
      {
        x: 32,
        y: 60,
        position: "right",
      },
      {
        x: 40,
        y: 60,
        position: "left",
      },
      {
        x: 44,
        y: 60,
        position: "back",
      },
      {
        x: 40,
        y: 48,
        position: "bottom",
      },
    ],
    // Middle
    [
      {
        x: 36,
        y: 56,
        position: "front",
      },
      {
        x: 32,
        y: 56,
        position: "right",
      },
      {
        x: 40,
        y: 56,
        position: "left",
      },
      {
        x: 44,
        y: 56,
        position: "back",
      },
    ], // Top
    [
      {
        x: 36,
        y: 52,
        position: "front",
      },
      {
        x: 32,
        y: 52,
        position: "right",
      },
      {
        x: 40,
        y: 52,
        position: "left",
      },
      {
        x: 44,
        y: 52,
        position: "back",
      },
      {
        x: 36,
        y: 48,
        position: "top",
      },
    ],
  ],
  head: [
    [
      // Bottom Front Left
      {
        x: 12,
        y: 12,
        position: "front",
      },
      {
        x: 16,
        y: 12,
        position: "left",
      },
      {
        x: 20,
        y: 4,
        position: "bottom",
      },
    ],
    [
      // Bottom Back Left
      {
        x: 24,
        y: 12,
        position: "back",
      },
      {
        x: 20,
        y: 12,
        position: "left",
      },
      {
        x: 20,
        y: 0,
        position: "bottom",
      },
    ],
    [
      // Top Front Left
      {
        x: 12,
        y: 8,
        position: "front",
      },
      {
        x: 16,
        y: 8,
        position: "left",
      },
      {
        x: 12,
        y: 4,
        position: "top",
      },
    ],
    [
      // Top Back Left
      {
        x: 24,
        y: 8,
        position: "back",
      },
      {
        x: 20,
        y: 8,
        position: "left",
      },
      {
        x: 12,
        y: 0,
        position: "top",
      },
    ],
    [
      // Bottom Front Right
      {
        x: 8,
        y: 12,
        position: "front",
      },
      {
        x: 4,
        y: 12,
        position: "right",
      },
      {
        x: 16,
        y: 4,
        position: "bottom",
      },
    ],
    [
      // Bottom Back Right
      {
        x: 28,
        y: 12,
        position: "back",
      },
      {
        x: 0,
        y: 12,
        position: "right",
      },
      {
        x: 16,
        y: 0,
        position: "bottom",
      },
    ],
    [
      // Top Front Left
      {
        x: 8,
        y: 8,
        position: "front",
      },
      {
        x: 4,
        y: 8,
        position: "right",
      },
      {
        x: 8,
        y: 4,
        position: "top",
      },
    ],
    [
      // Top Back Right
      {
        x: 28,
        y: 8,
        position: "back",
      },
      {
        x: 0,
        y: 8,
        position: "right",
      },
      {
        x: 8,
        y: 0,
        position: "top",
      },
    ],
  ],
};

export function createSkins(imageData) {
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
