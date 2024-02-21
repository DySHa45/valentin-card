const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Очистить путь после отпускания кнопки мыши
}

function draw(event) {
    if (!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff0000';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Начать новый путь для плавного рисования
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function selectTemplate(imageUrl, backgroundClass) {
    document.getElementById('valentineCard').className = "background " + backgroundClass;
    document.getElementById('valentineImage').src = imageUrl;
    canvas.style.display = 'block'; // Показать холст при выборе шаблона
}

function addGreeting() {
    const greetingText = document.getElementById('greetingText').value;
    const valentineCard = document.querySelector('.valentine-card');
    const greetingParagraph = document.createElement('p');
    greetingParagraph.textContent = greetingText;
    valentineCard.appendChild(greetingParagraph);
}

function sendEmail() {
    const senderEmail = document.getElementById('senderEmail').value;
    const recipientEmail = document.getElementById('recipientEmail').value;
    const valentineContent = document.querySelector('.valentine-card').innerHTML;
    
    // Здесь вы можете написать код для отправки содержимого валентинки по электронной почте
    // Например, с использованием JavaScript API для отправки почты или отправкой данных на ваш сервер для обработки
    // Ниже приведен пример кода для отправки через JavaScript API, но для его работы требуется настройка и доступ к API отправки почты
    // Пример кода для отправки через JavaScript API:
    /*
    const emailData = {
        from: senderEmail,
        to: recipientEmail,
        subject: 'Валентинка',
        html: valentineContent
    };

    // Пример использования JavaScript API для отправки почты
    fetch('URL_API_SEND_MAIL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при отправке почты');
        }
        alert('Валентинка успешно отправлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке валентинки. Пожалуйста, попробуйте еще раз.');
    });
    */
}

function toggleFromField() {
    const fromLabel = document.getElementById('fromLabel');
    const fromInput = document.getElementById('from');
    const anonymousCheckbox = document.getElementById('anonymous');
    
    if (anonymousCheckbox.checked) {
        fromLabel.style.visibility = 'hidden';
        fromInput.style.visibility = 'hidden';
    } else {
        fromLabel.style.visibility = 'visible';
        fromInput.style.visibility = 'visible';
    }
}
