const fs = require('fs-extra');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const expressionParser = require("docxtemplater/expressions.js");
const XLSX = require('xlsx');

async function mergeExcel(sourceFilePath, inputFilePath) {
  // 1. Verify that the provided source files exist/are valid
  if (!fs.existsSync(sourceFilePath) || !fs.existsSync(inputFilePath)) {
    throw new Error('One or both files do not exist');
  }

  // 2. Using xlsx, open the second file (Excel spreadsheet), and convert to JSON
  const workbook = XLSX.readFile(inputFilePath);
  const jsonData = {};

  for (const sheetName of workbook.SheetNames) {
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (sheetName === 'common' && sheetData.length > 0) {
      jsonData[sheetName] = sheetData[0];
    } else {
      jsonData[sheetName] = sheetData;
    }
  }

  // 3. Open the first file using docxtemplater
  const content = fs.readFileSync(sourceFilePath, 'binary');
  const zip = new PizZip(content);
  // We need the expressionParser here in order to support dotted notation (and other fun things)
  // See the full docs here: https://docxtemplater.com/docs/angular-parse/ 
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, parser: expressionParser });

  // 4. Using the data in the JSON from the Excel file, insert it into the template
  doc.setData(jsonData);

  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }

  // 5. Return the generated file content to be saved by the calling function
  const buf = doc.getZip().generate({ type: 'nodebuffer' });
  return buf;
}

module.exports = {
  mergeExcel
};
