// var BASE_API_URL = 'http://127.0.0.1:5000/GetSchedulePerson';
var BASE_API_URL = 'https://og2020-api.sports.gracenote.com/svc/games_v2.svc/json/GetSchedulePerson'
var ENV="RELEASE"

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

var GENDER_COL = 3;
var SPORT1_COL = 5;
var SPORT2_COL = 6;
var ATHLETE_ID_COL = 7;

var allResultsByDate = {};
var allSports = new Set();

ANIMATION_SPEED = 300;

var column_config = [ 
    {'name': 'Event', 'key': 'event'}, 
    {'name': 'Result', 'key': 'result'}, 
    {'name': 'Place', 'key': 'place'}, 
    {'name': 'Medal', 'key': 'medals'}, 
    {'name': 'Athlete', 'key': 'last_name'}, 
];

var athlete_lookup = [
    ["Max","Aaron","USA","M","2/25/1992","Figure Skating","",920811  ],
    ["Hakeem","Abdul-Saboor","USA","M","11/7/1987","Bobsleigh","",1467425  ],
    ["Adrian","Adams","USA","M","3/6/1986","Bobsleigh","",1338812  ],
    ["Shelby","Amsley-Benzie","USA","F","3/10/1993","Ice Hockey","",1550407  ],
    ["Stephanie","Anderson","USA","F","11/27/1992","Ice Hockey","",845555  ],
    ["Lowell","Bailey","USA","M","7/15/1981","Biathlon","",429280  ],
    ["Ryan","Bailey","USA","M","4/13/1989","Bobsleigh","",743050  ],
    ["Sean","Beighton","USA","M","11/22/1988","Curling","",842578  ],
    ["Kacey","Bellamy","USA","F","4/22/1987","Ice Hockey","",749740  ],
    ["Jennie","Bender","USA","F","1/12/1988","Cross Country Skiing","Biathlon",1221029  ],
    ["Erik","Bjornsen","USA","M","7/14/1991","Cross Country Skiing","",916866  ],
    ["Sadie","Bjornsen","USA","F","11/21/1989","Cross Country Skiing","",724204  ],
    ["Brittany","Bowe","USA","F","2/24/1988","Speedskating","",671585  ],
    ["Megan","Bozek","USA","F","3/27/1991","Ice Hockey","",762921  ],
    ["Hannah","Brandt","USA","F","11/27/1993","Ice Hockey","",929479  ],
    ["Kyle","Bratrud","USA","M","2/9/1993","Cross Country Skiing","",1135604  ],
    ["Rosie","Brennan","USA","F","12/2/1988","Cross Country Skiing","",763037  ],
    ["Kyle","Brown","USA","M","10/22/1989","Skeleton","",1234235  ],
    ["Katie","Burt","USA","F","1/26/1997","Ice Hockey","",1275286  ],
    ["Sophie","Caldwell","USA","F","3/22/1990","Cross Country Skiing","",724205  ],
    ["Patrick","Caldwell","USA","M","2/18/1994","Cross Country Skiing","",1023360  ],
    ["Danielle","Cameranesi","USA","F","6/30/1995","Ice Hockey","",1012523  ],
    ["Alexandra","Carpenter","USA","F","4/13/1994","Ice Hockey","",845457  ],
    ["David","Chodounsky","USA","M","6/25/1984","Alpine Skiing","",764394  ],
    ["Cody","Clouser","USA","M","5/31/1996","Curling","",1735723  ],
    ["Kendall","Coyne","USA","F","5/25/1992","Ice Hockey","",713824  ],
    ["Nathan","Crumpton","USA","M","10/9/1985","Skeleton","",1139516  ],
    ["JC","Cruse","USA","M","9/20/1988","Bobsleigh","",1735724  ],
    ["Nick","Cunningham","USA","M","5/8/1985","Bobsleigh","",766656  ],
    ["Shiann","Darkangelo","USA","F","11/28/1993","Ice Hockey","",929527  ],
    ["Brianna","Decker","USA","F","5/13/1991","Ice Hockey","",713804  ],
    ["Frank","DelDuca","USA","M","7/7/1991","Bobsleigh","",1457403  ],
    ["Garrett","Driller","USA","M","8/24/1996","Alpine Skiing","",1635823  ],
    ["Meghan","Duggan","USA","F","9/3/1987","Ice Hockey","",694927  ],
    ["Susan","Dunklee","USA","F","2/13/1986","Biathlon","",823338  ],
    ["Katie","Eberling","USA","F","8/7/1988","Bobsleigh","",994192  ],
    ["Clare","Egan","USA","F","11/19/1987","Biathlon","",1338227  ],
    ["Mark","Engel","USA","M","10/1/1991","Alpine Skiing","",1195379  ],
    ["Terra","Evans","USA","F","10/7/1989","Bobsleigh","",1469882  ],
    ["Aja","Evans","USA","F","5/12/1988","Bobsleigh","",1111084  ],
    ["Kali","Flanagan","USA","F","9/19/1995","Ice Hockey","",1646105  ],
    ["Brent","Fogt","USA","M","4/18/1985","Bobsleigh","",1469873  ],
    ["Chris","Fogt","USA","M","5/29/1983","Bobsleigh","",709320  ],
    ["Kris","Freeman","USA","M","10/14/1980","Cross Country Skiing","",396600  ],
    ["Cherrelle","Garrett","USA","F","5/7/1989","Bobsleigh","",1114669  ],
    ["Tyson","Gay","USA","M","8/9/1982","Bobsleigh","",559932  ],
    ["Matthew","Gelso","USA","M","7/18/1988","Cross Country Skiing","",1124339  ],
    ["Lauren","Gibbs","USA","F","3/2/1984","Bobsleigh","",1338821  ],
    ["Nathan","Gilsleider","USA","M","4/29/1987","Bobsleigh","",1467424  ],
    ["Savannah","Graybill","USA","F","4/25/1988","Skeleton","",1139522  ],
    ["Dustin","Greenwood","USA","M","5/13/1986","Bobsleigh","",1341185  ],
    ["Brian","Gregg","USA","M","6/27/1984","Cross Country Skiing","",715095  ],
    ["Jamie","Greubel Poser","USA","F","11/9/1983","Bobsleigh","",766649  ],
    ["Simeon","Hamilton","USA","M","5/14/1987","Cross Country Skiing","",833215  ],
    ["Reese","Hanneman","USA","M","12/25/1989","Cross Country Skiing","",836170  ],
    ["Logan","Hanneman","USA","M","6/2/1993","Cross Country Skiing","",1018299  ],
    ["Anne","Hart","USA","F","8/20/1992","Cross Country Skiing","",1454750  ],
    ["Miles","Havlick","USA","M","12/20/1989","Cross Country Skiing","",1231799  ],
    ["Nicholas","Hendrickson","USA","M","6/20/1991","Nordic Combined","",724344  ],
    ["Megan","Henry","USA","F","6/17/1987","Skeleton","",1221502  ],
    ["Nicole","Hensley","USA","F","6/23/1994","Ice Hockey","",1486400  ],
    ["Zoe","Hickel","USA","F","7/10/1992","Ice Hockey","",845566  ],
    ["Chelsea","Holmes","USA","F","1/20/1987","Cross Country Skiing","",1124327  ],
    ["Kristen","Hurley","USA","F","9/23/1992","Bobsleigh","",1467422  ],
    ["Kehri","Jones","USA","F","11/30/1993","Bobsleigh","",862217  ],
    ["Lori","Jones","USA","F","8/5/1982","Bobsleigh","",565959  ],
    ["Briauna","Jones","USA","F","7/1/1992","Bobsleigh","",1563678  ],
    ["Amanda","Kautzer","USA","F","5/2/1998","Biathlon","",1362269  ],
    ["Megan","Keller","USA","F","5/1/1996","Ice Hockey","",1275309  ],
    ["Amanda","Kessel","USA","F","8/28/1991","Ice Hockey","",713796  ],
    ["Bonnie","Kilis","USA","F","5/14/1988","Bobsleigh","",1467423  ],
    ["Hilary","Knight","USA","F","7/12/1989","Ice Hockey","",694928  ],
    ["Monique","Lamoureux","USA","F","7/3/1989","Ice Hockey","",774390  ],
    ["Jocelyne","Lamoureux-Davidson","USA","F","7/3/1989","Ice Hockey","",774381  ],
    ["Austin","Landis","USA","M","7/21/1991","Bobsleigh","",1469504  ],
    ["Steve","Langton","USA","M","4/15/1983","Bobsleigh","",709275  ],
    ["Chloe","Levins","USA","F","4/24/1998","Biathlon","",1362275  ],
    ["Adam","Martin","USA","M","10/26/1994","Cross Country Skiing","",1240762  ],
    ["Gisele","Marvin","USA","F","3/7/1987","Ice Hockey","",694932  ],
    ["Sam","McGuffie","USA","M","10/16/1989","Bobsleigh","",1457291  ],
    ["Elana","Meyers-Taylor","USA","F","10/10/1984","Bobsleigh","",709694  ],
    ["Nick","Michaud","USA","M","4/10/1992","Cross Country Skiing","",771315  ],
    ["Samuel","Michener","USA","M","5/24/1987","Bobsleigh","",1221319  ],
    ["Kaitlynn","Miller","USA","F","8/9/1991","Cross Country Skiing","",1479910  ],
    ["Mirai","Nagasu","USA","F","4/16/1993","Figure Skating","",720880  ],
    ["Justin","Olsen","USA","M","4/16/1987","Bobsleigh","",715531  ],
    ["Anne","O'Shea","USA","F","9/5/1987","Skeleton","",709220  ],
    ["Sable","Otey","USA","F","12/30/1899","Bobsleigh","",1735725  ],
    ["Eric","Packer","USA","M","7/3/1990","Cross Country Skiing","",1221038  ],
    ["Annie","Pankowski","USA","F","11/4/1994","Ice Hockey","",1012512  ],
    ["Kelly","Pannek","USA","F","12/29/1995","Ice Hockey","",1172477  ],
    ["Caitlin","Patterson","USA","F","1/30/1990","Cross Country Skiing","",848467  ],
    ["Scott","Patterson","USA","M","1/28/1992","Cross Country Skiing","",916864  ],
    ["Amanda","Pelkey","USA","F","5/29/1993","Ice Hockey","",762867  ],
    ["Emily","Pfalzer","USA","F","6/14/1993","Ice Hockey","",845480  ],
    ["Kikkan","Randell","USA","F","12/31/1982","Cross Country Skiing","",397218  ],
    ["James","Reed","USA","M","5/23/1991","Bobsleigh","",1338816  ],
    ["Joanne","Reid","USA","F","6/28/1992","Biathlon","",848468  ],
    ["Brittany","Reinbolt","USA","F","4/12/1984","Bobsleigh","",994303  ],
    ["Alex","Rigsby","USA","F","1/3/1992","Ice Hockey","",762866  ],
    ["Richard","Roethel","USA","M","5/20/1991","Bobsleigh","",1735727  ],
    ["Mike","Rogals","USA","M","11/16/1988","Skeleton","",1177269  ],
    ["Maddie","Rooney","USA","F","12/30/1899","Ice Hockey","",1646106  ],
    ["Ida","Sargent","USA","F","1/25/1988","Cross Country Skiing","",724202  ],
    ["Dillon","Schrodt","USA","M","12/21/1991","Bobsleigh","",1735726  ],
    ["Brita","Sigourney","USA","F","1/17/1990","Freestyle Skiing","",764426  ],
    ["Jamie","Sinclair","USA","F","2/21/1992","Curling","",1721078  ],
    ["Haley","Skarupa","USA","F","1/3/1994","Ice Hockey","",845490  ],
    ["Nikia","Squire","USA","F","12/30/1899","Bobsleigh","",1398321  ],
    ["Kelli","Stack","USA","F","1/13/1988","Ice Hockey","",749741  ],
    ["Lee","Stecklein","USA","F","4/23/1994","Ice Hockey","",929496  ],
    ["Andrew","Stopera","USA","M","9/30/1997","Curling","",1631012  ],
    ["Jefferey","Swider-Peltz","USA","M","7/8/1989","Speedskating","",603144  ],
    ["Nic","Taylor","USA","M","5/16/1987","Bobsleigh","",1014129  ],
    ["Ian","Torchia","USA","M","3/8/1996","Cross Country Skiing","",1357347  ],
    ["Dana","Trivigno","USA","F","1/7/1994","Ice Hockey","",929474  ],
    ["Carlo","Valdes","USA","M","2/11/1990","Bobsleigh","",1338817  ],
    ["Nicole","Vogt","USA","F","3/2/1987","Bobsleigh","",1012882  ],
    ["Evan","Weinstock","USA","M","10/30/1991","Bobsleigh","",1469874  ],
    ["Kendall","Wesenberg","USA","F","8/23/1990","Skeleton","",1337513  ],
    ["Jordan","Greenway","USA","M","12/30/1899","Ice Hockey","",1383619  ],
    ["Troy","Terry","USA","M","9/10/1997","Ice Hockey","",1383689  ],
    ["John","Daly","USA","M","6/10/1985","Skeleton","",603591  ],
    ["John","Albert","USA","M","12/30/1899","Ice Hockey","",1159217  ],
    ["Matt","Anderson","USA","M","10/31/1982","Ice Hockey","",1138657  ],
    ["Mark","Arcobello","USA","M","8/12/1988","Ice Hockey","",1139984  ],
    ["Sean","Backman","USA","M","4/29/1986","Ice Hockey","",1640396  ],
    ["Lou","Belpedio","USA","M","5/14/1996","Ice Hockey","",1266675  ],
    ["Chad","Billins","USA","M","5/26/1989","Ice Hockey","",1227411  ],
    ["David","Booth","USA","M","11/24/1984","Ice Hockey","",727461  ],
    ["Will","Borgen","USA","M","12/19/1996","Ice Hockey","",1463805  ],
    ["Chris","Bourque","USA","M","1/29/1986","Ice Hockey","",828174  ],
    ["Daniel","Brickley","USA","M","3/30/1995","Ice Hockey","",1656043  ],
    ["Robert","Butler","USA","M","4/26/1987","Ice Hockey","",844375  ],
    ["Chris","Conner","USA","M","12/23/1983","Ice Hockey","",808484  ],
    ["Ryan","Donato","USA","M","4/9/1996","Ice Hockey","",1463808  ],
    ["Matt","Donovan","USA","M","5/9/1990","Ice Hockey","",830810  ],
    ["Robbie","Earl","USA","M","6/2/1985","Ice Hockey","",827906  ],
    ["Cade","Fairchild","USA","M","1/15/1989","Ice Hockey","",750495  ],
    ["Adam","Fox","USA","M","2/17/1998","Ice Hockey","",1494139  ],
    ["Parker","Gahagen","USA","M","5/17/1993","Ice Hockey","",1719003  ],
    ["Dylan","Gambrell","USA","M","8/26/1996","Ice Hockey","",1719004  ],
    ["Adam","Gaudette","USA","M","10/3/1996","Ice Hockey","",1719005  ],
    ["Nate","Gerbe","USA","M","7/24/1987","Ice Hockey","",827725  ],
    ["Tom","Gilbert","USA","M","1/10/1983","Ice Hockey","",612157  ],
    ["Barry","Goers","USA","M","6/14/1986","Ice Hockey","",1640862  ],
    ["Ryan","Gunderson","USA","M","8/16/1985","Ice Hockey","",888530  ],
    ["Ben","Hanowski","USA","M","10/18/1990","Ice Hockey","",1165604  ],
    ["Tyler","Kelleher","USA","M","1/2/1995","Ice Hockey","",1170089  ],
    ["Chad","Kolarik","USA","M","1/26/1986","Ice Hockey","",844889  ],
    ["JP","Lamoureux","USA","M","8/20/1984","Ice Hockey","",1305755  ],
    ["Ryan","Lasch","USA","M","1/22/1987","Ice Hockey","",888025  ],
    ["David","Leggio","USA","M","7/31/1984","Ice Hockey","",922823  ],
    ["Bryan","Lerg","USA","M","1/20/1986","Ice Hockey","",1379684  ],
    ["Broc","Little","USA","M","3/24/1988","Ice Hockey","",968519  ],
    ["Mike","Lundin","USA","M","9/24/1984","Ice Hockey","",808632  ],
    ["Travis","Morin","USA","M","1/9/1984","Ice Hockey","",916723  ],
    ["Steve","Moses","USA","M","8/9/1989","Ice Hockey","",1310773  ],
    ["John","Muse","USA","M","8/1/1988","Ice Hockey","",1640473  ],
    ["Brian","O'Neill","USA","M","6/1/1988","Ice Hockey","",1443761  ],
    ["Jake","Oettinger","USA","M","12/18/1998","Ice Hockey","",1383586  ],
    ["Austin","Ortega","USA","M","4/12/1994","Ice Hockey","",1719007  ],
    ["Aaron","Palushaj","USA","M","9/7/1989","Ice Hockey","",762142  ],
    ["Brian","Pinho","USA","M","5/11/1995","Ice Hockey","",1719008  ],
    ["Rhett","Rakhshani","USA","M","3/6/1988","Ice Hockey","",750572  ],
    ["Chad","Rau","USA","M","1/18/1987","Ice Hockey","",1009831  ],
    ["Dylan","Reese","USA","M","8/29/1984","Ice Hockey","",839534  ],
    ["Garrett","Roe","USA","M","2/22/1988","Ice Hockey","",1425779  ],
    ["Vinny","Saponari","USA","M","2/15/1990","Ice Hockey","",750347  ],
    ["Dan","Sexton","USA","M","4/29/1987","Ice Hockey","",827709  ],
    ["Tyler","Sheehy","USA","M","12/30/1899","Ice Hockey","",1735728  ],
    ["Drew","Shore","USA","M","1/29/1991","Ice Hockey","",776842  ],
    ["Jaime","Sifers","USA","M","1/18/1983","Ice Hockey","",827903  ],
    ["Jim","Slater","USA","M","12/9/1982","Ice Hockey","",612158  ],
    ["Tim","Stapleton","USA","M","7/19/1982","Ice Hockey","",827715  ],
    ["Nolan","Stevens","USA","M","7/22/1996","Ice Hockey","",1266741  ],
    ["Ryan","Stoa","USA","M","4/13/1987","Ice Hockey","",827749  ],
    ["Jeff","Taffe","USA","M","2/19/1981","Ice Hockey","",456527  ],
    ["Ryan","Vesce","USA","M","12/30/1899","Ice Hockey","",827998  ],
    ["Noah","Welch","USA","M","8/26/1982","Ice Hockey","",808560  ],
    ["Casey","Wellman","USA","M","10/18/1987","Ice Hockey","",841594  ],
    ["Joseph","Woll","USA","M","7/12/1998","Ice Hockey","",1494198  ],
    ["Brendan","Woods","USA","M","6/11/1992","Ice Hockey","",1342130  ],
    ["Ryan","Zapolski","USA","M","11/11/1986","Ice Hockey","",1305897  ],
    ["Andy","Miele","USA","M","4/15/1988","Ice Hockey","",928386  ],
    ["Matt","Gilroy","USA","M","12/30/1899","Ice Hockey","",827947  ]
  ];


