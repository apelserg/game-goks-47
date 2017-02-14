// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Проверка возможности завершения игры на этом xоде
// Примечание: cellCnt == (APELSERG.CONFIG.PROC.Board.Size * cell.Row + cell.Col)
//
// testedPleerSet - игровой код проверямого игрока
// stepsToEnd     - кол-во шагов до окончания игры
// cellCnt        - индекс базовой ячейки
//
//===
APELSERG.MODEL.CheckSetLines = function (testedPleerSet, stepsToEnd) {

  // console.log('проверка горизонтали (->)');
  //
  for (var CntY = 0; CntY < APELSERG.CONFIG.PROC.Board.Size; CntY++) {

    APELSERG.CONFIG.PROC.SetCnt = 0;
    APELSERG.CONFIG.PROC.FullCnt = 0;
    APELSERG.CONFIG.PROC.RetCnt = -1;

    for (var CntX = 0; CntX < APELSERG.CONFIG.PROC.Board.Size; CntX++) {

      var cellCnt = (CntY * APELSERG.CONFIG.PROC.Board.Size) + CntX;

      var retVal = APELSERG.MODEL.CheckSetLineCommonMacro(testedPleerSet, cellCnt, stepsToEnd);

      if(retVal >= 0) {
        return retVal;
      }
    }
  }

  // console.log('проверка вертикали (v)');
  //
  for (var CntX = 0; CntX < APELSERG.CONFIG.PROC.Board.Size; CntX++) {

    APELSERG.CONFIG.PROC.SetCnt = 0;
    APELSERG.CONFIG.PROC.FullCnt = 0;
    APELSERG.CONFIG.PROC.RetCnt = -1;

    for (var CntY = 0; CntY < APELSERG.CONFIG.PROC.Board.Size; CntY++) {

      var cellCnt = (CntY * APELSERG.CONFIG.PROC.Board.Size) + CntX;

      var retVal = APELSERG.MODEL.CheckSetLineCommonMacro(testedPleerSet, cellCnt, stepsToEnd);

      if(retVal >= 0) {
        return retVal;
      }

    }
  }

  // console.log('проверка диагонали \\');
  //
  for (var CntX = -(APELSERG.CONFIG.PROC.Board.Size - APELSERG.CONFIG.PROC.Board.WinLineNum);
           CntX < (APELSERG.CONFIG.PROC.Board.Size - APELSERG.CONFIG.PROC.Board.WinLineNum);
           CntX++) {

    APELSERG.CONFIG.PROC.SetCnt = 0;
    APELSERG.CONFIG.PROC.FullCnt = 0;
    APELSERG.CONFIG.PROC.RetCnt = -1;

    for (var CntY = 0; CntY < APELSERG.CONFIG.PROC.Board.Size; CntY++) {

      if((CntX + CntY) >= 0 && (CntX + CntY) < APELSERG.CONFIG.PROC.Board.Size) {

        var cellCnt = ((CntX + CntY) * APELSERG.CONFIG.PROC.Board.Size) + CntY;
        var retVal = APELSERG.MODEL.CheckSetLineCommonMacro(testedPleerSet, cellCnt, stepsToEnd);

        if(retVal >= 0) {
          return retVal;
        }
      }
    }
  }

  // console.log('проверка диагонали /');
  //
  for (var CntX = APELSERG.CONFIG.PROC.Board.WinLineNum - 1;
           CntX <= APELSERG.CONFIG.PROC.Board.Size + APELSERG.CONFIG.PROC.Board.WinLineNum - 1;
           CntX++) {

    APELSERG.CONFIG.PROC.SetCnt = 0;
    APELSERG.CONFIG.PROC.FullCnt = 0;
    APELSERG.CONFIG.PROC.RetCnt = -1;

    for (var CntY = 0; CntY < APELSERG.CONFIG.PROC.Board.Size; CntY++) {

      if((CntX - CntY) >= 0 && (CntX - CntY) < APELSERG.CONFIG.PROC.Board.Size) {

        var cellCnt = CntX + (CntY * APELSERG.CONFIG.PROC.Board.Size) - CntY;
        var retVal = APELSERG.MODEL.CheckSetLineCommonMacro(testedPleerSet, cellCnt, stepsToEnd);

        if(retVal >= 0) {

          return retVal;
        }
      }
    }
  }

  return - 1;
}

//===
// Функция (типа макроса) для APELSERG.MODEL.CheckGameOverThisStep
// Надо пройти цикл полностью, чтобы определить полную длину выигранной строки
//
// testedPleerSet - игровой код проверямого игрока
// cellCnt         - индекс проверямой ячейки в пуле
// stepsToEnd     - кол-во шагов до окончания игры
//
// ===-99  - прервать провеку текущей последовательности
// -1   - переход к проверке следующей ячейки
// >= 0 - индекс ячейки для заполнения
//
//===
APELSERG.MODEL.CheckSetLineCommonMacro = function (testedPleerSet, cellCnt, stepsToEnd) {

  if(APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set != 0 && APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set != testedPleerSet) {

    APELSERG.CONFIG.PROC.SetCnt = 0;
    APELSERG.CONFIG.PROC.FullCnt = 0;
    APELSERG.CONFIG.PROC.RetCnt = -1;

    return -1;
  }

  if(APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set == testedPleerSet) {

    APELSERG.CONFIG.PROC.FullCnt++;
    APELSERG.CONFIG.PROC.SetCnt++;
  }

  if(APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set == 0) {

    APELSERG.CONFIG.PROC.FullCnt++;

    var oGoGo = 0; // выбор стратегии поведения

    if(oGoGo == 0) {
      if(APELSERG.CONFIG.PROC.RetCnt < 0) {
        APELSERG.CONFIG.PROC.RetCnt = cellCnt; // устанавливается первое совпадение
      }
    }
    if(oGoGo == 1) {
      APELSERG.CONFIG.PROC.RetCnt = cellCnt;   // устанавливается последние совпадение
    }

  }

  if(APELSERG.CONFIG.PROC.FullCnt == APELSERG.CONFIG.PROC.Board.WinLineNum
    && (APELSERG.CONFIG.PROC.FullCnt - APELSERG.CONFIG.PROC.SetCnt) == stepsToEnd) {
  
    return APELSERG.CONFIG.PROC.RetCnt;
  }

  return -1;
}
