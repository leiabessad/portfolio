// On va garder track de l'icône qui est en train d'être déplacée
let currentDrag = null;

// Fonction de déplacement des icônes (une par une)
const icons = document.querySelectorAll('.icon');

icons.forEach(icon => {
    icon.addEventListener('mousedown', (e) => {
        // On s'assure qu'on ne déplace qu'une seule vignette à la fois
        if (currentDrag) return;  // Si une vignette est déjà en mouvement, on ignore

        currentDrag = icon;  // Désigner la vignette qu'on est en train de déplacer

        // Calculer l'offset (l'écart entre la position de la souris et le coin de la vignette)
        let offsetX = e.clientX - icon.getBoundingClientRect().left;
        let offsetY = e.clientY - icon.getBoundingClientRect().top;

        // Modifier le style de l'image pour que l'image suive immédiatement
        const iconImage = icon.querySelector('img');
        iconImage.style.position = 'absolute';
        iconImage.style.zIndex = '999';  // S'assurer que l'image est devant tout le reste

        // Fonction pour déplacer la vignette avec la souris
        function moveAt(e) {
            const container = document.querySelector('#desktop');  // Conteneur principal pour limiter le déplacement
            let newX = e.clientX - offsetX;  // Nouvelle position X de la vignette
            let newY = e.clientY - offsetY;  // Nouvelle position Y de la vignette

            // On s'assure que la vignette ne dépasse pas les bords du conteneur
            const minX = 0;
            const maxX = container.offsetWidth - currentDrag.offsetWidth;
            const minY = 0;
            const maxY = container.offsetHeight - currentDrag.offsetHeight;

            // Limiter les déplacements pour que la vignette reste dans le conteneur
            newX = Math.min(Math.max(newX, minX), maxX);
            newY = Math.min(Math.max(newY, minY), maxY);

            // Appliquer la nouvelle position de la vignette et de l'image
            currentDrag.style.left = `${newX}px`;
            currentDrag.style.top = `${newY}px`;
            iconImage.style.left = `${newX}px`;
            iconImage.style.top = `${newY}px`;
        }

        // Fonction pour arrêter le déplacement lorsque la souris est relâchée
        function stopDrag() {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', stopDrag);

            // Restaurer l'image à son comportement normal (position statique)
            iconImage.style.position = '';
            iconImage.style.zIndex = ''; // Remettre le zIndex à la valeur initiale

            currentDrag = null; // On libère la vignette une fois le déplacement terminé
        }

        // Ajouter l'événement de déplacement lors du mouvement de la souris
        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', stopDrag);
    });
});

// Fonction de changement du curseur avec miniature de projet
icons.forEach(icon => {
    const project = icon.getAttribute('data-project');
    icon.addEventListener('mouseenter', () => {
        // Changer le curseur avec la miniature du projet
        document.body.style.cursor = `url('miniature-${project}.png'), auto`;
    });
    icon.addEventListener('mouseleave', () => {
        // Réinitialiser le curseur quand la souris quitte la vignette
        document.body.style.cursor = 'default';
    });
});

// Ouvrir la fenêtre modale au double-clic
icons.forEach(icon => {
    icon.addEventListener('dblclick', () => {
        const modal = document.getElementById('modal');
        const project = icon.getAttribute('data-project');
        const modalImages = document.getElementById('modal-images');
        const modalDescription = document.getElementById('modal-description');

        // Afficher les images du projet et la description dans la modale
        modalImages.innerHTML = `<img src="image-${project}-1.jpg"><img src="image-${project}-2.jpg">`;
        modalDescription.innerHTML = `<p>Description du projet ${project}</p>`;

        modal.style.display = 'block';  // Afficher la modale
    });
});

// Fermer la fenêtre modale
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Placer les vignettes à des positions aléatoires au chargement (optionnel)
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

// Charger la position aléatoire des vignettes au chargement de la page
window.onload = placeVignettes;
