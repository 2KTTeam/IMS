const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const cacheFilePath = path.join(__dirname, '../.registrationIdCache.txt');

const readCachedIDs = () => {
  try {
    const data = fs.readFileSync(cacheFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    return new Set(parsedData.ids || []);
  } catch (error) {
    console.error(`Error reading cached IDs: ${error.message}`);
    return new Set();
  }
};

const writeCachedIDs = (ids) => {
  try {
    const data = JSON.stringify({ ids: Array.from(ids) });
    fs.writeFileSync(cacheFilePath, data, 'utf8');
    console.log('Cached IDs have been successfully written.');
  } catch (error) {
    console.error(`Error writing cached IDs: ${error.message}`);
  }
};

const generateUniqueID = (existingIDs) => {
  let newID;
  do {
    newID = uuid.v4();
  } while (existingIDs.has(newID));
  const newId = newID.toUpperCase().split('-')
  const newUniqueID = newId.join('');
  return newUniqueID;
};

const giveID = async () => {
  const existingIDs = readCachedIDs();
  const newID = generateUniqueID(existingIDs);
  existingIDs.add(newID);
  writeCachedIDs(existingIDs);
  return newID;
};

module.exports = {
  giveID
};
