const express = require('express');
const app = express();
const fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('page created');
})

app.get('/create', (req, res) => {
    const currentDate = new Date();
    const Day = String(currentDate.getDate()).padStart(2, 0);
    const Month = String(currentDate.getMonth()).padStart(2, 0);
    const Year = currentDate.getFullYear();
    const dt = `${Day}-${Month}-${Year}.txt`;


    fs.writeFile(`./files/${dt}`, " Atta Daal Sugar ", (err) => {
        if(err) return res.send('Error: something went wrong');
        else return res.send('Done');
    })
})

app.get('/dashboard', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', {files});
    })
})

app.get('/edit/:dtname', (req, res) => {
    let date = req.params.dtname;
    fs.readFile(`./files/${date}`, (err, data) => {
        if(err) return res.send('Error: Something went wrong');
        else res.render('edit', {data: data.toString(), date});
            console.log(data.toString(), date);
    })
})

app.post('/save/:date', (req, res) => {
    
    
    console.log(req.body);
    let date = req.params.date;
    let content = req.body.text;
    if (!content) {
        return res.send("Error: No content received!");
    }


    
    fs.writeFile(`./files/${date}`, content, (err) => {
        if(err) return res.send('Error: Something went wrong');
        else res.redirect('/dashboard');
    })
})



app.get('/delete/:date', (req, res) => {
    let date = req.params.date;
    fs.rm(`./files/${date}`,(err) => {
        if(err) return res.send('Error: Something went wrong');
        else res.redirect('/dashboard');
    })

})


app.listen(4000);