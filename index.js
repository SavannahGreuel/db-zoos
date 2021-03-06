const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(animals => res.status(200).json(animals))
  .catch(error => res.status(500).json(error))
})


server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where({id})
  .then(animals => {
    res.status(200).json(animals)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})


server.post('/api/zoos', (req, res) => {
  const animal = req.body

  db('zoos')
  .insert(animal)
  .then( id => {
    res.status(201).json(id)
  })
  .catch(error => {
    res.status(500).json({message: error})
  })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

   db('zoos')
  .where({id})
  .del()
  .then(count => {
    res.status(200).json({count})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
 server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
   db('zoos')
  .where({id})
  .update(changes)

  .then(count => {
    res.status(200).json({count})
})
.catch(err => {
    res.status(500).json(err)
})
})

const port = 3300;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
