document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
        menu.classList.toggle("flex");
    });

    
    // Smooth Scrolling for Navbar Links
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjusted for fixed navbar height
                    behavior: "smooth"
                });
            }
        });
    });

        // Smooth Scrolling for "Apply Now" Button in Hero Section
        const applyNowButton = document.querySelector(".apply-btn");
        if (applyNowButton) {
            applyNowButton.addEventListener("click", function (e) {
                e.preventDefault();
                const targetSection = document.getElementById("lead-form");
    
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
    

    // Navbar Link Highlighting on Scroll
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove("text-blue-700", "font-bold");
                    });
                    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add("text-blue-700", "font-bold");
                    }
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach(section => observer.observe(section));

    // Back to Top Button Functionality
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form Validation (Assuming form with id 'leadForm')
    $(document).ready(function() {
        $("#leadForm").submit(function(event) {
            event.preventDefault();
            let valid = true;
            $(".error").remove();

            $("input, select").each(function() {
                let value = $(this).val().trim();
                if (value === "" || $(this).val() === "Select Country Preference") {
                    valid = false;
                    $(this).after('<span class="error text-red-600 text-sm">This field is required</span>');
                }
            });

            let email = $("#email").val().trim();
            let phone = $("#phone").val().trim();
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let phonePattern = /^\d{10}$/;

            if (!emailPattern.test(email)) {
                valid = false;
                $("#email").after('<span class="error text-red-600 text-sm">Enter a valid email</span>');
            }

            if (!phonePattern.test(phone)) {
                valid = false;
                $("#phone").after('<span class="error text-red-600 text-sm">Enter a valid 10-digit phone number</span>');
            }

            if (valid) {
                Swal.fire({
                    title: "Success!",
                    text: "Form submitted successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    $("#leadForm")[0].reset();
                });
            }
        });

        $("input, select").on("input change", function() {
            $(this).next(".error").remove();
        });
    });
});
