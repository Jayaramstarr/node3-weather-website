

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

addEventListener('submit',(e)=>{

    e.preventDefault();

    msg1.textContent='Loading....';
    msg2.textContent= '';

    const location = search.value;
    
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error)
                return msg1.textContent = data.error;
            msg1.textContent=`${data.loc}`;
            msg2.textContent= `${data.summary}The temperature high is ${data.temperatureHigh} and temperature low is ${data.temperatureLow} degrees farenheit, with a precipitation of ${data.precipitation}%`;
                
        });
    });


    
});