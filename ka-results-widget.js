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

var GENDER_COL = 4;
var SPORT1_COL = 6;
var SPORT2_COL = 7;
var ATHLETE_ID_COL = 8;
var SCHOOL_1_COL = 9;
var SCHOOL_2_COL = 10;

var allResultsByDate = {};
var allSports = new Set();
var allSchools = new Set();

ANIMATION_SPEED = 300;

var column_config = [ 
    {'name': 'Event', 'key': 'event'}, 
    {'name': 'Result', 'key': 'result'}, 
    {'name': 'Place', 'key': 'place'}, 
    {'name': 'Medal', 'key': 'medals'}, 
    {'name': 'Athlete', 'key': 'last_name'}, 
];

var athlete_lookup = [["Max", "Aaron", "Max Aaron", "USA", "M", "2/25/1992", "Figure Skating", "", 920811, "", ""], ["Hakeem", "Abdul-Saboor", "Hakeem Abdul-Saboor", "USA", "M", "11/7/1987", "Bobsleigh", "", 1467425, "University of Virginia--Wise", ""], ["Adrian", "Adams", "Adrian Adams", "USA", "M", "3/6/1986", "Bobsleigh", "", 1338812, "", ""], ["John", "Albert", "John Albert", "USA", "M", "12/30/1899", "Ice Hockey", "", 1159217, "", ""], ["Shelby", "Amsley-Benzie", "Shelby Amsley-Benzie", "USA", "F", "3/10/1993", "Ice Hockey", "", 1550407, "", ""], ["Stephanie", "Anderson", "Stephanie Anderson", "USA", "F", "11/27/1992", "Ice Hockey", "", 845555, "", ""], ["Matt", "Anderson", "Matt Anderson", "USA", "M", "10/31/1982", "Ice Hockey", "", 1138657, "", ""], ["Mark", "Arcobello", "Mark Arcobello", "USA", "M", "8/12/1988", "Ice Hockey", "", 1139984, "Yale University", ""], ["Sean", "Backman", "Sean Backman", "USA", "M", "4/29/1986", "Ice Hockey", "", 1640396, "", ""], ["Lowell", "Bailey", "Lowell Bailey", "USA", "M", "7/15/1981", "Biathlon", "", 429280, "University of Vermont", ""], ["Ryan", "Bailey", "Ryan Bailey", "USA", "M", "4/13/1989", "Bobsleigh", "", 743050, "", ""], ["Sean", "Beighton", "Sean Beighton", "USA", "M", "11/22/1988", "Curling", "", 842578, "", ""], ["Kacey", "Bellamy", "Kacey Bellamy", "USA", "F", "4/22/1987", "Ice Hockey", "", 749740, "University of New Hampshire", ""], ["Lou", "Belpedio", "Lou Belpedio", "USA", "M", "5/14/1996", "Ice Hockey", "", 1266675, "", ""], ["Jennie", "Bender", "Jennie Bender", "USA", "F", "1/12/1988", "Cross Country Skiing", "Biathlon", 1221029, "", ""], ["Chad", "Billins", "Chad Billins", "USA", "M", "5/26/1989", "Ice Hockey", "", 1227411, "Ferris State University", ""], ["Erik", "Bjornsen", "Erik Bjornsen", "USA", "M", "7/14/1991", "Cross Country Skiing", "", 916866, "Alaska Pacific University", "University of Alaska--Anchorage"], ["Sadie", "Bjornsen", "Sadie Bjornsen", "USA", "F", "11/21/1989", "Cross Country Skiing", "", 724204, "Alaska Pacific University", ""], ["David", "Booth", "David Booth", "USA", "M", "11/24/1984", "Ice Hockey", "", 727461, "", ""], ["Will", "Borgen", "Will Borgen", "USA", "M", "12/19/1996", "Ice Hockey", "", 1463805, "St. Cloud State University", ""], ["Chris", "Bourque", "Chris Bourque", "USA", "M", "1/29/1986", "Ice Hockey", "", 828174, "Boston University", ""], ["Brittany", "Bowe", "Brittany Bowe", "USA", "F", "2/24/1988", "Speedskating", "", 671585, "Florida Atlantic University", ""], ["Megan", "Bozek", "Megan Bozek", "USA", "F", "3/27/1991", "Ice Hockey", "", 762921, "", ""], ["Hannah", "Brandt", "Hannah Brandt", "USA", "F", "11/27/1993", "Ice Hockey", "", 929479, "University of Minnesota--Twin Cities", ""], ["Kyle", "Bratrud", "Kyle Bratrud", "USA", "M", "2/9/1993", "Cross Country Skiing", "", 1135604, "", ""], ["Rosie", "Brennan", "Rosie Brennan", "USA", "F", "12/2/1988", "Cross Country Skiing", "", 763037, "Alaska Pacific University", ""], ["Daniel", "Brickley", "Daniel Brickley", "USA", "M", "3/30/1995", "Ice Hockey", "", 1656043, "", ""], ["Kyle", "Brown", "Kyle Brown", "USA", "M", "10/22/1989", "Skeleton", "", 1234235, "", ""], ["Katie", "Burt", "Katie Burt", "USA", "F", "1/26/1997", "Ice Hockey", "", 1275286, "", ""], ["Robert", "Butler", "Robert Butler", "USA", "M", "4/26/1987", "Ice Hockey", "", 844375, "", ""], ["Sophie", "Caldwell", "Sophie Caldwell", "USA", "F", "3/22/1990", "Cross Country Skiing", "", 724205, "Dartmouth College", ""], ["Patrick", "Caldwell", "Patrick Caldwell", "USA", "M", "2/18/1994", "Cross Country Skiing", "", 1023360, "Dartmouth College", ""], ["Danielle", "Cameranesi", "Danielle Cameranesi", "USA", "F", "6/30/1995", "Ice Hockey", "", 1012523, "", ""], ["Alexandra", "Carpenter", "Alexandra Carpenter", "USA", "F", "4/13/1994", "Ice Hockey", "", 845457, "", ""], ["David", "Chodounsky", "David Chodounsky", "USA", "M", "6/25/1984", "Alpine Skiing", "", 764394, "Dartmouth College", ""], ["Cody", "Clouser", "Cody Clouser", "USA", "M", "5/31/1996", "Curling", "", 1735723, "", ""], ["Chris", "Conner", "Chris Conner", "USA", "M", "12/23/1983", "Ice Hockey", "", 808484, "", ""], ["Kendall", "Coyne", "Kendall Coyne", "USA", "F", "5/25/1992", "Ice Hockey", "", 713824, "Northeastern University", ""], ["Nathan", "Crumpton", "Nathan Crumpton", "USA", "M", "10/9/1985", "Skeleton", "", 1139516, "", ""], ["JC", "Cruse", "JC Cruse", "USA", "M", "9/20/1988", "Bobsleigh", "", 1735724, "", ""], ["Nick", "Cunningham", "Nick Cunningham", "USA", "M", "5/8/1985", "Bobsleigh", "", 766656, "Boise State University", ""], ["John", "Daly", "John Daly", "USA", "M", "6/10/1985", "Skeleton", "", 603591, "SUNY--Plattsburgh", ""], ["Shiann", "Darkangelo", "Shiann Darkangelo", "USA", "F", "11/28/1993", "Ice Hockey", "", 929527, "", ""], ["Brianna", "Decker", "Brianna Decker", "USA", "F", "5/13/1991", "Ice Hockey", "", 713804, "University of Wisconsin--Madison", ""], ["Frank", "DelDuca", "Frank DelDuca", "USA", "M", "7/7/1991", "Bobsleigh", "", 1457403, "", ""], ["Ryan", "Donato", "Ryan Donato", "USA", "M", "4/9/1996", "Ice Hockey", "", 1463808, "Harvard University", ""], ["Matt", "Donovan", "Matt Donovan", "USA", "M", "5/9/1990", "Ice Hockey", "", 830810, "", ""], ["Garrett", "Driller", "Garrett Driller", "USA", "M", "8/24/1996", "Alpine Skiing", "", 1635823, "", ""], ["Meghan", "Duggan", "Meghan Duggan", "USA", "F", "9/3/1987", "Ice Hockey", "", 694927, "University of Wisconsin--Madison", ""], ["Susan", "Dunklee", "Susan Dunklee", "USA", "F", "2/13/1986", "Biathlon", "", 823338, "Dartmouth College", ""], ["Robbie", "Earl", "Robbie Earl", "USA", "M", "6/2/1985", "Ice Hockey", "", 827906, "", ""], ["Katie", "Eberling", "Katie Eberling", "USA", "F", "8/7/1988", "Bobsleigh", "", 994192, "", ""], ["Clare", "Egan", "Clare Egan", "USA", "F", "11/19/1987", "Biathlon", "", 1338227, "University of New Hampshire", "Wellesley College"], ["Mark", "Engel", "Mark Engel", "USA", "M", "10/1/1991", "Alpine Skiing", "", 1195379, "University of Utah", ""], ["Terra", "Evans", "Terra Evans", "USA", "F", "10/7/1989", "Bobsleigh", "", 1469882, "", ""], ["Aja", "Evans", "Aja Evans", "USA", "F", "5/12/1988", "Bobsleigh", "", 1111084, "University of Illinois--Urbana-Champaign", "University of Nevada--Las Vegas"], ["Cade", "Fairchild", "Cade Fairchild", "USA", "M", "1/15/1989", "Ice Hockey", "", 750495, "", ""], ["Kali", "Flanagan", "Kali Flanagan", "USA", "F", "9/19/1995", "Ice Hockey", "", 1646105, "Boston College", ""], ["Brent", "Fogt", "Brent Fogt", "USA", "M", "4/18/1985", "Bobsleigh", "", 1469873, "", ""], ["Chris", "Fogt", "Chris Fogt", "USA", "M", "5/29/1983", "Bobsleigh", "", 709320, "Utah Valley University", ""], ["Adam", "Fox", "Adam Fox", "USA", "M", "2/17/1998", "Ice Hockey", "", 1494139, "", ""], ["Kris", "Freeman", "Kris Freeman", "USA", "M", "10/14/1980", "Cross Country Skiing", "", 396600, "", ""], ["Parker", "Gahagen", "Parker Gahagen", "USA", "M", "5/17/1993", "Ice Hockey", "", 1719003, "", ""], ["Dylan", "Gambrell", "Dylan Gambrell", "USA", "M", "8/26/1996", "Ice Hockey", "", 1719004, "", ""], ["Cherrelle", "Garrett", "Cherrelle Garrett", "USA", "F", "5/7/1989", "Bobsleigh", "", 1114669, "", ""], ["Adam", "Gaudette", "Adam Gaudette", "USA", "M", "10/3/1996", "Ice Hockey", "", 1719005, "", ""], ["Tyson", "Gay", "Tyson Gay", "USA", "M", "8/9/1982", "Bobsleigh", "", 559932, "", ""], ["Matthew", "Gelso", "Matthew Gelso", "USA", "M", "7/18/1988", "Cross Country Skiing", "", 1124339, "", ""], ["Nate", "Gerbe", "Nate Gerbe", "USA", "M", "7/24/1987", "Ice Hockey", "", 827725, "", ""], ["Lauren", "Gibbs", "Lauren Gibbs", "USA", "F", "3/2/1984", "Bobsleigh", "", 1338821, "Brown University", ""], ["Tom", "Gilbert", "Tom Gilbert", "USA", "M", "1/10/1983", "Ice Hockey", "", 612157, "", ""], ["Matt", "Gilroy", "Matt Gilroy", "USA", "M", "12/30/1899", "Ice Hockey", "", 827947, "Boston University", ""], ["Nathan", "Gilsleider", "Nathan Gilsleider", "USA", "M", "4/29/1987", "Bobsleigh", "", 1467424, "", ""], ["Barry", "Goers", "Barry Goers", "USA", "M", "6/14/1986", "Ice Hockey", "", 1640862, "", ""], ["Savannah", "Graybill", "Savannah Graybill", "USA", "F", "4/25/1988", "Skeleton", "", 1139522, "", ""], ["Jordan", "Greenway", "Jordan Greenway", "USA", "M", "12/30/1899", "Ice Hockey", "", 1383619, "Boston University", ""], ["Dustin", "Greenwood", "Dustin Greenwood", "USA", "M", "5/13/1986", "Bobsleigh", "", 1341185, "", ""], ["Brian", "Gregg", "Brian Gregg", "USA", "M", "6/27/1984", "Cross Country Skiing", "", 715095, "", ""], ["Jamie", "Greubel Poser", "Jamie Greubel Poser", "USA", "F", "11/9/1983", "Bobsleigh", "", 766649, "Cornell University", "Lesley University"], ["Ryan", "Gunderson", "Ryan Gunderson", "USA", "M", "8/16/1985", "Ice Hockey", "", 888530, "University of Vermont", ""], ["Simeon", "Hamilton", "Simeon Hamilton", "USA", "M", "5/14/1987", "Cross Country Skiing", "", 833215, "", ""], ["Reese", "Hanneman", "Reese Hanneman", "USA", "M", "12/25/1989", "Cross Country Skiing", "", 836170, "University of Alaska--Anchorage", ""], ["Logan", "Hanneman", "Logan Hanneman", "USA", "M", "6/2/1993", "Cross Country Skiing", "", 1018299, "University of Alaska--Fairbanks", ""], ["Ben", "Hanowski", "Ben Hanowski", "USA", "M", "10/18/1990", "Ice Hockey", "", 1165604, "", ""], ["Anne", "Hart", "Anne Hart", "USA", "F", "8/20/1992", "Cross Country Skiing", "", 1454750, "Dartmouth College", ""], ["Miles", "Havlick", "Miles Havlick", "USA", "M", "12/20/1989", "Cross Country Skiing", "", 1231799, "", ""], ["Nicholas", "Hendrickson", "Nicholas Hendrickson", "USA", "M", "6/20/1991", "Nordic Combined", "", 724344, "", ""], ["Megan", "Henry", "Megan Henry", "USA", "F", "6/17/1987", "Skeleton", "", 1221502, "", ""], ["Nicole", "Hensley", "Nicole Hensley", "USA", "F", "6/23/1994", "Ice Hockey", "", 1486400, "Lindenwood University", ""], ["Zoe", "Hickel", "Zoe Hickel", "USA", "F", "7/10/1992", "Ice Hockey", "", 845566, "", ""], ["Chelsea", "Holmes", "Chelsea Holmes", "USA", "F", "1/20/1987", "Cross Country Skiing", "", 1124327, "", ""], ["Kristen", "Hurley", "Kristen Hurley", "USA", "F", "9/23/1992", "Bobsleigh", "", 1467422, "", ""], ["Kehri", "Jones", "Kehri Jones", "USA", "F", "11/30/1993", "Bobsleigh", "", 862217, "", ""], ["Lori", "Jones", "Lori Jones", "USA", "F", "8/5/1982", "Bobsleigh", "", 565959, "", ""], ["Briauna", "Jones", "Briauna Jones", "USA", "F", "7/1/1992", "Bobsleigh", "", 1563678, "", ""], ["Amanda", "Kautzer", "Amanda Kautzer", "USA", "F", "5/2/1998", "Biathlon", "", 1362269, "", ""], ["Tyler", "Kelleher", "Tyler Kelleher", "USA", "M", "1/2/1995", "Ice Hockey", "", 1170089, "", ""], ["Megan", "Keller", "Megan Keller", "USA", "F", "5/1/1996", "Ice Hockey", "", 1275309, "Boston College", ""], ["Amanda", "Kessel", "Amanda Kessel", "USA", "F", "8/28/1991", "Ice Hockey", "", 713796, "University of Minnesota--Twin Cities", ""], ["Bonnie", "Kilis", "Bonnie Kilis", "USA", "F", "5/14/1988", "Bobsleigh", "", 1467423, "", ""], ["Hilary", "Knight", "Hilary Knight", "USA", "F", "7/12/1989", "Ice Hockey", "", 694928, "University of Wisconsin--Madison", ""], ["Chad", "Kolarik", "Chad Kolarik", "USA", "M", "1/26/1986", "Ice Hockey", "", 844889, "University of Michigan--Ann Arbor", ""], ["Monique", "Lamoureux", "Monique Lamoureux", "USA", "F", "7/3/1989", "Ice Hockey", "", 774390, "University of Minnesota--Twin Cities", "University of North Dakota"], ["JP", "Lamoureux", "JP Lamoureux", "USA", "M", "8/20/1984", "Ice Hockey", "", 1305755, "", ""], ["Jocelyne", "Lamoureux-Davidson", "Jocelyne Lamoureux-Davidson", "USA", "F", "7/3/1989", "Ice Hockey", "", 774381, "University of Minnesota--Twin Cities", "University of North Dakota"], ["Austin", "Landis", "Austin Landis", "USA", "M", "7/21/1991", "Bobsleigh", "", 1469504, "", ""], ["Steve", "Langton", "Steve Langton", "USA", "M", "4/15/1983", "Bobsleigh", "", 709275, "Northeastern University", ""], ["Ryan", "Lasch", "Ryan Lasch", "USA", "M", "1/22/1987", "Ice Hockey", "", 888025, "", ""], ["David", "Leggio", "David Leggio", "USA", "M", "7/31/1984", "Ice Hockey", "", 922823, "Clarkson University", ""], ["Bryan", "Lerg", "Bryan Lerg", "USA", "M", "1/20/1986", "Ice Hockey", "", 1379684, "", ""], ["Chloe", "Levins", "Chloe Levins", "USA", "F", "4/24/1998", "Biathlon", "", 1362275, "", ""], ["Broc", "Little", "Broc Little", "USA", "M", "3/24/1988", "Ice Hockey", "", 968519, "Yale University", ""], ["Mike", "Lundin", "Mike Lundin", "USA", "M", "9/24/1984", "Ice Hockey", "", 808632, "", ""], ["Adam", "Martin", "Adam Martin", "USA", "M", "10/26/1994", "Cross Country Skiing", "", 1240762, "", ""], ["Gisele", "Marvin", "Gisele Marvin", "USA", "F", "3/7/1987", "Ice Hockey", "", 694932, "University of Minnesota--Twin Cities", ""], ["Sam", "McGuffie", "Sam McGuffie", "USA", "M", "10/16/1989", "Bobsleigh", "", 1457291, "Rice University", ""], ["Elana", "Meyers-Taylor", "Elana Meyers-Taylor", "USA", "F", "10/10/1984", "Bobsleigh", "", 709694, "DeVry University", "George Washington University"], ["Nick", "Michaud", "Nick Michaud", "USA", "M", "4/10/1992", "Cross Country Skiing", "", 771315, "", ""], ["Samuel", "Michener", "Samuel Michener", "USA", "M", "5/24/1987", "Bobsleigh", "", 1221319, "", ""], ["Andy", "Miele", "Andy Miele", "USA", "M", "4/15/1988", "Ice Hockey", "", 928386, "", ""], ["Kaitlynn", "Miller", "Kaitlynn Miller", "USA", "F", "8/9/1991", "Cross Country Skiing", "", 1479910, "Bowdoin College", ""], ["Travis", "Morin", "Travis Morin", "USA", "M", "1/9/1984", "Ice Hockey", "", 916723, "", ""], ["Steve", "Moses", "Steve Moses", "USA", "M", "8/9/1989", "Ice Hockey", "", 1310773, "", ""], ["John", "Muse", "John Muse", "USA", "M", "8/1/1988", "Ice Hockey", "", 1640473, "", ""], ["Mirai", "Nagasu", "Mirai Nagasu", "USA", "F", "4/16/1993", "Figure Skating", "", 720880, "University of Colorado--Colorado Springs", ""], ["Jake", "Oettinger", "Jake Oettinger", "USA", "M", "12/18/1998", "Ice Hockey", "", 1383586, "", ""], ["Justin", "Olsen", "Justin Olsen", "USA", "M", "4/16/1987", "Bobsleigh", "", 715531, "DeVry University", ""], ["Brian", "O'Neill", "Brian O'Neill", "USA", "M", "6/1/1988", "Ice Hockey", "", 1443761, "Yale University", ""], ["Austin", "Ortega", "Austin Ortega", "USA", "M", "4/12/1994", "Ice Hockey", "", 1719007, "", ""], ["Anne", "O'Shea", "Anne O'Shea", "USA", "F", "9/5/1987", "Skeleton", "", 709220, "", ""], ["Sable", "Otey", "Sable Otey", "USA", "F", "12/30/1899", "Bobsleigh", "", 1735725, "", ""], ["Eric", "Packer", "Eric Packer", "USA", "M", "7/3/1990", "Cross Country Skiing", "", 1221038, "", ""], ["Aaron", "Palushaj", "Aaron Palushaj", "USA", "M", "9/7/1989", "Ice Hockey", "", 762142, "", ""], ["Annie", "Pankowski", "Annie Pankowski", "USA", "F", "11/4/1994", "Ice Hockey", "", 1012512, "", ""], ["Kelly", "Pannek", "Kelly Pannek", "USA", "F", "12/29/1995", "Ice Hockey", "", 1172477, "University of Minnesota--Twin Cities", ""], ["Caitlin", "Patterson", "Caitlin Patterson", "USA", "F", "1/30/1990", "Cross Country Skiing", "", 848467, "University of Vermont", ""], ["Scott", "Patterson", "Scott Patterson", "USA", "M", "1/28/1992", "Cross Country Skiing", "", 916864, "University of Vermont", ""], ["Amanda", "Pelkey", "Amanda Pelkey", "USA", "F", "5/29/1993", "Ice Hockey", "", 762867, "University of Vermont", ""], ["Emily", "Pfalzer", "Emily Pfalzer", "USA", "F", "6/14/1993", "Ice Hockey", "", 845480, "Boston College", ""], ["Brian", "Pinho", "Brian Pinho", "USA", "M", "5/11/1995", "Ice Hockey", "", 1719008, "", ""], ["Rhett", "Rakhshani", "Rhett Rakhshani", "USA", "M", "3/6/1988", "Ice Hockey", "", 750572, "", ""], ["Kikkan", "Randell", "Kikkan Randell", "USA", "F", "12/31/1982", "Cross Country Skiing", "", 397218, "", ""], ["Chad", "Rau", "Chad Rau", "USA", "M", "1/18/1987", "Ice Hockey", "", 1009831, "", ""], ["James", "Reed", "James Reed", "USA", "M", "5/23/1991", "Bobsleigh", "", 1338816, "", ""], ["Dylan", "Reese", "Dylan Reese", "USA", "M", "8/29/1984", "Ice Hockey", "", 839534, "", ""], ["Joanne", "Reid", "Joanne Reid", "USA", "F", "6/28/1992", "Biathlon", "", 848468, "University of Colorado--Boulder", ""], ["Brittany", "Reinbolt", "Brittany Reinbolt", "USA", "F", "4/12/1984", "Bobsleigh", "", 994303, "", ""], ["Alex", "Rigsby", "Alex Rigsby", "USA", "F", "1/3/1992", "Ice Hockey", "", 762866, "University of Wisconsin--Madison", ""], ["Garrett", "Roe", "Garrett Roe", "USA", "M", "2/22/1988", "Ice Hockey", "", 1425779, "St. Cloud State University", ""], ["Richard", "Roethel", "Richard Roethel", "USA", "M", "5/20/1991", "Bobsleigh", "", 1735727, "", ""], ["Mike", "Rogals", "Mike Rogals", "USA", "M", "11/16/1988", "Skeleton", "", 1177269, "", ""], ["Maddie", "Rooney", "Maddie Rooney", "USA", "F", "12/30/1899", "Ice Hockey", "", 1646106, "University of Minnesota--Duluth", ""], ["Vinny", "Saponari", "Vinny Saponari", "USA", "M", "2/15/1990", "Ice Hockey", "", 750347, "", ""], ["Ida", "Sargent", "Ida Sargent", "USA", "F", "1/25/1988", "Cross Country Skiing", "", 724202, "Dartmouth College", ""], ["Dillon", "Schrodt", "Dillon Schrodt", "USA", "M", "12/21/1991", "Bobsleigh", "", 1735726, "", ""], ["Dan", "Sexton", "Dan Sexton", "USA", "M", "4/29/1987", "Ice Hockey", "", 827709, "", ""], ["Tyler", "Sheehy", "Tyler Sheehy", "USA", "M", "12/30/1899", "Ice Hockey", "", 1735728, "", ""], ["Drew", "Shore", "Drew Shore", "USA", "M", "1/29/1991", "Ice Hockey", "", 776842, "", ""], ["Jaime", "Sifers", "Jaime Sifers", "USA", "M", "1/18/1983", "Ice Hockey", "", 827903, "", ""], ["Brita", "Sigourney", "Brita Sigourney", "USA", "F", "1/17/1990", "Freestyle Skiing", "", 764426, "University of California--Davis", ""], ["Jamie", "Sinclair", "Jamie Sinclair", "USA", "F", "2/21/1992", "Curling", "", 1721078, "", ""], ["Haley", "Skarupa", "Haley Skarupa", "USA", "F", "1/3/1994", "Ice Hockey", "", 845490, "Boston College", ""], ["Jim", "Slater", "Jim Slater", "USA", "M", "12/9/1982", "Ice Hockey", "", 612158, "Michigan State University", ""], ["Nikia", "Squire", "Nikia Squire", "USA", "F", "12/30/1899", "Bobsleigh", "", 1398321, "", ""], ["Kelli", "Stack", "Kelli Stack", "USA", "F", "1/13/1988", "Ice Hockey", "", 749741, "", ""], ["Tim", "Stapleton", "Tim Stapleton", "USA", "M", "7/19/1982", "Ice Hockey", "", 827715, "", ""], ["Lee", "Stecklein", "Lee Stecklein", "USA", "F", "4/23/1994", "Ice Hockey", "", 929496, "University of Minnesota--Twin Cities", ""], ["Nolan", "Stevens", "Nolan Stevens", "USA", "M", "7/22/1996", "Ice Hockey", "", 1266741, "", ""], ["Ryan", "Stoa", "Ryan Stoa", "USA", "M", "4/13/1987", "Ice Hockey", "", 827749, "University of Minnesota--Twin Cities", ""], ["Andrew", "Stopera", "Andrew Stopera", "USA", "M", "9/30/1997", "Curling", "", 1631012, "", ""], ["Jefferey", "Swider-Peltz", "Jefferey Swider-Peltz", "USA", "M", "7/8/1989", "Speedskating", "", 603144, "", ""], ["Jeff", "Taffe", "Jeff Taffe", "USA", "M", "2/19/1981", "Ice Hockey", "", 456527, "", ""], ["Nic", "Taylor", "Nic Taylor", "USA", "M", "5/16/1987", "Bobsleigh", "", 1014129, "", ""], ["Troy", "Terry", "Troy Terry", "USA", "M", "9/10/1997", "Ice Hockey", "", 1383689, "University of Denver", ""], ["Ian", "Torchia", "Ian Torchia", "USA", "M", "3/8/1996", "Cross Country Skiing", "", 1357347, "", ""], ["Dana", "Trivigno", "Dana Trivigno", "USA", "F", "1/7/1994", "Ice Hockey", "", 929474, "", ""], ["Carlo", "Valdes", "Carlo Valdes", "USA", "M", "2/11/1990", "Bobsleigh", "", 1338817, "University of California--Los Angeles", ""], ["Ryan", "Vesce", "Ryan Vesce", "USA", "M", "12/30/1899", "Ice Hockey", "", 827998, "", ""], ["Nicole", "Vogt", "Nicole Vogt", "USA", "F", "3/2/1987", "Bobsleigh", "", 1012882, "", ""], ["Evan", "Weinstock", "Evan Weinstock", "USA", "M", "10/30/1991", "Bobsleigh", "", 1469874, "Brown University", ""], ["Noah", "Welch", "Noah Welch", "USA", "M", "8/26/1982", "Ice Hockey", "", 808560, "Harvard University", ""], ["Casey", "Wellman", "Casey Wellman", "USA", "M", "10/18/1987", "Ice Hockey", "", 841594, "", ""], ["Kendall", "Wesenberg", "Kendall Wesenberg", "USA", "F", "8/23/1990", "Skeleton", "", 1337513, "University of Colorado--Boulder", ""], ["Joseph", "Woll", "Joseph Woll", "USA", "M", "7/12/1998", "Ice Hockey", "", 1494198, "", ""], ["Brendan", "Woods", "Brendan Woods", "USA", "M", "6/11/1992", "Ice Hockey", "", 1342130, "", ""], ["Ryan", "Zapolski", "Ryan Zapolski", "USA", "M", "11/11/1986", "Ice Hockey", "", 1305897, "Mercyhurst College", ""]];

