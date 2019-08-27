window.onload=setup;
let lib =[];
//{title:'Age of Myth', author:'Michael J. Sullivan', read:false, index:0},{title:'Theft of Swords', author:'Michael J. Sullivan', read:true, index:1}
const bookContainer = document.querySelector('#bookContainer')
function setup() {
    let b1 = new Book('b1','a1',true);
    b1.add()
    let b2 = new Book('b2','a2',true);
    b2.add()
}
function render (){
    delDisplay();
    
    lib.forEach(book => {
        book.index=lib.indexOf(book);

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
            //removeBook(bookIndex);
            book.del();
        });
    
        display.appendChild(title);
        display.appendChild(author);
        display.appendChild(readlable);
        readlable.appendChild(read);
        display.appendChild(removeBtn);    
        bookContainer.appendChild(display);       
    
    });
}

function removeBook (bookIndex){
    console.log('remove Book at Index ' + bookIndex);
    
};

function delDisplay() {
    do {
        let toBeDeleted = bookContainer.childNodes;
        toBeDeleted.forEach(element => {
            element.remove();
        }); 
    } while (bookContainer.childElementCount>0);
    
}

function Book (title,author,read){
    this.title=title,
    this.author=author,
    this.read=read,
    this.index=lib.length;
}
Book.prototype.add = function (){
    lib.push(this);
    render();

    
};

Book.prototype.del = function (){
    console.log(lib);
    lib.splice(this.index,1);
    console.log(lib);
    console.log('del '+this.index);
    
    render();
};
const addBookMenu = document.querySelector('#addBookMenu');
const addBookMenuBtn = document.querySelector('#addBookMenuBtn');
const cancleBtn = document.querySelector('#cancleBtn');

addBookMenuBtn.addEventListener('click',toggleAddBookMenu);
cancleBtn.addEventListener('click',toggleAddBookMenu);

function toggleAddBookMenu(){
    if(addBookMenu.style.visibility=='hidden'){
        addBookMenu.style.visibility='visible';
    }else{
        addBookMenu.style.visibility='hidden';
    }
}

const addBookBtn = document.querySelector('#addBookBtn');
addBookBtn.addEventListener('click',addBook);

let addBookTitle = document.querySelector('#addBookTitle');
let addBookAuthor = document.querySelector('#addBookAuthor');
let addBookRead = document.querySelector('#addBookRead');



function addBook() {
    let title = addBookTitle.value; 
    let author = addBookAuthor.value;
    let read = addBookRead.checked;
    lib.push(new Book(title,author,read));
    
    addBookTitle.value='';
    addBookAuthor.value='';
    addBookRead.checked = false;

    render();    
}