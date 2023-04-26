import { useReducer, useState } from 'react'
import './App.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat' 
import Table from './components/table'
import { SSE } from "sse.js"
import Dialog from './components/dialog'
dayjs.extend(customParseFormat)


function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [records, dispatch] = useReducer(recordsReducer, [])
  const [isShowResult, setIsShowResult] = useState(false)
  const [resultContent, setResultContent] = useState('')

  function newItemBtnOnClick() {
    setIsTimerRunning(!isTimerRunning)
    dispatch({ 
      type: isTimerRunning ? 'finish' : 'start' 
    })
  }

  function edit(i, desc) {
    dispatch({ type: 'edit', index: i, desc: desc })
  }

  function closePopUp() {
    setIsShowResult(false)
  }

  function output() {
    setIsShowResult(true)

    const matters = records.map(item => item.description).filter(Boolean)
    const data = {
      info: '今天干的工作是：' + matters.join(';') + "。帮我写一份丰富的工作日报",
      session_id: 0
    }

    const source = new SSE('https://mg.openaix.top/api/send_bot', {
      headers: {
        "content-Type": "application/json",
        Authorization: "/*秘钥*/",
      },
      method: "POST",
      payload: JSON.stringify(data)
    })

    source.addEventListener("message", e => {
      if (e.data != "[DONE]") {
        const payload = JSON.parse(e.data)
        setResultContent(resultContent => resultContent + (payload.choices[0].delta?.content || ''))
      } else {
        source.close()
      }
    })

    source.stream()
  }
  return (
    <>
      <h1>My spending record</h1>
      <div className='flex flex-alignItems-center'>
        <button onClick={ newItemBtnOnClick }>{ isTimerRunning ? '结束' : '开始' }</button>
        { isTimerRunning && <div className='flow-wave'></div> }
      </div>
      { 
        isShowResult ? 
        <Dialog confirm={closePopUp} cancel={closePopUp}>
          <div id='result'>{ resultContent }</div>
        </Dialog> 
        : null 
      }
        
      <Table records={ records } edit={ edit } generate={ output }/>
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
