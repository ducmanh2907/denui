// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
           
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Show the specified page and hide others
    function showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => {
            page.classList.remove('active');
        });
       
        // Show the selected page
        document.getElementById(pageId).classList.add('active');
    }
    
    // Menu category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length > 0 && menuItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide menu items based on category
                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendBookingEmail(this);
        });
    }
    
    const bookingFormPage = document.getElementById('booking-form-page');
    if (bookingFormPage) {
        bookingFormPage.addEventListener('submit', function(e) {
            e.preventDefault();
            sendBookingEmail(this);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendContactEmail(this);
        });
    }
    
    // Function to send booking email
    function sendBookingEmail(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            message: formData.get('message') || 'Không có ghi chú'
        };
        
        // Tạo nội dung email
        const emailBody = `
Thông tin đặt bàn:
Tên: ${data.name}
Email: ${data.email}
Số điện thoại: ${data.phone}
Ngày: ${data.date}
Giờ: ${data.time}
Số người: ${data.guests}
Ghi chú: ${data.message}
        `;
        
        // Mở client email mặc định
        const mailtoLink = `mailto:ducmanh29072003@gmail.com?subject=Đặt bàn từ ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailBody)}`;
        
        // Thông báo cho người dùng
        const userConfirmed = confirm(`Cảm ơn ${data.name} đã đặt bàn!\n\nHệ thống sẽ mở ứng dụng email để gửi xác nhận đến nhà hàng. Bạn có muốn tiếp tục?`);
        
        if (userConfirmed) {
            window.location.href = mailtoLink;
            alert("Vui lòng gửi email xác nhận để hoàn tất đặt bàn. Chúng tôi sẽ liên hệ với bạn sau khi nhận được email.");
            form.reset();
        }
    }
    
    // Function to send contact email
    function sendContactEmail(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Tạo nội dung email liên hệ
        const emailBody = `
Thông tin liên hệ:
Tên: ${data.name}
Email: ${data.email}
Số điện thoại: ${data.phone}
Chủ đề: ${data.subject}
Nội dung: ${data.message}
        `;
        
        // Mở client email mặc định
        const mailtoLink = `mailto:ducmanh29072003@gmail.com?subject=Liên hệ từ ${encodeURIComponent(data.name)} - ${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Thông báo cho người dùng
        const userConfirmed = confirm(`Cảm ơn ${data.name} đã liên hệ với chúng tôi!\n\nHệ thống sẽ mở ứng dụng email để gửi tin nhắn đến nhà hàng. Bạn có muốn tiếp tục?`);
        
        if (userConfirmed) {
            window.location.href = mailtoLink;
            alert("Vui lòng gửi email để hoàn tất liên hệ. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.");
            form.reset();
        }
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && nav) {
        // Ẩn menu đi trên mobile khi trang tải xong
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
        }
        
        mobileMenuBtn.addEventListener('click', function() {
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
    
    // Responsive nav handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (nav) nav.style.display = 'flex';
        } else {
            if (nav) nav.style.display = 'none';
        }
    });
});