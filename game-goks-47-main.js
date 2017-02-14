// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

// Глобальные переменные
//

var APELSERG = {};

APELSERG.MAIN = {};
APELSERG.MODEL = {};
APELSERG.CANVA = {};
APELSERG.UI = {};
APELSERG.LANG = {};
APELSERG.CONFIG = {};
APELSERG.CONFIG.SET = {};
APELSERG.CONFIG.KEY = {};
APELSERG.CONFIG.PROC = {};

//===
// старт программы (начальная прорисовка)
//===
APELSERG.MAIN.OnLoad = function (initFirst) {

    // определить место загрузки
    //
    window.location.protocol == "file:" ? APELSERG.CONFIG.PROC.LoadFromWeb = false : APELSERG.CONFIG.PROC.LoadFromWeb = true;

    // инициализация данных из localeStorage
    //
    APELSERG.CONFIG.GetConfigOnLoad();

    // канва
    //
    APELSERG.CONFIG.PROC.CanvaID = document.getElementById('APELSERG_CanvasGoks');
    APELSERG.CONFIG.PROC.Ctx = APELSERG.CONFIG.PROC.CanvaID.getContext('2d');

    if(APELSERG.CONFIG.SET.BoardInfoPlace == 2) {
      APELSERG.CONFIG.PROC.CanvaID.width = (APELSERG.CONFIG.SET.BoardSize * APELSERG.CONFIG.SET.CellSize) + (2 * APELSERG.CONFIG.SET.BoardBorderWidth) + APELSERG.CONFIG.SET.BoardInfoSize;
      APELSERG.CONFIG.PROC.CanvaID.height = (APELSERG.CONFIG.SET.BoardSize * APELSERG.CONFIG.SET.CellSize) + (2 * APELSERG.CONFIG.SET.BoardBorderWidth);
    }
    //APELSERG.CONFIG.PROC.CanvaID.style.cursor = "move"; //"crosshair"; //"none"; //"crosshair"; //"move";

    // инициализация базовых объектов
    //
    APELSERG.MAIN.Stop();  // отрисовка наименований кнопок

    // только для начальной инициализации
    //
    if (initFirst) {

        //===
        // Движения мыши
        //===
        //APELSERG.CONFIG.PROC.CanvaID.addEventListener('mousemove', function (event) {
        //  APELSERG.MAIN.MouseOnMove(event);
        //});

        //===
        // Клик мыши
        //===
        APELSERG.CONFIG.PROC.CanvaID.addEventListener('click', function (event) {
          //APELSERG.MAIN.MouseOnClick(event);
          if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GameWin) {
            APELSERG.MAIN.PlayMouse(event);
          }
        });

        //===
        // Двойной клик мыши
        //===
        //APELSERG.CONFIG.PROC.CanvaID.addEventListener('dblclick', function (event) {
        //  if (APELSERG.CONFIG.PROC.GameStop) APELSERG.MAIN.Start();
        //});
    }
}

//===
// Click мыши
//===
// APELSERG.MAIN.MouseOnClick = function (event) {
//   if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GameWin) {
//     APELSERG.MAIN.PlayMouse(event);
//   }
// }

//===
// Старт
//===
APELSERG.MAIN.Start = function () {

    // старт
    //
    if (APELSERG.CONFIG.PROC.GameStop) {

        // закрыть окна (если открыты - должны закрыться)
        //
        if (APELSERG.CONFIG.PROC.UiSettings) APELSERG.UI.ShowSettings();
        if (APELSERG.CONFIG.PROC.UiHelp) APELSERG.UI.ShowHelp();

        // кнопки
        //
        document.getElementById('APELSERG_InputSettings').value = '-';
        document.getElementById('APELSERG_InputHelp').value = '-';
        document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('STOP');
        document.getElementById("APELSERG_InputStartStop").blur(); // здесь надо

        // новая игра - инициализация
        //
        APELSERG.MODEL.SetBoardOnStart();
        //
        window.clearTimeout(APELSERG.CONFIG.PROC.TimeoutID); // отмена таймера (ещё раз, на всякий пожарный)
        APELSERG.MAIN.HandleBots(); // запуск рабочего цикла (если первый игрок - бот)

        APELSERG.CANVA.BoardRewrite(); // отрисовка игрового поля
    }
}

//===
// Стоп
//===
APELSERG.MAIN.Stop = function () {

    document.getElementById('APELSERG_InputSettings').value = APELSERG.LANG.GetText('CONFIG');
    document.getElementById('APELSERG_InputHelp').value = APELSERG.LANG.GetText('HELP');
    document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('START');

    APELSERG.CONFIG.PROC.GameStop = true;
    APELSERG.CONFIG.PROC.GameWin = false;

    window.clearTimeout(APELSERG.CONFIG.PROC.TimeoutID); // отмена таймера

    APELSERG.CANVA.BoardRewrite(); // отрисовка игрового поля
}

//===
// Старт/Стоп (для кнопки)
//===
APELSERG.MAIN.StartStop = function () {
    if (APELSERG.CONFIG.PROC.GameStop) {
      APELSERG.MAIN.Start();
    }
    else {
      APELSERG.MAIN.Stop();
    }
}

//===
// Управление игрой
//===
APELSERG.MAIN.HandleGame = function (cellCnt) {

  var pleerCurr = APELSERG.CONFIG.PROC.Board.PleerCurrent;
  var pleerCurrSet = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Set;
  var pleerCurrType = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Type; 

  if(cellCnt < 0) {

    APELSERG.CONFIG.PROC.GameWin = true;
    APELSERG.CONFIG.PROC.GameDraw = true;
    APELSERG.CONFIG.PROC.WinCnt = 0; // чтобы не высвечивались ячейки при ничьей
  }
  else {
    
    APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].BaseCellIdx = cellCnt;
    APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Set = pleerCurrSet;

    //APELSERG.CONFIG.PROC.Board.GameCnt++;
    APELSERG.CONFIG.PROC.Board.Pool[cellCnt].Cnt = ++APELSERG.CONFIG.PROC.Board.GameCnt;

    if(!APELSERG.MODEL.CheckGameOver(pleerCurrSet,cellCnt)) {
      APELSERG.MODEL.SetNextPleer();
    }
  }

  APELSERG.CANVA.BoardRewrite(); // отрисовка

  APELSERG.CONFIG.PROC.TimeoutID = window.setTimeout(function () {
    APELSERG.MAIN.HandleBots();
  }, APELSERG.CONFIG.SET.BotSpeed);
}

//===
// Обслуживание ботов
//===
APELSERG.MAIN.HandleBots = function () {

  if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GameWin) {

    var pleerCurr = APELSERG.CONFIG.PROC.Board.PleerCurrent;
    //var pleerCurrSet = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Set;
    var pleerCurrType = APELSERG.CONFIG.PROC.Board.Pleers[pleerCurr].Type; 
    
    if(pleerCurrType == 10 || pleerCurrType == 11) {
      APELSERG.MAIN.HandleGame(APELSERG.MAIN.PlayComp());
    }
  }
}
