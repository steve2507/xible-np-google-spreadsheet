'use strict';

module.exports = (NODE) => {
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  const spreadsheetOut = NODE.getOutputByName('spreadsheet');

  let googlePromise;
  let doc;

  const conn = () => {
    if (!googlePromise) {
      doc = new GoogleSpreadsheet(NODE.data.sheetId);

      googlePromise = doc.useServiceAccountAuth({
        client_email: NODE.data.clientEmail,
        private_key: NODE.data.privateKey
      })
        .then(async () => {
          await doc.loadInfo();

          NODE.addStatus({
            message: `loaded ${doc.title}`,
            color: 'green'
          });

          return doc;
        });
    }

    return googlePromise;
  };

  spreadsheetOut.on('trigger', conn);
};
