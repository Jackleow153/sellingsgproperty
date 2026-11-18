// Nearby competitors data for the Condo Analysis selling, launched and upcoming files.
// Splits data/nearby.json (built from URA, EdgeProp, OneMap and data.gov.sg) into one small file per
// condo, assets/near/<id>.json (2-5 KB each), so a file that opens loads only its own data.
// One content hash (?v=) covers the set; stale files of removed condos are deleted.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
module.exports = function buildNearby(ROOT) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/nearby.json'), 'utf8'));
  const dir = path.join(ROOT, 'assets/near'), hash = crypto.createHash('sha1');
  fs.mkdirSync(dir, { recursive: true });
  const keep = new Set();
  for (const id of Object.keys(src.proj).sort()) {
    if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`nearby: unsafe id ${id}`);
    const json = JSON.stringify(src.proj[id]);
    fs.writeFileSync(path.join(dir, id + '.json'), json); keep.add(id + '.json');
    hash.update(id + json);
  }
  for (const f of fs.readdirSync(dir)) if (!keep.has(f)) fs.unlinkSync(path.join(dir, f));
  const old = path.join(ROOT, 'assets/near.json'); if (fs.existsSync(old)) fs.unlinkSync(old);
  return { v: hash.digest('hex').slice(0, 8), data: src.proj };
};
