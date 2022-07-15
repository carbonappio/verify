const phin = require('phin');
const axios = require('axios').default;
const config = require('../config.json');

async function checkBloxlink(UserId) {
  if (!UserId) {
    throw new Error("No Discord user ID was provided!")
  }

  try {
    const { data } = await axios.get(`https://v3.blox.link/developer/discord/${UserId}`, {
      headers: {
        "api-key": "e277d215-bf2a-462a-bfd7-eb988ce87f33"
      }
    });

    return data.user.robloxId === null
      ? {
        linked: false,
        message: "User not linked with Bloxlink"
      }
      : {
        linked: true,
        DiscordId: UserId,
        RobloxId: data.user.robloxId,
      };

  } catch (error) {
    throw new Error(error);
  }
}

async function checkEastside(UserId) {
  if (!UserId) {
    throw new Error("No Discord user ID was provided!")
  }

  try {
    const { body } = await phin({
      url: `https://spark.eastsideapp.com/verification/check/${UserId}`,
      parse: 'json'
    });

    return body.success == false
      ? {
        linked: false,
        message: "User not linked with Eastside Verification"
      }
      : {
        linked: true,
        DiscordId: UserId,
        RobloxId: body.roblox_userid,
      };

  } catch (error) {
    throw new Error(error);
  }
}

async function checkRover(UserId) {
  if (!UserId) {
    throw new Error("No Discord user ID was provided!")
  }

  try {
    const { body } = await phin({
      url: `https://verify.eryn.io/api/user/${UserId}`,
      parse: 'json'
    });

    return body.status == "error"
      ? {
        linked: false,
        message: "User not linked with Rover"
      }
      : {
        linked: true,
        DiscordId: UserId,
        RobloxId: `${body.robloxId}`,
      };

  } catch (error) {
    throw new Error(error);
  }
}

async function checkAll(UserId) {
  if (!UserId) {
    throw new Error("No Discord user ID was provided!")
  }

  let BloxlinkData = await checkBloxlink(UserId)
  let RoverData = await checkRover(UserId)
  let EastsideData = await checkEastside(UserId)

  let data = {
    bloxlink: BloxlinkData,
    rover: RoverData,
    eastside: EastsideData
  }

  return data
}

async function generateWords(count = 5, words = config.words) {
  const selected = [];
  for (let i = 0; i < count; i++) {
    selected.push(words[Math.floor(Math.random() * words.length)]);
  }

  return selected.join(" ");
}

module.exports = {
  checkBloxlink,
  checkEastside,
  checkRover,
  checkAll,
  generateWords
}
