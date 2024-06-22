import rdf from 'rdf-ext'

const rdfns = rdf.namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const schema = rdf.namespace('http://schema.org/')

export {
  rdfns as rdf,
  schema
}
