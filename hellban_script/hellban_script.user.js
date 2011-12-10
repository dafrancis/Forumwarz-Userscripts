// ==UserScript==
// @name           HELLBAN SCRIPT
// @namespace      WHAT THE FUCK IS THIS FOR?
// @description    I'M REDOING THE IDIOT ERASER CAUSE IT DOESN'T WORK FOR SOME REASON
// @include        http://*forumwarz.com/discussions/*
// @include        http://forumwarz.com/discussions/*
// @exclude        http://www.forumwarz.com/discussions/reply/*
// ==/UserScript==

var oc = function (a){
    var i, o = {};
    for (i=0; i < a.length; i++){o[a[i]] = '';}
    return o;
};
    
var fwz_retards = GM_getValue('tards', '').split(';');

//injecting Modalbox stylesheet
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.forumwarz.com/stylesheets/modalbox.css';
document.getElementsByTagName("head")[0].appendChild(link);
    
var Element = unsafeWindow.Element;
var Effect = unsafeWindow.Effect;
var $ = unsafeWindow.window.$;

// add settings div
var oSettingsDiv = document.createElement('div');
oSettingsDiv.id = 'MB_window';
oSettingsDiv.style.zIndex = '999999';
oSettingsDiv.style.position = 'absolute';
oSettingsDiv.style.left = '30%';
oSettingsDiv.style.top = '30%';
oSettingsDiv.style.display = 'none';
document.body.appendChild(oSettingsDiv);

var oConfigLi = document.createElement('span');
oConfigLi.className = 'indent';
oConfigLi.innerHTML = '<b><a href=\"#\" title=\"Hellban Settings\" id=\"HELLBANSCRIPT\" style=\"color:white\"><span class=\"inner\">HELLBAN SETTINGS</span></a></b><br />';

document.getElementById('logged_in_status').appendChild(oConfigLi);

/*
Oh Jegus Christ Firefox doesn't seem to like nextSibling.
Well it does but it doesn't work very well.
Thanks Stack Overflow I guess.
http://stackoverflow.com/questions/868407/hide-an-elements-next-sibling-with-javascript
*/
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType !== 1);
    return elem;                
}

function hide_tards(){
    var i, h1 = document.getElementsByTagName("h1");
    for(i = 0; i < h1.length; i++) {
        if(oc(fwz_retards).hasOwnProperty(h1[i].children[0].innerHTML.replace("-<br>",""))) {
            next(h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).style.display = "none";
            h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }else{
            next(h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).style.display = "";
            h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "";
        }
    }
}

function showOptions() {
    var i, settingsHTML = '<div id="MB_frame" style="bottom: 0px">'
        + '<div id="MB_header"><div id="MB_caption">Hellban Script Settings</div>'
        + '<a id="MB_close" title="Close window" href="#" onClick="closeWindow()"><span>×</span></a></div>'
        + '<div id="MB_content" style="position: relative;">';
    settingsHTML += 'Retard: <input type="text" id="retard_name" />';
    settingsHTML += '<input type="button" value="Add" onClick="addTard()" /><br />';
    settingsHTML += '<br /><br /><table style="float: left;"><tr><td>Hellban List</td><td></td><tr><td><select size="10" id="existing_tards" onChange="existingSelectChanged()" style="width:200px">';

    for (i in fwz_retards) {
        if(fwz_retards.hasOwnProperty(i) && fwz_retards[i] !== '') {
            settingsHTML += '<option>' + fwz_retards[i] + '</option>';
        }
    }
    
    settingsHTML += '</select></td><td><br /><br /><br /><input type="button" value="Delete" onClick="deleteTard()" /></td></tr>';
    settingsHTML += '</table>';
    settingsHTML += '<br /><br /><input onclick="closeSettings();" type="button" value="Save" style="width:100%; margin-top: 10px;" />';
    settingsHTML += '</div>';
    
    oSettingsDiv.innerHTML = settingsHTML;
    oSettingsDiv.style.display = '';
    Effect.Fade($('MB_window'), {from: 0, to: 100, duration: 5});
}

document.getElementById('HELLBANSCRIPT').addEventListener('click', showOptions, true);

unsafeWindow.closeWindow = function() {
    oSettingsDiv.style.display = 'none';
    //Effect.Fade($('MB_window'), {from: 100, to: 0, duration: 5});
};

unsafeWindow.addTard = function() {
    window.setTimeout(function() {
        fwz_retards.push(document.getElementById('retard_name').value);        
        document.getElementById('existing_tards').innerHTML += '<option>' + document.getElementById('retard_name').value + '</option>';
        document.getElementById('retard_name').value = '';
    }, 0);
};

unsafeWindow.deleteTard = function() {
    window.setTimeout(function() {
        existingtabs = document.getElementById('existing_tards');
        existingtabs.remove(existingtabs.selectedIndex);
        document.getElementById('retard_name').value = '';
    }, 0);
};

unsafeWindow.closeSettings = function() {
    window.setTimeout(function() {
        var orderedtards = [];
        var existingtards = document.getElementById('existing_tards').options;
        var i, j;
        for(i in existingtards) {
            if (existingtards.hasOwnProperty(i)) {
                for (j in fwz_retards) {
                    if (fwz_retards.hasOwnProperty(j) && fwz_retards[j] === existingtabs[i].text) {
                        orderedtards.push(fwz_retards[j]);
                        break;
                    }
                }
            }
        }
        fwz_retards = orderedtards;
        // save settings
        GM_setValue('tards', fwz_retards.join(';'));
    }, 0);
    //Effect.Fade($('settings_div'), {from: 100, to: 0, duration: 1});
    oSettingsDiv.style.display = 'none';
    hide_tards();
};

var h1 = document.getElementsByTagName("h1");
var funcador = [];
var newElement = [];

function tard_button(e){
    console.log(e);
    var name = e.parentNode.children[0].children[0].children[0].children[0].innerHTML.replace("-<br>","");
    if(!confirm("Are you sure you want to hellban "+name)) {
        return;
    }
    fwz_retards.push(name);
    foo = '';
    for (i=0; i<fwz_retards.length; ++i) {
        foo += fwz_retards[i]+';';
    }
    foo = foo.substr(0, foo.length-1);
    GM_setValue('tards', foo);
    hide_tards();
}

for(i = 0; i < h1.length; i++) {
    newElement = document.createElement('input');
    newElement.setAttribute("value", "HELLBAN THIS USER");
    newElement.setAttribute("id", i);
    newElement.setAttribute("type", "button");
    newElement.addEventListener('click', tard_button, false);
    h1[i].parentNode.parentNode.parentNode.appendChild(newElement);
}

var idiots_erased = 0;

var hide_threads = function (threads) {
    var i, user_name;
    for(i = 1; i < threads.length;i++){
        user_name = threads[i].children[0].children[0].title.replace(/.*?by: /, "");
        if(oc(fwz_retards).hasOwnProperty(user_name)){
            threads[i].style.display = "none";
            idiots_erased++;
        }
    }
};

if(document.URL.replace(/.*\//,"") === "discussions") {
    var rp = document.getElementById("rp").children[1].children[0].children[0].children;
    hide_threads(rp);
    var cd = document.getElementById("civil").children[1].children[0].children[0].children;
    hide_threads(cd);
}

if(document.URL.replace(/.*\//,"") === "rp") {
    var rp = document.getElementById("rp").children[2].children[0].children;
    hide_threads(rp);
}

if(document.URL.replace(/.*\//,"") === "civil") {
    var cd = document.getElementById("civil").children[2].children[0].children;
    hide_threads(cd);
}

hide_tards();
