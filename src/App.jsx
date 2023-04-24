import { useReducer, useState } from 'react'
import './App.css'
import dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat' 
import Table from './components/table'

dayjs.extend(customParseFormat)


function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [records, dispatch] = useReducer(recordsReducer, [])

  function btnOnClick() {
    setIsRunning(!isRunning)
    if (!isRunning) {
      dispatch({ type: 'start' })
    } else {
      dispatch({ type: 'finish' })
    }
  }

  function edit(i, desc) {
    dispatch({ type: 'edit', index: i, desc: desc })
  }
  return (
    <>
      <h1>My spending record</h1>
      <div className='flex flex-alignItems-center'>
        <button onClick={ btnOnClick }>{ isRunning ? '结束' : '开始' }</button>
        { isRunning && <div className='flow-wave'></div> }
      </div>
      
      <Table records={ records } edit={ edit }/>
    </>
  )
}
function recordsReducer(records, action) {
  switch(action.type) {
    case 'start': {
      return [...records, {
        startTime: dayjs().format("HH:mm"),
        endTime: '',
        duration: '',
        description: ''
      }]
    }
    case 'finish': {
      let latestTableItem = records.at(-1)
      latestTableItem.endTime = dayjs().format("HH:mm")
      latestTableItem.duration = dayjs(latestTableItem.endTime, "HH:mm").diff(dayjs(latestTableItem.startTime, "HH:mm"), 'minute')
      return records
    }
    case 'edit': {
      let latestTableItem = records[action.index]
      latestTableItem.description = action.desc
      return records
    }
  }
}
export default App
