let lib = [{title:'Age of Myth', author:'Michael J. Sullivan', read:false, index:0},{title:'Theft of Swords', author:'Michael J. Sullivan', read:true, index:1}]
console.log(lib);

const bookContainer = document.querySelector('#bookContainer')

lib.forEach(book => {
    let display = document.createElement('div');
    display.setAttribute('bookIndex',book.index);
    display.classList.add('bookDisplay')

    let title = document.createElement('h2');
    title.textContent = book.title

    let author = document.createElement('h3');
    author.textContent = 'by ' + book.author;
    
    let read = document.createElement('input');
    read.type='checkbox';
    if(book.read)read.checked=true;
    let index = book.index;
    read.addEventListener('change',function(e){
        let bookIndex =  e.target.parentElement.getAttribute('bookIndex')
        lib[bookIndex].read =!lib[bookIndex].read;
        console.log(lib);       
        
    });
    read.classList.add('checkbox');
    read.name='checkbox'+index;

    let readlable = document.createElement('lable');
    readlable.setAttribute('for','checkbox'+index);
    readlable.textContent='Read: '

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent='X';
    removeBtn.addEventListener('click',(e)=>{
        let bookIndex =  e.target.parentElement.getAttribute('bookIndex');
        removeBook(bookIndex);
    });

    display.appendChild(title);
    display.appendChild(author);
    display.appendChild(readlable);
    readlable.appendChild(read);
    display.appendChild(removeBtn);

    bookContainer.appendChild(display);
    

});

function removeBook (bookIndex){
    console.log('remove Book at Index ' + bookIndex);
    
};