import * as XLSX from "xlsx";

export const saveDataToExcel = (
  filePath: string,
  header: string[],
  data: string[][],
  sheetName: string,
) => {
  let workbook = XLSX.utils.book_new();
  let worksheet = XLSX.utils.aoa_to_sheet([header]);
  XLSX.utils.sheet_add_aoa(worksheet, data, { origin: -1 });
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filePath);
};