/*****************************************
*        TOP LEVEL FUNCTION DEFS         *
******************************************/

function loadKaMedalWidget(selector){
    getDataFromApiAndBuild(selector);
}

function getDataFromApiAndBuild(tSelector){

    var results = [];
    var all_ids = Array.from(getAllAthleteIdsAndSchools());
    // console.log(all_ids.toString());
    
    // if(ENV == "DEV"){
    //     all_ids = all_ids.slice(1,10);
    //     for(var j=0; j <= alldata.length; j++){
    //         console.log(alldata[j]);
    //         if(alldata[j]){
    //             parseAndAddPersonResult(JSON.parse(alldata[j]));
    //         }
    //     }
    // }
    // else{ 
        for (var i = 0; i < all_ids.length; i++) {
            console.log("requesting for id: ", all_ids[i]['id']);
            tAsync = singleApiCall(all_ids[i]);
            results.push(tAsync);
        }
    // }

    $.when.apply(this, results).done(function() {
        console.log("all API requests have completed");
        allSchools.delete("");
        // allAthletes.delete("");
        buildMenus(
            Array.from(Object.keys(allResultsByDate).sort(compareDateStrings)), 
            Array.from(allSports).sort(), 
            // Array.from(allAthletes).sort(), 
            Array.from(allSchools).sort()
        );
        buildTable(tSelector, column_config, allResultsByDate)
    });
}

