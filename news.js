console.log('This is news app')
//d2efb00b186a483e8a5928b1e98ade41   

// Initializing variables
let apikey='d2efb00b186a483e8a5928b1e98ade41';

let newsAccordion = document.getElementById('newsAccordion');

const xhr=new XMLHttpRequest();
let news;
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`, true);

xhr.onload = function(){
  console.log('hi');
    if(xhr.status===200)
    {
        let json=JSON.parse(this.responseText);
        //console.log(json);  //
        
        let articals=json.articles;
        news=articals;
        let newsHTML="";
        articals.forEach(function(element,index) {
            let html=`
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                        aria-expanded="true" aria-controls="collapse${index}">
                      <b> Breaking news ${index+1} :</b>${element["title"]}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
                    data-bs-parent="newsAccordion">
                    <div class="accordion-body">
                        <strong>${element["content"]}<a href="${element['url']} target="_blank"> Read more here</a>
                    </div>
                </div>
            </div>`;
            newsHTML+=html;
        });
        newsAccordion.innerHTML+=newsHTML;
    }
    else
    console.log('Error has occured');
}

xhr.send();


let search=document.getElementById('search-btn');
search.addEventListener('click',function(){
    let searchVal=document.getElementById('search');
    let str=searchVal.value;
    
    newsAccordion.innerHTML="";
    let html="";
    news.forEach(function(element,index){
        let title=element["title"];
        title.toLowerCase();
        str.toLowerCase();
        console.log(str,title);
        if(title.includes(str))
        {
            html+=`<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                    aria-expanded="true" aria-controls="collapse${index}">
                  <b> Breaking news ${index+1} :</b>${element["title"]}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
                data-bs-parent="newsAccordion">
                <div class="accordion-body">
                    <strong>${element["content"]}<a href="${element['url']} target="_blank"> Read more here</a>
                </div>
            </div>
        </div>`;
        }
    });
    if(html=="")
    html=`<h5>No search results found!</h5>`;

    newsAccordion.innerHTML+=html;
   // console.log(str);
});

