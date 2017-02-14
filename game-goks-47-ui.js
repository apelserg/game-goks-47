// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Применить изменения
//===
APELSERG.UI.ApplySettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {

            APELSERG.CONFIG.SET.BoardSize = parseInt(document.getElementById('APELSERG_BoardSize').value);
            APELSERG.CONFIG.SET.WinLineNum = parseInt(document.getElementById('APELSERG_WinLineNum').value);
            APELSERG.CONFIG.SET.PleersNum = parseInt(document.getElementById('APELSERG_PleersNum').value);
            //APELSERG.CONFIG.SET.BotSpeed = parseInt(document.getElementById('APELSERG_BotSpeed').value);
            APELSERG.CONFIG.SET.ShowGameCnt = parseInt(document.getElementById('APELSERG_ShowGameCnt').value);
            APELSERG.CONFIG.SET.Lang = document.getElementById('APELSERG_Lang').value;

            for(var Cnt = 0; Cnt < APELSERG.CONFIG.SET.PleersNum; Cnt++) {

              var strId = "APELSERG_PleersNum_" + Cnt.toString();

              APELSERG.CONFIG.SET.UserDevice[Cnt] = document.getElementById(strId).value;
            }

            // коррекция значений
            //
            if(APELSERG.CONFIG.SET.WinLineNum > APELSERG.CONFIG.SET.BoardSize) {
                APELSERG.CONFIG.SET.WinLineNum = APELSERG.CONFIG.SET.BoardSize;
            }

            // закрыть окно
            //
            document.getElementById('APELSERG_DivSettings').innerHTML = "";
            APELSERG.CONFIG.PROC.UiSettings = false;

            // сохранить новую конфигурацию
            //
            var configName = APELSERG.CONFIG.GetLocalStorageConfigName();
            localStorage[configName] = JSON.stringify(APELSERG.CONFIG.SET);

            // переинициализация
            //
            APELSERG.MAIN.OnLoad(false);
        }
    }
}

//===
// Показать окно настроек
//===
APELSERG.UI.ShowSettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {

            document.getElementById('APELSERG_DivSettings').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivSettings').innerHTML = APELSERG.UI.GetHtmlDivSettings();

            document.getElementById('APELSERG_BoardSize').value = APELSERG.CONFIG.SET.BoardSize;
            document.getElementById('APELSERG_WinLineNum').value = APELSERG.CONFIG.SET.WinLineNum;
            document.getElementById('APELSERG_PleersNum').value = APELSERG.CONFIG.SET.PleersNum;
            //document.getElementById('APELSERG_BotSpeed').value = APELSERG.CONFIG.SET.BotSpeed;
            document.getElementById('APELSERG_ShowGameCnt').value = APELSERG.CONFIG.SET.ShowGameCnt;
            document.getElementById('APELSERG_Lang').value = APELSERG.CONFIG.SET.Lang;

            for(var Cnt = 0; Cnt < APELSERG.CONFIG.SET.PleersNum; Cnt++) {

              var strId = "APELSERG_PleersNum_" + Cnt.toString();

              document.getElementById(strId).value = APELSERG.CONFIG.SET.UserDevice[Cnt];
            }
        }

        APELSERG.CONFIG.PROC.UiSettings = !APELSERG.CONFIG.PROC.UiSettings;
    }
}

//===
// Показать окно помощи
//===
APELSERG.UI.ShowHelp = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiHelp) {
            document.getElementById('APELSERG_DivHelp').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivHelp').innerHTML = APELSERG.UI.GetHtmlDivHelp();
        }
    }

    APELSERG.CONFIG.PROC.UiHelp = !APELSERG.CONFIG.PROC.UiHelp;
}


//===
// HTML помощи
//===
APELSERG.UI.GetHtmlDivHelp = function () {

    return APELSERG.LANG.GetHelp() +
    "<input type='button' value='" + APELSERG.LANG.GetText("CLOSE") + "' onclick='APELSERG.UI.ShowHelp();' />" +
    "<hr />";
}

