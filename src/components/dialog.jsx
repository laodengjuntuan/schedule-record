import './dialog.css'

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

export default Dialog