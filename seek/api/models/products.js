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
          SELECT * FROM products`;
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

const discounts = (application, res, productId) => {
  if (typeof res !== 'undefined') {
    const appData = {};
    application.db.connection.getConnection((err, connection) => {
      if (err) {
        appData.error = 1;
        appData.body = 'Internal Server Error';
        res.status(500).json(appData);
      } else {
        const sql = /* sql */`
          SELECT id,
                 amount,
                 decrease,
                 new_price
          FROM products_discounts
          WHERE product_id = ?`;
        connection.query(sql, [productId], (err2, rows) => {
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

module.exports = { list, discounts };