/*****************************************
*        TOP LEVEL FUNCTION DEFS         *
******************************************/

function loadKaMedalWidget(selector){
    getDataFromApiAndBuild(selector);
}

function getDataFromApiAndBuild(tSelector){

    var results = [];
    var all_ids = Array.from(getAllAthleteIds());
    console.log(all_ids.toString());
    
    if(ENV == "DEV"){
        all_ids = all_ids.slice(1,10);
        for(var j=0; j <= alldata.length; j++){
            console.log("using static dev data...")
            console.log(alldata[j]);
            if(alldata[j]){
                parseAndAddPersonResult(JSON.parse(alldata[j]));
            }
        }
    }
    else{ 
        for (var i = 0; i < all_ids.length; i++) {
            console.log("requesting for id: " + all_ids[i]);
            tAsync = singleApiCall(all_ids[i]);
            results.push(tAsync);
        }
    }

    $.when.apply(this, results).done(function() {
        console.log("all API requests have completed");
        buildMenus(['Conference 1', 'Conference 2', 'Conference 3'], Array.from(allSports), ['School 1', 'School 2', 'School 3']);
        buildTable(tSelector, column_config, allResultsByDate)
    });
}

/*****************************************
*      API CALLS AND DATA HANDLING       *
******************************************/
//A single call to the API for a single person ID
function singleApiCall(personId){
    return $.ajax({
        url: BASE_API_URL,
        type: "get",
        data: { 
            personId: personId, 
            // Season: '2020',
            season: 20172018,
            languageCode: 2,
            competitionSetId: 2
        },
        dataType: "json",
        success: function(data){
            // console.log("successfully pulled data"), data.toString();
            //parse the data and add it to the global var
            parseAndAddPersonResult(data);
        },
        error:function(e){
            console.error("Error retrieving data for " + personId);
        } 
    });
}

