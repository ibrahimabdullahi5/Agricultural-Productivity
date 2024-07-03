function getData(fertilizer){
    const row = document.querySelector('#card');
    const div = document.createElement('div');
    div.classList.add('col-3');
    div.innerHTML = `
        <div class="card" data-id="${fertilizer.id}">
            <img src="${fertilizer.image}" class="card-img-top" alt="image">
            <div class="card-body">
                <h5 class="card-title">${fertilizer.name}</h5>
                <p class="card-text">${fertilizer.description}.</p>
                <button type="button" class="btn btn-primary delete-button">Delete</button>
            </div>
        </div>
    `;
    row.appendChild(div);
    div.querySelector(".delete-button").addEventListener("click", function(){
        deleteData(fertilizer.id);
    });
}

function deleteData(id){
    fetch(`http://localhost:3000/fertilizers/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
            // Remove the item from the DOM
            document.querySelector(`.card[data-id="${id}"]`).remove();
        }
    })
    .catch(error => console.error('Error:', error));
}

function fetchData(){
    fetch('http://localhost:3000/fertilizers')
    .then(response => response.json())
    .then(fertilizers => {
        fertilizers.forEach(getData);
    })
    .catch(error => console.error('Error:', error));
}

function addFertilizer(fertilizer) {
    fetch('http://localhost:3000/fertilizers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fertilizer)
    })
    .then(response => response.json())
    .then(newFertilizer => {
        getData(newFertilizer);
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('fertilizerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const newFertilizer = { name, description, image };
    addFertilizer(newFertilizer);
    document.getElementById('fertilizerForm').reset();
});

document.addEventListener('DOMContentLoaded', fetchData);