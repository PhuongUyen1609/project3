const questions = [
    { q: "What’s your go-to outfit for a day out?", a: ["Classy outfit", "Edgy mix", "Sporty wear"] },
    { q: "Which accessory do you prefer?", a: ["Bold jewelry", "Sporty watch", "Designer bag"] },
    { q: "What shoes do you love most?", a: ["Classy heels", "Edgy boots", "Sporty sneakers"] },
    { q: "What's your ideal weekend?", a: ["Art, shopping", "Trend trials", "Outdoor sports"] },
    { q: "Which collection thrills you?", a: ["Elegant chic", "Bold mix", "Athleisure"] }
];

let index = 0;
let scores = { sporty: 0, classy: 0, edgy: 0 };

function loadQuestion() {
    if (index < questions.length) {
        document.getElementById("question").innerText = questions[index].q;
        let buttons = document.querySelectorAll("#quiz-container button");
        buttons[0].innerText = questions[index].a[0];
        buttons[1].innerText = questions[index].a[1];
        buttons[2].innerText = questions[index].a[2];
    } else {
        showResult();
    }
}

function answer(choice) {
    scores[choice]++;
    index++;
    loadQuestion();
}

function showResult() {
    let maxStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    document.getElementById("quiz-container").innerHTML = `<h2>Your style is: ${maxStyle.toUpperCase()}!</h2>`;
}

loadQuestion();
    
    let currentCategory = 'shirt';
    let currentIndex = 0;
    const items = {
        skirt: ['skirt/skirt1.png', 'skirt/skirt2.png', 'skirt/skirt3.png'],
        shirt: ['shirt/shirt1.png', 'shirt/shirt2.png', 'shirt/shirt3.png'],
        shoe: ['shoe/shoe1.png', 'shoe/shoe2.png', 'shoe/shoe3.png'],
        tattoo: ['tattoo/tattoo1.png', 'tattoo/tattoo3.png'],
        hat: ['hat/hat1.png', 'hat/hat2.png'],
        ring: ['ring/ring1.1.png', 'ring/ring1.2.png', 'ring/ring1.3.png', 'ring/ring2.1.png', 'ring/ring2.2.png', 'ring/ring2.3.png', 'ring/ring2.4.png', 'ring/ring3.png', 'ring/ring3.1.png']
    };

    function showItems(category) {
        currentCategory = category;
        itemsList = items[category]; 
        currentIndex = 0; 
        updateSlider();
    }
    
    function updateSlider() {
        const container = document.getElementById('items-container');
        container.innerHTML = ''; 
    
        if (itemsList.length > 0) {
            for(let i = 0; i < 2; i++) {
                const index = currentIndex + i;
                if (index < itemsList.length) {
                    const img = document.createElement('img');
                    img.src = itemsList[index];
                    img.classList.add('item');
                    img.draggable = true;
                    img.ondragstart = drag;
                    img.dataset.category = currentCategory;
                    container.appendChild(img);
                }
            }
        }
        document.querySelector('#prevBtn').style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        document.querySelector('#nextBtn').style.visibility = (currentIndex + 2 >= itemsList.length) ? 'hidden' : 'visible';
     
    }
    
    function prevItem() {
        if (currentIndex >= 2) {
            currentIndex -= 2; 
            updateSlider();
        }
    }
    
    function nextItem() {
        if (currentIndex + 2 < itemsList.length) {
            currentIndex += 2; 
            updateSlider();
        }
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData("src", event.target.src);
    }
    function drop(event) {
        event.preventDefault();
        const src = event.dataTransfer.getData("src");
        const characterBlock = document.getElementById("character-block");
    
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('clothing-item');
    
        // Giữ size phù hợp
        img.style.width = "110px";  
        img.style.height = "auto";
        img.style.position = "absolute";
    
        // Tính toán vị trí thả
        const rect = characterBlock.getBoundingClientRect();
        img.style.left = `${event.clientX - rect.left - 40}px`;  
        img.style.top = `${event.clientY - rect.top - 40}px`;
    
        // Cho phép kéo lại sau khi thả
        makeDraggable(img);
    
        characterBlock.appendChild(img);
    }
    
    function makeDraggable(img) {
        let offsetX, offsetY, isDragging = false;
    
        img.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - img.getBoundingClientRect().left;
            offsetY = event.clientY - img.getBoundingClientRect().top;
            img.style.cursor = "grabbing";
        });
    
        document.addEventListener("mousemove", (event) => {
            if (!isDragging) return;
    
            const rect = document.getElementById("character-block").getBoundingClientRect();
            img.style.left = `${event.clientX - rect.left - offsetX}px`;
            img.style.top = `${event.clientY - rect.top - offsetY}px`;
        });
    
        document.addEventListener("mouseup", (event) => {
            isDragging = false;
            img.style.cursor = "grab";
    
            // Kiểm tra xem quần áo có bị kéo vào thùng rác không
            const trashBin = document.getElementById("trash-bin").getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
    
            if (
                imgRect.right > trashBin.left &&
                imgRect.left < trashBin.right &&
                imgRect.bottom > trashBin.top &&
                imgRect.top < trashBin.bottom
            ) {
                img.remove(); // Xóa quần áo
            }
        });
    
        img.style.cursor = "grab"; // Đổi con trỏ chuột khi hover
    }

    let characterIndex = 0;
    const characters = ['cha/cha1.png', 'cha/cha2.png', 'cha/cha3.png'];
    function updateCharacterSlider() {
        document.getElementById('character-slider').innerHTML = `<img src="${characters[characterIndex]}" alt="Character">`;
    }
    function prevCharacter() { if (characterIndex > 0) { characterIndex--; updateCharacterSlider(); } }
    function nextCharacter() { if (characterIndex < characters.length - 1) { characterIndex++; updateCharacterSlider(); } }

    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const filterSelect = document.getElementById('filter');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Lỗi truy cập camera: ", err));

    function takePhoto() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.filter = filterSelect.value;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        const img = document.createElement("img");
        img.src = imageDataUrl;
        img.style.border = "3px solid #FF69B4";
        img.style.borderRadius = "10px";
        document.getElementById('camera-block').appendChild(img);
    }

    function savePhoto() {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'photo.png';
        link.click();
    }

    // khi tải trang web lên hiển thị danh mục shirt đầu tiên mà hong cần bấm vào nút
    document.addEventListener('DOMContentLoaded', () => {
        showItems('shirt');
    });