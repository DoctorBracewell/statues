import { generateNbtString } from "./pillowGenerator.js";

export function createArmorStandData(normalSized, nameData) {
  const data = [
    {
      type: "node",
      key: "Invisible",
      value: "1b",
    },
    {
      type: "node",
      key: "NoBasePlate",
      value: "1b",
    },
    {
      type: "node",
      key: "NoGravity",
      value: "1b",
    },
    {
      type: "node",
      key: "Invulnerable",
      value: "1b",
    },
    {
      type: "tree",
      key: "Pose",
      value: [
        {
          type: "array",
          key: "RightArm",
          value: [
            {
              type: "value",
              value: "-45.0f",
            },
            {
              type: "value",
              value: "45.0f",
            },
            {
              type: "value",
              value: "0.0f",
            },
          ],
        },
      ],
    },
    {
      type: "node",
      key: "ShowArms",
      value: "1b",
    },
  ];

  // Only show name on stands with active names
  if (nameData.active)
    data.push(
      {
        type: "node",
        key: "CustomNameVisible",
        value: "1b",
      },
      {
        type: "node",
        key: "CustomName",
        value: `\\"${nameData.value}\\"`,
      }
    );

  // Add rotation if its not normal sized
  if (!normalSized)
    data.push({
      type: "array",
      key: "Rotation",
      value: [
        {
          type: "value",
          value: "180f",
        },
      ],
    });

  return data;
}

export function createHeadData({ id, value }) {
  return {
    type: "value",
    value: `{${generateNbtString([
      {
        type: "node",
        key: "id",
        value: '\\"skull\\"',
      },
      {
        type: "node",
        key: "Count",
        value: "1b",
      },
      {
        type: "node",
        key: "Damage",
        value: "3s",
      },
      {
        type: "tree",
        key: "tag",
        value: [
          {
            type: "tree",
            key: "SkullOwner",
            value: [
              {
                type: "node",
                key: "Id",
                value: `\\"${id}\\"`,
              },
              {
                type: "tree",
                key: "Properties",
                value: [
                  {
                    type: "array",
                    key: "textures",
                    value: [
                      {
                        type: "value",
                        value: `{${generateNbtString([
                          {
                            type: "node",
                            key: "Value",
                            value: `\\"${value}\\"`,
                          },
                        ])}}`,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ])}}`,
  };
}

export function createInitialData(length, commandData) {
  return [
    {
      type: "node",
      key: "Block",
      value: "redstone_block",
    },
    {
      type: "node",
      key: "Data",
      value: "0",
    },
    {
      type: "node",
      key: "Time",
      value: "1",
    },
    {
      type: "node",
      key: "DropItem",
      value: "0",
    },
    {
      type: "tree",
      key: "Riding",
      value: [
        {
          type: "node",
          key: "id",
          value: '"FallingSand"',
        },
        {
          type: "node",
          key: "Block",
          value: "command_block",
        },
        {
          type: "node",
          key: "Data",
          value: "0",
        },
        {
          type: "tree",
          key: "TileEntityData",
          value: [
            {
              type: "node",
              key: "Command",
              value: `"/fill ~1 ~-1 ~ ~1 ~-${length + 1} ~ redstone_block"`,
            },
          ],
        },
        {
          type: "node",
          key: "Time",
          value: "1",
        },
        {
          type: "node",
          key: "DropItem",
          value: "0",
        },
        {
          type: "tree",
          key: "Riding",
          value: [
            {
              type: "node",
              key: "id",
              value: '"FallingSand"',
            },
            {
              type: "node",
              key: "Block",
              value: "command_block",
            },
            {
              type: "node",
              key: "Data",
              value: "0",
            },
            {
              type: "tree",
              key: "TileEntityData",
              value: [
                {
                  type: "node",
                  key: "Command",
                  value: `"/fill ~1 ~2 ~ ~ ~-${length + 1} ~ air"`,
                },
              ],
            },
            {
              type: "node",
              key: "DropItem",
              value: "0",
            },
            {
              type: "node",
              key: "Time",
              value: "1",
            },
            {
              type: "tree",
              key: "Riding",
              value: commandData,
            },
          ],
        },
      ],
    },
  ];
}

export const fallingSand = [
  {
    type: "node",
    key: "id",
    value: '"FallingSand"',
  },
  {
    type: "node",
    key: "Block",
    value: "command_block",
  },
  {
    type: "node",
    key: "Data",
    value: '"0"',
  },
  {
    type: "node",
    key: "Time",
    value: "1",
  },
  {
    type: "node",
    key: "DropItem",
    value: "0",
  },
];

export const summonOffsets = {
  normal: {
    x: -0.05,
    y: -0.9,
    z: -0.3,
  },
  giant: {
    x: 0,
    y: -1.425,
    z: 0,
  },
};

export const nameStandPositions = {
  normal: {
    x: -0.45,
    y: 0.8,
    z: 0.8,
  },
  giant: {
    x: 0.875,
    y: 4.125,
    z: 0.4,
  },
};

export const equipmentArray = Array(4).fill({
  type: "value",
  value: "{}",
});
