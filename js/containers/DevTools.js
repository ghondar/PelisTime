import React from 'react'

export default () => {
  if(__DEV__) {
    const { createDevTools } = require('redux-devtools')
    const LogMonitor = require('redux-devtools-log-monitor')
    const DockMonitor = require('redux-devtools-dock-monitor')
    return createDevTools(
      <DockMonitor toggleVisibilityKey='H'
                   changePositionKey='Q'>
        <LogMonitor />
      </DockMonitor>
    )
  }

  return null
}