function parseAndAddPersonResult(result){

    var person = result['Person'];
    var first_name = person['c_FirstName'];
    var last_name = person['c_LastName'];
    var sports = result['SportList'];

    for (var i = 0; i < sports.length; i++) {
        var epml = sports[i]['EventPhaseMatchList'];
        var sport = sports[i]['Sport'];

        for (var j = 0; j < epml.length; j++) {
            var phase = epml[j];
            var start = phase['DateTimes']['Start']['c_UTC'];
            var date = new Date(Date.parse(start));
            var sport_name = sport['c_Name'];
            var genderName = phase['GenderEvent']['c_Name'] ? phase['GenderEvent']['c_Name'] : phase['Gender']['c_Name'] + "'s";
            var cat = genderName + " " + sport_name;
            date = date.toDateString();

            if( !(date in allResultsByDate) ){
                allResultsByDate[date] = {};
            }
            if( !(cat in allResultsByDate[date]) ){
                allResultsByDate[date][cat] = [];
            }

            tRow = {
                'first_name': first_name,
                'last_name': last_name,
                'gender': phase['Gender']['c_Name'],
                'event_name': phase['Event']['c_Name'],
                'event': phase['c_Phase'],
                'start': start,
                'end': phase['DateTimes']['End']['c_UTC'],
                'medal': parseMedals(phase['MedalsToBeAwarded']),
                'finished': phase['b_Finished'],
                'result': phase['c_ResultPhase'],
                'place': phase['n_RankPhase'],
                'sport_name': sport_name
            };
            allResultsByDate[date][cat] = allResultsByDate[date][cat].concat(tRow);
            allSports.add(sport_name);
        }
        
    }
    // return allResultsByDate;
}

