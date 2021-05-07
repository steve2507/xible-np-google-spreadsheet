'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const sheetsIn = NODE.getInputByName('sheets');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const sheets = await sheetsIn.getValues(state);

    await Promise.all(sheets.map((sheet) => (
      sheet.delete()
    )));

    doneOut.trigger(state);
  });
};
