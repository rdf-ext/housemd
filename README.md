# housemd

This package contains an [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) dataset about people, places, and events of the TV series [House](https://en.wikipedia.org/wiki/House_(TV_series)). 

## Usage

The content of the dataset is available in different formats.

### N-Quads

A [N-Quads](https://en.wikipedia.org/wiki/N-Triples#N-Quads) representation of the complete dataset can be found at `dist/housemd.nq`.
The base IRI of each file Turtle file is used for the named graph.

### N-Triples

A [N-Triples](https://en.wikipedia.org/wiki/N-Triples) representation of the complete dataset can be found at `dist/housemd.nt`.

### RDF/JS builder

The `dist/housemd.js` file contains JavaScript code that builds an array of RDF/JS quad objects.
A [DataFactory](http://rdf.js.org/data-model-spec/) implementation must be given as `factory` argument.
That factory will be used to build the terms and quads.
The example below shows how to import the dataset using [rdf-ext](https://github.com/rdf-ext/rdf-ext).  

```javascript
import housemd from 'housemd'
import rdf from 'rdf-ext'

const dataset = rdf.dataset(housemd({ factory: rdf }))
```

### Turtle

The original data is maintained in the folder `data` in multiple [Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax)) files.
Each resource is stored in a separate file.
The relative path and the filename without extension must be used as baseIRI.
The links of the containers like in `/person/` are missing in the Turtle files.
All of that is handled in the build step for the other formats.
That's why most people may prefer one of the alternatives.
