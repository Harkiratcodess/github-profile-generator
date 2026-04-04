const btn=document.querySelector('#btn');
const input=document.querySelector('#input');
const result=document.querySelector('.result');

btn.addEventListener('click',()=>{
    const userName=input.value;
    getprofile(userName);
});
function getprofile(userName){
    fetch(`https://api.github.com/users/${userName}`)
    .then(res=>res.json())
    .then(data=>displayresult(data))
    .catch(err=>console.log(err));
}
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const userName = input.value.trim();
        if(userName !== ''){
            getprofile(userName);
        }
    }
});
function displayresult(data)
{
    if(data.message==='Not Found')
    {
        result.innerHTML=`<h2>User not found</h2>`;
        return;
    }
    result.innerHTML=`
    <img src="${data.avatar_url}" alt="avatar" class="avatar">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || 'No bio available'}</p>
    <p>Followers: ${data.followers} | Following: ${data.following}</p>
    <p> ${data.public_repos} public repos</p>
    <a href="${data.html_url}" target="_blank">View Profile</a>
    <br><br>
<button id="downloadBtn">Download Profile</button>

    `;
    document.querySelector('#downloadBtn')
        .addEventListener('click', () => downloadPDF(data));
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

            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        };

        img.onerror = error => reject(error);
        img.src = url;
    });
}