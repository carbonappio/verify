"use strict";

import phin from "phin";

/**
 * Function to search if user is linked with Bloxlink API via Discord user ID
 * @param {number|string} id Discord ID to search upon.
 * @returns {Promise} Promise that reflects an object with the user's data, or false if none is found.
 */

export async function checkBloxlink(UserId) {
  if (!UserId) {
    throw new Error("No Discord user ID was provided!")
  }

  try {
    const { body } = await phin({
      url: `https://api.blox.link/v1/user/${UserId}`,
      parse: 'json'
    });

    return body.status === "error"
      ? {
        linked: false,
        message: "User not linked with Bloxlink"
      }
      : {
        linked: true,
        DiscordId: UserId,
        RobloxId: body.primaryAccount,
      };

  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Function to search if user is linked with Eastside Platform API via Discord user ID
 * @param {number|string} id Discord ID to search upon.
 * @returns {Promise} Promise that reflects an object with the user's data, or false if none is found.
 */

export async function checkEastside(UserId) {
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

/**
 * Function to search if user is linked with Rover API via Discord user ID
 * @param {number|string} id Discord ID to search upon.
 * @returns {Promise} Promise that reflects an object with the user's data, or false if none is found.
 */

 export async function checkRover(UserId) {
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

export async function checkAll(UserId) {
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