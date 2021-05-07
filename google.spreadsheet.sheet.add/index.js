'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const spreadsheetsIn = NODE.getInputByName('spreadsheets');

  const doneOut = NODE.getOutputByName('done');

  const sheetsOut = NODE.getOutputByName('sheets');

  triggerIn.on('trigger', async (conn, state) => {
    const spreadsheets = await spreadsheetsIn.getValues(state);

    const sheets = await Promise.all(spreadsheets.map((spreadsheet) => (
      spreadsheet.addSheet({
        title: NODE.data.sheetTitle
      })
    )));

    state.set(NODE, {
      sheets
    });

    doneOut.trigger(state);
  });

  sheetsOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (thisState != null) {
      return thisState.sheets;
    }
  });
};
