const express = require('express');
const actions = require('./server/module.js');

let app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/getPhotoPost', (req, res) => {
    const post = actions.getPhotoPost(req.query.id);
    post ? res.end(JSON.stringify(post)) : res.status(404).end("Post not found");
});

app.post('/getPhotoPosts', (req, res) => {
    const post = actions.getPhotoPosts(req.query.skip, req.query.top, req.body);
    post ? res.end(JSON.stringify(post)) : res.status(404).end("No posts fitting your filter");
});

app.post('/addPhotoPost', (req, res) => {
    const post = actions.addPhotoPost(req.body);
    post ? res.end("Post " + req.body.id + " has been added") : res.status(404).end("Validation error. Post not added");
});

app.put('/editPhotoPost', (req, res) => {
    const post = actions.editPhotoPost(req.query.id, req.body);
    post ? res.end(JSON.stringify(actions.getPhotoPost(req.query.id))) : res.status(404).end("Validation error. Post not edited");
});

app.delete('/removePhotoPost', (req, res) => {
    const post = actions.removePhotoPost(req.query.id);
    post ? res.end("Post " + req.query.id + " has been deleted") : res.status(404).end("Post not found");
});
app.listen('3000', () => {
    console.log('Server is running');
});