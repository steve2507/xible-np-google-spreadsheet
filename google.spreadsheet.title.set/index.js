'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const spreadsheetsIn = NODE.getInputByName('spreadsheets');

  const titlesIn = NODE.getInputByName('titles');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const spreadsheets = await spreadsheetsIn.getValues(state);

    const titles = titlesIn.isConnected()
      ? await titlesIn.getValues(state)
      : [NODE.data.title];

    await Promise.all(
      spreadsheets.map((spreadsheet) => spreadsheet.updateProperties({ title: titles.join('') }))
    );

    doneOut.trigger(state);
  });
};
