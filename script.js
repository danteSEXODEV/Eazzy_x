function login() {
    const discordUser = document.getElementById('discord-user').value;
    const webhookURL = "https://discord.com/api/webhooks/1461183451091697848/hGPP3Vq4nKnW_brrDSEA3V6P8NMdZeuRkYXPaYKUfv-pzQC3iQ9ePo7FweE1eHj5zPiP";

    if (discordUser.trim() === "") {
        alert("Por favor ingresa tu usuario");
        return;
    }

    // Datos para enviar al Webhook
    const data = {
        content: `🚀 **Nuevo Login Detectado**\n👤 Usuario: \`${discordUser}\`\n🌐 Estado: Accedió a la tienda`
    };

    // Enviar al Webhook de Discord
    fetch(webhookURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Ocultar login y mostrar tienda con animación
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('main-content').style.animation = 'fadeIn 1s ease';
    })
    .catch(err => {
        console.error("Error al enviar al webhook:", err);
        alert("Error de conexión. Intenta de nuevo.");
    });
<script>
    // 1. VARIABLE DE SONIDO MEJORADA
    const cashSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2012/2012-preview.mp3');
    cashSound.load(); // Precarga el audio

    // MATRIX BG
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const letters = "0101EAZZYX"; const fontSize = 16;
    const columns = canvas.width / fontSize; const drops = Array(Math.floor(columns)).fill(1);
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#300"; ctx.font = fontSize + "px Orbitron";
        drops.forEach((y, i) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    setInterval(drawMatrix, 50);

    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    let userActual = "";
    let productoSeleccionado = "";
    let precioSeleccionado = "";

    const fakeNames = ["Ghost_FF", "Rex_Modz", "Sniper_V", "Toxico_99", "Shadow_Elite", "Dante_Dev", "Killer_Hax"];
    const fakeItems = ["BYPASS V3", "ELITE PANEL", "LICENSE KEY"];

    function triggerPopup() {
        const popup = document.getElementById('sale-popup');
        const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        const item = fakeItems[Math.floor(Math.random() * fakeItems.length)];
        document.getElementById('popup-text').innerHTML = `El usuario <b style="color:white">${name}</b> ha adquirido <b style="color:red">${item}</b> correctamente.`;
        popup.classList.add('popup-active');
        setTimeout(() => { popup.classList.remove('popup-active'); }, 5000);
    }

    function updateStock() {
        const s1 = document.getElementById('stock-1');
        const s2 = document.getElementById('stock-2');
        if(parseInt(s1.innerText) > 3) s1.innerText = parseInt(s1.innerText) - (Math.random() > 0.7 ? 1 : 0);
        if(parseInt(s2.innerText) > 1) s2.innerText = parseInt(s2.innerText) - (Math.random() > 0.85 ? 1 : 0);
    }

    function loadSavedLogs() {
        const logs = JSON.parse(localStorage.getItem('ventas_eazzy')) || [];
        const container = document.getElementById('log-container');
        container.innerHTML = ""; 
        logs.forEach(log => renderEntry(log.user, log.prod, log.time));
        container.scrollTop = container.scrollHeight;
    }

    function renderEntry(user, prod, time) {
        const container = document.getElementById('log-container');
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.innerHTML = `<span>[CONFIRMED] <b style="color:white">${user}</b> - ${prod}</span> <span>${time}</span>`;
        container.appendChild(div);
    }

    function registerAndAction(type) {
        // REPRODUCIR SONIDO (Ahora sí funcionará porque el usuario ya interactuó)
        cashSound.currentTime = 0; // Reinicia el sonido por si se pulsa rápido
        cashSound.play().catch(e => console.log("Error de audio:", e));

        const time = new Date().toLocaleTimeString();
        const logs = JSON.parse(localStorage.getItem('ventas_eazzy')) || [];
        logs.push({user: userActual, prod: productoSeleccionado, time: time});
        localStorage.setItem('ventas_eazzy', JSON.stringify(logs));
        renderEntry(userActual, productoSeleccionado, time);
        
        // NOTIFICACIÓN A DISCORD
        fetch("https://discord.com/api/webhooks/1461183451091697848/hGPP3Vq4nKnW_brrDSEA3V6P8NMdZeuRkYXPaYKUfv-pzQC3iQ9ePo7FweE1eHj5zPiP", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                embeds: [{
                    title: "💰 ¡INTENCIÓN DE COMPRA!",
                    color: 16711680,
                    fields: [
                        { name: "👤 Usuario", value: `\`${userActual}\``, inline: true },
                        { name: "🛒 Producto", value: `\`${productoSeleccionado}\``, inline: true },
                        { name: "💳 Método", value: `\`${type}\``, inline: true }
                    ],
                    footer: { text: "EAZZY X SYSTEM" },
                    timestamp: new Date()
                }]
            })
        });

        if(type === 'MP') {
            navigator.clipboard.writeText("dante1.emiliano.mp");
            alert("ALIAS COPIADO.");
            window.open("https://www.mercadopago.com.ar/", "_blank");
        } else if(type === 'PP') {
            window.open("https://paypal.me/tu_cuenta", "_blank");
        } else if(type === 'WA') {
            const msg = `Hola! Soy ${userActual}, quiero comprar ${productoSeleccionado} ($${precioSeleccionado}).`;
            window.open(`https://wa.me/541168858458?text=${encodeURIComponent(msg)}`, "_blank");
        }
        closeModal();
    }

    function initApp() {
        userActual = document.getElementById('discord-name').value;
        if(!userActual) return alert("INGRESE IDENTIDAD");

        // IMPORTANTE: Al hacer clic aquí, el navegador ya permite sonidos.
        cashSound.play().then(() => {
            cashSound.pause(); // Sonido "activado" silenciosamente para después
        });

        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('top-bar').style.display = 'flex';
        document.getElementById('op-name').innerText = userActual.toUpperCase();
        loadSavedLogs();
        setInterval(triggerPopup, 35000);
        setInterval(updateStock, 20000);
    }

    function openModal(prod, price) {
        productoSeleccionado = prod;
        precioSeleccionado = price;
        document.getElementById('modal-title').innerText = prod;
        document.getElementById('pay-modal').style.display = 'flex';
    }

    function closeModal() { document.getElementById('pay-modal').style.display = 'none'; }

    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);
</script>