import fs from 'fs/promises';
import path from 'path';

/**
 * @param {string[]} salesFiles
 */
async function calculateSalesTotal(salesFiles) {
  let salesTotal = 0;
  // loop over each file path in the salesFiles array
  for (const file of salesFiles) {
    const fileData = (await fs.readFile(file)).toString();
    // read the file and parse the contents as JSON
    const data = JSON.parse(fileData);
    // Add the amount in the data.total field to the salesTotal variable
    salesTotal += data.total;
  }
  return salesTotal;
}

/**
 * @param {string} folderName
 */
async function findSalesFiles(folderName) {
  // this array will hold sales files as they are found
  let salesFiles = [];

  /**
   * @param {string} folderName
   */
  async function findFiles(folderName) {
    // read all the items in the current folder
    const items = await fs.readdir(folderName, { withFileTypes: true });

    // iterate over each found item
    for (const item of items) {
      // if the item is a directory, it will need to be searched
      if (item.isDirectory()) {
        // call this method recursively, appending the folder name to make a new path
        await findFiles(path.join(folderName, item.name));
      } else {
        // Make sure the discovered file is a .json file
        if (path.extname(item.name) === '.json') {
          // store the file path in the salesFiles array
          salesFiles.push(path.join(folderName, item.name));
        }
      }
    }
  }

  await findFiles(folderName);

  return salesFiles;
}

/**
 *
 */
async function main() {
  const salesDir = path.join(import.meta.dirname, 'stores');
  const salesTotalsDir = path.join(import.meta.dirname, 'salesTotals');

  // create the salesTotal directory if it doesn't exist
  try {
    await fs.mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }

  // find paths to all the sales files
  const salesFiles = await findSalesFiles(salesDir);

  // read through each sales file to calculate the sales total
  const salesTotal = await calculateSalesTotal(salesFiles);

  // write the total to the "totals.json" file
  await fs.writeFile(path.join(salesTotalsDir, 'totals.txt'), `${salesTotal}\r\n`, { flag: 'a' });
  console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();
