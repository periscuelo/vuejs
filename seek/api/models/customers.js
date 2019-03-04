const list = (application, res) => {
  if (typeof res !== 'undefined') {
    const appData = {};
    application.db.connection.getConnection((err, connection) => {
      if (err) {
        appData.error = 1;
        appData.body = 'Internal Server Error';
        res.status(500).json(appData);
      } else {
        const sql = /* sql */`
          SELECT * FROM customers`;
        connection.query(sql, (err2, rows) => {
          if (err2) {
            appData.error = 1;
            appData.body = 'Internal Server Error';
            res.status(500).json(appData);
          } else if (rows.length > 0) {
            appData.error = 0;
            appData.body = rows;
            res.status(200).json(appData);
          } else {
            res.status(204);
          }
        });
        connection.release();
      }
    });
  }
};

const discounts = (application, res, customerId) => {
  if (typeof res !== 'undefined') {
    const appData = {};
    application.db.connection.getConnection((err, connection) => {
      if (err) {
        appData.error = 1;
        appData.body = 'Internal Server Error';
        res.status(500).json(appData);
      } else {
        const sql = /* sql */`
          SELECT discount_id
          FROM customers_discounts
          WHERE customer_id = ?`;
        connection.query(sql, [customerId], (err2, rows) => {
          if (err2) {
            appData.error = 1;
            appData.body = 'Internal Server Error';
            res.status(500).json(appData);
          } else if (rows.length > 0) {
            const dataDisc = rows.map(data => (data.discount_id));
            appData.error = 0;
            appData.body = dataDisc;
            res.status(200).json(appData);
          } else {
            res.status(204);
          }
        });
        connection.release();
      }
    });
  }
};

module.exports = { list, discounts };
