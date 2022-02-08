/**
 * start function
 */
function start() {
    // global variable

    // get body element
    let body = document.getElementById("body");
    body.style.textAlign = 'center';

    if(ie7){
        // if browser is IE7 tell user download other browser
        var message = document.createTextNode("The current browser doesn't work, pleases try Google Chrome, FireFox, or some other newest version of browser");
        body.appendChild(message);
        var download = document.createElement('a');
        download.setAttribute('href','https://www.google.com/chrome/?brand=CHBD&ds_kid=[*TrackerID*]&gclid=Cj0KCQiA2snUBRDfARIsAIGfpqF0vBNJRxrmHyXPFQgBRCHozeZawOs5u24_Tm0R4oktbGvic7x_vowaAveGEALw_wcB');
        download.appendChild(document.createTextNode("Download Google Chrome"));
        body.appendChild(download);
        return;
    }else if(ie8){
        // if browser is IE8 tell user download other browser
        var message = document.createTextNode("The current browser doesn't work, pleases try Google Chrome, FireFox, or some other newest version of browser");
        body.appendChild(message);
        var download = document.createElement('a');
        download.setAttribute('href','https://www.google.com/chrome/?brand=CHBD&ds_kid=[*TrackerID*]&gclid=Cj0KCQiA2snUBRDfARIsAIGfpqF0vBNJRxrmHyXPFQgBRCHozeZawOs5u24_Tm0R4oktbGvic7x_vowaAveGEALw_wcB');
        download.appendChild(document.createTextNode("Download Google Chrome"));
        body.appendChild(download);
        return;
    }

    // get user_id from cookie
    let userID = GetCookie('user_id');
    // if userId is null. maybe use chrome in local system. try get userID from sessionStorge
    if(userID == null && window.sessionStorage){
        userID = sessionStorage.getItem('user_id');
    }
    let record;

    // if userId is null, that is user is first visit.
    if(userID ==null){
        // prompt user input name
        var name = prompt('Hello new user, enter your username. ','');
        // put user_id in cookie
        SetCookie('user_id',name);
        if(window.sessionStorage){
            sessionStorage.setItem('user_id', name);
        }
        record = document.createTextNode('Welcome To Choose Your avorite NBA Player, '+name+ '! This is Your First Time Here.');
    } else {
        record = document.createTextNode('Welcome Back To Choose Your Favorite NBA Player, '+userID);
    }
    // create h3 element
    let h3 = document.createElement('h3');
    h3.style.fontSize = '30px';
    // h3 append record
    h3.appendChild(record);
    // set attribute id
    h3.setAttribute("id", "title");
    // add h3 in body
    body.appendChild(h3);

    // create and append location select
    let location = createLocationSelect(["", 'EAST', 'WEST']);
    body.appendChild(location);
    animation(location);
}

function animation(ele){
    // get element's opacity
    let opacity = parseFloat(ele.style.opacity);
    // get element's margin top
    let marginTop = parseFloat(ele.style.marginTop);
    // add opacity for every step
    opacity += 1 / 100;
    // subtract margin top for every step
    marginTop -= 170 / 100;
    // if opacity is 1, that is the animation shoud be ended
    // set opacity
    ele.style.opacity = opacity;
    ele.style.marginTop = marginTop + 'px';
    if(opacity >= 1){
        ele.style.opacity = 1;
        ele.style.marginTop = '30px';
    }else{ // else, continue animation
        setTimeout(function () {
            animation(ele);
        }, 10)
    }
}

/**
 * create select element
 * @param menu
 */
function createLocationSelect(menu) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.style.marginTop = '200px';
    div.style.opacity = 0;
    div.setAttribute("id", "location");

    // create label element
    let label = document.createElement('label');
    let text = document.createTextNode('Choose The Location Of The NBA Team');
    label.appendChild(text);
    div.appendChild(label);

    // create select element
    let select = document.createElement('select');
    menu.forEach(function (value, index) {
        select.options[index] = new Option(value, value);
    });
    select.addEventListener('change', function () {
        let value = select.value;

        // if select the first line, do nothing
        if(value === '') return;

        // put the location in cookie
        SetCookie('location', value);
        if(window.sessionStorage){
            sessionStorage.setItem('location', value);
        }

        let team = null;
        if(value === 'EAST'){
            team = createTeamSelect(menus['east']);
        }else if(value === 'WEST'){
            team = createTeamSelect(menus['west']);
        }
        // if the team select already exist, delete it
        let teamNode = document.getElementById('team');
        if(teamNode != null){
            teamNode.parentElement.removeChild(teamNode);
        }

        body.appendChild(team);
        animation(team);
    });
    // add select in div
    div.appendChild(select);
    return div;
}

/**
 * create team select
 * @param menu The team list
 */
