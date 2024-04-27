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

    const direction = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];

    direction.map((r) => {
      const y_around: number = r[0];
      const x_around: number = r[1];
      let p = y_around * 2;
      let q = x_around * 2;

      // となりが自分と違う色だったら
      if (
        board[y][x] === 0 &&
        board[y + y_around] !== undefined &&
        board[y + y_around][x + x_around] === 3 - turnColor
      ) {
        for (let i: number = 3; board[y + p] !== undefined; i++) {
          console.log('detect');

          console.log(p);
          console.log(q);
          if (board[y + p][x + q] === undefined || board[y + p][x + q] === 0) {
            console.log('False');
            break;
          }
          if (board[y + p][x + q] === turnColor) {
            console.log('True');
            p /= i;
            q /= i;
            console.log(i);
            newBoard[y][x] = turnColor;
            for (let j = 1; j < i; j++) {
              console.log('Turn');
              p = y_around * j;
              q = x_around * j;

              newBoard[y + p][x + q] = turnColor;
            }
            console.log('change');
            setTurnColor(3 - turnColor);
            break;
          }
          p = y_around * i;
          q = x_around * i;
        }
      }
    });
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
