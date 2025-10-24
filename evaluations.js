// Evaluations management system
let evaluations = {
    pending: [],
    reviewing: [],
    completed: []
};

let scheduledEvaluations = [];

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadEvaluations();
    loadScheduledEvaluations();
    updateCounts();
    renderEvaluations();
    renderScheduledEvaluations();
});

// Add evaluation to a specific category
function addEvaluation(category) {
    const name = prompt(`Ingrese el nombre de la evaluación para ${category}:`);
    if (name) {
        evaluations[category].push({
            name: name,
            dateAdded: new Date().toLocaleDateString()
        });
        saveEvaluations();
        updateCounts();
        renderEvaluations();
    }
}

// Remove evaluation from a category
function removeEvaluation(category, index) {
    if (confirm('¿Está seguro de que desea eliminar esta evaluación?')) {
        evaluations[category].splice(index, 1);
        saveEvaluations();
        updateCounts();
        renderEvaluations();
    }
}

// Update evaluation counts
function updateCounts() {
    document.getElementById('pending-count').textContent = evaluations.pending.length;
    document.getElementById('reviewing-count').textContent = evaluations.reviewing.length;
    document.getElementById('completed-count').textContent = evaluations.completed.length;
}

// Render evaluations in the UI
function renderEvaluations() {
    renderEvaluationList('pending-list', evaluations.pending, 'pending');
    renderEvaluationList('reviewing-list', evaluations.reviewing, 'reviewing');
    renderEvaluationList('completed-list', evaluations.completed, 'completed');
}

// Render a specific evaluation list
function renderEvaluationList(listId, evaluationArray, category) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';

    evaluationArray.forEach((evaluation, index) => {
        const li = document.createElement('li');
        li.className = 'evaluation-item';
        li.innerHTML = `
            <span class="evaluation-name">${evaluation.name}</span>
            <span class="evaluation-date">Agregado: ${evaluation.dateAdded}</span>
            <button class="btn-remove" onclick="removeEvaluation('${category}', ${index})">Eliminar</button>
        `;
        listElement.appendChild(li);
    });
}

// Handle scheduling form submission
document.getElementById('schedule-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('eval-name').value;
    const date = document.getElementById('eval-date').value;
    const subject = document.getElementById('eval-subject').value;
    const className = document.getElementById('eval-class').value;

    const evaluation = {
        name: name,
        date: date,
        subject: subject,
        class: className,
        scheduledDate: new Date().toLocaleDateString()
    };

    scheduledEvaluations.push(evaluation);
    saveScheduledEvaluations();
    renderScheduledEvaluations();

    // Reset form
    this.reset();
});

// Render scheduled evaluations
function renderScheduledEvaluations() {
    const listElement = document.getElementById('scheduled-list');
    listElement.innerHTML = '';

    scheduledEvaluations.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach((evaluation, index) => {
        const li = document.createElement('li');
        li.className = 'scheduled-item';
        li.innerHTML = `
            <div class="scheduled-info">
                <strong>${evaluation.name}</strong> - ${evaluation.subject} (${evaluation.class})
                <br>
                <small>Fecha de entrega: ${new Date(evaluation.date).toLocaleDateString()}</small>
            </div>
            <button class="btn-remove" onclick="removeScheduledEvaluation(${index})">Eliminar</button>
        `;
        listElement.appendChild(li);
    });
}

// Remove scheduled evaluation
function removeScheduledEvaluation(index) {
    if (confirm('¿Está seguro de que desea eliminar esta evaluación programada?')) {
        scheduledEvaluations.splice(index, 1);
        saveScheduledEvaluations();
        renderScheduledEvaluations();
    }
}

// Save evaluations to localStorage
function saveEvaluations() {
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
}

// Load evaluations from localStorage
function loadEvaluations() {
    const saved = localStorage.getItem('evaluations');
    if (saved) {
        evaluations = JSON.parse(saved);
    }
}

// Save scheduled evaluations to localStorage
function saveScheduledEvaluations() {
    localStorage.setItem('scheduledEvaluations', JSON.stringify(scheduledEvaluations));
}

// Load scheduled evaluations from localStorage
function loadScheduledEvaluations() {
    const saved = localStorage.getItem('scheduledEvaluations');
    if (saved) {
        scheduledEvaluations = JSON.parse(saved);
    }
}

// Emergency functions
function showEmergencyModal() {
    document.getElementById('emergency-modal').classList.add('show');
}

function hideEmergencyModal() {
    document.getElementById('emergency-modal').classList.remove('show');
}

function callEmergency() {
    alert('Llamando a emergencias...');
    // In a real application, this would initiate a phone call
}