function createTeamSelect(menu) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.style.marginTop = '200px';
    div.style.opacity = 0;
    div.setAttribute("id", "team");

    // create label element
    let label = document.createElement('label');
    let text = document.createTextNode('Choose Your favorite team');
    label.appendChild(text);
    div.appendChild(label);

    // create select element
    let select = document.createElement('select');
    menu.forEach(function (value, index) {
        select.options[index] = new Option(value, value);
    });
    select.addEventListener('change', function () {
        let value = select.value;

        // if select the first line, do nothing
        if(value === '') return;

        // put the team in cookie
        SetCookie('team', value);
        if(window.sessionStorage){
            sessionStorage.setItem('team', value);
        }

        let player = null;
        if(value === 'Los Angeles Lakers'){
            player = createPlayerSelect(menus['Los Angeles Lakers']);
        }else if(value === 'Golden State Warriors'){
            player = createPlayerSelect(menus['Golden State Warriors']);
        }else if(value === 'Houston Rockets'){
            player = createPlayerSelect(menus['Houston Rockets']);
        }else if(value === 'Boston Celtics'){
            player = createPlayerSelect(menus['Boston Celtics']);
        }else if(value === 'Chicago Bulls'){
            player = createPlayerSelect(menus['Chicago Bulls']);
        }else if(value === 'Miami Heat'){
            player = createPlayerSelect(menus['Miami Heat']);
        }
        // if the player select already exist, delete it
        let playerNode = document.getElementById('player');
        if(playerNode != null){
            playerNode.parentElement.removeChild(playerNode);
        }

        body.appendChild(player);
        animation(player);
    });
    // add select in div
    div.appendChild(select);
    return div;
}


function createPlayerSelect(menu){
    let div = document.createElement('div');
    div.classList.add('card');
    div.style.marginTop = '200px';
    div.style.opacity = 0;
    div.setAttribute("id", "player");

    // create label element
    let label = document.createElement('label');
    let text = document.createTextNode('Choose your favorite palyer');
    label.appendChild(text);
    div.appendChild(label);

    // create select element
    let select = document.createElement('select');
    menu.forEach(function (value, index) {
        select.options[index] = new Option(value, value);
    });
    select.addEventListener('change', function () {
        let value = select.value;

        // if select the first line, do nothing
        if(value === '') return;

        // put the team in cookie
        SetCookie('player', value);
        if(window.sessionStorage){
            sessionStorage.setItem('player', value);
        }

        let btn = document.createElement('button');
        btn.style.marginTop = '200px';
        btn.style.opacity = 0;
        btn.setAttribute("id", "submitBtn");

        let buttonText = document.createTextNode("Submit Your Chose");
        btn.appendChild(buttonText);

        btn.onclick = function(){
            // show your choose
            showMyChose();
        };
        body.appendChild(btn);
        animation(btn);
    });
    // add select in div
    div.appendChild(select);
    return div;
}

/**
 * delete all child element of body, then create and show your chose
 */
function showMyChose() {

    // delete that three select element and one button from body
    let location = document.getElementById('location');
    let team = document.getElementById('team');
    let player = document.getElementById('player');
    let submitBtn = document.getElementById('submitBtn');

    body.removeChild(location);
    body.removeChild(team);
    body.removeChild(player);
    body.removeChild(submitBtn);

    // show information you chose

    // create top div named info
    let info = document.createElement('div');
    info.classList.add('info');

    // create images container named imgs
    let imgs = document.createElement('div');
    imgs.classList.add('imgs');
    info.appendChild(imgs);

    // create team image element
    let teamImg = document.createElement('img');
    teamImg.classList.add('team');
    // get team name from cookie
    let teamSrc = GetCookie('team');
    if (teamSrc == null && window.sessionStorage){
        teamSrc = sessionStorage.getItem('team');
    }
    // set attribute
    let suffix = '.jpg';
    if(teamSrc === 'Boston Celtics' || teamSrc === 'Houston Rockets'
        || teamSrc === 'Los Angeles Lakers'){
        suffix = '.png';
    }
    teamImg.setAttribute('src', './pic/' + teamSrc + suffix);
    imgs.appendChild(teamImg);

    // create player image element
    let playerImg = document.createElement('img');
    playerImg.classList.add('player');
    // get team name from cookie and session storage
    let playerSrc = GetCookie('player');
    if (playerSrc == null && window.sessionStorage){
        playerSrc = sessionStorage.getItem('player');
    }
    // set attribute
    if(playerSrc === 'LeBron James'){
        suffix = '.png';
    }else {
        suffix = '.jpg';
    }
    playerImg.setAttribute('src', './pic/' + playerSrc + suffix);
    imgs.appendChild(playerImg);

    // create p element for display location information
    let locationInfo = document.createElement('p');
    // get location from cookie
    let locationText = GetCookie('location');
    if (locationText == null && window.sessionStorage){
        locationText = sessionStorage.getItem('location');
    }
    let locationTextNode = document.createTextNode('Location:' + locationText);
    locationInfo.appendChild(locationTextNode);
    info.appendChild(locationInfo);

    // create p element for display team information
    let teamInfo = document.createElement('p');
    let teamTextNode = document.createTextNode('Team:' + teamSrc);
    teamInfo.appendChild(teamTextNode);
    info.appendChild(teamInfo);

    // create p element for display player information
    let playerInfo = document.createElement('p');
    let playerTextNode = document.createTextNode('Player:' + playerSrc);
    playerInfo.appendChild(playerTextNode);
    info.appendChild(playerInfo);

    // create and append a button for redo the choose
    let redoBtnText = document.createTextNode("Make a new choose");
    let redoBtn = document.createElement("button");
    redoBtn.appendChild(redoBtnText);
    redoBtn.onclick = function () {
        // clear this information and restart
        body.removeChild(info);
        let h3 = document.getElementById("title");
        body.removeChild(h3);
        start();
    };
    info.appendChild(redoBtn);
    body.appendChild(info);
}