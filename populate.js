const dbConnection = require('./models/db.js'); 
const fs = require('fs/promises');
const path = require('path');

const populateDatabase = async () => {
  try {
    const sqlFilePath = path.join(__dirname, 'populate.sql');

    console.log('📖 Reading populate.sql file...');
    const sql = await fs.readFile(sqlFilePath, 'utf8');

    const queries = sql.split(';').filter(query => query.trim() !== '');

    console.log(`Found ${queries.length} queries to execute.`);
    
    for (const query of queries) {
      await dbConnection.query(query + ';'); 
    }

    console.log(' Database populated successfully!');

  } catch (error) {
    console.error('Error populating the database:');
    console.error(error);
  } finally {
    // 5. إغلاق الاتصال
    // تأكد من أن الكائن الذي تستورده من db.js لديه دالة .end()
    if (dbConnection && typeof dbConnection.end === 'function') {
      await dbConnection.end();
      console.log('Connection closed.');
    }
  }
};

// تشغيل السكربت
populateDatabase();