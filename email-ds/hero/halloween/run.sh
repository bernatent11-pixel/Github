#!/usr/bin/env bash
# Rebuild the Halloween hero from source/reference.png and the packshots in slots.json.
set -euo pipefail
cd "$(dirname "$0")"
python3 tools/build_plate.py      # backdrop field + product silhouettes
python3 tools/cut_sprites.py      # ghosts and gourd as layers (needs the field)
python3 tools/build_plate.py      # plate again, now without the sprites
python3 tools/compose.py "$@"
