import TableItem from './tableItem'
import './table.css'
import { useState } from 'react'

function Table({ records, edit, generate }) {
    const [update, setUpdate] = useState(false)
    const isHaveMatters = !!records.filter(item => item?.description).length
    const dataItems = records.map((item, i) => {
        return <TableItem item={ item } confirmEdit={ (desc) => {
            setUpdate(!update) // 什么也不干，专门拿来做组件的更新
            edit(i, desc)
        } }/>
    })
    return (
        <table>
        <colgroup>
            <col />
            <col />
            <col style={{ width: '250px' }}/>
        </colgroup>

        <caption>How I chose to spend my time</caption>
        <thead>
            <tr>
            <th>时间</th>
            <th>统计</th>
            <th>描述 { isHaveMatters ? <button className='btn' onClick={ generate }>生成日报</button> : null }</th>
            </tr>
        </thead>

        <tbody>{ dataItems }</tbody>
        </table>
    )
    }
export default Table