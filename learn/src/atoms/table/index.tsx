import * as React from 'react'

const Table = ({ headings = [], values = [] }) => {
  return (
    <div className="overflow-auto">
      <table className="f6 w-100 mw8 center" cellSpacing="0">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={`table_heading__${index}`}
                className="fw6 bb b--black-20 tl pb3 pr3"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="lh-copy">
          {values.map((row, index) => (
            <tr key={`table_row__${index}`}>
              {row.map((value, index) => (
                <td
                  key={`table_row__value__${index}`}
                  className="pv3 pr3 bb b--black-20"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
