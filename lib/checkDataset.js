function checkBrokenLinks ({ baseIRI, dataset }) {
  const objects = [...dataset]
    .filter(quad => quad.object.termType === 'NamedNode' && quad.object.value.startsWith(baseIRI))
    .map(quad => quad.object)

  const missing = []

  for (const object of objects) {
    if (dataset.match(object).size === 0) {
      missing.push(object)
    }
  }

  if (missing.length > 0) {
    const missingText = missing.map(o => o.value).join(' ')

    throw new Error(`no subject found for: ${missingText}`)
  }
}

function checkDataset ({ baseIRI, dataset, brokenLinks = true }) {
  if (brokenLinks) {
    checkBrokenLinks({ baseIRI, dataset })
  }
}

export default checkDataset
