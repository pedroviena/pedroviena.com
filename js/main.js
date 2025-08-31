
// Loading Screen
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initializeAnimations();
            }, 1000);
        });

        // Throttled scroll event
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollProgress();
                    updateActiveNavLink();
                    updateNavbarScroll();
                    // A função de atualização do processo agora é baseada em observer, não em scroll direto
                    updateTimelineProgress(); 
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', requestTick);

        // Scroll Progress Indicator
        function updateScrollProgress() {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        function updateNavbarScroll() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Typing Effect
        function typeWriter(element, texts, speed = 150, backspaceSpeed = 50, delay = 2000) {
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentText = texts[textIndex];
                if (isDeleting) {
                    element.innerHTML = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    element.innerHTML = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, delay);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, speed);
                } else {
                    setTimeout(type, isDeleting ? backspaceSpeed : speed);
                }
            }
            type();
        }

        // Initialize Animations
        function initializeAnimations() {
            setTimeout(() => {
                const typingElement = document.getElementById('typingText');
                if (typingElement) {
                    const textsToType = ["de Software.", "Escaláveis.", "Inovadoras."];
                    typeWriter(typingElement, textsToType);
                }
            }, 1500);

            observeElements();
        }

        // Intersection Observer for animations
        function observeElements() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if(!entry.target.classList.contains('reveal-text')) {
                           observer.unobserve(entry.target);
                        }
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .reveal-text').forEach(el => {
                observer.observe(el);
            });
        }

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active Navigation Link
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // --- INÍCIO: LÓGICA DA NOVA SEÇÃO DE PROCESSO ---

        let typeTimeout; 
        let lastActiveProcessIndex = -1;

        function typeInTerminal(targetElement, contentData, onComplete) {
            clearTimeout(typeTimeout);
            targetElement.innerHTML = ''; 

            const iconClass = contentData.querySelector('.icon-data').textContent;
            const title = contentData.querySelector('h3').textContent;
            const description = contentData.querySelector('p').textContent;

            const command = `./etapa_0${contentData.id.split('-')[1]}.sh`;
            let fullText = `<span class="prompt">user@dev:~$</span> <span class="command">${command}</span>`;
            
            let i = 0;
            function typeWriter() {
                if (i < fullText.length) {
                    targetElement.innerHTML = fullText.substring(0, i + 1) + '<span class="typing-cursor-terminal"></span>';
                    i++;
                    typeTimeout = setTimeout(typeWriter, 25);
                } else {
                    targetElement.innerHTML = fullText; 
                    const outputContent = `
                        <div style="opacity:0; transform: translateY(20px); animation: fadeInTerminal 0.5s forwards 0.2s;">
                            <i class="${iconClass} output-icon"></i>
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    `;
                    targetElement.innerHTML += outputContent;
                    if(onComplete) onComplete();
                }
            }
            typeWriter();
        }

        const terminalKeyframes = `
        @keyframes fadeInTerminal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }`;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = terminalKeyframes;
        document.head.appendChild(styleSheet);

        function activateProcessStep(activeIndex) {
            const processSteps = document.querySelectorAll('.process-step');
            const processContents = document.querySelectorAll('.process-content-data .process-content');
            const terminalContentEl = document.getElementById('terminal-content');

            if (!processSteps[activeIndex]) return;
            
            processSteps.forEach(s => s.classList.remove('active'));
            processSteps[activeIndex].classList.add('active');

            const targetContent = processContents[activeIndex];
            if (targetContent && terminalContentEl) {
                typeInTerminal(terminalContentEl, targetContent);
            }
        }
        
        function initializeProcessObserver() {
            const processSteps = document.querySelectorAll('.process-step');
            if (processSteps.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '-45% 0px -45% 0px', 
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const stepElement = entry.target;
                        const allSteps = Array.from(processSteps);
                        const activeIndex = allSteps.indexOf(stepElement);
                        
                        if (activeIndex !== lastActiveProcessIndex) {
                            activateProcessStep(activeIndex);
                            lastActiveProcessIndex = activeIndex;
                        }
                    }
                });
            }, observerOptions);

            processSteps.forEach(step => {
                observer.observe(step);
            });
        }
        
        // --- FIM: LÓGICA DA NOVA SEÇÃO DE PROCESSO ---

        // Portfolio Filter
        function initializePortfolioFilter() {
            const grid = document.querySelector('.portfolio-grid');
            if (grid && typeof Isotope !== 'undefined') {
                const iso = new Isotope(grid, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows'
                });

                const filterButtons = document.querySelectorAll('.filter-buttons .btn');
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        
                        const filterValue = button.getAttribute('data-filter');
                        iso.arrange({ filter: filterValue });
                    });
                });
            }
        }
        
        // --- INÍCIO: LÓGICA DO MODAL DO PORTFÓLIO ---
        function initializePortfolioModal() {
            const portfolioModal = document.getElementById('portfolioModal');
            if (portfolioModal) {
                portfolioModal.addEventListener('show.bs.modal', event => {
                    const button = event.relatedTarget;
                    const title = button.getAttribute('data-title');
                    const imgSrc = button.getAttribute('data-img');
                    const tags = button.getAttribute('data-tags').split(',');
                    const description = button.getAttribute('data-description');
                    const githubLink = button.getAttribute('data-github');

                    const modalTitle = portfolioModal.querySelector('#modal-title');
                    const modalImg = portfolioModal.querySelector('#modal-img');
                    const modalTagsContainer = portfolioModal.querySelector('#modal-tags');
                    const modalDescription = portfolioModal.querySelector('#modal-description');
                    const modalGithubLink = portfolioModal.querySelector('#modal-github-link');

                    modalTitle.textContent = title;
                    modalImg.src = imgSrc;
                    modalImg.alt = title;
                    modalDescription.textContent = description;
                    modalGithubLink.href = githubLink;

                    modalTagsContainer.innerHTML = '';
                    tags.forEach(tagText => {
                        const tag = document.createElement('span');
                        tag.className = 'tag';
                        tag.textContent = tagText;
                        modalTagsContainer.appendChild(tag);
                    });
                });
            }
        }
        // --- FIM: LÓGICA DO MODAL DO PORTFÓLIO ---

        // Timeline Animation
        function initializeTimelineAnimation() {
            const timelineItems = document.querySelectorAll('.timeline-container');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            timelineItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Dynamic Timeline Fill and Card Activation
        function updateTimelineProgress() {
            const timeline = document.querySelector('.timeline');
            if (!timeline) return;

            const timelineRect = timeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (timelineRect.bottom < 0 || timelineRect.top > viewportHeight) {
                return;
            }

            const triggerPoint = viewportHeight * 0.5;
            const scrolledPast = triggerPoint - timelineRect.top;
            const totalHeight = timelineRect.height;
            let progress = (scrolledPast / totalHeight) * 100;
            progress = Math.max(0, Math.min(100, progress));

            timeline.style.setProperty('--timeline-progress', `${progress}%`);

            const timelineItems = document.querySelectorAll('.timeline-container');
            const timelineStart = timeline.offsetTop;
            const timelineScrollPos = window.scrollY + triggerPoint - timelineStart;

            timelineItems.forEach(item => {
                if (timelineScrollPos >= item.offsetTop) {
                    item.classList.add('is-active');
                } else {
                    item.classList.remove('is-active');
                }
            });
        }

        // Contact Form
        function initializeContactForm() {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;
                    
                    const phoneNumber = '5511973305517';
                    const whatsappMessage = `Olá! Meu nome é ${name}.

${message}

Meu e-mail para contato é: ${email}`;
                    const encodedMessage = encodeURIComponent(whatsappMessage);
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                    
                    window.open(whatsappUrl, '_blank');
                });
            }
        }
        
        // Feature Card Interaction
        function initializeFeatureCards() {
            const cards = document.querySelectorAll('.features-section .feature-card');
            let intervalId;

            function illuminateNextCard() {
                const currentIlluminated = document.querySelector('.features-section .feature-card.illuminated');
                let currentIndex = -1;
                
                if (currentIlluminated) {
                    currentIndex = Array.from(cards).indexOf(currentIlluminated);
                    currentIlluminated.classList.remove('illuminated');
                }

                const nextIndex = (currentIndex + 1) % cards.length;
                cards[nextIndex].classList.add('illuminated');
            }

            function startIllumination() {
                stopIllumination(); 
                if (cards.length > 0) {
                    illuminateNextCard(); 
                    intervalId = setInterval(illuminateNextCard, 2000);
                }
            }

            function stopIllumination() {
                clearInterval(intervalId);
                document.querySelectorAll('.features-section .feature-card.illuminated').forEach(c => c.classList.remove('illuminated'));
            }

            const featuresSection = document.querySelector('.features-section');
            if(featuresSection) {
                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            startIllumination();
                        } else {
                            stopIllumination();
                        }
                    });
                }, { threshold: 0.1 });
                sectionObserver.observe(featuresSection);
            }
        }
        
        // --- EFEITOS AVANÇADOS ---
        function initializeAdvancedEffects() {
            // Animação de Revelação de Texto para Títulos
            document.querySelectorAll('.section-title').forEach(title => {
                if (!title.closest('#portfolio')) {
                    title.classList.add('reveal-text');
                    const text = title.textContent;
                    const words = text.split(' ');
                    title.innerHTML = '';
                    words.forEach((word, index) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'word';
                        wordSpan.style.transitionDelay = `${index * 0.08}s`;
                        
                        const innerSpan = document.createElement('span');
                        innerSpan.textContent = word;
                        wordSpan.appendChild(innerSpan);
                        
                        title.appendChild(wordSpan);
                        if (index < words.length - 1) {
                            title.append(' ');
                        }
                    });
                }
            });
        }


        // Initialize all functions when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            initializePortfolioFilter();
            initializeTimelineAnimation();
            initializeContactForm();
            initializeFeatureCards();
            initializeAdvancedEffects();
            initializeProcessObserver(); 
            initializePortfolioModal();
            updateActiveNavLink();
        });
