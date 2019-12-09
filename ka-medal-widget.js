// Data Needed from/Provided by Gracenote:
// At a minimum, the following data is needed from Gracenote, for all collegiate, Team USA
// athletes in all events and all rounds (e.g., preliminary and final rounds):
// ● Event date
// ● Sport name
// ● Event name
// ● Event gender
// ● Athlete
// ● Athlete infostrada ID
// ● Result/Time/Score
// ● Place

// var dummyApiResults = [
    //     {'conference': 'pac12', 'total_medals': 10, 'gold': 3, 'silver': 4, 'bronze': 3},
    //     {'conference': 'sec',   'total_medals': 11, 'gold': 4, 'silver': 4, 'bronze': 3},
    //     {'conference': 'acc',   'total_medals': 12, 'gold': 5, 'silver': 4, 'bronze': 3},
    // ];

var dummyApiResults = {"MedalTableInfo":{"c_AsOfDate":"2018-02-25","n_EventsTotal":102,"n_EventsFinished":102,"n_EventsScheduled":0,"n_MedalsGold":103,"n_MedalsSilver":102,"n_MedalsBronze":102,"n_MedalsTotal":307,"n_SportID":-1,"c_Sport":null,"c_SportShort":null},"MedalTableNOC":[{"n_NOCID":153,"n_NOCGeoID":2221,"c_NOC":"Norway","c_NOCShort":"NOR","n_Gold":14,"n_Silver":14,"n_Bronze":11,"n_Total":39,"n_RankGold":1,"n_RankSortGold":1,"n_RankTotal":1,"n_RankSortTotal":1},{"n_NOCID":2,"n_NOCGeoID":2206,"c_NOC":"Germany","c_NOCShort":"GER","n_Gold":14,"n_Silver":10,"n_Bronze":7,"n_Total":31,"n_RankGold":2,"n_RankSortGold":2,"n_RankTotal":2,"n_RankSortTotal":2},{"n_NOCID":159,"n_NOCGeoID":2231,"c_NOC":"Canada","c_NOCShort":"CAN","n_Gold":11,"n_Silver":8,"n_Bronze":10,"n_Total":29,"n_RankGold":3,"n_RankSortGold":3,"n_RankTotal":3,"n_RankSortTotal":3},{"n_NOCID":5,"n_NOCGeoID":2209,"c_NOC":"United States","c_NOCShort":"USA","n_Gold":9,"n_Silver":8,"n_Bronze":6,"n_Total":23,"n_RankGold":4,"n_RankSortGold":4,"n_RankTotal":4,"n_RankSortTotal":4},{"n_NOCID":1,"n_NOCGeoID":2201,"c_NOC":"Netherlands","c_NOCShort":"NED","n_Gold":8,"n_Silver":6,"n_Bronze":6,"n_Total":20,"n_RankGold":5,"n_RankSortGold":5,"n_RankTotal":5,"n_RankSortTotal":5},{"n_NOCID":154,"n_NOCGeoID":2222,"c_NOC":"Sweden","c_NOCShort":"SWE","n_Gold":7,"n_Silver":6,"n_Bronze":1,"n_Total":14,"n_RankGold":6,"n_RankSortGold":6,"n_RankTotal":10,"n_RankSortTotal":10},{"n_NOCID":106,"n_NOCGeoID":4391,"c_NOC":"South Korea","c_NOCShort":"KOR","n_Gold":5,"n_Silver":8,"n_Bronze":4,"n_Total":17,"n_RankGold":7,"n_RankSortGold":7,"n_RankTotal":6,"n_RankSortTotal":6},{"n_NOCID":149,"n_NOCGeoID":2213,"c_NOC":"Switzerland","c_NOCShort":"SUI","n_Gold":5,"n_Silver":6,"n_Bronze":4,"n_Total":15,"n_RankGold":8,"n_RankSortGold":8,"n_RankTotal":8,"n_RankSortTotal":8},{"n_NOCID":144,"n_NOCGeoID":2202,"c_NOC":"France","c_NOCShort":"FRA","n_Gold":5,"n_Silver":4,"n_Bronze":6,"n_Total":15,"n_RankGold":9,"n_RankSortGold":9,"n_RankTotal":9,"n_RankSortTotal":9},{"n_NOCID":151,"n_NOCGeoID":2219,"c_NOC":"Austria","c_NOCShort":"AUT","n_Gold":5,"n_Silver":3,"n_Bronze":6,"n_Total":14,"n_RankGold":10,"n_RankSortGold":10,"n_RankTotal":11,"n_RankSortTotal":11},{"n_NOCID":18,"n_NOCGeoID":2241,"c_NOC":"Japan","c_NOCShort":"JPN","n_Gold":4,"n_Silver":5,"n_Bronze":4,"n_Total":13,"n_RankGold":11,"n_RankSortGold":11,"n_RankTotal":12,"n_RankSortTotal":12},{"n_NOCID":6,"n_NOCGeoID":2210,"c_NOC":"Italy","c_NOCShort":"ITA","n_Gold":3,"n_Silver":2,"n_Bronze":5,"n_Total":10,"n_RankGold":12,"n_RankSortGold":12,"n_RankTotal":13,"n_RankSortTotal":13},{"n_NOCID":19213,"n_NOCGeoID":63725,"c_NOC":"Olympic Athlete from Russia","c_NOCShort":"OAR","n_Gold":2,"n_Silver":6,"n_Bronze":9,"n_Total":17,"n_RankGold":13,"n_RankSortGold":13,"n_RankTotal":7,"n_RankSortTotal":7},{"n_NOCID":17,"n_NOCGeoID":2240,"c_NOC":"Czech Republic","c_NOCShort":"CZE","n_Gold":2,"n_Silver":2,"n_Bronze":3,"n_Total":7,"n_RankGold":14,"n_RankSortGold":14,"n_RankTotal":15,"n_RankSortTotal":15},{"n_NOCID":103,"n_NOCGeoID":4387,"c_NOC":"Belarus","c_NOCShort":"BLR","n_Gold":2,"n_Silver":1,"n_Bronze":0,"n_Total":3,"n_RankGold":15,"n_RankSortGold":15,"n_RankTotal":18,"n_RankSortTotal":18},{"n_NOCID":26,"n_NOCGeoID":2770,"c_NOC":"China","c_NOCShort":"CHN","n_Gold":1,"n_Silver":6,"n_Bronze":2,"n_Total":9,"n_RankGold":16,"n_RankSortGold":16,"n_RankTotal":14,"n_RankSortTotal":14},{"n_NOCID":14,"n_NOCGeoID":2233,"c_NOC":"Slovakia","c_NOCShort":"SVK","n_Gold":1,"n_Silver":2,"n_Bronze":0,"n_Total":3,"n_RankGold":17,"n_RankSortGold":17,"n_RankTotal":19,"n_RankSortTotal":19},{"n_NOCID":161,"n_NOCGeoID":2237,"c_NOC":"Finland","c_NOCShort":"FIN","n_Gold":1,"n_Silver":1,"n_Bronze":4,"n_Total":6,"n_RankGold":18,"n_RankSortGold":18,"n_RankTotal":16,"n_RankSortTotal":16},{"n_NOCID":211,"n_NOCGeoID":4058,"c_NOC":"Great Britain","c_NOCShort":"GBR","n_Gold":1,"n_Silver":0,"n_Bronze":4,"n_Total":5,"n_RankGold":19,"n_RankSortGold":19,"n_RankTotal":17,"n_RankSortTotal":17},{"n_NOCID":150,"n_NOCGeoID":2214,"c_NOC":"Poland","c_NOCShort":"POL","n_Gold":1,"n_Silver":0,"n_Bronze":1,"n_Total":2,"n_RankGold":20,"n_RankSortGold":20,"n_RankTotal":21,"n_RankSortTotal":21},{"n_NOCID":28,"n_NOCGeoID":2776,"c_NOC":"Hungary","c_NOCShort":"HUN","n_Gold":1,"n_Silver":0,"n_Bronze":0,"n_Total":1,"n_RankGold":21,"n_RankSortGold":21,"n_RankTotal":25,"n_RankSortTotal":25},{"n_NOCID":13,"n_NOCGeoID":2232,"c_NOC":"Ukraine","c_NOCShort":"UKR","n_Gold":1,"n_Silver":0,"n_Bronze":0,"n_Total":1,"n_RankGold":21,"n_RankSortGold":22,"n_RankTotal":25,"n_RankSortTotal":26},{"n_NOCID":157,"n_NOCGeoID":2229,"c_NOC":"Australia","c_NOCShort":"AUS","n_Gold":0,"n_Silver":2,"n_Bronze":1,"n_Total":3,"n_RankGold":23,"n_RankSortGold":23,"n_RankTotal":20,"n_RankSortTotal":20},{"n_NOCID":30,"n_NOCGeoID":2783,"c_NOC":"Slovenia","c_NOCShort":"SLO","n_Gold":0,"n_Silver":1,"n_Bronze":1,"n_Total":2,"n_RankGold":24,"n_RankSortGold":24,"n_RankTotal":22,"n_RankSortTotal":22},{"n_NOCID":147,"n_NOCGeoID":2205,"c_NOC":"Belgium","c_NOCShort":"BEL","n_Gold":0,"n_Silver":1,"n_Bronze":0,"n_Total":1,"n_RankGold":25,"n_RankSortGold":25,"n_RankTotal":27,"n_RankSortTotal":27},{"n_NOCID":158,"n_NOCGeoID":2230,"c_NOC":"New Zealand","c_NOCShort":"NZL","n_Gold":0,"n_Silver":0,"n_Bronze":2,"n_Total":2,"n_RankGold":26,"n_RankSortGold":26,"n_RankTotal":23,"n_RankSortTotal":23},{"n_NOCID":145,"n_NOCGeoID":2203,"c_NOC":"Spain","c_NOCShort":"ESP","n_Gold":0,"n_Silver":0,"n_Bronze":2,"n_Total":2,"n_RankGold":26,"n_RankSortGold":27,"n_RankTotal":23,"n_RankSortTotal":24},{"n_NOCID":160,"n_NOCGeoID":2236,"c_NOC":"Kazakhstan","c_NOCShort":"KAZ","n_Gold":0,"n_Silver":0,"n_Bronze":1,"n_Total":1,"n_RankGold":28,"n_RankSortGold":28,"n_RankTotal":28,"n_RankSortTotal":28},{"n_NOCID":9,"n_NOCGeoID":2218,"c_NOC":"Latvia","c_NOCShort":"LAT","n_Gold":0,"n_Silver":0,"n_Bronze":1,"n_Total":1,"n_RankGold":28,"n_RankSortGold":29,"n_RankTotal":28,"n_RankSortTotal":29},{"n_NOCID":167,"n_NOCGeoID":2247,"c_NOC":"Liechtenstein","c_NOCShort":"LIE","n_Gold":0,"n_Silver":0,"n_Bronze":1,"n_Total":1,"n_RankGold":28,"n_RankSortGold":30,"n_RankTotal":28,"n_RankSortTotal":30}]};

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var TOP_F='MedalTableNOC';
var CONF_F='c_NOC';//'conference';
var TOT_F='n_Total';
var GOLD_F='n_Gold';
var SILV_F='n_Silver';
var BRNZ_F='n_Bronze';
var SPORT_F='sport';
var SCHOOL_F='school';
var SORT_BY=CONF_F;

