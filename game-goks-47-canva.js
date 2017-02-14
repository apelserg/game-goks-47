// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Перерисовать игровое поле
//===
APELSERG.CANVA.BoardRewrite = function () {

    var ctx = APELSERG.CONFIG.PROC.Ctx;

    // Очистить canvas
    //
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, APELSERG.CONFIG.PROC.CanvaID.width, APELSERG.CONFIG.PROC.CanvaID.height);

    //-- Инфо
    //--
    var infoX = 0;
    var infoY = 0;
    var longX = 0;
    var longY = 0;

    if(APELSERG.CONFIG.SET.BoardInfoPlace == 2) {
      infoX = APELSERG.CONFIG.PROC.CanvaID.width - APELSERG.CONFIG.SET.BoardInfoSize;
      infoY = APELSERG.CONFIG.SET.BoardBorderWidth;
      longX = APELSERG.CONFIG.SET.BoardInfoSize - 1 * APELSERG.CONFIG.SET.BoardBorderWidth;
      longY = APELSERG.CONFIG.PROC.CanvaID.height - 2 * APELSERG.CONFIG.SET.BoardBorderWidth;
    }

    ctx.fillStyle = APELSERG.MODEL.GetColor(0);
    ctx.fillRect(infoX, infoY, longX, longY);

    if (!APELSERG.CONFIG.PROC.GameStop) {
      for (var Cnt = 0 ; Cnt < APELSERG.CONFIG.PROC.Board.Pleers.length; Cnt++) {
        ctx.fillStyle = APELSERG.MODEL.GetColor(APELSERG.CONFIG.PROC.Board.Pleers[Cnt].Set);
        ctx.fillRect(infoX + 15, (infoY + 50) + Cnt * (APELSERG.CONFIG.SET.CellSize + 10) , APELSERG.CONFIG.SET.CellSize, APELSERG.CONFIG.SET.CellSize);
        if(APELSERG.CONFIG.PROC.Board.PleerCurrent == Cnt) {
          var gap = 5;
          ctx.fillStyle = APELSERG.MODEL.GetColor(0);
          ctx.fillRect(infoX + 15 + gap, (infoY + 50 + gap) + Cnt * (APELSERG.CONFIG.SET.CellSize + 10) , APELSERG.CONFIG.SET.CellSize - 2 * gap, APELSERG.CONFIG.SET.CellSize - 2 * gap);
        }
      }
      ctx.font = (APELSERG.CONFIG.SET.CellSize - 10).toString() +  "px Arial";
      ctx.fillStyle = APELSERG.MODEL.GetColor(APELSERG.CONFIG.PROC.Board.Pleers[APELSERG.CONFIG.PROC.Board.PleerCurrent].Set);
      ctx.textAlign = "center";
      ctx.fillText(APELSERG.CONFIG.SET.WinLineNum.toString(), infoX + 35, infoY + 35);
    }

    // Сетка
    //
    ctx.strokeStyle = "#E0E0E0";
    for (var nRow = 0 ; nRow < APELSERG.CONFIG.SET.BoardSize; nRow++) {
      for (var nColumn = 0 ; nColumn < APELSERG.CONFIG.SET.BoardSize; nColumn++) {
        ctx.lineWidth = 2;
        ctx.strokeRect(APELSERG.CONFIG.SET.BoardBorderWidth + nColumn * APELSERG.CONFIG.SET.CellSize, APELSERG.CONFIG.SET.BoardBorderWidth + nRow * APELSERG.CONFIG.SET.CellSize, APELSERG.CONFIG.SET.CellSize, APELSERG.CONFIG.SET.CellSize);
      }
    }

    // Ячейки
    //
    if (!APELSERG.CONFIG.PROC.GameStop) {
      for (var Cnt = 0; Cnt < APELSERG.CONFIG.PROC.Board.Pool.length; Cnt++) {
        APELSERG.CANVA.CellRewrite(ctx, APELSERG.CONFIG.PROC.Board.Pool[Cnt], 2); 
      }
    }

    // Игра закончена (выигрыш)
    //
    if (APELSERG.CONFIG.PROC.GameWin) {

      if (!APELSERG.CONFIG.PROC.GameDraw) {

        for (var Cnt = 0; Cnt < APELSERG.CONFIG.PROC.WinCnt; Cnt++) {
          APELSERG.CANVA.CellRewrite(ctx, APELSERG.CONFIG.PROC.Board.Pool[APELSERG.CONFIG.PROC.WinLine[Cnt]], -1); 
        }

        var cellBeg = APELSERG.CONFIG.PROC.Board.Pool[APELSERG.CONFIG.PROC.WinLine[0]];
        var cellEnd = APELSERG.CONFIG.PROC.Board.Pool[APELSERG.CONFIG.PROC.WinLine[APELSERG.CONFIG.PROC.WinCnt - 1]];

        var x1 = cellBeg.Col * APELSERG.CONFIG.SET.CellSize + APELSERG.CONFIG.SET.CellSize / 2 + APELSERG.CONFIG.SET.BoardBorderWidth;
        var y1 = cellBeg.Row * APELSERG.CONFIG.SET.CellSize + APELSERG.CONFIG.SET.CellSize / 2 + APELSERG.CONFIG.SET.BoardBorderWidth; 
        var x2 = cellEnd.Col * APELSERG.CONFIG.SET.CellSize + APELSERG.CONFIG.SET.CellSize / 2 + APELSERG.CONFIG.SET.BoardBorderWidth;
        var y2 = cellEnd.Row * APELSERG.CONFIG.SET.CellSize + APELSERG.CONFIG.SET.CellSize / 2 + APELSERG.CONFIG.SET.BoardBorderWidth; 

        var saveLineWidth = ctx.lineWidth;        
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.lineWidth = saveLineWidth;
      }

      if(APELSERG.CONFIG.PROC.GameDraw) {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("GAME_DRAW"));
      }
      else {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("GAME_OVER"));
      }
    }

    // Номера ходов (в конце - чтобы поверх другой инфо)
    //
    if (!APELSERG.CONFIG.PROC.GameStop && APELSERG.CONFIG.SET.ShowGameCnt != 0) {
      for (var Cnt = 0; Cnt < APELSERG.CONFIG.PROC.Board.Pool.length; Cnt++) {
        APELSERG.CANVA.CellRewriteInfo(ctx, APELSERG.CONFIG.PROC.Board.Pool[Cnt]); 
      }
    }

}