/*****************************************
*      API CALLS AND DATA HANDLING       *
******************************************/

function singleApiCall(athlete_dict){
    return $.ajax({
        url: BASE_API_URL,
        type: "get",
        data: { 
            personId: athlete_dict['id'], 
            // Season: '2020',
            season: 20172018,
            languageCode: 2,
            competitionSetId: 2
        },
        dataType: "json",
        success: function(data){
            // console.log("successfully pulled data"), data.toString();
            //parse the data and add it to the global var
            parseAndAddPersonResult(data, athlete_dict);
        },
        error:function(e){
            console.error("Error retrieving data for " + personId);
        } 
    });
}

function parseAndAddPersonResult(result, athlete_dict){

    var person = result['Person'];
    var first_name = person['c_FirstName'];
    var last_name = person['c_LastName'];
    var full_name = last_name + ", " + first_name
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
                'full_name': full_name,
                'gender': phase['Gender']['c_Name'],
                'event_name': phase['Event']['c_Name'],
                'event': phase['c_Phase'],
                'start': start,
                'end': phase['DateTimes']['End']['c_UTC'],
                'medal': parseMedals(phase['MedalsToBeAwarded']),
                'finished': phase['b_Finished'],
                'result': phase['c_ResultPhase'],
                'place': phase['n_RankPhase'],
                'sport_name': sport_name,
                'schools': athlete_dict['schools']
            };

            allResultsByDate[date][cat] = allResultsByDate[date][cat].concat(tRow);
            allSports.add(sport_name);
            allSchools.add(athlete_dict['schools'][0]);
            allSchools.add(athlete_dict['schools'][1]);
        }
        
    }
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

