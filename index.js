console.log("JS is running");

//Global variables
let jsonData = [];

//DOM Elements
const container = document.getElementById('cardsContainer');
const buttons = document.querySelectorAll('.frameLnk button');

// Event listeners for timeframe buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {

    // Update aria-pressed on all buttons
    buttons.forEach(b => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
        
        const filter = button.dataset.filter;
        displayCards(filter);

      });
});

//Fetch data and render initial cards
fetch('data.json')
    .then(res => {
        if (!res.ok) {
            // Handle HTTP errors like 404 or 500
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json(); // Parse JSON if response is OK
    })
    .then(data => {
        jsonData = data;
        displayCards('daily');
    })
    .catch(error => {
        console.error('Fetch or JSON parsing error:', error);
        // Show user-friendly message or fallback UI
        displayErrorMessage('Sorry, we couldn’t load the data. Please try again later.');
    });

//Function to display cards
function displayCards(timeFrame) {
    
    container.innerHTML ='';

    jsonData.forEach(item => {

          const tf =item.timeframes[timeFrame];
          let tfText='';
          
          
          if (timeFrame ==='daily') { tfText = 'Yesterday';}
          else if (timeFrame === 'weekly') {tfText = 'Last Week' ;}
          else {tfText = 'Last Month';}

           const card = document.createElement('div');
            card.classList.add('card');

            const className = `card-${item.title.toLowerCase().replace(/\s+/g, '-')}`;

            card.classList.add(className);
            
            card.innerHTML=`
            <div class="cardCont">
                 <div class="cardHeader">
                    <p class="task">${item.title}</p>
                    <img class="eclipse" src="./images/icon-ellipsis.svg" alt="">
                 </div> 
                  <div class="cardBody">
                    <p class="taskHrs">${tf.current}hrs</p>
                    <p class="taskFrame">${tfText} • ${tf.previous} hrs</p>
                 </div>
             </div> 
             `;
             container.appendChild(card);
    });
};


