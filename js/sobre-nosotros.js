 // Carrusel del equipo: la tarjeta activa va al centro y las demas quedan detras 
        (function () {
            const escenario = document.getElementById('equipoEscenario');
            const tarjetas = [...escenario.querySelectorAll('.miembro')];
            const puntos = [...document.querySelectorAll('#equipoPuntos button')];
            const total = tarjetas.length;
            const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let actual = 0;
            let temporizador;

            function mostrar(indice) {
                actual = (indice + total) % total;
                tarjetas.forEach((tarjeta, k) => {
                    let o = k - actual;                      
                    if (o > total / 2) o -= total;           
                    if (o < -total / 2) o += total;
                    tarjeta.style.setProperty('--o', o);
                    tarjeta.style.setProperty('--a', Math.abs(o));
                    tarjeta.classList.toggle('activo', o === 0);
                    tarjeta.classList.toggle('oculta', Math.abs(o) > 2);
                    tarjeta.setAttribute('aria-hidden', o !== 0);
                    tarjeta.querySelectorAll('a').forEach(a => a.tabIndex = o === 0 ? 0 : -1);
                });
                puntos.forEach((punto, k) => {
                    punto.classList.toggle('activo', k === actual);
                    punto.setAttribute('aria-current', k === actual);
                });
            }

            function reiniciarAuto() {
                clearInterval(temporizador);
                if (!reducirMovimiento) temporizador = setInterval(() => mostrar(actual + 1), 6000);
            }
            const ir = (indice) => { mostrar(indice); reiniciarAuto(); };

            document.getElementById('equipoPrev').addEventListener('click', () => ir(actual - 1));
            document.getElementById('equipoNext').addEventListener('click', () => ir(actual + 1));
            puntos.forEach((punto, k) => punto.addEventListener('click', () => ir(k)));
            tarjetas.forEach((tarjeta, k) => tarjeta.addEventListener('click', () => {
                if (k !== actual) ir(k);                      // clic en una tarjeta de atrás la trae al centro
            }));

            // Teclado
            escenario.tabIndex = 0;
            escenario.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') ir(actual - 1);
                if (e.key === 'ArrowRight') ir(actual + 1);
            });

            // Deslizar con el dedo o el mouse
            let inicioX = null;
            escenario.addEventListener('pointerdown', (e) => { inicioX = e.clientX; });
            escenario.addEventListener('pointerup', (e) => {
                if (inicioX === null) return;
                const dx = e.clientX - inicioX;
                inicioX = null;
                if (Math.abs(dx) > 50) ir(actual + (dx < 0 ? 1 : -1));
            });

            // Pausar mientras el mouse está encima
            escenario.addEventListener('mouseenter', () => clearInterval(temporizador));
            escenario.addEventListener('mouseleave', reiniciarAuto);

            mostrar(0);
            reiniciarAuto();
        })();