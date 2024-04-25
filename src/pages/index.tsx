import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  // ターンの色
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    // 下が自分と違う色だったら
    if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
      for (let i = 2; board[y + i] !== undefined; i++) {
        console.log('k');
        if (board[y + i][x] === turnColor) {
          console.log('o');
          for (let j = 0; board[y + j][x] !== turnColor; j++) {
            newBoard[y + j][x] = turnColor;
          }
        }
      }
      setTurnColor(3 - turnColor);
    }

    // 石の色を透明＞ターンの色に変更
    // ターンの色を変える（setTurnColor(turnColor===1?2:1)）

    setBoard(newBoard);
    // クローンを反映（石を置く）（if文に引っかからないなら変化なし）
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
