const generatedIds = new Set();

function generateMemorableId() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let idPattern = getRandomElement(letters) + getRandomElement(letters) + getRandomElement(letters);
  let numberPart = '';

  for (let i = 0; i < 4; i++) {
    numberPart += getRandomElement(numbers);
  }

  const uniqueId = idPattern.toUpperCase() + numberPart;

  if (isIdUnique(uniqueId)) {
    generatedIds.add(uniqueId);
    return uniqueId;
  }

  return generateMemorableId(); // Regenerate if ID is not unique
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function isIdUnique(id) {
  return !generatedIds.has(id);
}

module.exports = generateMemorableId;
