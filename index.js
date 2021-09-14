const express = require('./config/customExpress');

const start = async () => {
    const app = await express();
  
    const PORT = '3000';
    
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};
start();