function getAllAthleteIdsAndSchools(){
    ids = new Set();
    for (var i = 0; i < athlete_lookup.length; i++) {
        ids.add({
            'id': athlete_lookup[i][ATHLETE_ID_COL],
            'schools': [
                athlete_lookup[i][SCHOOL_1_COL], 
                athlete_lookup[i][SCHOOL_2_COL]
            ]
        });
    }
    ids.delete("");
    return ids;
}

/*****************************************
*        TABLE BUILDING FUNCTIONS        *
******************************************/

// Builds the Table out of apiResults.
function buildTable(tSelector, tCols, tResults) {

    var tBody = $('<tbody class="ka-outer-table-body"/>');
    var dates = Object.keys(tResults).sort(compareDateStrings);

    for (var j = 0; j < dates.length; j++) {
        
        var tDayResults = tResults[dates[j]];
        var tTarget = tSelector + '-row-' + dates[j].replace(/ /g,'');
        
        var tDateSection = buildDateSection(dates[j], tDayResults, tCols, tTarget);

        tBody.append(tDateSection);
    }

    $('#ka-loading-rings').remove();
    $(tSelector).append(tBody);
}

function buildDateSection(tDate, tResult, tCols, tTarget){

    var tEventNames = Object.keys(tResult);

    var tDateSection = $(`<tr data-toggle="collapse" ka-filter-date="${tDate}" data-target="#${tTarget}" class="accordion-toggle ka-date-header"/>`);
    tDateSection.html(`<div>${tDate}</div>`);

    for(var j = 0; j < tEventNames.length; j++){
        var tEventName = tEventNames[j]; 
        var tEventSection = buildEventSection(tDate, tEventName, tResult[tEventName]);
        tDateSection.append(tEventSection);
    }

    return tDateSection;
}