function parseMedals(tMedals){
    var tMedalStr = "--";
    tMedalStr = tMedals['b_Gold'] ? "Gold" : tMedalStr;
    tMedalStr = tMedals['b_Silver'] ? "Silver" : tMedalStr;
    tMedalStr = tMedals['b_Bronze'] ? "Bronze" : tMedalStr;
    return tMedalStr;
}

function getAllAthleteIds(){
    ids = new Set();
    for (var i = 0; i < athlete_lookup.length; i++) {
        ids.add(athlete_lookup[i][ATHLETE_ID_COL]);
    }
    ids.delete("");
    return ids;
}

/*****************************************
*        TABLE BUILDING FUNCTIONS        *
******************************************/

// Builds the Table out of apiResults.
function buildTable(tSelector, tCols, tResults) {

    console.log(tResults);

    var tBody = $('<tbody class="ka-outer-table-body"/>');
    var dates = Object.keys(tResults).sort(compareDateStrings);

    for (var j = 0; j < dates.length; j++) {
        
        var tDayResults = tResults[dates[j]];
        var tTarget = tSelector + '-row-' + dates[j].replace(/ /g,'');
        
        var tDateSection = buildDateSection(dates[j], tDayResults, tCols, tTarget);

        console.log("tDateSection");

        console.log(tDateSection);
        tBody.append(tDateSection);
    }

    $(tSelector).append(tBody);
}

