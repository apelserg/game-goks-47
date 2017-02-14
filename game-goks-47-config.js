// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

APELSERG.CONFIG.SET.Version = "0.1.0"
APELSERG.CONFIG.SET.LocalStorageName = "APELSERG-Goks47";

APELSERG.CONFIG.SET.CellSize = 40; // размер базового объекта (ячейки игрового поля) (в пикселях)

APELSERG.CONFIG.SET.BoardBorderWidth = 10; // ширина бордюра (в пикселях)
APELSERG.CONFIG.SET.BoardInfoSize = 2 * APELSERG.CONFIG.SET.CellSize; // ширина инфо (в пикселях)
APELSERG.CONFIG.SET.BoardInfoPlace = 2; // (-)1 - слева, (+)2 - справа, (-)3 - сверху, (-)4 - снизу

APELSERG.CONFIG.SET.BoardSize = 10; // размер игрового поля (в базовых объектах)
APELSERG.CONFIG.SET.WinLineNum = 5; // длина линии ячеек для выигрыша
APELSERG.CONFIG.SET.PleersNum = 2;  // количество игроков: от 2 до 7 (по кол-ву основных цветов)
                                    // некоторые структуры заточены на макс. = 7
                                    //   - в массиве цветов - 8. Нулевой цвет используется для фона
                                    //   - APELSERG.CONFIG.SET.UserDevice
                                    //   - APELSERG.CONFIG.PROC.FirstStep

APELSERG.CONFIG.SET.BotSpeed = 100; // настройка таймера

APELSERG.CONFIG.SET.UserDevice = [10, 11, 10, 10, 10, 10, 10];
APELSERG.CONFIG.SET.Lang = "EN"; // RU
APELSERG.CONFIG.SET.ShowGameCnt = 0; // показывать последовательность ходов

APELSERG.CONFIG.PROC.Board = {} ;

APELSERG.CONFIG.PROC.GameStop = true;
APELSERG.CONFIG.PROC.GameDraw = true;  // Ничья
APELSERG.CONFIG.PROC.GameWin = true;   // Меняют состояние:
                                       //  - APELSERG.MAIN.Start
                                       //  - APELSERG.MAIN.WorkTimer
                                       //  - APELSERG.MODEL.CheckGameOverCommonMacro

APELSERG.CONFIG.PROC.WinLine = [APELSERG.CONFIG.SET.BoardSize]; // строка выигрыша - массив равен длине игрового поля
APELSERG.CONFIG.PROC.WinCnt = 0; // реальная длина строки выигрыша

APELSERG.CONFIG.PROC.SetCnt = 0;  // строка выигрыша (SET = Current Pleer)
APELSERG.CONFIG.PROC.FullCnt = 0; // потенциальная строка выигрыша (SET = 0 + SET = Current Pleer)
APELSERG.CONFIG.PROC.RetCnt = -1; // индекс ячейки для следующего хода

APELSERG.CONFIG.PROC.UiSettings = false; // для синхронизации интерфейса и режима игры
APELSERG.CONFIG.PROC.UiHelp = false; // для синхронизации интерфейса и режима игры

APELSERG.CONFIG.PROC.TimeoutID = 0; // для управления таймером
APELSERG.CONFIG.PROC.LoadFromWeb = false; // HTML загружен с сети или локального диска (надо для сохранения результатов и конфигурации)

APELSERG.CONFIG.PROC.CanvaID;
APELSERG.CONFIG.PROC.Ctx;

//===
// Получить имя хранения конфигурации
//===
APELSERG.CONFIG.GetLocalStorageConfigName = function () {
    return APELSERG.CONFIG.SET.LocalStorageName + "-Config-" + APELSERG.CONFIG.SET.Version;
}

//===
// Получить конфигурацию
//===
APELSERG.CONFIG.GetConfigOnLoad = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

        // восстановить конфигурацию из хранилища
        //
        if (localStorage[configName] !== undefined) {
            APELSERG.CONFIG.SET = JSON.parse(localStorage[configName]);
        }
    }
}

//===
// Сброс конфигурации
//===
APELSERG.CONFIG.ResetConfig = function () {

    var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

    localStorage.removeItem(configName);

    if (APELSERG.CONFIG.PROC.UiSettings) {
        APELSERG.UI.ShowSettings();
    }

    document.getElementById('APELSERG_DivCanvas').innerHTML = APELSERG.LANG.GetText('RELOAD_PAGE');
}