var MAX_COL_CHARS = 20;

function getAndFillWithData(selector){

    var tCols = [ 
        {'name': 'Conference'  , 'key': CONF_F}, 
        {'name': 'Total Medals', 'key': TOT_F}, 
        {'name': 'Gold', 'key': GOLD_F}, 
        {'name': 'Silver', 'key': SILV_F}, 
        {'name': 'Bronze', 'key': BRNZ_F}, 
    ];

    var results = dummyApiResults[TOP_F].sort(compareResults);

    addHeader(selector, tCols);
    var tMenuOptions = buildTable('conference', selector, tCols, results);
    buildMenu('conference', CONF_F, Array.from(tMenuOptions[CONF_F]));
    // buildMenus(tMenuOptions, [CONF_F]);
}

function compareResults(a, b) {
    const lhs = a[SORT_BY].toUpperCase();
    const rhs = b[SORT_BY].toUpperCase();
    return lhs > rhs ? 1 : -1;
}

function wireMenuFilterItem(tItem){

    tItem.change(function () {
        var tKey = tItem.attr('ka-filter-key');
        var tVal = tItem.attr('ka-filter-val');
        tRow = $(`tr[ka-filter-${tKey}='${tVal}']`);
        tHidden = $(`tr[ka-hidden-tr='${tRow.attr('data-target')}']`);
      
        if(tItem.is(":checked")){
            tRow.show();
            tHidden.show();
        }
        else{
            tRow.hide();
            tHidden.hide();
        }
    });
}

