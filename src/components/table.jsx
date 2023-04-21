import TableItem from './tableItem'

function Table({ records }) {
    const dataItems = records.map((item) => {
        return <TableItem item={ item }/>
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
            <th>描述</th>
            </tr>
        </thead>

        <tbody>{ dataItems }</tbody>
        </table>
    )
    }
export default Table