const express = require('express');
const app = express();

let courses=[
    {id:1,name:"java"},
    {id:2,name:"javascript"},
    {id:3,name:"python"},
    
]
 // Replace 3000 with your desired port number

app.listen(8082, () => {
  console.log(`Server started on port ${8082}`);
});

function logger(req, res, next) {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} request from ${ip} to ${hostname}${req.originalUrl}`);
    next();
}

app.use(logger);
  
  app.use(logger); 
app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.listen(8082, () => {
    console.log(`Server started`);
});
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseToUpdate = courses.find(course => course.id === courseId);
    if (!courseToUpdate) {
        return res.status(404).send('Course not found');
    }
    courseToUpdate.name = req.body.name;
    res.json(courseToUpdate);
});

//delete call delete id 2
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course.id === courseId);
    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }
    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse[0]);
});
