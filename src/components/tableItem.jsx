import { WritingFluently } from '@icon-park/react'
import './tableItem.css'
import { useState } from 'react'
import { createPortal } from 'react-dom'

function Dialog({ children, confirm, cancel }) {
  return (
    <div className='pop-up'>
      { children }
      {/* <textarea className='text-area'></textarea> */}
      <div className='btn-group flex'>
        <button className='btn' onClick={confirm}>确定</button>
        <button className='btn' onClick={cancel}>取消</button>
      </div>
    </div>
  )
}

function TableItem({ item, confirmEdit }) {
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  let [inputValue, setInputValue] = useState('')
  function edit(e) {
    setIsShowPopUp(true)
  }
  function handleConfirm() {
    setIsShowPopUp(false)
    confirmEdit(inputValue)
  }
  function handleCancel() {
    setIsShowPopUp(false)
  }
  function handleInput(e) {
    setInputValue(e.target.value)
  }
    return (
      <tr>
        { isShowPopUp ? createPortal(
          <Dialog confirm={handleConfirm} cancel={handleCancel}>
            <input className='text-input' onChange={handleInput} value={inputValue}></input>
          </Dialog>,
          document.body) : null
        }
        <td>{ item.startTime+ ' - ' + item.endTime }</td>
        <td>{ item.duration }min</td>
        <td style={{ position: 'relative' }}>{ item.description || '-' }<WritingFluently className='icon' onClick={ () => edit(item) } theme="outline" size="16" fill="#333"/></td>
      </tr>
    )
  }

  export default TableItem