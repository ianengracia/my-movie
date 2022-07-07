const AVATAR_GENERATOR_API = "https://ui-avatars.com/api/?color=fff";

const generate = (name) => {
  return encodeURI(`${AVATAR_GENERATOR_API}&background=${getRandomBackground()}&name=${name}`);
};

function getRandomBackground() {
  const iconColors = [
    "ff7979",
    "badc58",
    "7ed6df",
    "30336b",
    "130f40",
    "be2edd",
    "ff9f43",
    "576574",
    "01a3a4",
    "C4E538",
  ];

  const color = iconColors[Math.floor(Math.random() * 10)];

  return color;
}

module.exports = { generate };
