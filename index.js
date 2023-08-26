import housemd from './dist/housemd.js'

function triples ({ factory }) {
  return housemd({ factory })
    .map(quad => factory.quad(quad.subject, quad.predicate, quad.object))
}

export {
  housemd as default,
  housemd as quads,
  triples
}