function buildMenuCheckRow(tKey, tVal, baseElem){

    var tLi = $(`<li class="custom-control custom-checkbox ka-checkbox-li"/>`);
    var tA = $(`<span class="ka-menu-span"/>`);
    var tCheck = $(`<input type="checkbox" ka-filter-key="${tKey}" ka-filter-val="${tVal}" class="ka-checkbox" checked="true"/>`);

    tA.append(tCheck);
    tA.append(tVal);
    tLi.append(tA);

    baseElem.append(tLi);
    return tCheck;
}

function buildMenu(tName, tKey, tOpts){

    var tMenuDrop = $(`#${tName}-dropdown`);
    // var tMenuForm = $(`<form name="${tKey}-filter-form" id="${tKey}-filter-form" action="" method=""\>`);

    tSelectAll = $(`<li class="all-selector" id="${tKey}-select-all">&nbsp&nbspSELECT ALL</li>`);
    tDeselectAll = $($(`<li class="all-selector" id="${tKey}-deselect-all">&nbsp&nbspDE-SELECT ALL</li>`));

    tSelectAll.click(function () {
        $(`tr[ka-filter-${tKey}]`).show();
        $(`input[ka-filter-Key=${tKey}]`).prop('checked', true);
        $(`tr[ka-hidden-tr]`).show();
    });

    tDeselectAll.click(function () {
        $(`tr[ka-filter-${tKey}]`).hide();
        $(`input[ka-filter-Key=${tKey}]`).prop('checked', false);
        $(`tr[ka-hidden-tr]`).hide();
    });

    tMenuDrop.append(tSelectAll);
    tMenuDrop.append(tDeselectAll);

    for (var i = 0; i < tOpts.length; i++) {
        wireMenuFilterItem(
            buildMenuCheckRow(tKey,  tOpts[i], tMenuDrop)
        );
    }

    // tMenuDrop.append(tMenuForm);
}

