const bcrypt = require('bcrypt'); bcrypt.hash('test', 10).then(console.log).catch(console.error);
