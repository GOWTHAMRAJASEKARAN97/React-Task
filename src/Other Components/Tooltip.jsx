import React from 'react'
import {Tooltip,IconButton} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const TooltipMessage = () => {
  return (
    <Tooltip
        title="status"
        placement='right'
        arrow
        enterDelay={500}
        leaveDelay={200}
    >
        <IconButton>
            <InfoIcon/>
        </IconButton>
    </Tooltip>
  )
}

export default TooltipMessage
