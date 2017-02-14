// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Получить текст на выбранном языке
//===
APELSERG.LANG.GetText = function (keyText) {

    if (APELSERG.CONFIG.SET.Lang == "EN") {
        if (keyText == "YES") return "Yes";
        if (keyText == "NO") return "No";
        if (keyText == "CANCEL") return "Cancel";
        if (keyText == "STOP") return "STOP";
        if (keyText == "START") return "START";
        if (keyText == "PAUSE") return "PAUSE";
        if (keyText == "CONTINUE") return "CONTINUE";
        if (keyText == "SAVE") return "Save";
        if (keyText == "RESET") return "Reset";
        if (keyText == "CLOSE") return "Close";
        if (keyText == "RELOAD_PAGE") return "Reload page";
        if (keyText == "NO_DATA") return "No data";
        if (keyText == "NO_RESULT") return "No results";
        if (keyText == "CONFIG") return "Config";
        if (keyText == "SCORE") return "Score";
        if (keyText == "HELP") return "Help";
        if (keyText == "KB") return "Kb";
        if (keyText == "MOUSE") return "Mouse";
        if (keyText == "COMP") return "Comp";
        if (keyText == "COMP2") return "Comp2";
        if (keyText == "LAST") return "Last";
        if (keyText == "BEST") return "Best";
        if (keyText == "LABEL_NAME") return "Name";
        if (keyText == "LABEL_LANG") return "Lang";
        if (keyText == "LABEL_WIDTH") return "Width";
        if (keyText == "LABEL_HEIGHT") return "Height";
        if (keyText == "LABEL_POINTS") return "Points";
        if (keyText == "LABEL_LEVEL") return "Level";
        if (keyText == "LABEL_SKILL") return "Skill";
        if (keyText == "LABEL_CELL_SIZE") return "Cell";
        if (keyText == "LABEL_INFO") return "Info";
        if (keyText == "ERROR_DEVICE") return "Corrected";
        if (keyText == "GAME_OVER") return "GAME OVER";
        if (keyText == "GAME_DRAW") return "DRAW";
        if (keyText == "LABEL_BOARD_SIZE") return "Board";
        if (keyText == "LABEL_WIN_LINE_NUM") return "Line";
        if (keyText == "LABEL_BOT_SPEED") return "Speed";
        if (keyText == "LABEL_PLEERS_NUM") return "Pleers";
        if (keyText == "LABEL_SHOW_GAME_CNT") return "Counter";
        return "== ? EN ? ==";
    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        if (keyText == "YES") return "Да";
        if (keyText == "NO") return "Нет";
        if (keyText == "CANCEL") return "Отмена";
        if (keyText == "STOP") return "СТОП";
        if (keyText == "START") return "СТАРТ";
        if (keyText == "PAUSE") return "ПАУЗА";
        if (keyText == "CONTINUE") return "ПРОДОЛЖИТЬ";
        if (keyText == "SAVE") return "Сохранить";
        if (keyText == "RESET") return "Сбросить";
        if (keyText == "CLOSE") return "Закрыть";
        if (keyText == "RELOAD_PAGE") return "Перегрузите страницу";
        if (keyText == "NO_DATA") return "Нет данных";
        if (keyText == "NO_RESULT") return "Нет результатов";
        if (keyText == "CONFIG") return "Настройка";
        if (keyText == "SCORE") return "Очки";
        if (keyText == "HELP") return "Помощь";
        if (keyText == "KB") return "Кл";
        if (keyText == "MOUSE") return "Мышь";
        if (keyText == "COMP") return "Комп";
        if (keyText == "COMP2") return "Комп2";
        if (keyText == "LAST") return "Последние";
        if (keyText == "BEST") return "Лучшие";
        if (keyText == "LABEL_NAME") return "Имя";
        if (keyText == "LABEL_LANG") return "Язык";
        if (keyText == "LABEL_WIDTH") return "Ширина";
        if (keyText == "LABEL_HEIGHT") return "Глубина";
        if (keyText == "LABEL_POINTS") return "Очков";
        if (keyText == "LABEL_LEVEL") return "Уровень";
        if (keyText == "LABEL_SKILL") return "Сложность";
        if (keyText == "LABEL_CELL_SIZE") return "Блок";
        if (keyText == "LABEL_INFO") return "Инфо";
        if (keyText == "ERROR_DEVICE") return "Исправлено";
        if (keyText == "GAME_OVER") return "ИГРА ЗАВЕРШЕНА";
        if (keyText == "GAME_DRAW") return "НИЧЬЯ";
        if (keyText == "LABEL_BOARD_SIZE") return "Поле";
        if (keyText == "LABEL_WIN_LINE_NUM") return "Линия";
        if (keyText == "LABEL_BOT_SPEED") return "Скорость";
        if (keyText == "LABEL_PLEERS_NUM") return "Игороки";
        if (keyText == "LABEL_SHOW_GAME_CNT") return "Счётчик";
        return "== ? RU ? ==";
    }

    return "== ? No lang ? ==";
}


//===
// Получить помощь на выбранном языке
//===
APELSERG.LANG.GetHelp = function () {

    if (APELSERG.CONFIG.SET.Lang == "EN") {

        return "" +
            "<h3>Game</h3>" +
            "<pre>" +
            "Start - [START] <br/>" +
            "Stop - winning, [STOP], page reload <br/>" +
            "Resize mode - Ctrl+, Ctrl- <br/>" +
            "Full screen mode on/off - [F11] <br/>" +
            "</pre>" +
            "" +
            "<h3>Top buttons</h3>" +
            "<pre>" +
            "Settings, Help <br/>" +
            "Available when [Stop] <br/>" +
            "When start - windows are closed and game begins <br/>" +
            "</pre>" +
            "" +
            "<h3>Problems</h3>" +
            "<pre>" +
            "1. Reset settings (button [Reset]) <br/>" +
            "2. Reload browser <br/>" +
            "3. Update your browser to the latest version <br/>" +
            "4. Try a different browser <br/>" +
            "</pre>";
    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        return "" +
            "<h3>Игра</h3>" +
            "<pre>" +
            "Старт - [СТАРТ] <br/>" +
            "Стоп - выигрыш, [СТОП], перезагрузка страницы <br/>" +
            "Изменение размера - Ctrl+, Ctrl- <br/>" +
            "Полноэкранный режим вкл/выкл - [F11] <br/>" +
            "</pre>" +
            "" +
            "<h3>Кнопки сверху</h3>" +
            "<pre>" +
            "Настройка, помощь <br/>" +
            "Доступны в режиме [Стоп] <br/>" +
            "При старте - окна закрываются, начинается игра <br/>" +
            "</pre>" +
            "" +
            "<h3>Проблемы</h3>" +
            "<pre>" +
            "1. Сбросить настройки (кнопка [Сбросить]) <br/>" +
            "2. Перезагрузить браузер <br/>" +
            "3. Обновить браузер до последней версии <br/>" +
            "4. Попробовать другой браузер <br/>" +
            "</pre>";
    }

    return "== ? No help ? ==";
}
