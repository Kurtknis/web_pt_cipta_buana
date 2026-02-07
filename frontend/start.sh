#!/usr/bin/env sh
# Serve Vite build output (dist). Railway sets PORT.
npx serve -s dist -l tcp://0.0.0.0:$PORT
