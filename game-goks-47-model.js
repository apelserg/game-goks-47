// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Базовый объект - ячейка
//===
APELSERG.MODEL.Cell = function (cellRow, cellCol) {
    this.Row = cellRow;
    this.Col = cellCol;
    this.Set = 0;        // сответствует индексу цвета (0, 1, 2, 3, ....)
    this.Cnt = 0;        // номер хода по-порядку
}

//===
// Базовый объект - игрок
//===
APELSERG.MODEL.Pleer = function (pleerType, pleerSet) {
    this.Type = pleerType;   // 1 - клава (не поддерживается), 3 - мышь,  10 - комп, 11 - комп (эксперт)
    this.Set  = pleerSet;    // индекс игрока (соответствует цвету: от 1 до 7)
    this.BaseCellIdx  = -1;  // индекс базовой ячейки на которую ориетирована текущая игра
}

//===
// Базовый объект - игральная доска
//===
APELSERG.MODEL.Board = function () {

    this.Size = APELSERG.CONFIG.SET.BoardSize;
    this.WinLineNum = APELSERG.CONFIG.SET.WinLineNum;
    this.GameCnt = 0;        // счетчик ходов в игре

    this.PleersNum = APELSERG.CONFIG.SET.PleersNum;
    this.PleerCurrent = 0;
    this.Pleers = [];

    this.Pool = [];
}


//===
// Новый pool
//===
APELSERG.MODEL.GetNewPool = function () {

    var newPool = [];

    for (var row = 0; row < APELSERG.CONFIG.SET.BoardSize; row++) {
        for (var col = 0; col < APELSERG.CONFIG.SET.BoardSize; col++) {
            newPool.push(new APELSERG.MODEL.Cell(row, col));
        }
    }

    return newPool;
}

//===
// Новый состав игроков
//===
APELSERG.MODEL.GetNewPleers = function () {

    var newPleers = [];

    for (var pleerCnt = 0; pleerCnt < APELSERG.CONFIG.SET.PleersNum; pleerCnt++) {
        newPleers.push(new APELSERG.MODEL.Pleer(APELSERG.CONFIG.SET.UserDevice[pleerCnt], pleerCnt + 1));
    }
    return newPleers;
}

//===
// Инициализация перед стартом
//===
APELSERG.MODEL.SetBoardOnStart = function () {

    APELSERG.CONFIG.PROC.WinCnt = 0;

    APELSERG.CONFIG.PROC.GameStop = false;
    APELSERG.CONFIG.PROC.GameWin = false;
    APELSERG.CONFIG.PROC.GameDraw = false;

    APELSERG.CONFIG.PROC.Board = new APELSERG.MODEL.Board();
    APELSERG.CONFIG.PROC.Board.Pleers = new APELSERG.MODEL.GetNewPleers();
    APELSERG.CONFIG.PROC.Board.Pool = new APELSERG.MODEL.GetNewPool();
    APELSERG.CONFIG.PROC.Board.GameCnt = 0;

    // динамическая установка стартовых значений игроков
    //
    var ran01 = APELSERG.MODEL.GetRandomNumber(APELSERG.CONFIG.PROC.Board.Size * APELSERG.CONFIG.PROC.Board.Size / 2 - 1);

    if(APELSERG.CONFIG.PROC.Board.Size == 3) { ran01 = 4;}
    if(APELSERG.CONFIG.PROC.Board.Size == 4) { ran01 = 6;}
    if(APELSERG.CONFIG.PROC.Board.Size >= 5) {
        ran01 = 2 * APELSERG.CONFIG.PROC.Board.Size + APELSERG.MODEL.GetRandomNumber(APELSERG.CONFIG.PROC.Board.Size * (APELSERG.CONFIG.PROC.Board.Size - 4));
    }

    for(var Cnt = 0; Cnt < APELSERG.CONFIG.PROC.Board.PleersNum; Cnt++) {

        var ran02 = APELSERG.MODEL.GetRandomNumber(APELSERG.CONFIG.PROC.Board.PleersNum + 1);
  
        if(ran02 == 1) { ran02 = (-1) * (APELSERG.CONFIG.PROC.Board.Size + 1);}
        if(ran02 == 2) { ran02 = (-1) * (APELSERG.CONFIG.PROC.Board.Size - 1);}
        if(ran02 == 3) { ran02 = APELSERG.CONFIG.PROC.Board.Size - 1;}
        if(ran02 == 4) { ran02 = APELSERG.CONFIG.PROC.Board.Size + 1;}
        if(ran02 == 5) { ran02 = (-1) * APELSERG.CONFIG.PROC.Board.Size;}
        if(ran02 == 6) { ran02 = APELSERG.CONFIG.PROC.Board.Size;}
        if(ran02 == 7) { ran02 = 1;}

        APELSERG.CONFIG.PROC.Board.Pleers[Cnt].BaseCellIdx = ran01 + ran02;

        for(var Dubl = 0; Dubl < APELSERG.CONFIG.PROC.Board.PleersNum; Dubl++) {
            if(Cnt != Dubl && APELSERG.CONFIG.PROC.Board.Pleers[Cnt].BaseCellIdx == APELSERG.CONFIG.PROC.Board.Pleers[Dubl].BaseCellIdx) {                
              Cnt--;
              break;
            }
        }
    }
}

//===
// Установить следующего игрока
//===
APELSERG.MODEL.SetNextPleer = function() {
  if(++APELSERG.CONFIG.PROC.Board.PleerCurrent >= APELSERG.CONFIG.PROC.Board.PleersNum) {
    APELSERG.CONFIG.PROC.Board.PleerCurrent = 0;  
  }
}

//===
// Определить следующего игрока
//===
APELSERG.MODEL.GetNextPleer = function(shift) {

  var nextPleer = APELSERG.CONFIG.PROC.Board.PleerCurrent;

  for(var Cnt = 0; Cnt != shift; Cnt++) {
    if(++nextPleer >= APELSERG.CONFIG.PROC.Board.PleersNum) {
      nextPleer = 0;  
    }
  }

  return nextPleer;
}

//===
// Получить случайное число из диапазона
//===
APELSERG.MODEL.GetRandomNumber = function(max) {
    return Math.round(Math.random() * max * 100) % max;
}

//===
// Получить цвет из списка
//===
APELSERG.MODEL.GetColor = function(i) {
    var cellColors = ['#cccccc', 'red', 'green', 'cyan', 'orange', 'yellow', 'darkblue', 'violet'];
    return cellColors[i];
}
