'use strict'

const fs            = require('fs')
const path          = require('path')
const expandHomeDir = require('expand-home-dir')

const zshHistoryRaw   = fs.readFileSync(expandHomeDir('~/.zsh_history'), 'utf8')
const zshHistoryLines = zshHistoryRaw.split('\n')

const transformLine = line => {
  try {
    const semicolonIndex = line.indexOf(';')
    const command        = line.substring(semicolonIndex + 1)
    const when           = line.substring(0, semicolonIndex).split(':')[1].trim()
    
    return `- cmd: ${command}\n  when: ${when}`
  } catch (e) {
    // Probably a continuation of the previous line.
    // I don't care about these
  }
}

const fishHistory = zshHistoryLines.map(line => transformLine(line)).join('\n')

fs.writeFileSync(expandHomeDir(path.resolve(__dirname, 'fish_history')), fishHistory, 'utf8')