function buildEventSection(tDate, tEventName, tResults){
    var tEvent = $(`<tr class="ka-event-section"/>`);

    tEvent.attr('ka-filter-gender', tResults[0]['gender']);
    tEvent.attr('ka-filter-sport', tResults[0]['sport_name']);

    tEvent.html(`<div>${tEventName}</div>`);

    var tHead = $('<thead class="ka-event-row-header"/>');
    var tRh = $('<tr/>');

    //build header
    tRh.append($('<th scope="col"/>').html('Event/Round/Match'));
    tRh.append($('<th scope="col"/>').html('Result'));
    tRh.append($('<th scope="col"/>').html('Place'));
    tRh.append($('<th scope="col"/>').html('Medal'));
    tRh.append($('<th scope="col"/>').html('Athlete'));
    tRh.append($('<th scope="col"/>').html('School'));
    tHead.append(tRh);
    tEvent.append(tHead);

    //build the rows
    for(var j = 0; j < tResults.length; j++){
        var tRes = tResults[j]
        var tRow = $(`<tr class="ka-event-row"/>`);
        tRow.append($('<td/>').html(tRes['event']));
        tRow.append($('<td/>').html(tRes['result']));
        tRow.append($('<td/>').html(tRes['place']));
        tRow.append($('<td/>').html(tRes['medal']));
        tRow.append($('<td/>').html(tRes['full_name']));
        tRow.append($('<td/>').html(schoolsToString(tRes['schools'])));

        tRow.attr('ka-filter-school', tRes['schools'][0]);
        if(tRes['schools'][1].length){
            tRow.attr('ka-filter-school2', tRes['schools'][1]);
        }
        tRow.attr('ka-filter-athlete', tRes['full_name'].toUpperCase());

        tEvent.append(tRow);
    }
    return tEvent;
}

