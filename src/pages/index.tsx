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

  const boardWithAssists = structuredClone(board);

  const [PassCount, setPassCount] = useState(0);

  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  let Assists = 0;

  boardWithAssists.map((row, y) =>
    row.map((_, x) =>
      directions.map((r) => {
        const y_around: number = r[0];
        const x_around: number = r[1];
        let p = y_around * 2;
        let q = x_around * 2;

        if (
          boardWithAssists[y][x] === 0 &&
          boardWithAssists[y + y_around] !== undefined &&
          boardWithAssists[y + y_around][x + x_around] === 3 - turnColor
        ) {
          console.log(y, x);
          // 端まで繰り返す
          for (let i: number = 3; boardWithAssists[y + p] !== undefined; i++) {
            console.log('detect');
            console.log(p);
            console.log(q);
            // 端まで来たor石がない時
            if (
              boardWithAssists[y + p][x + q] === undefined ||
              boardWithAssists[y + p][x + q] === 0
            ) {
              console.log('False');
              break;
            }
            // 自分の石があったとき
            if (boardWithAssists[y + p][x + q] === turnColor) {
              console.log('True');
              boardWithAssists[y][x] = 3;
              Assists += 1;
              console.log(boardWithAssists[y][x]);
              break;
            }
            // 繰り返しの更新
            p = y_around * i;
            q = x_around * i;
          }
        }
      }),
    ),
  );
  console.log(Assists);
  console.log(boardWithAssists);

  const clickHandler = (x: number, y: number) => {
    if (!GameSet) {
      console.log(x, y);
      const newBoard = structuredClone(board);

      directions.map((r) => {
        const y_around: number = r[0];
        const x_around: number = r[1];
        let p = y_around * 2;
        let q = x_around * 2;
        // if文で端のマスに置けなくならないように、*2

        // 周りが自分と違う色の時
        if (
          board[y][x] === 0 &&
          board[y + y_around] !== undefined &&
          board[y + y_around][x + x_around] === 3 - turnColor
        ) {
          // 端まで繰り返す
          for (let i: number = 3; board[y + p] !== undefined; i++) {
            console.log('detect');
            console.log(p);
            console.log(q);
            // 端まで来たor石がない時
            if (board[y + p][x + q] === undefined || board[y + p][x + q] === 0) {
              console.log('False');
              break;
            }
            // 自分の石があったとき
            if (board[y + p][x + q] === turnColor) {
              console.log('True');
              console.log(i);
              // 置いたマスから見つけた石まで、ひっくり返す
              for (let j = 0; j < i; j++) {
                console.log('Turn');
                p = y_around * j;
                q = x_around * j;
                newBoard[y + p][x + q] = turnColor;
              }
              // ターン変更
              console.log('change');
              setTurnColor(3 - turnColor);
              break;
            }
            // 繰り返しの更新
            p = y_around * i;
            q = x_around * i;
          }
        }
      });
      // 石の色を透明＞ターンの色に変更
      // ターンの色を変える（setTurnColor(turnColor===1?2:1)

      setBoard(newBoard);
      // クローンを反映（石を置く）（if文に引っかからないなら変化なし）
    }
  };

  const ColorNum = [
    { color: 1, stoneCount: board.flat().filter((point) => point === 1).length },
    { color: 2, stoneCount: board.flat().filter((point) => point === 2).length },
  ];

  const WinJudge = ColorNum.reduce((a, b) => (a.stoneCount > b.stoneCount ? a : b)).color;

  console.log('Winner', WinJudge, ColorNum[0].stoneCount, ColorNum[1].stoneCount);

  const GameSet = board.flat().filter((point) => point === 0).length === 0 || PassCount >= 2;

  return (
    <div className={styles.entire}>
      <div className={styles.container}>
        <div className={styles.boardStyle}>
          {boardWithAssists.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {color !== 0 && (
                  <div
                    className={styles.stoneStyle}
                    style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#fdfd6c' }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
      <div className={styles.textEntire}>
        <div className={styles.cercle}>
          <div className={styles.text}>
            {GameSet &&
              (ColorNum[0].stoneCount === ColorNum[1].stoneCount ? (
                <div>ひきわけ！</div>
              ) : (
                <div>
                  {{ 1: '黒', 2: '白' }[WinJudge]}
                  の勝ち！
                </div>
              ))}

            {!GameSet && (
              <div>
                {{ 1: '黒', 2: '白' }[turnColor]}
                <span className={styles.minifont}>の番です</span>
              </div>
            )}
            <div>
              黒：{ColorNum[0].stoneCount}&emsp; 白：
              {ColorNum[1].stoneCount}
            </div>
          </div>
        </div>
        <div>
          {Assists === 0 && !GameSet && (
            <div
              className={styles.passButton}
              onClick={() => {
                setPassCount((PassCount) => PassCount + 1);
                console.log('PassCount', PassCount);
                setTurnColor(3 - turnColor);
              }}
            >
              パス
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
