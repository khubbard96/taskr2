var nextId = 0;

function createItem(_, id) {
    nextId++;
    return {
      id: `item-${nextId}`,
      title: `item ${nextId}`
    };
  }
  
  function getArray(count, cb) {
    return Array(count)
      .fill(true)
      .map(cb);
  }
  
  export function createItemArray(count) {
    return getArray(count, createItem);
  }
  
  function createColumns(count) {
    return getArray(count, (col, index) => ({
      id: `${index}`,
      title: `col with id ${index}`,
      items: createItemArray(Math.floor(Math.random() * 10 + 10))
    }));
  }
  
  export default function getData(count) {
    return createColumns(count);
  }
  