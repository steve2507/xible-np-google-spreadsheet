'use strict';

module.exports = (NODE) => {
  const triggerIn = NODE.getInputByName('trigger');

  const rowsIn = NODE.getInputByName('rows');

  const doneOut = NODE.getOutputByName('done');

  triggerIn.on('trigger', async (conn, state) => {
    const rows = await rowsIn.getValues(state);

    await Promise.all(rows.map((row) => (
      row.delete()
    )));

    doneOut.trigger(state);
  });
};
