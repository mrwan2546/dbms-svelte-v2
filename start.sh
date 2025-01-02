#!/bin/sh
pnpm build
BODY_SIZE_LIMIT=5M node ./build