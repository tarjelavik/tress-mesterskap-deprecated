import Link from "next/link";
import { GiCard5Clubs, GiCard10Clubs, GiCardJackClubs, GiCardQueenClubs, GiCard5Diamonds, GiCard5Hearts, GiCard9Clubs, GiCard9Diamonds, GiCard9Hearts, GiCard3Spades, GiCard3Diamonds, GiCard3Clubs, GiCard4Diamonds, GiCard6Diamonds, GiCard7Diamonds } from 'react-icons/gi'

export default function MatchTable({ data }) {
  const headers = [
    "",
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={'30px'} color={'red'} />
        <GiCard5Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={'30px'} color={'red'} />
        <GiCard9Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={'30px'} color={'red'} />
        <GiCard5Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Clubs size={'30px'} />
        <GiCard10Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={'30px'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={'30px'} color={'red'} />
        <GiCard5Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={'30px'} color={'red'} />
        <GiCard9Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard3Diamonds size={'30px'} color={'red'} />
        <GiCard3Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard3Spades size={'30px'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>,
    <div>
      <div className='flex'>
        <GiCard9Clubs size={'30px'} />
        <GiCard10Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={'30px'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard4Diamonds size={'30px'} color={'red'} />
        <GiCard5Diamonds size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard6Diamonds size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
        <GiCard7Diamonds size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
    </div>, ,
    <div>
      <div className='flex'>
        <GiCard5Diamonds size={'30px'} color={'red'} />
        <GiCard5Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard5Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Diamonds size={'30px'} color={'red'} />
        <GiCard9Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCard9Hearts size={'30px'} color={'red'} style={{ marginLeft: '-10px' }} />
      </div>
      <div className='flex'>
        <GiCard9Clubs size={'30px'} />
        <GiCard10Clubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardJackClubs size={'30px'} style={{ marginLeft: '-10px' }} />
        <GiCardQueenClubs size={'30px'} style={{ marginLeft: '-10px' }} />
      </div>
      +1
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

  const playerRow = results.map((result, index) => (
    <tr key={index}>
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
          {round}
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
        <tbody>{playerRow}</tbody>
      </table>
    </div>
  );
}
