// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Играет COMP
//===
//APELSERG.MAIN.PlayComp = function (pleerCurr, pleerCurrSet, pleerCurrType) {
APELSERG.MAIN.PlayComp = function () {

  var cellCnt = -1;

  var pleerCurr = APELSERG.CONFIG.PROC.Board.PleerCurrent;
  var pleerCurrSet = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Set;
  var pleerCurrType = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Type; 

  if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GameWin) {

    //var cellCnt = -1;

    //var pleerCurr = APELSERG.CONFIG.PROC.Board.PleerCurrent;
    //var pleerCurrSet = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Set;
    //var pleerCurrType = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Type; 

    //if(pleerCurrType == 10 || pleerCurrType == 11) {
    if(pleerCurrType >= 10) {

      // первый ход
      //
      var baseCellIdx = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].BaseCellIdx;

      if(APELSERG.CONFIG.PROC.Board.Pool[baseCellIdx].Set == 0) {

        cellCnt = baseCellIdx;
      }

      // НЕ первый ход
      //
      if(cellCnt < 0) {

        for(var stepsToEnd = 1; stepsToEnd <= APELSERG.CONFIG.SET.WinLineNum; stepsToEnd++) {

          for(var pleerShift = 0; pleerShift < APELSERG.CONFIG.SET.PleersNum; pleerShift++) {

            var pleerNext = APELSERG.MODEL.GetNextPleer(pleerShift);
            var pleerNextSet = APELSERG.CONFIG.PROC.Board.Pleers[pleerNext].Set;
            var pleerNextType = APELSERG.CONFIG.PROC.Board.Pleers[pleerNext].Type;

            if(pleerNextType == 10) {

              var baseCellIdx = APELSERG.CONFIG.PROC.Board.Pleers[pleerNext].BaseCellIdx;
              
              cellCnt = APELSERG.MODEL.CheckNextStep(pleerNextSet, stepsToEnd, baseCellIdx, 0);

              //if (cellCnt < 0) { console.log('!!! 1 -> 2'); }
              //if (cellCnt >= 0) { console.log('1'); }
              //if (cellCnt >= 0 && pleerType == 10) { console.log('1-10'); }
              //if (cellCnt >= 0 && pleerType == 11) { console.log('1-11'); }
            }  

            //if ((pleerNextType == 11) || ((pleerNextType == 10) && (stepsToEnd > 2))) {
            //if ((pleerNextType == 11) || ((pleerNextType == 10) && (stepsToEnd > APELSERG.CONFIG.SET.WinLineNum - 3))) {
            //if(pleerNextType == 11) {

            if(cellCnt < 0) {  

              // Случайный выбор направления вносит динамику не влияя на качество
              //
              cellCnt = APELSERG.MODEL.CheckNextSteps(pleerNextSet, stepsToEnd, APELSERG.MODEL.GetRandomNumber(11) % 2);

              //if (cellCnt >= 0) { console.log('2'); }
              //if (cellCnt >= 0 && pleerNextType == 10) { console.log('2-10'); }
              //if (cellCnt >= 0 && pleerNextType == 11) { console.log('2-11'); }
            }
          //}

            //if (cellCnt < 0) {
            if (stepsToEnd >= APELSERG.CONFIG.SET.WinLineNum) {

              if(cellCnt < 0) {

                cellCnt = APELSERG.MODEL.CheckSetLines(pleerNextSet, stepsToEnd);

                //console.log('!!! = 3; stepsToEnd = ' + stepsToEnd);
                //if (cellCnt >= 0) { console.log('OK = 3; stepsToEnd = ' + stepsToEnd); }
                //if (cellCnt >= 0 && pleerNextType == 10) { console.log('3-10'); }
                //if (cellCnt >= 0 && pleerNextType == 11) { console.log('3-11'); }
              }
            }

            if(cellCnt >= 0) {
              break;
            }
          }

          if(cellCnt >= 0) {
            break;
          }
        }
      }
    }
  }
  return cellCnt;
}
