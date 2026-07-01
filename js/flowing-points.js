/**
 * 粒子流特效模块 — 移植自 Arknights-FlowingPoints
 * 用法：
 *   FlowingPoints.init({
 *       canvasId: 'canvas',
 *       imageSrc: 'images/mainword.png',
 *       particleSize: 3,
 *       ...
 *   });
 */
const FlowingPoints = (function () {

    'use strict';

    /* ============================================================
       默认配置
       ============================================================ */
    const DEFAULTS = {
        canvasId: 'canvas',
        imageSrc: 'images/mainword.png',
        particleSize: 3,
        particleMargin: 6,
        repulsionRadius: 105,
        repulsionForce: 1.8,
        friction: 0.15,
        returnSpeed: 0.01,
        samplingStep: 4,
        maxDisplayRatio: 0.8,
        maxImageSize: 3000,
        bgColor: '#ffffff',
        particleColor: '#000000'
    };

    /* ============================================================
       内部状态
       ============================================================ */
    const state = {
        cfg: null,
        particles: [],
        mouse: { x: -1000, y: -1000 },
        canvas: null,
        ctx: null,
        animId: null
    };

    /* ============================================================
       Particle 类
       ============================================================ */
    class Particle {
        constructor(x, y) {
            this.originalX = x;
            this.originalY = y;
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
        }
        update(mouse, cfg) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < cfg.repulsionRadius) {
                const angle = Math.atan2(dy, dx);
                const ratio = (cfg.repulsionRadius - dist) / cfg.repulsionRadius;
                const force = ratio * ratio * cfg.repulsionForce;
                this.vx += Math.cos(angle) * force;
                this.vy += Math.sin(angle) * force;
            }
            this.vx += (this.originalX - this.x) * cfg.returnSpeed;
            this.vy += (this.originalY - this.y) * cfg.returnSpeed;
            this.vx *= (1 - cfg.friction);
            this.vy *= (1 - cfg.friction);
            this.x += this.vx;
            this.y += this.vy;
        }
        draw(ctx, cfg) {
            ctx.fillStyle = cfg.particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, cfg.particleSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /* ============================================================
       图片 → Canvas 采样
       ============================================================ */
    function loadImage(src, cfg) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function () {
                try {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    const cw = window.innerWidth;
                    const ch = window.innerHeight;
                    const maxW = cw * cfg.maxDisplayRatio;
                    const maxH = ch * cfg.maxDisplayRatio;
                    let w = img.naturalWidth || img.width;
                    let h = img.naturalHeight || img.height;
                    if (w > cfg.maxImageSize || h > cfg.maxImageSize) {
                        const r = Math.min(cfg.maxImageSize / w, cfg.maxImageSize / h);
                        w *= r; h *= r;
                    }
                    if (w > maxW || h > maxH) {
                        const r = Math.min(maxW / w, maxH / h);
                        w *= r; h *= r;
                    }
                    tempCanvas.width = Math.round(w);
                    tempCanvas.height = Math.round(h);
                    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                    resolve(tempCanvas);
                } catch (err) { reject(err); }
            };
            img.onerror = function () { reject(new Error('图片加载失败: ' + src)); };
            img.src = src;
        });
    }

    /* ============================================================
       生成粒子
       ============================================================ */
    function generateParticles(imageCanvas, cfg) {
        const particles = [];
        const width = imageCanvas.width;
        const height = imageCanvas.height;
        const imgData = imageCanvas.getContext('2d').getImageData(0, 0, width, height);
        const cw = window.innerWidth;
        const ch = window.innerHeight;

        let dW = width, dH = height;
        const maxW = cw * cfg.maxDisplayRatio;
        const maxH = ch * cfg.maxDisplayRatio;
        if (dW > maxW || dH > maxH) {
            const r = Math.min(maxW / dW, maxH / dH);
            dW *= r; dH *= r;
        }
        const offsetX = (cw - dW) / 2;
        const offsetY = (ch - dH) / 2;

        for (let y = 0; y < height; y += cfg.samplingStep) {
            for (let x = 0; x < width; x += cfg.samplingStep) {
                const idx = (y * width + x) * 4;
                if (imgData.data[idx + 3] >= 128) {
                    particles.push(new Particle(
                        x * (dW / width) + offsetX + Math.random() * cfg.particleMargin,
                        y * (dH / height) + offsetY + Math.random() * cfg.particleMargin
                    ));
                }
            }
        }
        return particles;
    }

    /* ============================================================
       动画循环
       ============================================================ */
    function animate() {
        const { cfg, ctx, particles, mouse } = state;
        ctx.fillStyle = cfg.bgColor;
        ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
        const len = particles.length;
        for (let i = 0; i < len; i++) {
            particles[i].update(mouse, cfg);
            particles[i].draw(ctx, cfg);
        }
        state.animId = requestAnimationFrame(animate);
    }

    /* ============================================================
       Canvas 尺寸自适应
       ============================================================ */
    function resizeCanvas() {
        if (state.canvas) {
            state.canvas.width = window.innerWidth;
            state.canvas.height = window.innerHeight;
        }
    }

    /* ============================================================
       事件绑定
       ============================================================ */
    function bindEvents() {
        const canvas = state.canvas;
        canvas.addEventListener('mousemove', (e) => {
            state.mouse.x = e.clientX;
            state.mouse.y = e.clientY;
        });
        canvas.addEventListener('mouseleave', () => {
            state.mouse.x = -1000;
            state.mouse.y = -1000;
        });
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            state.mouse.x = t.clientX;
            state.mouse.y = t.clientY;
        }, { passive: false });
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            state.mouse.x = t.clientX;
            state.mouse.y = t.clientY;
        }, { passive: false });
        canvas.addEventListener('touchend', () => {
            state.mouse.x = -1000;
            state.mouse.y = -1000;
        });
        window.addEventListener('resize', resizeCanvas);
    }

    /* ============================================================
       Public API
       ============================================================ */
    return {

        /**
         * 初始化粒子特效
         * @param {Object} opts - 覆盖默认配置的选项
         */
        async init(opts) {
            if (state.animId) {
                cancelAnimationFrame(state.animId);
            }
            // 合并配置（移动端自动适配）
            state.cfg = Object.assign({}, DEFAULTS, opts || {});
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                state.cfg.repulsionRadius = 78;
                state.cfg.repulsionForce = 1.9;
                state.cfg.friction = 0.16;
            }
            state.particles = [];
            state.mouse = { x: -1000, y: -1000 };
            state.canvas = document.getElementById(state.cfg.canvasId);
            if (!state.canvas) {
                console.error('FlowingPoints: 未找到 canvas #' + state.cfg.canvasId);
                return;
            }
            state.ctx = state.canvas.getContext('2d');
            resizeCanvas();
            bindEvents();

            try {
                const imageCanvas = await loadImage(state.cfg.imageSrc, state.cfg);
                console.log('FlowingPoints: 图片加载成功', imageCanvas.width, 'x', imageCanvas.height);
                state.particles = generateParticles(imageCanvas, state.cfg);
            } catch (err) {
                console.error('FlowingPoints: 主路径加载失败', err.message);
                // 尝试备用路径
                const fallbackSrc = opts && opts.imageSrc
                    ? opts.imageSrc.replace(/^.*[\\/]/, '')  // 取文件名
                    : 'mainword.png';
                try {
                    const imageCanvas = await loadImage(fallbackSrc, state.cfg);
                    state.particles = generateParticles(imageCanvas, state.cfg);
                } catch (err2) {
                    console.error('FlowingPoints: 备用路径也失败', err2.message);
                }
            }

            animate();
            console.log('FlowingPoints: 已启动，粒子数', state.particles.length);
        },

        /**
         * 重新加载（更换图片后调用）
         */
        reload() {
            this.init(state.cfg);
        }
    };

})();
