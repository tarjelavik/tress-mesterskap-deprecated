import Link from "next/link";
import { GiCard5Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCard5Diamonds, GiCard5Hearts, GiCard9Clubs, GiCard9Diamonds, GiCard9Hearts, GiCard3Spades, GiCard3Diamonds, GiCard3Clubs, GiCard4Diamonds, GiCard6Diamonds, GiCard7Diamonds } from 'react-icons/gi'

export default function MatchTable({ data }) {
  const iconsSize = '24px'
  const headers = [
    "",
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} color={'red'} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={iconsSize} color={'red'} />
        <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={iconsSize} color={'red'} />
        <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard3Diamonds size={iconsSize} color={'red'} />
        <GiCard3Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCard3Spades size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard9Clubs size={iconsSize} />
        <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard4Diamonds size={iconsSize} color={'red'} />
        <GiCard5Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard6Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard7Diamonds size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>, ,
    <div className='flex'>
      <div className='flex flex-col'>
        <div className='flex'>
          <GiCard5Diamonds size={iconsSize} color={'red'} />
          <GiCard5Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCard5Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        </div>
        <div className='flex'>
          <GiCard9Diamonds size={iconsSize} color={'red'} />
          <GiCard9Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCard9Hearts size={iconsSize} color={'red'} style={{ marginLeft: '-10px' }} />
        </div>
        <div className='flex'>
          <GiCard9Clubs size={iconsSize} />
          <GiCard10Clubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCardJackClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
          <GiCardQueenClubs size={iconsSize} style={{ marginLeft: '-10px' }} />
        </div>
      </div>
      <div className='self-center'>+1</div>
    </div>, ,
    "Totalt",
  ];

  const headerRow = (
    <thead>
      <tr>
        {headers.map((head, index) => (
          <th
            style={{ verticalAlign: "bottom" }}
            className="px-2 py-1 bg-white border-gray-500 border-b"
            key={index}
          >
            <div
              style={{
                /* textOrientation: "mixed",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)", */
              }}
            >
              {head}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );

  const results = data;

  const playerColumn = results.map((result) => (
    <tr key={result.player._id}>
      <td className="border px-2 sm:py-1">
        <Link
          as={`/players/${result.player._id}`}
          href="/players/[result.player._id]"
        >
          <a>{result.player.name}</a>
        </Link>
        {result.isWinner ? " ⭐" : ""}
      </td>
      {result.score.map((round, index) => (
        <td className="border px-2 py-1" key={index}>
          {round >= 90 ? `${round} 🔥` : round}
        </td>
      ))}
      <td className="border px-2 py-1">
        {result.score.reduce((a, b) => a + b, 0)}
      </td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table-auto bg-gray-100">
        {headerRow}
        <tbody>{playerColumn}</tbody>
      </table>
    </div>
  );
}
