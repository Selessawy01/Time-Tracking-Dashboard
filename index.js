console.log("JS is running");

let jsonData = [];
fetch('data.json')
    .then( res => res.json())
    .then (data => {
        jsonData = data;
        displayCards('daily');
    }); 

function displayCards(timeFrame) {
    const container = document.getElementById('cardsContainer');
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
                    <p id="task">${item.title}</p>
                    <img class="eclipse" src="./images/icon-ellipsis.svg" alt="">
                 </div> 
                  <div class="cardBody">
                    <p id="taskHrs">${tf.current}hrs</p>
                    <p id="taskFrame">${tfText} • ${tf.previous} hrs</p>
                 </div>
             </div> 
             `;
             container.appendChild(card);
    });
};

document.querySelectorAll('.frameLnk button').forEach(button =>{
      button.addEventListener('click', () =>{
        const filter = button.dataset.filter;
        displayCards(filter);

      });
});