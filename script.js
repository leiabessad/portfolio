// On va garder track de l'icône qui est en train d'être déplacée
let currentDrag = null;

// Fonction de déplacement des icônes (une par une)
const icons = document.querySelectorAll('.icon');

icons.forEach(icon => {
    icon.addEventListener('mousedown', (e) => {
        // On s'assure qu'on ne déplace qu'une seule vignette à la fois
        if (currentDrag) return;  // Si une vignette est déjà en mouvement, on ignore

        currentDrag = icon;  // Désigner la vignette qu'on est en train de déplacer
        let offsetX = e.clientX - icon.offsetLeft;
        let offsetY = e.clientY - icon.offsetTop;

        // Fonction pour déplacer la vignette avec la souris
        function moveAt(e) {
            currentDrag.style.left = e.clientX - offsetX + 'px';
            currentDrag.style.top = e.clientY - offsetY + 'px';
        }

        // Fonction pour arrêter le déplacement lorsque la souris est relâchée
        function stopDrag() {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', stopDrag);
            currentDrag = null; // On libère la vignette une fois le déplacement terminé
        }

        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', stopDrag);
    });
});

// Fonction de changement du curseur avec miniature de projet
icons.forEach(icon => {
    const project = icon.getAttribute('data-project');
    icon.addEventListener('mouseenter', () => {
        document.body.style.cursor = `url('miniature-${project}.png'), auto`;
    });
    icon.addEventListener('mouseleave', () => {
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

        // Afficher les images du projet et la description
        modalImages.innerHTML = `<img src="image-${project}-1.jpg"><img src="image-${project}-2.jpg">`;
        modalDescription.innerHTML = `<p>Description du projet ${project}</p>`;

        modal.style.display = 'block';
    });
});

// Fermer la fenêtre modale
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
