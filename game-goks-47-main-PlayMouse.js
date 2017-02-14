// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Играет Mouse
//===
APELSERG.MAIN.PlayMouse = function (event) {
  
  if (!APELSERG.CONFIG.PROC.GameStop &&
      !APELSERG.CONFIG.PROC.GameWin  &&
      APELSERG.CONFIG.PROC.Board.Pleers[APELSERG.CONFIG.PROC.Board.PleerCurrent].Type == 3) {
        
    var mouseX = event.clientX - APELSERG.CONFIG.PROC.CanvaID.offsetLeft;
    var mouseY = event.clientY - APELSERG.CONFIG.PROC.CanvaID.offsetTop;
    var gap = 5; // уменьшить размер попадания в квадрат

    for (var Cnt = 0; Cnt < APELSERG.CONFIG.PROC.Board.Pool.length; Cnt++) {

      if(APELSERG.CONFIG.PROC.Board.Pool[Cnt].Set == 0) {

        var cell = APELSERG.CONFIG.PROC.Board.Pool[Cnt];
        var baseX1 = APELSERG.CONFIG.SET.BoardBorderWidth + gap + cell.Col * APELSERG.CONFIG.SET.CellSize;
        var baseX2 = baseX1 + APELSERG.CONFIG.SET.CellSize - (2 * gap);
        var baseY1 = APELSERG.CONFIG.SET.BoardBorderWidth + gap + cell.Row * APELSERG.CONFIG.SET.CellSize;
        var baseY2 = baseY1 + APELSERG.CONFIG.SET.CellSize - (2 * gap);

        if(mouseX > baseX1 && mouseX < baseX2 && mouseY > baseY1 && mouseY < baseY2) {

/*
          var pleerCurrSet = APELSERG.CONFIG.PROC.Board.Pleers[APELSERG.CONFIG.PROC.Board.PleerCurrent].Set;

          APELSERG.CONFIG.PROC.Board.Pool[Cnt].Set = pleerCurrSet;

          if(!APELSERG.MODEL.CheckGameOver(pleerCurrSet,Cnt)) {
            APELSERG.MODEL.SetNextPleer();
          }
*/
          APELSERG.MAIN.HandleGame(Cnt);

          //APELSERG.CANVA.BoardRewrite(); // отрисовка игрового поля

          break;
        }
      }
    }
  }
}
