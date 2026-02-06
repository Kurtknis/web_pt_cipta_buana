{
  "build": {
    "builder": "NODE"
  },
  "deploy": {
    "startCommand": "npm run build && npx serve -s build"
  }
}