function buildDateSection(tDate, tResult, tCols, tTarget){

    var tEventNames = Object.keys(tResult);;
    var tDateSection = $(`<tr data-toggle="collapse" data-target="#${tTarget}" class="accordion-toggle ka-date-header"/>`);
    tDateSection.html(`<div>${tDate}</div>`);

    for(var j = 0; j < tEventNames.length; j++){
        var tEventName = tEventNames[j]; 
        var tEventSection = buildEventSection(tEventName, tResult[tEventName]);
        tDateSection.append(tEventSection);
    }

    return tDateSection;
}

function buildEventSection(tEventName, tResults){
    var tEvent = $(`<tr class="ka-event-header"/>`);

    tEvent.attr('ka-filter-gender', tResults[0]['gender']);
    tEvent.attr('ka-filter-sport', tResults[0]['sport_name']);

    tEvent.html(`<div>${tEventName}</div>`);

    var tHead = $('<thead class="ka-event-row-header"/>');
    var tRh = $('<tr/>');

    tRh.append($('<th scope="col"/>').html('Event/Round/Match'));
    tRh.append($('<th scope="col"/>').html('Result'));
    tRh.append($('<th scope="col"/>').html('Place'));
    tRh.append($('<th scope="col"/>').html('Medal'));
    tRh.append($('<th scope="col"/>').html('Athlete'));
    tRh.append($('<th scope="col"/>').html('School'));
    tHead.append(tRh);
    tEvent.append(tHead);

    for(var j = 0; j < tResults.length; j++){
        var tRes = tResults[j]
        var tRow = $(`<tr class="ka-event-row"/>`);
        tRow.append($('<td/>').html(tRes['event']));
        tRow.append($('<td/>').html(tRes['result']));
        tRow.append($('<td/>').html(tRes['place']));
        tRow.append($('<td/>').html(tRes['medal']));
        tRow.append($('<td/>').html(tRes['last_name'] + ", " + tRes['first_name']));
        tRow.append($('<td/>').html(tRes['school']));
        tEvent.append(tRow);
    }
    return tEvent;
}

