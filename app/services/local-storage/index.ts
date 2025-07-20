/* eslint-disable @typescript-eslint/no-unused-vars */

export function readLocalStorage(key: string) {
  try {
    return testJSON(localStorage.getItem(key) ?? "");
  } catch (error) {
    return "";
  }
}

export function writeLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function deleteLocalStorage(key: string) {
    localStorage.removeItem(key)
  }

function testJSON(text: string | undefined) {
  if (typeof text !== "string") {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}
