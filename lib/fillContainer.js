import rdf from 'rdf-ext'
import * as ns from './namespaces.js'

function fillContainer ({ container, dataset, property = ns.schema.hasPart, type } = {}) {
  const resources = [...dataset.match(null, ns.rdf.type, type)]
    .map(quad => quad.subject)

  for (const resource of resources) {
    dataset.add(rdf.quad(container, property, resource, container))
  }
}

export default fillContainer
