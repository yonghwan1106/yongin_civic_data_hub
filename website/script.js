// ============================================
// Google Sheets 연동 설정
// ============================================
// 아래 URL을 Google Apps Script 배포 URL로 교체하세요
// 설정 방법: google-sheets-setup.md 파일 참조
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx9I5YVGmR1xSHbXZ9yDk__vo0qNDVZe8Aqrl_42w3cdkw0gtrXpIS0Ln76zaCj9FJV/exec';

// 테스트 모드: true면 localStorage에 저장, false면 Google Sheets에 전송
const TEST_MODE = GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

if (TEST_MODE) {
    console.warn('⚠️ 테스트 모드: Google Sheets URL을 설정하세요. google-sheets-setup.md 참조');
}
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active')
            ? 'rotate(45deg) translate(5px, 5px)'
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active')
            ? 'rotate(-45deg) translate(7px, -6px)'
            : 'none';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Form handling
const joinForm = document.getElementById('joinForm');
const memberTypeRadios = document.querySelectorAll('input[name="memberType"]');
const businessSection = document.querySelector('.business-only');

// Show/hide business section based on member type
memberTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'business') {
            businessSection.style.display = 'block';
            // Make business fields required
            document.getElementById('businessNumber').required = true;
            document.getElementById('businessType').required = true;
        } else {
            businessSection.style.display = 'none';
            // Make business fields optional
            document.getElementById('businessNumber').required = false;
            document.getElementById('businessType').required = false;
        }
    });
});

// Form submission
joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(joinForm);
    const data = {
        memberType: formData.get('memberType'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        businessNumber: formData.get('businessNumber'),
        businessType: formData.get('businessType'),
        interests: formData.getAll('interests'),
        motivation: formData.get('motivation'),
        timestamp: new Date().toISOString()
    };

    // Validate
    if (!data.name || !data.email || !data.phone || !data.address) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
    }

    // Phone validation (Korean phone number format)
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        alert('올바른 전화번호를 입력해주세요. (예: 010-1234-5678)');
        return;
    }

    // Check agreement
    if (!formData.get('agree')) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return;
    }

    // Show loading state
    const submitButton = joinForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '제출 중...';
    submitButton.disabled = true;

    try {
        if (TEST_MODE) {
            // 테스트 모드: localStorage에 저장
            console.log('📝 테스트 모드: localStorage에 저장');
            let submissions = JSON.parse(localStorage.getItem('ycdh_submissions') || '[]');
            submissions.push(data);
            localStorage.setItem('ycdh_submissions', JSON.stringify(submissions));

            // Show success message
            showSuccessMessage();

            // Reset form
            joinForm.reset();
            businessSection.style.display = 'none';

            // Scroll to success message
            setTimeout(() => {
                const successMsg = document.querySelector('.success-message');
                if (successMsg) {
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);

        } else {
            // 실제 모드: Google Sheets에 전송
            console.log('📤 Google Sheets로 전송 중...');

            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script는 no-cors 모드 필요
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // no-cors 모드에서는 응답을 확인할 수 없으므로
            // 에러가 발생하지 않으면 성공으로 간주
            console.log('✅ Google Sheets로 전송 완료');

            // 백업으로 localStorage에도 저장
            let submissions = JSON.parse(localStorage.getItem('ycdh_submissions') || '[]');
            submissions.push(data);
            localStorage.setItem('ycdh_submissions', JSON.stringify(submissions));

            // Show success message
            showSuccessMessage();

            // Reset form
            joinForm.reset();
            businessSection.style.display = 'none';

            // Scroll to success message
            setTimeout(() => {
                const successMsg = document.querySelector('.success-message');
                if (successMsg) {
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }

    } catch (error) {
        console.error('❌ Error submitting form:', error);
        alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.\n\n에러 내용: ' + error.message);
    } finally {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Show success message
function showSuccessMessage() {
    // Remove existing success message if any
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Create and show new success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message show';
    successMsg.innerHTML = `
        <h3 style="margin-bottom: 0.5rem;">✅ 조합원 가입 신청이 완료되었습니다!</h3>
        <p style="margin: 0;">빠른 시일 내에 이메일로 연락드리겠습니다.</p>
    `;

    joinForm.appendChild(successMsg);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => successMsg.remove(), 500);
    }, 5000);
}

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.vision-card, .service-card, .member-card, .roadmap-item, .why-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Phone number auto-formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length >= 7) {
            value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
        }

        e.target.value = value;
    });
}

// Business number auto-formatting
const businessNumberInput = document.getElementById('businessNumber');
if (businessNumberInput) {
    businessNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        if (value.length >= 5) {
            value = value.replace(/(\d{3})(\d{2})(\d{0,5})/, '$1-$2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,2})/, '$1-$2');
        }

        e.target.value = value;
    });
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Console welcome message
console.log('%c용인 시민 데이터 허브 사회적협동조합', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c데이터로 함께 성장하는 지역 공동체', 'color: #6b7280; font-size: 14px;');
console.log('%c문의: contact@ycdh.or.kr', 'color: #6b7280; font-size: 12px;');
console.log('');
if (TEST_MODE) {
    console.log('%c⚠️ 테스트 모드 실행 중', 'color: #f59e0b; font-weight: bold;');
    console.log('%c가입 신청 데이터는 브라우저에 임시 저장됩니다.', 'color: #6b7280;');
    console.log('%cGoogle Sheets 연동: google-sheets-setup.md 참조', 'color: #6b7280;');
} else {
    console.log('%c✅ Google Sheets 연동 활성화', 'color: #10b981; font-weight: bold;');
    console.log('%c가입 신청 데이터는 Google Sheets에 자동 저장됩니다.', 'color: #6b7280;');
}
