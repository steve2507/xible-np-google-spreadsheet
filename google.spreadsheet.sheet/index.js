'use strict';

module.exports = (NODE) => {
  const spreadsheetsIn = NODE.getInputByName('spreadsheets');

  const sheetsOut = NODE.getOutputByName('sheets');

  const rowsOut = NODE.getOutputByName('rows');

  sheetsOut.on('trigger', async (conn, state) => {
    const spreadsheets = await spreadsheetsIn.getValues(state);

    return Promise.all(spreadsheets.map((spreadsheet) => (
      spreadsheet.sheetsByTitle[NODE.data.sheetTitle]
    )));
  });

  rowsOut.on('trigger', async (conn, state) => {
    const spreadsheets = await spreadsheetsIn.getValues(state);

    return (await Promise.all(spreadsheets.map((spreadsheet) => {
      const sheet = spreadsheet.sheetsByTitle[NODE.data.sheetTitle];
      if (sheet != null) {
        return sheet.getRows();
      }
    }))).flat();
  });
};
