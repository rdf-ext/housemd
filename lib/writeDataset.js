import { createWriteStream } from 'node:fs'
import { dirname } from 'node:path'
import { finished } from 'node:stream'
import { promisify } from 'node:util'
import RdfJsSerializer from '@rdfjs/serializer-rdfjs'
import { mkdirp } from 'mkdirp'
import rdf from 'rdf-ext'

async function writeDatasetJs ({ basePath, dataset }) {
  await mkdirp(dirname(basePath))

  const serializer = new RdfJsSerializer({ module: 'esm' })
  const jsStream = serializer.import(dataset.toStream())
  const output = createWriteStream(`${basePath}.js`)

  jsStream.pipe(output)

  await promisify(finished)(output)
}

async function writeDatasetNQuads ({ basePath, dataset }) {
  await mkdirp(dirname(basePath))

  await rdf.io.dataset.toURL(`${basePath}.nq`, dataset)
}

async function writeDatasetNTriples ({ basePath, dataset }) {
  await mkdirp(dirname(basePath))

  const triples = rdf.dataset(dataset, rdf.defaultGraph())

  await rdf.io.dataset.toURL(`${basePath}.nt`, triples)
}

async function writeDataset ({ basePath, dataset, mediaType }) {
  if (mediaType === 'text/javascript') {
    return writeDatasetJs({ basePath, dataset })
  }

  if (mediaType === 'application/n-quads') {
    return writeDatasetNQuads({ basePath, dataset })
  }

  if (mediaType === 'application/n-triples') {
    return writeDatasetNTriples({ basePath, dataset })
  }

  throw new Error(`unknown media type: ${mediaType}`)
}

export default writeDataset
