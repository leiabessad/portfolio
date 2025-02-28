// Changer le curseur en fonction de l'icône survolée
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
        hoverImage.style.left = mouseX + 10 + 'px';  // Décalage de 10px
        hoverImage.style.top = mouseY + 10 + 'px';  // Décalage de 10px
    });
});


// Déplacement des vignettes
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
            const maxX = container.clientWidth - icon.clientWidth;
            const maxY = container.clientHeight - icon.clientHeight;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            icon.style.left = `${newX}px`;
            icon.style.top = `${newY}px`;
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
    icon.addEventListener('dblclick', () => {
        const modal = document.getElementById('modal');
        const project = icon.getAttribute('data-project');
        const modalImages = document.getElementById('modal-images');
        const modalDescription = document.getElementById('modal-description');

        // Vider les anciennes images de la modale
        modalImages.innerHTML = '';  // Supprime les anciennes images

        // Ajouter les images du projet dans la modale
        modalImages.innerHTML = `<img src="image-${project}-1.jpg" alt="Image 1"><img src="image-${project}-2.jpg" alt="Image 2">`;

        // Ajouter la description du projet
        modalDescription.innerHTML = `<p>Description du projet ${project}</p>`;

        // Calculer la position de la vignette pour placer la modale à côté
        const iconRect = icon.getBoundingClientRect(); // Récupère la position de la vignette
        const modalWidth = modal.offsetWidth;
        const modalHeight = modal.offsetHeight;

        let modalLeft = iconRect.right + 10; // Placer la modale à droite de la vignette
        let modalTop = iconRect.top;

        // Ajuster pour s'assurer que la modale ne dépasse pas la fenêtre
        if (modalLeft + modalWidth > window.innerWidth) {
            modalLeft = iconRect.left - modalWidth - 10; // Si elle dépasse, on la place à gauche
        }

        if (modalTop + modalHeight > window.innerHeight) {
            modalTop = window.innerHeight - modalHeight - 10; // Si elle dépasse en bas, on la place en haut
        }

        // Appliquer la position à la fenêtre modale
        modal.style.left = `${modalLeft}px`;
        modal.style.top = `${modalTop}px`;

        // Afficher la fenêtre modale
        modal.style.display = 'block';
    });
});

// Fermer la fenêtre modale
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Fermer la fenêtre modale en cliquant en dehors de la fenêtre
document.querySelector('#desktop').addEventListener('dblclick', (e) => {
    const modal = document.getElementById('modal');
    if (!modal.contains(e.target) && !e.target.closest('.icon')) {
        modal.style.display = 'none';
    }
});

// Placer les vignettes à des positions aléatoires
function placeVignettes() {
    const container = document.querySelector('#desktop');
    const vignettes = document.querySelectorAll('.icon');

    vignettes.forEach(vignette => {
        const x = Math.random() * (container.offsetWidth - vignette.offsetWidth);
        const y = Math.random() * (container.offsetHeight - vignette.offsetHeight);

        vignette.style.position = 'absolute';
        vignette.style.left = `${x}px`;
        vignette.style.top = `${y}px`;
    });
}

window.onload = placeVignettes;