//===
// HTML настроек
//===
APELSERG.UI.GetHtmlDivSettings = function () {
    return "" +
    APELSERG.LANG.GetText("LABEL_BOARD_SIZE") + " " +
    "<select id='APELSERG_BoardSize'>" +
    "  <option value='3'>3</option>" +
    "  <option value='5'>5</option>" +
    "  <option value='7'>7</option>" +
    "  <option value='10'>10</option>" +
    "  <option value='15'>15</option>" +
    "  <option value='20'>20</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_WIN_LINE_NUM") + " " +
    "<select id='APELSERG_WinLineNum'>" +
    "  <option value='3'>3</option>" +
    "  <option value='4'>4</option>" +
    "  <option value='5'>5</option>" +
    "  <option value='6'>6</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_PLEERS_NUM") + " " +
    "  <select id='APELSERG_PleersNum' onchange='APELSERG.UI.ChangePleersNum();'>" +
    "  <option value='2'>2</option>" +
    "  <option value='3'>3</option>" +
    "  <option value='4'>4</option>" +
    "  <option value='5'>5</option>" +
    "  <option value='6'>6</option>" +
    "  <option value='7'>7</option>" +    
    "  </select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_SHOW_GAME_CNT") + " " +
    "<select id='APELSERG_ShowGameCnt'>" +
    "  <option value='0'>" + APELSERG.LANG.GetText("NO") + "</option>" +    
    "  <option value='1'>" + APELSERG.LANG.GetText("YES") + "</option>" +
    "  </select>" +
    " " +
    // APELSERG.LANG.GetText("LABEL_BOT_SPEED") + " " +
    // "<select id='APELSERG_BotSpeed'>" +
    // "  <option value='100'>0.1</option>" +
    // "  <option value='500'>0.5</option>" +
    // "  <option value='1000'>1</option>" +
    // "  <option value='2000'>2</option>" +
    // "  <option value='5000'>5</option>" +
    // "  <option value='10000'>10</option>" +
    // "  </select>" +
    // " " +
    APELSERG.LANG.GetText("LABEL_LANG") + " " +
    " " +
    "<select id='APELSERG_Lang'>" +
    "  <option value='EN'>EN</option>" +
    "  <option value='RU'>RU</option>" +
    "</select>" +
    "<br />" +
    "<br />" +
    "<div id='APELSERG_DivSettingsPleers'>" +
    APELSERG.UI.GetHtmlDivPleers(APELSERG.CONFIG.SET.PleersNum) +
    "</div>" +
    "<br />" +
    "<br />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("CLOSE") + "' onclick='APELSERG.UI.ShowSettings();' />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("SAVE") + "' onclick='APELSERG.UI.ApplySettings();' />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("RESET") + "' onclick='APELSERG.CONFIG.ResetConfig();' />" +
    "<hr />";
}

APELSERG.UI.GetHtmlDivPleers = function (pleersNum) {
  var strRes = "";
  
  for(var Cnt = 0; Cnt < pleersNum; Cnt++) {      
    strRes += APELSERG.UI.GetHtmlDivPleer(Cnt);
  }
  return strRes;
}

APELSERG.UI.GetHtmlDivPleer = function (pleerNum) {
    return "" +
    (pleerNum + 1).toString() +  ". " +
    "<select id='APELSERG_PleersNum_" + pleerNum.toString() + "'>" +
    "  <option value='3'>"  + APELSERG.LANG.GetText("MOUSE") + "</option>" +
    "  <option value='10'>" + APELSERG.LANG.GetText("COMP") + "</option>" +
    "  <option value='11'>" + APELSERG.LANG.GetText("COMP2") + "</option>" +
    "</select> " + 
    "<br />"
}

APELSERG.UI.ChangePleersNum = function () {

  var pNum = document.getElementById("APELSERG_PleersNum").value;

  document.getElementById("APELSERG_DivSettingsPleers").innerHTML = APELSERG.UI.GetHtmlDivPleers(pNum);

  for(var Cnt = 0; Cnt < pNum; Cnt++) {
    
    var strId = "APELSERG_PleersNum_" + Cnt.toString();

    document.getElementById(strId).value = APELSERG.CONFIG.SET.UserDevice[Cnt];
  }
}
