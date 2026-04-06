const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const main = document.querySelector('#main');


btn.addEventListener('click', () => {
    const userName = input.value.trim();
    if (userName !== '') getProfile(userName);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const userName = input.value.trim();
        if (userName !== '') getProfile(userName);
    }
});

function getProfile(userName) {
    main.style.display = 'none';

    fetch(`https://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Not Found') {
                alert('User not found!');
                return;
            }
            fetch(`https://api.github.com/users/${userName}/repos?per_page=10&sort=pushed`)
                .then(r => r.json())
                .then(repos => {
                    displayResult(data);
                    displayRPG(data, repos);
                })
                .catch(() => {
                    displayResult(data);
                    displayRPG(data, []);
                });
        })
        .catch(err => {
            alert('Something went wrong. Check your connection.');
            console.log(err);
        });
}

function displayResult(data) {
    document.querySelector('#avatar').src = data.avatar_url;
    document.querySelector('#name').textContent = data.name || data.login;
    document.querySelector('#bio').textContent = data.bio || 'No bio available';
    document.querySelector('#metaFollowers').textContent = data.followers + ' Followers';
    document.querySelector('#metaRepos').textContent = data.public_repos + ' Public Repos';
    document.querySelector('#metaFollowing').textContent = 'Following ' + data.following;
    document.querySelector('#profileLink').href = data.html_url;
    document.querySelector('#downloadBtn').onclick = () => downloadPDF(data);
    main.style.display = 'flex';
}


function getTopLanguage(repos) {
    const langs = {};

    repos.forEach(r => {
        if (r.language) {
            langs[r.language] = (langs[r.language] || 0) + 1;
        }
    });

    const sorted = Object.keys(langs).sort((a, b) => langs[b] - langs[a]);

    return sorted.length > 0 ? sorted[0] : 'JavaScript'; // fallback
}

function getRPGClass(lang) {
    const classes = {
        'JavaScript': { icon: '⚡', name: 'Script Sorcerer',  sub: 'Wielder of the async arts' },
        'TypeScript': { icon: '🛡️', name: 'Type Knight',      sub: 'Guardian of compile-time safety' },
        'Python':     { icon: '🐍', name: 'Pythonmancer',     sub: 'Master of serpent spells' },
        'Java':       { icon: '☕', name: 'Java Paladin',     sub: 'Eternal servant of the JVM' },
        'C++':        { icon: '⚔️', name: 'Memory Warrior',   sub: 'Battles segfaults daily' },
        'C':          { icon: '🗡️', name: 'Pointer Rogue',    sub: 'Dances with raw memory' },
        'Rust':       { icon: '🦀', name: 'Rust Paladin',     sub: 'Chosen by the borrow checker' },
        'Go':         { icon: '🐹', name: 'Gopher Ranger',    sub: 'Fast, concurrent, minimal' },
        'PHP':        { icon: '🕸️', name: 'Legacy Warlock',   sub: 'Ancient dark magic user' },
        'Ruby':       { icon: '💎', name: 'Gem Enchanter',    sub: 'Rails rider extraordinaire' },
        'Swift':      { icon: '🍎', name: 'Swift Archer',     sub: 'Apple ecosystem hunter' },
        'Kotlin':     { icon: '🎯', name: 'Kotlin Assassin',  sub: 'Null pointer eliminator' },
        'HTML':       { icon: '🏗️', name: 'DOM Architect',    sub: 'Builder of web structures' },
        'CSS':        { icon: '🎨', name: 'Style Mage',       sub: 'Flexbox whisperer' },
        'Shell':      { icon: '💻', name: 'Shell Shaman',     sub: 'Commands the terminal spirits' },
        'Dart':       { icon: '🎯', name: 'Flutter Monk',     sub: 'Cross-platform mystic' },
        'R':          { icon: '📊', name: 'Data Druid',       sub: 'Communes with statistics' },
    };
    return classes[lang] || { icon: '🧙', name: 'Unknown Mage', sub: 'Speaks in unknown tongues' };
}

function capStat(val, max) {
    return Math.min(Math.round((val / max) * 100), 100) + '%';
}

function displayRPG(data, repos) {
    const topLang = getTopLanguage(repos);
    const rpg = getRPGClass(topLang);

    document.querySelector('#classIcon').textContent = rpg.icon;
    document.querySelector('#className').textContent = rpg.name + (topLang ? ' (' + topLang + ')' : '');
    document.querySelector('#classSub').textContent = rpg.sub;

    document.querySelector('#barStr').style.width  = capStat(data.public_repos, 200);
    document.querySelector('#barCha').style.width  = capStat(data.followers, 1000);
    document.querySelector('#barWis').style.width  = capStat(data.following, 500);
    document.querySelector('#barMana').style.width = capStat(data.public_gists || 0, 50);

    document.querySelector('#valStr').textContent  = data.public_repos + ' / 200';
    document.querySelector('#valCha').textContent  = data.followers + ' / 1000';
    document.querySelector('#valWis').textContent  = data.following + ' / 500';
    document.querySelector('#valMana').textContent = (data.public_gists || 0) + ' / 50';

    document.querySelector('#roastText').textContent ="Thanks for visiting — keep searching and exploring.";
}



async function downloadPDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const imgData = await getBase64Image(data.avatar_url);
    doc.addImage(imgData, 'JPEG', 20, 20, 40, 40);
    doc.setFontSize(16);
    doc.text("GitHub Profile", 20, 70);
    doc.setFontSize(12);
    doc.text(`Name: ${data.name || data.login}`, 20, 90);
    doc.text(`Bio: ${data.bio || 'No bio available'}`, 20, 100);
    doc.text(`Followers: ${data.followers}`, 20, 110);
    doc.text(`Following: ${data.following}`, 20, 120);
    doc.text(`Repos: ${data.public_repos}`, 20, 130);
    doc.text(`Profile: ${data.html_url}`, 20, 140);
    doc.save(`${data.login}_profile.pdf`);
}

function getBase64Image(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = error => reject(error);
        img.src = url;
    });
}