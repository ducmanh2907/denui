// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');

    // ✅ Show page by id
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.classList.add('active');
    }

    // ✅ Handle nav clicks (SPA)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                e.preventDefault();

                // Switch page
                showPage(pageId);

                // Update nav active
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Auto close mobile menu
                if (window.innerWidth <= 768 && nav) {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // ✅ Set default page
    showPage('home');

    // ================= MENU FILTER =================
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (categoryButtons.length && menuItems.length) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function () {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const category = this.getAttribute('data-category');
                menuItems.forEach(item => {
                    item.style.display =
                        category === 'all' || item.getAttribute('data-category') === category
                            ? 'flex'
                            : 'none';
                });
            });
        });
    }

    // ================= BOOKING FORM =================
    function sendBookingEmail(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const emailBody = `
Thông tin đặt bàn:
Tên: ${data.name}
Email: ${data.email}
Số điện thoại: ${data.phone}
Ngày: ${data.date}
Giờ: ${data.time}
Số người: ${data.guests}
Ghi chú: ${data.message || 'Không có ghi chú'}
        `;

        const mailtoLink = `mailto:ducmanh29072003@gmail.com?subject=Đặt bàn từ ${encodeURIComponent(
            data.name
        )}&body=${encodeURIComponent(emailBody)}`;

        if (
            confirm(
                `Cảm ơn ${data.name} đã đặt bàn!\n\nHệ thống sẽ mở ứng dụng email để gửi xác nhận đến nhà hàng. Bạn có muốn tiếp tục?`
            )
        ) {
            window.location.href = mailtoLink;
            alert(
                'Vui lòng gửi email xác nhận để hoàn tất đặt bàn. Chúng tôi sẽ liên hệ với bạn sau khi nhận được email.'
            );
            form.reset();
        }
    }

    ['booking-form', 'booking-form-page'].forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                sendBookingEmail(this);
            });
        }
    });

    // ================= CONTACT FORM =================
    function sendContactEmail(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const emailBody = `
Thông tin liên hệ:
Tên: ${data.name}
Email: ${data.email}
Số điện thoại: ${data.phone}
Chủ đề: ${data.subject}
Nội dung: ${data.message}
        `;

        const mailtoLink = `mailto:ducmanh29072003@gmail.com?subject=Liên hệ từ ${encodeURIComponent(
            data.name
        )} - ${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;

        if (
            confirm(
                `Cảm ơn ${data.name} đã liên hệ với chúng tôi!\n\nHệ thống sẽ mở ứng dụng email để gửi tin nhắn đến nhà hàng. Bạn có muốn tiếp tục?`
            )
        ) {
            window.location.href = mailtoLink;
            alert('Vui lòng gửi email để hoàn tất liên hệ. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.');
            form.reset();
        }
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            sendContactEmail(this);
        });
    }

    // ================= MOBILE MENU =================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    if (mobileMenuBtn && nav) {
        if (window.innerWidth <= 768) nav.style.display = 'none';

        mobileMenuBtn.addEventListener('click', function () {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = 'var(--primary-color)';
                nav.style.padding = '20px';
            }
        });
    }

    // Responsive resize
    window.addEventListener('resize', function () {
        if (nav) {
            nav.style.display = window.innerWidth > 768 ? 'flex' : 'none';
        }
    });
});