/*****************************************
*        MENU BUILDING FUNCTIONS         *
******************************************/

function buildMenus(tConferences, tSports, tSchools){
    buildMenu('conference', tConferences);
    buildMenu('sport', tSports);
    buildMenu('gender', ['Men', 'Women', 'Mixed']);
    buildMenu('school', tSchools);
}

//built the filter menu named by key with the options in tOpts
function buildMenu(tKey, tOpts){

    var tMenu = $(`#${tKey}-dropdown`);

    tSelectAll = $(`<li class="all-selector" id="${tKey}-select-all">&nbsp&nbspSELECT ALL</li>`);
    tDeselectAll = $($(`<li class="all-selector" id="${tKey}-deselect-all">&nbsp&nbspDE-SELECT ALL</li>`));

    tSelectAll.click(function () {
        // $(`tr[ka-filter-${tKey}]`).removeClass(`ka-hidden-${tKey}`);
        fadeIn($(`tr[ka-filter-${tKey}]`), `ka-hidden-${tKey}`);
        $(`input[ka-filter-key=${tKey}]`).prop('checked', true);
    });

    tDeselectAll.click(function () {
        // $(`tr[ka-filter-${tKey}]`).addClass(`ka-hidden-${tKey}`);
        fadeOut($(`tr[ka-filter-${tKey}]`), `ka-hidden-${tKey}`);
        $(`input[ka-filter-key=${tKey}]`).prop('checked', false);
    });

    tMenu.append(tSelectAll);
    tMenu.append(tDeselectAll);

    for (var i = 0; i < tOpts.length; i++) {
        wireMenuFilterItem(
            buildMenuCheckRow(tKey,  tOpts[i], tMenu)
        );
    }

}

