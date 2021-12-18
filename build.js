import rdf from 'rdf-ext'
import checkDataset from './lib/checkDataset.js'
import fillContainer from './lib/fillContainer.js'
import loadDataset from './lib/loadDataset.js'
import * as ns from './lib/namespaces.js'
import writeDataset from './lib/writeDataset.js'

const config = {
  baseIRI: 'https://housemd.rdf-ext.org/',
  distPath: 'dist/housemd'
}

async function main () {
  const dataset = await loadDataset({ baseIRI: config.baseIRI })

  fillContainer({ container: rdf.namedNode(`${config.baseIRI}person/`), dataset, type: ns.schema.Person })
  fillContainer({ container: rdf.namedNode(`${config.baseIRI}place/`), dataset, type: ns.schema.Place })

  checkDataset({ baseIRI: config.baseIRI, dataset })

  await writeDataset({ basePath: config.distPath, dataset, mediaType: 'application/n-quads' })
  await writeDataset({ basePath: config.distPath, dataset, mediaType: 'application/n-triples' })
  await writeDataset({ basePath: config.distPath, dataset, mediaType: 'text/javascript' })
}

main()
