window.onload = () => {
    // Fonction pour placer les vignettes au démarrage
    function placeVignettes() {
        const container = document.querySelector('#desktop');
        const vignettes = document.querySelectorAll('.icon');

        vignettes.forEach(vignette => {
            // Si c'est la vignette Invariant, la positionner en bas à droite
            if (vignette.classList.contains('Invariant')) {
                vignette.style.position = 'absolute';
                vignette.style.right = '50px';  // 50px du côté droit
                vignette.style.bottom = '35px'; // 35px du bas
            } else {
                // Pour les autres vignettes, les placer avec une position aléatoire
                const x = 50 + Math.random() * (container.offsetWidth - 150); // Position X
                const y = 35 + Math.random() * (container.offsetHeight - 150); // Position Y

                vignette.style.position = 'absolute';
                vignette.style.left = `${x}px`;
                vignette.style.top = `${y}px`;
            }
        });
    }

    // Ajuste le fond d'écran pour qu'il occupe toute la taille de l'écran sans dépasser
    const background = document.querySelector('#background'); // Assurez-vous d'avoir un élément d'arrière-plan avec l'id "background"
    background.style.width = '100%';
    background.style.height = '100vh';  // Prendre toute la hauteur de l'écran

    // Placer les vignettes
    placeVignettes();
};

// Suivi de la souris pour l'effet de survol
const icons = document.querySelectorAll('.icon');

icons.forEach(icon => {
    const hoverImage = icon.querySelector('.hover-image');

    // Lorsque la souris entre dans l'icône
    icon.addEventListener('mouseenter', () => {
        hoverImage.style.display = 'block';  // Affiche l'image de survol
    });

    // Lorsque la souris quitte l'icône
    icon.addEventListener('mouseleave', () => {
        hoverImage.style.display = 'none';  // Cache l'image de survol
    });

    // Suivi de la souris
    icon.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;  // Position horizontale de la souris
        const mouseY = e.clientY;  // Position verticale de la souris

        // Déplace l'image de survol en fonction de la position de la souris
        hoverImage.style.left = mouseX + 5 + 'px';  // Décalage de 5px à droite
        hoverImage.style.top = mouseY + 5 + 'px';  // Décalage de 5px vers le bas
    });
});

// Déplacement des vignettes avec une marge de 50px à gauche et droite, et 35px en haut et en bas
icons.forEach(icon => {
    icon.addEventListener('mousedown', (e) => {
        e.preventDefault();
        let startX = e.clientX;
        let startY = e.clientY;
        let iconX = icon.offsetLeft;
        let iconY = icon.offsetTop;

        function moveAt(e) {
            let newX = iconX + (e.clientX - startX);
            let newY = iconY + (e.clientY - startY);

            const container = document.querySelector('#desktop');
            const maxX = container.clientWidth - icon.clientWidth - 50;  // 50px de marge à droite
            const maxY = container.clientHeight - icon.clientHeight - 35;  // 35px de marge en bas

            // Limiter le mouvement des vignettes aux marges définies
            newX = Math.max(50, Math.min(newX, maxX));
            newY = Math.max(35, Math.min(newY, maxY)); // Limiter la marge à 35px en haut

            icon.style.left = `${newX}px`;
            icon.style.top = `${newY}px`;

            // Si une modale est ouverte, elle suit la vignette
            const modal = document.getElementById('modal');
            if (modal.style.display === 'block') {
                const iconRect = icon.getBoundingClientRect();
                let modalLeft = iconRect.right + 10;
                let modalTop = iconRect.bottom + 5; // La modale se place en dessous de la vignette

                // Mettre à jour la position de la modale
                modal.style.left = `${modalLeft}px`;
                modal.style.top = `${modalTop}px`;
            }
        }

        function stopDrag() {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', stopDrag);
        }

        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', stopDrag);
    });
});

// Ouvrir la fenêtre modale au double-clic
icons.forEach(icon => {
    const modal = document.getElementById('modal');
    const project = icon.getAttribute('data-project');
    const modalImages = document.getElementById('modal-images');
    const modalDescription = document.getElementById('modal-description');

    icon.addEventListener('dblclick', () => {
        modalImages.innerHTML = '';  // Supprime les anciennes images
        modalDescription.innerHTML = `<p>Description du projet ${project}</p>`;
        modalImages.innerHTML = `<img src="image-${project}-1.jpg" alt="Image 1"><img src="image-${project}-2.jpg" alt="Image 2">`;

        // Calculer la position de la vignette pour placer la modale
        const iconRect = icon.getBoundingClientRect();
        const modalWidth = modal.offsetWidth;
        const modalHeight = modal.offsetHeight;

        let modalLeft = iconRect.right + 10;
        let modalTop = iconRect.bottom + 5;

        // Vérifier si la modale dépasse la fenêtre
        if (modalLeft + modalWidth > window.innerWidth) {
            modalLeft = window.innerWidth - modalWidth - 10;  // Empêcher la modale de dépasser à droite
        }
        if (modalTop + modalHeight > window.innerHeight) {
            modalTop = window.innerHeight - modalHeight - 10;  // Empêcher la modale de dépasser en bas
        }

        // Appliquer la position à la fenêtre modale
        modal.style.left = `${modalLeft}px`;
        modal.style.top = `${modalTop}px`;

        modal.style.display = 'block';
    });
});

// Fermer la fenêtre modale
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Fermer la fenêtre modale en cliquant en dehors de la fenêtre
document.querySelector('#desktop').addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (!modal.contains(e.target) && !e.target.closest('.icon')) {
        modal.style.display = 'none';
    }
});

// On empêche que la modale se ferme si on clique à l'intérieur d'elle-même
document.getElementById('modal').addEventListener('click', (e) => {
    e.stopPropagation(); // Empêche la propagation de l'événement de clic à l'élément parent
});