//build the row in the menu filter with necessary attrs
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

//wire in the filter menu listeners
function wireMenuFilterItem(tItem){
    tItem.change(function () {
        var tKey = tItem.attr('ka-filter-key');
        var tVal = tItem.attr('ka-filter-val');

        //filters are EXCLUSIVE - meanging that if a section has 2 filters
        //corresponding to it, and either is unchecked, it will remain hidden
        tRow = $(`tr[ka-filter-${tKey}='${tVal}']`);
        tHidingClass = `ka-hidden-${tKey}`;

        if(tItem.is(":checked")){
            fadeIn(tRow, tHidingClass);
        }
        else{
            fadeOut(tRow, tHidingClass);
        }
    });
}

/*****************************************
*             UTIL FUNCTIONS             *
******************************************/

function capitalize(mystr){
    return mystr.charAt(0).toUpperCase() + mystr.slice(1)
}

function compareDateStrings(a, b) {
    var lhs = Date.parse(a);
    var rhs = Date.parse(b);
    return lhs > rhs ? 1 : -1;
}

function fadeIn(tElem, tClass){
    tElem.fadeIn("fast", function() {
        $(this).removeClass(tClass);
    });
}

function fadeOut(tElem, tClass){
    tElem.fadeOut("fast", function() {
        $(this).addClass(tClass);
    });
}