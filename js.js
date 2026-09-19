/* =========================================================
   SOUAD BOUAZIZI - PORTFOLIO
   SCRIPT.JS
   Gallery + Modal + Navbar + Smooth Scroll + Footer Year
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROJECT GALLERY
    ===================================================== */

    const projectItems = document.querySelectorAll(".project-item");

    const projectModal = document.getElementById("projectModal");
    const modalImage = document.getElementById("modalImage");
    const modalNumber = document.getElementById("modalNumber");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalProjectLink = document.getElementById("modalProjectLink");

    const modalClose = document.getElementById("modalClose");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");

    let currentProject = 0;


    /* =====================================================
       OPEN PROJECT
    ===================================================== */

    function openProject(index) {

        if (!projectItems.length || !projectModal) {
            return;
        }

        currentProject = index;

        const project = projectItems[currentProject];

        if (!project) {
            return;
        }


        /* IMAGE */

        const image = project.querySelector("img");

        if (image && modalImage) {

            modalImage.src = image.src;

            modalImage.alt =
                image.alt ||
                project.dataset.title ||
                "Projet graphique";
        }


        /* TITLE */

        const title =
            project.dataset.title ||
            "Projet graphique";

        if (modalTitle) {
            modalTitle.textContent = title;
        }


        /* DESCRIPTION */

        const description =
            project.dataset.description ||
            "";

        if (modalDescription) {
            modalDescription.textContent = description;
        }


        /* NUMBER */

        if (modalNumber) {

            modalNumber.textContent =
                String(currentProject + 1).padStart(2, "0") +
                " / " +
                String(projectItems.length).padStart(2, "0");
        }


        /* PROJECT LINK */

        const link =
            project.dataset.link || "";

        if (
            modalProjectLink &&
            link.trim() !== "" &&
            link !== "#"
        ) {

            modalProjectLink.href = link;

            modalProjectLink.style.display =
                "inline-flex";

        } else if (modalProjectLink) {

            modalProjectLink.removeAttribute("href");

            modalProjectLink.style.display =
                "none";
        }


        /* OPEN */

        projectModal.classList.add("active");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");


        /* FOCUS CLOSE BUTTON */

        if (modalClose) {
            modalClose.focus();
        }
    }


    /* =====================================================
       CLOSE PROJECT
    ===================================================== */

    function closeProject() {

        if (!projectModal) {
            return;
        }

        projectModal.classList.remove("active");

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }


    /* =====================================================
       NEXT PROJECT
    ===================================================== */

    function nextProject() {

        if (!projectItems.length) {
            return;
        }

        currentProject++;

        if (currentProject >= projectItems.length) {
            currentProject = 0;
        }

        openProject(currentProject);
    }


    /* =====================================================
       PREVIOUS PROJECT
    ===================================================== */

    function previousProject() {

        if (!projectItems.length) {
            return;
        }

        currentProject--;

        if (currentProject < 0) {
            currentProject =
                projectItems.length - 1;
        }

        openProject(currentProject);
    }


    /* =====================================================
       PROJECT CLICK
    ===================================================== */

    projectItems.forEach(function (project, index) {

        project.addEventListener(
            "click",
            function () {

                openProject(index);

            }
        );


        /* =================================================
           KEYBOARD ACCESSIBILITY
        ================================================= */

        project.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openProject(index);
                }

            }
        );

    });


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            function () {

                closeProject();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (modalPrev) {

        modalPrev.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                previousProject();

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (modalNext) {

        modalNext.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                nextProject();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    if (projectModal) {

        projectModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === projectModal
                ) {

                    closeProject();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD MODAL CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !projectModal ||
                !projectModal.classList.contains("active")
            ) {
                return;
            }


            /* ESC */

            if (event.key === "Escape") {

                event.preventDefault();

                closeProject();

            }


            /* NEXT */

            if (event.key === "ArrowRight") {

                event.preventDefault();

                nextProject();

            }


            /* PREVIOUS */

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                previousProject();

            }

        }
    );


    /* =====================================================
       AUTOMATIC CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

    const navbarLinks =
        document.querySelectorAll(
            ".navbar-nav .nav-link"
        );

    navbarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const navbarCollapse =
                    document.getElementById(
                        "mainNavbar"
                    );

                if (
                    navbarCollapse &&
                    navbarCollapse.classList.contains("show") &&
                    typeof bootstrap !== "undefined"
                ) {

                    let collapse =
                        bootstrap.Collapse.getInstance(
                            navbarCollapse
                        );

                    if (!collapse) {

                        collapse =
                            new bootstrap.Collapse(
                                navbarCollapse,
                                {
                                    toggle: false
                                }
                            );
                    }

                    collapse.hide();
                }

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =====================================================
       IMAGE ERROR CHECK
    ===================================================== */

    projectItems.forEach(function (project) {

        const image =
            project.querySelector("img");

        if (!image) {
            return;
        }

        image.addEventListener(
            "error",
            function () {

                console.warn(
                    "Image introuvable :",
                    image.src
                );

                project.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       HERO CAROUSEL
    ===================================================== */

    const heroCarousel =
        document.getElementById("heroCarousel");

    if (
        heroCarousel &&
        typeof bootstrap !== "undefined"
    ) {

        new bootstrap.Carousel(
            heroCarousel,
            {
                interval: 5000,
                ride: "carousel",
                pause: "hover",
                touch: true
            }
        );

    }


    /* =====================================================
       SERVICES CAROUSEL
    ===================================================== */

    const servicesCarousel =
        document.getElementById("servicesCarousel");

    if (
        servicesCarousel &&
        typeof bootstrap !== "undefined"
    ) {

        new bootstrap.Carousel(
            servicesCarousel,
            {
                interval: false,
                touch: true
            }
        );

    }


    /* =====================================================
       UPDATE ACTIVE NAVBAR LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    window.addEventListener(
        "scroll",
        function () {

            let currentSection = "";

            sections.forEach(function (section) {

                const sectionTop =
                    section.offsetTop - 120;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");
                }

            });


            navbarLinks.forEach(function (link) {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (
                    href === "#" + currentSection
                ) {

                    link.classList.add("active");

                }

            });

        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function () {

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        'Sending... <i class="bi bi-arrow-repeat"></i>';
                }

            }
        );

    }


});