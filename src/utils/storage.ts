export interface LocalStorage {
  videoLink?: string;
  isPopup?: boolean;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredIsPopup(isPopup: boolean): Promise<void> {
  return new Promise((resolve) => {
    const vals: LocalStorage = {
      isPopup,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredIsPopup(): Promise<boolean> {
  const keys: LocalStorageKeys[] = ["isPopup"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.isPopup);
    });
  });
}

export function setStoredVideoLink(videoLink: string): Promise<void> {
  return new Promise((resolve) => {
    const vals: LocalStorage = {
      videoLink,
    };
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredVideoLink(): Promise<string> {
  const keys: LocalStorageKeys[] = ["videoLink"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.videoLink);
    });
  });
}
