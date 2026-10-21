        /* ===== PATCH: hiệu ứng chạm + nút dễ ấn ===== */
        (function () {
            const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
            const G = ['✿', '♡', '✦', '❀', '✧', '♥', '✺']
                , C = ['#ff7ab8', '#ffd98a', '#a99bff', '#7dffd0', '#ffffff', '#ff9ec7'];
            const rnd = (a, b) => a + Math.random() * (b - a)
                , pick = a => a[(Math.random() * a.length) | 0];

            function burst(x, y, n, spread) {
                if (reduce)
                    return;
                for (let i = 0; i < n; i++) {
                    const s = document.createElement('span');
                    s.className = 'fxp';
                    s.textContent = pick(G);
                    s.style.left = x + 'px';
                    s.style.top = y + 'px';
                    s.style.color = pick(C);
                    s.style.fontSize = rnd(11, 26) + 'px';
                    document.body.appendChild(s);
                    const a = rnd(0, Math.PI * 2)
                        , d = rnd(spread * .35, spread)
                        , dx = Math.cos(a) * d
                        , dy = Math.sin(a) * d - rnd(10, 40)
                        , rot = rnd(-200, 200);
                    const an = s.animate([{
                        transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)',
                        opacity: 1
                    }, {
                        transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${rot * .6}deg)`,
                        opacity: 1,
                        offset: .55
                    }, {
                        transform: `translate(calc(-50% + ${dx * 1.1}px),calc(-50% + ${dy + 60}px)) scale(.3) rotate(${rot}deg)`,
                        opacity: 0
                    }], {
                        duration: rnd(800, 1400),
                        easing: 'cubic-bezier(.2,.8,.3,1)'
                    });
                    an.onfinish = () => s.remove();
                }
            }
            function ring(x, y) {
                if (reduce)
                    return;
                const r = document.createElement('div');
                r.className = 'tapring';
                r.style.left = x + 'px';
                r.style.top = y + 'px';
                document.body.appendChild(r);
                setTimeout(() => r.remove(), 750);
            }
            function ripple(btn, e) {
                const b = btn.getBoundingClientRect()
                    , s = Math.max(b.width, b.height) * 2.4;
                const r = document.createElement('span');
                r.className = 'rip';
                r.style.cssText = `left:${e.clientX - b.left}px;top:${e.clientY - b.top}px;width:${s}px;height:${s}px`;
                btn.appendChild(r);
                setTimeout(() => r.remove(), 700);
            }
            function vibrate(ms) {
                try {
                    navigator.vibrate && navigator.vibrate(ms);
                } catch (_) { }
            }

            const startEl = document.getElementById('start');
            const isStarted = () => startEl.classList.contains('gone');

            /* pointerdown: phản hồi NGAY khi chạm (không chờ nhả tay) */
            document.addEventListener('pointerdown', e => {
                const btn = e.target.closest && e.target.closest('button');
                if (btn) {
                    ripple(btn, e);
                    const b = btn.getBoundingClientRect();
                    burst(b.left + b.width / 2, b.top + b.height / 2, btn.closest('.qbtns') ? 22 : 12, btn.closest('.qbtns') ? 130 : 80);
                    ring(e.clientX, e.clientY);
                    vibrate(14);
                    return;
                }
                if (e.target.closest && e.target.closest('input'))
                    return;
                if (!isStarted()) {
                    burst(e.clientX, e.clientY, 26, 170);
                    ring(e.clientX, e.clientY);
                    vibrate(20);
                    return;
                }
                burst(e.clientX, e.clientY, 6, 60);
                ring(e.clientX, e.clientY);
            }
                , {
                    passive: true
                });

            /* Space/Enter trên nút phải bấm được nút, không bị nhảy cảnh */
            document.addEventListener('keydown', e => {
                if (e.target && e.target.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter'))
                    e.stopPropagation();
            }
                , true);

            /* nút "yes/no": nổ pháo hoa nhỏ ở giữa màn khi chọn xong */
            const q1 = document.getElementById('q1');
            if (q1)
                q1.addEventListener('click', e => {
                    if (!e.target.closest('button'))
                        return;
                    const w = innerWidth
                        , h = innerHeight;
                    setTimeout(() => burst(w / 2, h * .4, 34, Math.min(w, h) * .45), 120);
                    vibrate([18, 40, 18]);
                }
                );

            /* thẻ kết: mưa tim nhẹ khi hiện ra */
            const fin = document.getElementById('sc-final');
            if (fin)
                new MutationObserver(() => {
                    if (fin.classList.contains('on')) {
                        let k = 0;
                        const t = setInterval(() => {
                            burst(rnd(innerWidth * .15, innerWidth * .85), rnd(innerHeight * .15, innerHeight * .45), 5, 90);
                            if (++k > 6)
                                clearInterval(t);
                        }
                            , 320);
                    }
                }
                ).observe(fin, {
                    attributes: true,
                    attributeFilter: ['class']
                });
        }
        )();
