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
    ctx.beginPath(); 
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
    ctx.beginPath();  
    ctx.moveTo(x, y);
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

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function selectTemplate(imageUrl, backgroundClass) {
    document.getElementById('valentineCard').className = "background " + backgroundClass;
    document.getElementById('valentineImage').src = imageUrl;
    canvas.style.display = 'block'; 
}

function addGreeting() {
    const greetingText = document.getElementById('greetingText').value;
    const valentineCard = document.querySelector('.valentine-card');
    const greetingParagraph = document.createElement('p');
    greetingParagraph.textContent = greetingText;
    valentineCard.appendChild(greetingParagraph);
}

function sendEmail() {
    const senderEmail = document.getElementById('from').value;
    const recipientEmail = document.getElementById('to').value;
    const greetingText = document.getElementById('greetingText').value;
    const valentineContent = document.querySelector('.valentine-card').innerHTML;
    
    emailjs.send("service_0l01wsy","template_7bcyuv6", {
        from_email: senderEmail,
        to_email: recipientEmail,
        message: greetingText,
        valentine_content: valentineContent
    }).then(function(response) {
        alert('Email sent successfully!');
    }, function(error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email. Please try again.');
    });
}
