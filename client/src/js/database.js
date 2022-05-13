import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, todo: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
  if (result) {
    console.log("saved to db", result);
  } else {
    console.error("did not work");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log("GET all from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  if (result) {
    console.log("result.value", result);
    return result.value;
  } else {
    console.error("not implemented");
  }
};

initdb();
