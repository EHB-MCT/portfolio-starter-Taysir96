const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Welkom bij mijn project!');
});

// Start de server
app.listen(port, (err) => {
    if (!err) {
        console.log(`De server luistert op poort ${port}`);
    } else {
        console.error(err)
    }
})
