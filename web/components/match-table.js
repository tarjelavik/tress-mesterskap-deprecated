export default function MatchTable({ data }) {
  const headers = [
    'Spiller',
    'To tress',
    'En av hver',
    'Tre tress',
    'To serier',
    'Sisten',
    'Totalt'
  ]

  const headerRow = (
    <thead>
      <tr>  
        {headers.map((head, index) => <th className="px-4 py-2" key={index}>{head}</th>)}
      </tr>
    </thead>
  )
  
  const results = data

  const playerRow = (
    results.map((result, index) => 
      <tbody>
        <tr key={index}>
          <td className="border px-4 py-2">{result.player}</td>
        {
          result.score.map((round, index) => 
            <td className="border px-4 py-2" key={index}>{round}</td>
          )
        }
          <td className="border px-4 py-2">{result.score.reduce((a, b) => a + b, 0)}</td>
        </tr>
      </tbody>
    ))

  return (
    <div className="max-w-2xl mx-auto">
      <table className="table-auto">
        {headerRow}
        {playerRow}
      </table>
    </div>
  )
}
