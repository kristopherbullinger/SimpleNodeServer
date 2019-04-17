const http = require('http');
const path = require('path');
const fs = require('fs');
const people = JSON.parse(fs.readFileSync('./people.json', 'utf8'));

const form = `<form method="POST">
  <h1>Add a New Person</h1>

  <label for="name">Name</label>
  <input type="text" name="name"></input>

  <label for="age">Age</label>
  <input type="number" min="1" name="age"></input>

  <label for="specialty">Specialty</label>
  <input type="text" name="specialty"></input>

  <input type="submit" value="Update Person"></input>
</form>`;

const peopleList = () => {
  let peopleHTML = '';
  people.forEach( person => peopleHTML += `<li><p>Name: ${person.name}</p>
    <p>Age: ${person.age}</p>
    <p>Specialty: ${person.specialty}</p></li>`)
  return `<ul>${peopleHTML}</ul>`
}

const server = http.createServer( (req, res) => {
  let body = '';
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<h1>People</h1>");

  if(req.url === '/people') {
    if (req.method === "GET") {
      res.write(peopleList());
      res.end(form);
    } else if (req.method === "POST") {
      req.on('data', function(data) {
        body += data;
        let attributes = body.split("&");
        let newPerson = {};
        attributes.forEach( att => {
          att = att.split("=");
          newPerson[att[0]] = att[1];
        })
        people.push(newPerson);
        fs.writeFileSync('./people.json', JSON.stringify(people), 'utf8');
        res.write(peopleList());
        res.end(form);
      });
    }
  } else {
    res.write("ok");
  }
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Running on port ${PORT}`))
