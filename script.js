window.onload = () => {
    // Fonction pour placer les vignettes au démarrage
    function placeVignettes() {
        const container = document.querySelector('#desktop');
        const vignettes = document.querySelectorAll('.icon');

        const margin = 20; // Marge de 100px autour de l'écran

        vignettes.forEach(vignette => {
            // Calculer les positions de manière centrée avec les marges
            const vignetteWidth = vignette.offsetWidth;
            const vignetteHeight = vignette.offsetHeight;

            // Calculer les positions X et Y pour que la vignette soit dans la zone visible
            const maxX = container.offsetWidth - vignetteWidth - 2 * margin; // Limiter la position à la largeur de l'écran moins les marges
            const maxY = container.offsetHeight - vignetteHeight - 2 * margin; // Limiter la position à la hauteur de l'écran moins les marges

            // Calculer une position aléatoire centrée dans cette zone
            const x = margin + Math.random() * maxX;
            const y = margin + Math.random() * maxY;

            // Appliquer la position calculée à la vignette
            vignette.style.position = 'absolute';
            vignette.style.left = `${x}px`;
            vignette.style.top = `${y}px`;
            vignette.style.zIndex = '10';
        });
    }

    // Ajuster l'arrière-plan pour qu'il occupe toute la taille de l'écran sans dépasser
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

// Déplacement des vignettes avec une marge de 100px tout autour
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
            const maxX = container.clientWidth - icon.clientWidth - 20;  // 100px de marge à droite
            const maxY = container.clientHeight - icon.clientHeight - 20;  // 100px de marge en bas

            // Limiter le mouvement des vignettes aux marges définies
            newX = Math.max(20, Math.min(newX, maxX)); // Limiter la marge à 100px à gauche
            newY = Math.max(20, Math.min(newY, maxY)); // Limiter la marge à 100px en haut

            icon.style.left = `${newX}px`;
            icon.style.top = `${newY}px`;

            // Si une modale est ouverte, elle suit la vignette
            const modal = document.getElementById('modal');
            if (modal.style.display === 'block') {
                const iconRect = icon.getBoundingClientRect();
                let modalLeft = iconRect.left + 1;
                let modalTop = iconRect.bottom ; // La modale se place en dessous de la vignette

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

        let modalLeft = iconRect.right + 1;
        let modalTop = iconRect.bottom;

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





/// Récupération de la modale et des éléments nécessaires
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const modalImages = document.getElementById('modal-images');
const modalDescription = document.getElementById('modal-description');

// Fonction pour ouvrir la modale
icons.forEach(icon => {
    icon.addEventListener('dblclick', () => {
        const project = icon.getAttribute('data-project');  // Récupère l'ID du projet (ex: "project1")

        // Vider la modale avant de l'actualiser
        modalImages.innerHTML = '';
        modalDescription.innerHTML = '';

        // Ajouter des informations spécifiques au projet dans la modale
        if (project === "project1") {
            modalDescription.innerHTML = `
                <h2>Mon projet 1</h2>
                <p>Description du projet 1 Leyo</p>
            `;
            modalImages.innerHTML = `
                <img src="photo/hellmann1.png" alt="Project 1 Image 1">
                <img src="photo/hellmann2.jpg" alt="Project 1 Image 2">
            `;
        } else if (project === "project2") {
            modalDescription.innerHTML = `
                <h2>Ain't Your "Mayo"</h2>
                <p>Si Hellmann’s fait de la vraie mayonnaise, pourquoi continue-t-on de la qualifiée de « mayo » ?
Avec la campagne Ain’t Your “Mayo” la marque abandonne son étiquette classique afin de faire un rappel sur sa véritable nature, gage d'excellence culinaire.
Ceux qui ont osé parler sur X de la mayonnaise d'Hellmann’s en utilisant le terme "mayo" sont exposés sur un billboard à Times Square. Les internautes apparaissant dessus peuvent disparaître du billboard si ils s’excusent publiquement. Et pour chaque excuse, Hellmann’s enverra un pot « Apology Accepted » en édition limitée . Lorsque chaque personne affichée sur le billboard se sera excusée, l’étiquette d’origine reviendra en magasin. Dorénavant, tout le monde se souviendra qu'il faut appeler la Real Mayonnaise d'Hellmann's par son nom complet.
Parce qu'Hellmann's ne fait pas de la simple "mayo". Il fait de la vraie mayonnaise.</p>
            `;
            modalImages.innerHTML = `
                <img src="photo/hellmann1.png" alt="Project 1 Image 1">
            `;


            // Ajouter la vidéo si le projet est "Ain't Your Mayo"
            const modalVideos = document.createElement('div');
            modalVideos.classList.add('modal-videos');
            modalVideos.innerHTML = `
                <video src="video/hellmanncase.mp4" controls alt="Video of the project"></video>
            `;
            modalContent.appendChild(modalVideos);  // Ajouter la vidéo à la modale
        } else if (project === "project3") {
            modalDescription.innerHTML = `
                <h2>Steinkrebse</h2>
                <p>Description du projet Steinkrebse...</p>
            `;
            modalImages.innerHTML = `
                <img src="photo/project3-1.jpg" alt="Project 3 Image">
            `;
        }
        
        // Afficher la modale
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





// Empêcher l'ouverture de la modale au double-clic
corbeille.addEventListener('dblclick', (e) => {
    e.stopPropagation(); // Bloque l'événement pour la corbeille
});

function checkCollision(icon, corbeille) {
    const iconRect = icon.getBoundingClientRect();
    const corbeilleRect = corbeille.getBoundingClientRect();
    if (
        iconRect.right > corbeilleRect.left &&
        iconRect.left < corbeilleRect.right &&
        iconRect.bottom > corbeilleRect.top &&
        iconRect.top < corbeilleRect.bottom
    ) {
        moveCorbeille();
    }
}

function moveCorbeille() {
    const corbeille = document.getElementById('corbeille');
    const maxX = window.innerWidth - corbeille.offsetWidth - 50;
    const maxY = window.innerHeight - corbeille.offsetHeight - 50;
    corbeille.style.position = 'absolute';
    corbeille.style.left = `${Math.random() * maxX}px`;
    corbeille.style.top = `${Math.random() * maxY}px`;
}

document.getElementById('corbeille').addEventListener('dblclick', (e) => {
    e.stopPropagation();
});

