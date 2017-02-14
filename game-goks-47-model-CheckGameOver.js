// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Игра завершена?
//
// Примечание: cellCnt == (APELSERG.CONFIG.PROC.Board.Size * cell.Row + cell.Col)
// cellCnt - индекс ячейки
//
//  console.log(cellCnt);
//  console.log(cellCnt + ' = ' + (APELSERG.CONFIG.PROC.Board.Size * cell.Row + cell.Col).toString());
//
//===
APELSERG.MODEL.CheckGameOver = function (currentPleerSet, cellCnt) {

  var winCntLock = false;
  var cell = APELSERG.CONFIG.PROC.Board.Pool[cellCnt];
  
  // проверка горизонтали
  //
  APELSERG.CONFIG.PROC.WinCnt = 0;

  for (var Cnt = cellCnt - cell.Col; Cnt < APELSERG.CONFIG.PROC.Board.Size * (cell.Row + 1); Cnt++) {
    winCntLock = APELSERG.MODEL.CheckGameOverCommonMacro(currentPleerSet, Cnt, winCntLock);
  }

  if (APELSERG.CONFIG.PROC.GameWin) {
     return APELSERG.CONFIG.PROC.GameWin;
  }

  // проверка вертикали
  //
  APELSERG.CONFIG.PROC.WinCnt = 0;

  for (var Cnt = cell.Col; Cnt < APELSERG.CONFIG.PROC.Board.Pool.length; Cnt += APELSERG.CONFIG.PROC.Board.Size) {
    winCntLock = APELSERG.MODEL.CheckGameOverCommonMacro(currentPleerSet, Cnt, winCntLock);
  }

  if (APELSERG.CONFIG.PROC.GameWin) {
     return APELSERG.CONFIG.PROC.GameWin;
  }

  // проверка диагонали \
  //
  APELSERG.CONFIG.PROC.WinCnt = 0;

  for (var i = 0, k = cell.Col - cell.Row, Cnt = cellCnt - (cell.Row * (APELSERG.CONFIG.PROC.Board.Size + 1));
       i < APELSERG.CONFIG.PROC.Board.Size;
       i++, k++, Cnt += APELSERG.CONFIG.PROC.Board.Size + 1) {

    if(k >= 0 && k < APELSERG.CONFIG.PROC.Board.Size) {
      winCntLock = APELSERG.MODEL.CheckGameOverCommonMacro(currentPleerSet, Cnt, winCntLock);
    }
  }

  if (APELSERG.CONFIG.PROC.GameWin) {
     return APELSERG.CONFIG.PROC.GameWin;
  }

  // проверка диагонали /
  //
  APELSERG.CONFIG.PROC.WinCnt = 0;

  for (var i = 0, k = cell.Col + cell.Row, Cnt = cellCnt - (cell.Row * (APELSERG.CONFIG.PROC.Board.Size - 1));
       i < APELSERG.CONFIG.PROC.Board.Size;
       i++, k--, Cnt += APELSERG.CONFIG.PROC.Board.Size - 1) {

    if(k >= 0 && k < APELSERG.CONFIG.PROC.Board.Size) {

      winCntLock = APELSERG.MODEL.CheckGameOverCommonMacro(currentPleerSet, Cnt, winCntLock);
    }
  }

  return APELSERG.CONFIG.PROC.GameWin;
}

//===
// Функция (макрос) для APELSERG.MODEL.CheckGameOver
// Надо пройти цикл полностью, чтобы определить полную длину выигранной строки
//
// testedPleerSet - код проверямого игрока
// cellCnt        - индекс проверяемой ячейки
// winCntLock     - вкл. блокировку, чтобы не сбить счётчик WinCnt (так как WinCnt >= WinLineNum, а не WinCnt == WinLineNum) 
//===
APELSERG.MODEL.CheckGameOverCommonMacro = function (testedPleerSet, cellCnt, winCntLock) {

  if(!winCntLock) {

    if(APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set == testedPleerSet) {

      APELSERG.CONFIG.PROC.WinLine[APELSERG.CONFIG.PROC.WinCnt] = cellCnt;

      if(++APELSERG.CONFIG.PROC.WinCnt == APELSERG.CONFIG.PROC.Board.WinLineNum) {

        APELSERG.CONFIG.PROC.GameWin = true;

        return false; // winCntLock; // здесь всегда = false;
      }
    }

    // последовательность прервалась - считать заново
    //
    if (!APELSERG.CONFIG.PROC.GameWin && APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set != testedPleerSet) {

      APELSERG.CONFIG.PROC.WinCnt = 0;
    }

    // последовательность прервалась - но уже был GameWin
    //
    if (APELSERG.CONFIG.PROC.GameWin && APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set != testedPleerSet) {

      return true; // переключить winCntLock для следующих циклов
    }
  }
  return winCntLock;
}
