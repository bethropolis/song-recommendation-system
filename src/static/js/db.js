// db.js
import Dexie from 'dexie';

export const db = new Dexie('MusicRecommendationAppDatabase');
db.version(2).stores({
  users: '++id,&username',
  openFiles: '++id,&fileName,fileData,timestamp', 
  userUploadedFiles: '++id,&fileName,fileData,timestamp',
  sharedData: '++id,userId, colors, data,timestamp',
});


// @ts-ignore
db.users.put({
  username: "default",
})

export const DB = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const value = localStorage?.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  update: (key, value) => {
    const currentValue = DB.get(key);
    if (currentValue !== null) {
      DB.set(key, value);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
