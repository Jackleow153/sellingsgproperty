// Nearby competitors data for the Condo Analysis selling, launched and upcoming files.
// Copies data/nearby.json (built from EdgeProp URA data, OneMap and data.gov.sg) to assets/near.json
// with a content hash; the page loads it only when one of those files opens.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
module.exports = function buildNearby(ROOT) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/nearby.json'), 'utf8'));
  const json = JSON.stringify(src.proj);
  fs.writeFileSync(path.join(ROOT, 'assets/near.json'), json);
  return { url: `/assets/near.json?v=${crypto.createHash('sha1').update(json).digest('hex').slice(0, 8)}`, data: src.proj };
};
