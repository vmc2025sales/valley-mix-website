function doPost(e) {
  var sheetName = "Leads";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["timestamp","name","email","psi","message","source"]);
  }
  var data = JSON.parse(e.postData.contents);
  var row = [
    new Date(),
    data.name || "",
    data.email || "",
    data.psi || "",
    data.message || "",
    data.source || ""
  ];
  sheet.appendRow(row);
  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}