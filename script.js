window.onload=setup;
let lib =[];
//{title:'Age of Myth', author:'Michael J. Sullivan', read:false, index:0},{title:'Theft of Swords', author:'Michael J. Sullivan', read:true, index:1}
const bookContainer = document.querySelector('#bookContainer')

const database = firebase.database();
const ref = database.ref('books');


function setup() {
    ref.once('value').then((snapshot)=>{
        if (snapshot.exists()) ref.on('value',gotBooks,errData);        
    });  
    render();  
}

function gotBooks (data){
    lib=[];
    var books = data.val();
    if (books!=null){
        var keys = Object.keys(books);

        for(let i = 0; i<keys.length; i++){
            let k =keys[i]; 
            let newBook = new Book(books[k].title, books[k].author, books[k].read);
            newBook.setDbKey(k);      
            lib.push(newBook);
        }
        render();
    }
    
}

function errData(err){
    console.log(err);
}

function render (){
    delDisplay();
    lib.forEach(book => {

        book.index=lib.indexOf(book);
        let display = document.createElement('div');
        display.setAttribute('bookIndex',book.index);
        display.classList.add('bookDisplay');
    
        let title = document.createElement('h2');
        title.textContent = book.title;
    
        let author = document.createElement('h3');
        author.textContent = 'by ' + book.author;
        
        let read = document.createElement('input');
        read.type='checkbox';
        if(book.read)read.checked=true;
        let index = book.index;
        read.addEventListener('change',function(e){
            let bookIndex =  e.target.parentElement.parentElement.getAttribute('bookindex');
            console.log(e.target.parentElement.parentElement.getAttribute('bookIndex'));
            
            lib[bookIndex].read =!lib[bookIndex].read;
            ref.child(book.dbKey).update(book);
            
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
    this.dbKey='';
}

Book.prototype.setDbKey = function(key){
    this.dbKey=key;
}

Book.prototype.del = function (){
    lib.splice(this.index,1);
    ref.child(this.dbKey).remove();    
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
    let newBook = new Book(title,author,read) ;
    lib.push(newBook);
    
    addBookToDatabase(newBook);
    addBookTitle.value='';
    addBookAuthor.value='';
    addBookRead.checked = false;

    render();    
}

function addBookToDatabase (newBook){
    
    let data ={
        title: newBook.title, 
        author:newBook.author,
        read:newBook.read,
        index: newBook.index
    }
    ref.push(data);
}
// window.onunload=saveData;
// const database = firebase.database();
//     
// function saveData(){
    
//     console.log('unload')
// }

