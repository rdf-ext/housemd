import { promisify } from 'util'
import glob from 'glob'
import rdf from 'rdf-ext'
import fromFile from 'rdf-utils-fs/fromFile.js'

async function loadDataset ({ baseIRI, basePath = 'data/', extension = '.ttl' } = {}) {
  const dataset = rdf.dataset()
  const filenames = await promisify(glob)(`${basePath}**/*${extension}`)

  for (const filename of filenames) {
    let resourcePath = filename.slice(basePath.length, -extension.length)

    if (resourcePath.endsWith('index')) {
      resourcePath = resourcePath.slice(0, -'index'.length)
    }

    const resourceBaseIRI = (new URL(resourcePath, baseIRI)).toString()
    const triples = await rdf.dataset().import(fromFile(filename, { baseIRI: resourceBaseIRI }))
    const quads = rdf.dataset(triples, rdf.namedNode(resourceBaseIRI))

    dataset.addAll(quads)
  }

  return dataset
}

export default loadDataset
