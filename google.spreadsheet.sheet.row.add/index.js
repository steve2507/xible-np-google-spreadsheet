'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const sheetsIn = NODE.getInputByName('sheets');

  const rowsIn = NODE.getInputByName('rows');

  const doneOut = NODE.getOutputByName('done');

  const rowsOut = NODE.getOutputByName('rows');

  triggerIn.on('trigger', async (conn, state) => {
    const [sheets, rows] = await Promise.all([
      sheetsIn.getValues(state),
      rowsIn.getValues(state)
    ]);

    const savedRows = (await Promise.all(sheets.map((sheet) => (
      sheet.addRows(rows)
    )))).flat();

    state.set(NODE, {
      rows: savedRows
    });

    doneOut.trigger(state);
  });

  rowsOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (thisState != null) {
      return thisState.rows;
    }
  });
};
