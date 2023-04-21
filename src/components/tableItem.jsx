import { WritingFluently } from '@icon-park/react';
import './tableItem.css'

function TableItem({ item }) {
  function edit(e) {
    console.log(e.endTime)
  }
    return (
      <tr>
        <td>{ item.startTime+ ' - ' + item.endTime }</td>
        <td>{ item.duration }min</td>
        <td style={{ position: 'relative' }}>{ item.description || '-' }<WritingFluently className='icon' onClick={ () => edit(item) } theme="outline" size="16" fill="#333"/></td>
      </tr>
    )
  }

  export default TableItem