//===
// Ячейка
//===
APELSERG.CANVA.CellRewrite = function (ctx, cell, gap) {

  var xR = (APELSERG.CONFIG.SET.BoardBorderWidth + gap) + (cell.Col) * APELSERG.CONFIG.SET.CellSize;
  var xL = APELSERG.CONFIG.SET.CellSize - 2 * gap;
  var yR = (APELSERG.CONFIG.SET.BoardBorderWidth + gap) + (cell.Row) * APELSERG.CONFIG.SET.CellSize;
  var yL = APELSERG.CONFIG.SET.CellSize - 2 * gap;

  ctx.fillStyle = APELSERG.MODEL.GetColor(cell.Set);
  ctx.fillRect(xR, yR, xL, yL);
}

//===
// Номер хода
//===
APELSERG.CANVA.CellRewriteInfo = function (ctx, cell) {

  if(cell.Cnt > 0) {

    var xR = APELSERG.CONFIG.SET.BoardBorderWidth + cell.Col * APELSERG.CONFIG.SET.CellSize;
    var yR = APELSERG.CONFIG.SET.BoardBorderWidth + cell.Row * APELSERG.CONFIG.SET.CellSize;

    ctx.font = "12px arial";
    ctx.fillStyle =  "black"; 
    ctx.textAlign = "left";
    ctx.fillText(cell.Cnt.toString(), xR + 5, yR + 20);
  }
}

//===
// Текст
//===
APELSERG.CANVA.TextRewrite = function (ctx, strText) {
  ctx.font = "bold 30px Arial";
  ctx.strokeStyle =  "white"; //"gray"; //'white'; //"red";
  ctx.textAlign = "center";
  ctx.strokeText(strText, (APELSERG.CONFIG.PROC.CanvaID.width - APELSERG.CONFIG.SET.BoardInfoSize) / 2 , APELSERG.CONFIG.PROC.CanvaID.height / 2);
}
