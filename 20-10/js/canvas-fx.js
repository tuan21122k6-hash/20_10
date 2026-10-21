        /* ===== WOW PATCH 2: canvas fx (pháo hoa tim, trail, shockwave, confetti) ===== */
        (function () {
            const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
            const $ = s => document.querySelector(s);
            const rnd = (a, b) => a + Math.random() * (b - a)
                , pick = a => a[(Math.random() * a.length) | 0];
            const HUES = [335, 345, 45, 265, 160, 320];

            /* --- cực quang + vòng sóng ở màn mở quà (CSS thuần, chạy cả khi reduce) --- */
            const au = document.createElement('div');
            au.id = 'aurora';
            au.innerHTML = '<i></i><i></i><i></i>';
            const bgs = $('#bgs');
            bgs.parentNode.insertBefore(au, bgs.nextSibling);
            const start = $('#start')
                , bud = start.querySelector('.bud');
            if (bud) {
                const wrap = document.createElement('div');
                wrap.className = 'budwrap';
                bud.replaceWith(wrap);
                wrap.innerHTML = '<span class="sring"></span><span class="sring"></span><span class="sring"></span>';
                wrap.appendChild(bud);
            }
            if (reduce)
                return;

            /* --- phần tử overlay --- */
            const mk = (tag, id) => {
                const e = document.createElement(tag);
                e.id = id;
                document.body.appendChild(e);
                return e;
            }
                ;
            const cv = mk('canvas', 'fx2')
                , flashEl = mk('div', 'flash')
                , sweepEl = mk('div', 'sweep')
                , cglow = mk('div', 'cglow');
            /* Use OffscreenCanvas if supported for better performance */
            const g = (typeof OffscreenCanvas !== 'undefined' && cv.transferControlToOffscreen == null)
                ? cv.getContext('2d', { alpha: true, desynchronized: true })
                : cv.getContext('2d', { alpha: true, desynchronized: true });
            let W = 0
                , H = 0
                , D = 1;
            function rs() {
                D = Math.min(devicePixelRatio || 1, innerWidth <= 768 ? 1 : 2);
                W = innerWidth;
                H = innerHeight;
                cv.width = W * D;
                cv.height = H * D;
                g.setTransform(D, 0, 0, D, 0, 0);
            }
            rs();
            addEventListener('resize', rs);

            const P = []
                , R = []
                , RING = []
                , CF = [];
            const MAXP = innerWidth <= 768 ? 800 : 1600;

            function spark(x, y, vx, vy, h, life, s, grav, drag, tw) {
                if (P.length > MAXP)
                    return;
                P.push({
                    x,
                    y,
                    px: x,
                    py: y,
                    vx,
                    vy,
                    h,
                    l: life,
                    m: life,
                    s,
                    g: grav,
                    d: drag,
                    tw: !!tw
                });
            }
            function ring(x, y, h, max) {
                RING.push({
                    x,
                    y,
                    r: 6,
                    max: max || Math.min(W, H) * .55,
                    h: h == null ? 335 : h,
                    a: 1
                });
            }
            function confetti(x, y, n, rain) {
                for (let i = 0; i < n; i++) {
                    CF.push({
                        x: rain ? rnd(0, W) : x + rnd(-20, 20),
                        y: rain ? rnd(-H * .3, -10) : y,
                        vx: rain ? rnd(-1, 1) : rnd(-7, 7),
                        vy: rain ? rnd(1.5, 4) : -rnd(6, 15),
                        r: rnd(0, 6.28),
                        vr: rnd(-.25, .25),
                        w: rnd(5, 10),
                        h: rnd(8, 16),
                        c: `hsl(${pick(HUES) + rnd(-10, 10)},100%,${rnd(60, 80)}%)`,
                        ph: rnd(0, 6.28),
                        l: rnd(260, 420)
                    });
                }
            }
            function flash(a) {
                flashEl.animate([{
                    opacity: a
                }, {
                    opacity: 0
                }], {
                    duration: 900,
                    easing: 'ease-out'
                });
            }
            function sweep() {
                sweepEl.style.opacity = 1;
                sweepEl.animate([{
                    transform: 'translateX(-110%)',
                    opacity: 1
                }, {
                    transform: 'translateX(260%)',
                    opacity: 1
                }], {
                    duration: 950,
                    easing: 'cubic-bezier(.4,0,.2,1)'
                }).onfinish = () => {
                    sweepEl.style.opacity = 0;
                }
                    ;
            }

            /* --- nổ pháo hoa: tim hoặc tròn --- */
            function explode(x, y, h, shape) {
                const m = Math.min(W, H);
                ring(x, y, h, m * .28);
                if (shape === 'heart') {
                    const k = m * .00085 * rnd(.9, 1.15);
                    [[1, 86], [.55, 48]].forEach(([sc, n]) => {
                        for (let i = 0; i < n; i++) {
                            const t = i / n * 6.2832
                                , hx = 16 * Math.pow(Math.sin(t), 3)
                                , hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                            spark(x, y, hx * k * sc, hy * k * sc, h + rnd(-10, 10), rnd(60, 85), 2.4, .018, .94, 1);
                        }
                    }
                    );
                    for (let i = 0; i < 46; i++) {
                        const a = rnd(0, 6.28)
                            , s = rnd(.4, 3.2) * m * .0016;
                        spark(x, y, Math.cos(a) * s * 3, Math.sin(a) * s * 3, 45 + rnd(-10, 10), rnd(30, 60), 1.4, .03, .93, 1);
                    }
                } else {
                    const sp = m * .0105;
                    for (let i = 0; i < 110; i++) {
                        const a = rnd(0, 6.28)
                            , s = sp * rnd(.55, 1);
                        spark(x, y, Math.cos(a) * s, Math.sin(a) * s, h + (i % 2 ? rnd(20, 50) : 0), rnd(55, 85), 2.1, .035, .94, 1);
                    }
                    for (let i = 0; i < 30; i++) {
                        const a = i / 30 * 6.28
                            , s = sp * .5;
                        spark(x, y, Math.cos(a) * s, Math.sin(a) * s, 50, rnd(45, 60), 1.6, .03, .95, 1);
                    }
                }
            }
            function launch(tx, ty, shape, h, delay) {
                setTimeout(() => {
                    R.push({
                        x: tx + rnd(-60, 60),
                        y: H + 10,
                        tx,
                        ty,
                        h: h == null ? pick(HUES) : h,
                        shape: shape || (Math.random() < .5 ? 'heart' : 'ring')
                    });
                }
                    , delay || 0);
            }

            /* --- vòng lặp vẽ --- */
            let last = performance.now()
                , dirty = false;
            function loop(t) {
                const f = Math.min(3, (t - last) / 16.667);
                last = t;
                if (P.length || R.length || RING.length || CF.length) {
                    dirty = true;
                    g.globalCompositeOperation = 'source-over';
                    g.clearRect(0, 0, W, H);
                    /* confetti */
                    for (let i = CF.length - 1; i >= 0; i--) {
                        const c = CF[i];
                        c.ph += .08 * f;
                        c.vy = Math.min(5, c.vy + .14 * f);
                        c.vx *= Math.pow(.985, f);
                        c.x += (c.vx + Math.sin(c.ph) * 1.2) * f;
                        c.y += c.vy * f;
                        c.r += c.vr * f;
                        c.l -= f;
                        if (c.l <= 0 || c.y > H + 30) {
                            CF[i] = CF[CF.length - 1];
                            CF.pop();
                            continue;
                        }
                        g.save();
                        g.translate(c.x, c.y);
                        g.rotate(c.r);
                        g.scale(1, Math.abs(Math.cos(c.ph)));
                        g.globalAlpha = Math.min(1, c.l / 40);
                        g.fillStyle = c.c;
                        g.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
                        g.restore();
                    }
                    g.globalAlpha = 1;
                    g.globalCompositeOperation = 'lighter';
                    /* sóng xung kích */
                    for (let i = RING.length - 1; i >= 0; i--) {
                        const r = RING[i];
                        r.r += (r.max - r.r) * .07 * f + 2 * f;
                        r.a = Math.max(0, 1 - r.r / r.max);
                        if (r.a <= .02) {
                            RING[i] = RING[RING.length - 1];
                            RING.pop();
                            continue;
                        }
                        g.lineWidth = 1 + r.a * 5;
                        g.strokeStyle = `hsla(${r.h},100%,70%,${r.a * .8})`;
                        g.shadowColor = `hsl(${r.h},100%,60%)`;
                        g.shadowBlur = 18;
                        g.beginPath();
                        g.arc(r.x, r.y, r.r, 0, 6.2832);
                        g.stroke();
                    }
                    g.shadowBlur = 0;
                    /* tên lửa */
                    for (let i = R.length - 1; i >= 0; i--) {
                        const r = R[i]
                            , dx = r.tx - r.x
                            , dy = r.ty - r.y
                            , d = Math.hypot(dx, dy);
                        if (d < 14) {
                            explode(r.tx, r.ty, r.h, r.shape);
                            flash(.1);
                            R[i] = R[R.length - 1];
                            R.pop();
                            continue;
                        }
                        const s = Math.min(d, (8 + d * .035) * f);
                        r.x += dx / d * s;
                        r.y += dy / d * s;
                        spark(r.x, r.y, rnd(-.4, .4), rnd(.5, 1.4), rnd(35, 55), rnd(14, 24), 1.8, .02, .95);
                        g.fillStyle = 'rgba(255,240,220,.95)';
                        g.beginPath();
                        g.arc(r.x, r.y, 2.4, 0, 6.2832);
                        g.fill();
                    }
                    /* tia lửa */
                    g.lineCap = 'round';
                    for (let i = P.length - 1; i >= 0; i--) {
                        const p = P[i];
                        p.px = p.x;
                        p.py = p.y;
                        const dr = Math.pow(p.d, f);
                        p.vx *= dr;
                        p.vy = p.vy * dr + p.g * f;
                        p.x += p.vx * f;
                        p.y += p.vy * f;
                        p.l -= f;
                        if (p.l <= 0) {
                            P[i] = P[P.length - 1];
                            P.pop();
                            continue;
                        }
                        let a = Math.min(1, p.l / p.m * 1.7);
                        if (p.tw && p.l < p.m * .5 && Math.random() < .3)
                            a *= .35;
                        g.strokeStyle = `hsla(${p.h},100%,${62 + a * 18}%,${a})`;
                        g.lineWidth = p.s;
                        g.beginPath();
                        g.moveTo(p.px, p.py);
                        g.lineTo(p.x, p.y);
                        g.stroke();
                        if (p.s > 1.9) {
                            g.fillStyle = `hsla(${p.h},100%,78%,${a * .45})`;
                            g.beginPath();
                            g.arc(p.x, p.y, p.s * 1.9, 0, 6.2832);
                            g.fill();
                        }
                    }
                } else if (dirty) {
                    g.clearRect(0, 0, W, H);
                    dirty = false;
                }

                /* tilt mượt */
                tcx += (ttx - tcx) * .08 * f;
                tcy += (tty - tcy) * .08 * f;
                if (Math.abs(tcx - lx) > .01 || Math.abs(tcy - ly) > .01) {
                    lx = tcx;
                    ly = tcy;
                    const s = document.documentElement.style;
                    s.setProperty('--tx', tcx.toFixed(2));
                    s.setProperty('--ty', tcy.toFixed(2));
                }
                requestAnimationFrame(loop);
            }
            let ttx = 0
                , tty = 0
                , tcx = 0
                , tcy = 0
                , lx = 0
                , ly = 0;
            requestAnimationFrame(loop);

            /* --- trail bám theo tay + quầng sáng --- */
            let glowT = null
                , th = 0
                , lastX = -1
                , lastY = -1;
            function trail(x, y) {
                th = (th + 6) % 360;
                const hue = [335, 345, 45, 265][(th / 90) | 0] + rnd(-8, 8);
                const dx = lastX < 0 ? 0 : x - lastX
                    , dy = lastY < 0 ? 0 : y - lastY;
                const isMob = 'ontouchstart' in window;
                const n = isMob ? 1 : Math.min(4, 1 + Math.hypot(dx, dy) / 18 | 0);
                for (let i = 0; i < n; i++)
                    spark(x - dx * i / n + rnd(-3, 3), y - dy * i / n + rnd(-3, 3), rnd(-.7, .7) - dx * .02, rnd(-.7, .7) + .35, hue, rnd(26, 48), rnd(1.4, 3), .03, .95, 1);
                lastX = x;
                lastY = y;
            }
            function moveGlow(x, y) {
                cglow.style.transform = `translate3d(${x}px,${y}px,0)`;
                cglow.style.opacity = 1;
                clearTimeout(glowT);
                glowT = setTimeout(() => {
                    cglow.style.opacity = 0;
                    lastX = lastY = -1;
                }
                    , 900);
            }
            addEventListener('pointermove', e => {
                trail(e.clientX, e.clientY);
                moveGlow(e.clientX, e.clientY);
                tty = (e.clientX / W - .5) * 12;
                ttx = -(e.clientY / H - .5) * 9;
            }
                , {
                    passive: true
                });
            addEventListener('pointerup', e => {
                if (e.pointerType !== 'mouse') {
                    clearTimeout(glowT);
                    glowT = setTimeout(() => {
                        cglow.style.opacity = 0;
                        lastX = lastY = -1;
                    }
                        , 350);
                }
            }
                , {
                    passive: true
                });
            addEventListener('deviceorientation', e => {
                if (e.gamma == null || e.pointerType)
                    return;
                tty = Math.max(-25, Math.min(25, e.gamma)) * .4;
                ttx = -Math.max(-25, Math.min(25, (e.beta || 45) - 45)) * .3;
            }
                , {
                    passive: true
                });

            /* --- sự kiện chạm: nút / nền --- */
            const fin = $('#sc-final');
            const finalOn = () => fin && fin.classList.contains('on');
            addEventListener('pointerdown', e => {
                moveGlow(e.clientX, e.clientY);
                for (let i = 0; i < 16; i++) {
                    const a = rnd(0, 6.28)
                        , s = rnd(1, 5);
                    spark(e.clientX, e.clientY, Math.cos(a) * s, Math.sin(a) * s, pick(HUES), rnd(22, 42), rnd(1.5, 2.8), .05, .93, 1);
                }
                ring(e.clientX, e.clientY, pick(HUES), 90);
                if (finalOn() && !(e.target.closest && e.target.closest('button,input'))) {
                    R.push({
                        x: e.clientX,
                        y: H + 10,
                        tx: e.clientX,
                        ty: Math.max(H * .12, Math.min(e.clientY, H * .55)),
                        h: pick(HUES),
                        shape: Math.random() < .65 ? 'heart' : 'ring'
                    });
                }
            }
                , {
                    passive: true
                });

            /* --- mở quà: bùng nổ --- */
            let opened = false;
            start.addEventListener('click', () => {
                if (opened)
                    return;
                opened = true;
                flash(.95);
                sweep();
                const cx = W / 2
                    , cy = H * .4;
                [335, 45, 265].forEach((h, i) => setTimeout(() => ring(cx, cy, h, Math.max(W, H) * .8), i * 140));
                confetti(cx, H * .55, 150);
                launch(W * .25, H * .28, 'heart', 335, 200);
                launch(W * .75, H * .26, 'heart', 265, 500);
                launch(W * .5, H * .18, 'heart', 45, 850);
            }
            );

            /* --- mỗi lần đổi cảnh: quét sáng + sóng + pháo nhỏ --- */
            document.querySelectorAll('.scene').forEach(sc => {
                new MutationObserver(ms => {
                    ms.forEach(m => {
                        const was = (m.oldValue || '').split(/\s+/).includes('on')
                            , now = sc.classList.contains('on');
                        if (now && !was && opened) {
                            if (sc.id === 'sc-final')
                                return;
                            ring(W / 2, H * .4, pick(HUES), Math.max(W, H) * .6);
                            sweep();
                            flash(.12);
                            if (Math.random() < .6)
                                launch(rnd(W * .2, W * .8), rnd(H * .12, H * .3), 'ring');
                        }
                    }
                    );
                }
                ).observe(sc, {
                    attributes: true,
                    attributeFilter: ['class'],
                    attributeOldValue: true
                });
            }
            );

            /* --- trả lời câu hỏi: pháo trái tim giữa màn --- */
            const q1 = $('#q1');
            if (q1)
                q1.addEventListener('click', e => {
                    if (!e.target.closest('button'))
                        return;
                    flash(.35);
                    confetti(W / 2, H * .62, 90);
                    launch(W * .5, H * .3, 'heart', 335, 0);
                    launch(W * .25, H * .36, 'ring', 265, 280);
                    launch(W * .75, H * .36, 'ring', 45, 420);
                }
                );

            /* --- thẻ kết: đại tiệc --- */
            let finT = null;
            if (fin)
                new MutationObserver(ms => {
                    const on = finalOn();
                    if (on && !finT) {
                        flash(.7);
                        sweep();
                        ring(W / 2, H * .4, 335, Math.max(W, H) * .9);
                        confetti(0, 0, 170, true);
                        launch(W * .3, H * .25, 'heart', 335, 150);
                        launch(W * .7, H * .22, 'heart', 265, 450);
                        launch(W * .5, H * .14, 'heart', 45, 800);
                        finT = setInterval(() => {
                            if (document.hidden)
                                return;
                            launch(rnd(W * .12, W * .88), rnd(H * .1, H * .42), Math.random() < .55 ? 'heart' : 'ring');
                            if (Math.random() < .25)
                                confetti(0, 0, 26, true);
                        }
                            , 1100);
                    } else if (!on && finT) {
                        clearInterval(finT);
                        finT = null;
                    }
                }
                ).observe(fin, {
                    attributes: true,
                    attributeFilter: ['class']
                });
        }
        )();
