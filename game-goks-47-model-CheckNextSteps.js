// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Проверка возможности завершения игры на этом xоде (кол-во ходов указать)
// Примечание: cellCnt == (APELSERG.CONFIG.PROC.Board.Size * cell.Row + cell.Col)
//
// console.log('Result = ' + Result);
//
// testedPleerSet - игровой код проверямого игрока
// stepsToEnd     - кол-во шагов до окончания игры
//
//===
APELSERG.MODEL.CheckNextSteps = function (testedPleerSet, stepsToEnd, dir) {

  // var dir = 0;

  // if(pleerType == 11) {
  //   dir = 1;
  // }

  //console.log('Dir = ' + dir);

  if(dir == 0) {
    for (var cellCnt = 0; cellCnt < APELSERG.CONFIG.PROC.Board.Pool.length; cellCnt++) {

      var Result = APELSERG.MODEL.CheckNextStep(testedPleerSet, stepsToEnd, cellCnt, 0); //APELSERG.MODEL.GetRandomNumber(21) % 2);

      if(Result > -1) return Result;
    }
  }
  else {
    for (var cellCnt = APELSERG.CONFIG.PROC.Board.Pool.length - 1; cellCnt >= 0; cellCnt--) {

      var Result = APELSERG.MODEL.CheckNextStep(testedPleerSet, stepsToEnd, cellCnt, 0); //APELSERG.MODEL.GetRandomNumber(21) % 2);

      if(Result > -1) return Result;
    }
  }
  return -1;
}

//===
// Проверка возможности завершения игры на этом xоде
// Примечание: cellCnt == (APELSERG.CONFIG.PROC.Board.Size * cell.Row + cell.Col)
//
// testedPleerSet - игровой код проверямого игрока
// stepsToEnd     - кол-во шагов до окончания игры
// cellCnt        - индекс базовой ячейки
//
//===
APELSERG.MODEL.CheckNextStep = function (testedPleerSet, stepsToEnd, cellCnt, place) {

    var cell = APELSERG.CONFIG.PROC.Board.Pool[cellCnt];

    if(cell.Set != testedPleerSet) {
      return -1;
    }

    if(cell.Set == testedPleerSet) {

      //console.log('проверка горизонтали (->)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var Cnt = cellCnt; Cnt < APELSERG.CONFIG.PROC.Board.Size * (cell.Row + 1); Cnt++) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка горизонтали (<-)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var Cnt = cellCnt; Cnt >= APELSERG.CONFIG.PROC.Board.Size * (cell.Row + 0); Cnt--) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка вертикали (v)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var Cnt = cellCnt; Cnt < APELSERG.CONFIG.PROC.Board.Pool.length; Cnt += APELSERG.CONFIG.PROC.Board.Size) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);
 
        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка вертикали (^)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var Cnt = cellCnt; Cnt >= 0; Cnt -= APELSERG.CONFIG.PROC.Board.Size) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка диагонали \\ (v)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var k = cell.Col, Cnt = cellCnt;
           k < APELSERG.CONFIG.PROC.Board.Size && Cnt < APELSERG.CONFIG.PROC.Board.Pool.length;
           k++, Cnt += APELSERG.CONFIG.PROC.Board.Size + 1) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка диагонали \\ (^)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var k = cell.Col, Cnt = cellCnt;
           k >= 0 && Cnt >= 0;
           k--, Cnt -= APELSERG.CONFIG.PROC.Board.Size + 1) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка диагонали / (v)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var k = cell.Col, Cnt = cellCnt;
           k >= 0 && Cnt < APELSERG.CONFIG.PROC.Board.Pool.length;
           k--, Cnt += APELSERG.CONFIG.PROC.Board.Size - 1) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }

      // console.log('проверка диагонали / (^)');
      //

      APELSERG.CONFIG.PROC.SetCnt = 0;
      APELSERG.CONFIG.PROC.FullCnt = 0;
      APELSERG.CONFIG.PROC.RetCnt = -1; // 0;

      for (var k = cell.Col, Cnt = cellCnt;
           k < APELSERG.CONFIG.PROC.Board.Size && Cnt >= 0;
           k++, Cnt -= APELSERG.CONFIG.PROC.Board.Size - 1) {

        var Idx = Cnt;

        var Result = APELSERG.MODEL.CheckNextStepCommonMacro(testedPleerSet, Idx, stepsToEnd, place);

        if(Result > -1) return Result;
        if(Result < -1) break;
      }
  }      
  return -1;
}

//===
// Функция (типа макроса) для APELSERG.MODEL.CheckGameOverThisStep
// Надо пройти цикл полностью, чтобы определить полную длину выигранной строки
//
// testedPleerSet - игровой код проверямого игрока
// idxCnt         - индекс проверямой ячейки в пуле
// stepsToEnd     - кол-во шагов до окончания игры
//
// -99  - прервать провеку текущей последовательности
// -1   - переход к проверке следующей ячейки
// >= 0 - индекс ячейки для заполнения
//
//console.log('&&&&');
//
//===
APELSERG.MODEL.CheckNextStepCommonMacro = function (testedPleerSet, idxCnt, stepsToEnd, place) {

  if(APELSERG.CONFIG.PROC.Board.Pool[idxCnt].Set != 0 && APELSERG.CONFIG.PROC.Board.Pool[idxCnt].Set != testedPleerSet) {

    return (-99);
  }

  if(APELSERG.CONFIG.PROC.Board.Pool[idxCnt].Set == testedPleerSet) {

    APELSERG.CONFIG.PROC.FullCnt++;
    APELSERG.CONFIG.PROC.SetCnt++;
  }

  if(APELSERG.CONFIG.PROC.Board.Pool[idxCnt].Set == 0) {

    APELSERG.CONFIG.PROC.FullCnt++;

    if(place == 0) {
      if(APELSERG.CONFIG.PROC.RetCnt < 0) {
        APELSERG.CONFIG.PROC.RetCnt = idxCnt;
      }
    }
    else {
      APELSERG.CONFIG.PROC.RetCnt = idxCnt;
    }  
  }

  if(APELSERG.CONFIG.PROC.FullCnt == APELSERG.CONFIG.PROC.Board.WinLineNum
    && (APELSERG.CONFIG.PROC.FullCnt - APELSERG.CONFIG.PROC.SetCnt) == stepsToEnd
    && APELSERG.CONFIG.PROC.RetCnt >= 0) {

    return APELSERG.CONFIG.PROC.RetCnt;
  }

  return -1;
}