function buildMenus(tMenuOptions, mCols){
    // buildMenu('conference', Array.from(tMenuOptions[tKey]));

    // for(var i = 0; i < mCols.length; i++){
    //     var tKey = mCols[i];
    //     buildMenu(tKey, Array.from(tMenuOptions[tKey]));
    // }
}

function buildHiddenInnerTable(){
    var tTable = $('<table class="table-bordered"/>');
    var tBody = $('<tbody class="ka-inner-table-body"/>');

    var tHead = $('<thead class="ka-inner-thead"/>');
    var tRh = $('<tr/>');

    tRh.append($('<th scope="col"/>').html('Medal'));
    tRh.append($('<th scope="col"/>').html('Sport'));
    tRh.append($('<th scope="col"/>').html('Event'));
    tRh.append($('<th scope="col"/>').html('School'));
    tRh.append($('<th scope="col"/>').html('Athlete'));

    tHead.append(tRh);
    tTable.append(tHead);

    var tR1 = $('<tr/>');

    tR1.append($('<td/>').html('Gold'));
    tR1.append($('<td/>').html('Women’s Soccer'));
    tR1.append($('<td/>').html('Women’s Soccer'));
    tR1.append($('<td/>').html('University of Portland'));
    tR1.append($('<td/>').html('Megan Rapinoe'));
    tBody.append(tR1);

    tTable.append(tBody);
    return tTable;
}