function schoolsToString(tArr){
    return tArr[0] + (tArr[1].length ? ", " + tArr[1] : "");
}

/*****************************************
*        MENU BUILDING FUNCTIONS         *
******************************************/

function buildMenus(tDates, tSports, tSchools){
    buildFilterSelectMenu('date', tDates);
    buildFilterSelectMenu('sport', tSports);
    buildFilterTextMenu('athlete');
    buildFilterSelectMenu('gender', ['Men', 'Women', 'Mixed']);
    buildFilterSelectMenu('school', tSchools);
}

function buildFilterTextMenu(tKey){

    var tInput = $( `#${tKey}-text-filter` );
    tInput.keyup(function() {
        var tVal = tInput.val().toUpperCase();
        var tAllRows = $(`tr[ka-filter-${tKey}]`);

        if(tVal.length){
            var tFilterString = `tr[ka-filter-${tKey}*='${tVal}']`;
            fadeIn($(tFilterString), `ka-hidden-${tKey}`);
            fadeOut(tAllRows.not(tFilterString), `ka-hidden-${tKey}`);
        }else{
            fadeIn(tAllRows, `ka-hidden-${tKey}`);
        }
        hideEmptySections();
    });
}

//built the filter menu named by key with the options in tOpts
function buildFilterSelectMenu(tKey, tOpts){

    var tMenu = $(`#${tKey}-dropdown`);

    tSelectAll = $(`<li class="all-selector" id="${tKey}-select-all">&nbsp&nbspSELECT ALL</li>`);
    tDeselectAll = $($(`<li class="all-selector" id="${tKey}-deselect-all">&nbsp&nbspDE-SELECT ALL</li>`));

    tSelectAll.click(function () {
        fadeIn($(`tr[ka-filter-${tKey}]`), `ka-hidden-${tKey}`);
        $(`input[ka-filter-key=${tKey}]`).prop('checked', true);
        hideEmptySections();
    });

    tDeselectAll.click(function () {
        fadeOut($(`tr[ka-filter-${tKey}]`), `ka-hidden-${tKey}`);
        $(`input[ka-filter-key=${tKey}]`).prop('checked', false);
        hideEmptySections();
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
        tRow2 = $(`tr[ka-filter-${tKey}2='${tVal}']`);
        tHidingClass = `ka-hidden-${tKey}`;

        if(tItem.is(":checked")){
            fadeIn(tRow, tHidingClass);
            fadeIn(tRow2, tHidingClass);
        }
        else{
            fadeOut(tRow, tHidingClass);
            fadeOut(tRow2, tHidingClass);
        }
        hideEmptySections();
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

/*****************************************
*          Hide/Show FUNCTIONS           *
******************************************/

function fadeIn(tElem, tClass){
    Promise.all(
        [tElem.fadeIn("fast", function () { 
            $(this).removeClass(tClass); 
        }).promise()]
    ).then(function () {
        hideEmptySections();
    });
}

function fadeOut(tElem, tClass){
    Promise.all(
        [tElem.fadeOut("fast", function () { 
            $(this).addClass(tClass); 
        }).promise()]
    ).then(function () {
        hideEmptySections();
    });
}

function hideEmptySections(){
    var promises = [];
    var allSections = $('.ka-event-section');
    for (var i = 0; i < allSections.length; i++) {
        var sct = $(allSections[i]);
        if(
            sct.find('tr.ka-event-row').length == 
            sct.find('tr[class*="ka-hidden-"]').length 
        ){
            promises = promises.concat(
                sct.fadeOut("fast", function () { 
                $(this).addClass('ka-hidden-section'); 
            }).promise());
        }
        else{
            promises = promises.concat(
            sct.fadeIn("fast", function () { 
                $(this).removeClass('ka-hidden-section'); 
            }).promise());
        }
    }

    //when all the subsection hiding is done, look up to the date sections
    Promise.all(promises).then(function () {
        hideEmptyDateSections();
    });
}

function hideEmptyDateSections(){
    var allDateSections = $('.ka-date-header');
    for (var i = 0; i < allDateSections.length; i++) {
        var sct = $(allDateSections[i]);
        if(
            sct.find('tr.ka-event-section').length == 
            sct.find('tr[class*="ka-hidden-section"]').length 
        ){
            sct.fadeOut("fast", function () { 
                $(this).addClass('ka-hidden-section'); 
            });
        }
        else{
            sct.fadeIn("fast", function () { 
                $(this).removeClass('ka-hidden-section'); 
            });
        }
    }
}