function buildHiddenContent(tId){

    var tHiddenRow = $(`<tr class="hidden-tr" ka-hidden-tr="#${tId}"/>`);
    var tHiddenTD  = $('<td colspan="5" class="hiddenRow"/>');
    var tHiddenDiv = $(`<div class="accordion-body collapse" id="${tId}"></div>`);

    var tTable = buildHiddenInnerTable();

    tHiddenDiv.append(tTable);
    tHiddenTD.append(tHiddenDiv);
    tHiddenRow.append(tHiddenTD);
    return tHiddenRow;
}

function buildTableRow(tResult, tCols, tTarget){

    var tRow = $(`<tr data-toggle="collapse" data-target="#${tTarget}" class="accordion-toggle"/>`);
    var tMenuOptions = {};

    for(var j = 0; j < tCols.length; j++){
        var tKey = tCols[j]['key'];
        var tVal = tResult[tKey];

        tMenuOptions[tKey] = tVal;

        var tdclass = tKey == CONF_F ? "text-left" : "text-center";
        var tTD = $(`<td class="${tdclass}"/>`).html(
            tVal.toString().substring(0, MAX_COL_CHARS)
        );
        
        tRow.attr('ka-filter-' + tKey, tVal);
        tRow.append(tTD);
    }


    return {'menu_options': tMenuOptions, 'row': tRow};
}

// Builds the Table out of apiResults.
function buildTable(tTableName, tSelector, tCols, apiResults) {
    var tMenuOptions = {};
    for (var i = 0; i < tCols.length; i++) {
        tMenuOptions[tCols[i]['key']] = new Set();
    }

    tBody = $('<tbody class="ka-outer-table-body"/>');

    for (var j = 0; j < apiResults.length; j++) {
        
        var tResult = apiResults[j];
        var tTarget = tTableName + '-row-' + j.toString();
        
        var tRowData = buildTableRow(tResult, tCols, tTarget);
        var tRow = tRowData['row'];

        var tRowMenuOptions = tRowData['menu_options'];
        var tKeys = Object.keys(tRowMenuOptions);

        for (var k = 0; k < tKeys.length; k++) {
            if(tKeys[k] in tMenuOptions){
                tMenuOptions[tKeys[k]].add(tRowMenuOptions[tKeys[k]]);
            }
        }

        var tHiddenContent = buildHiddenContent(tTarget);

        tBody.append(tRow);
        tBody.append(tHiddenContent);
    }

    $(tSelector).append(tBody);
    return tMenuOptions;
}

function addHeader(selector, tCols) {
    var tHead = $('<thead id="ka-main-header" class="thead-dark"/>');
    var tR = $('<tr/>');

    for (var i = 0; i < tCols.length; i++) {
        tR.append($('<th/>').html(capitalize(tCols[i]['name'])));
    }

    tHead.append(tR);
    $(selector).append(tHead);
}

function capitalize(mystr){
    return mystr.charAt(0).toUpperCase() + mystr.slice(1)
}