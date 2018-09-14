// Window
window.onscroll = ()=>{scroller()}

// Get nav

// Scroll position of header



function scroller(){
    let tableRow = document.getElementById("table-row");
    let tableHeader = document.getElementById("table-header");
    let tableRowOffset = tableRow.offsetTop;
    if(window.pageYOffset >= (tableRowOffset - 50)){
        tableHeader.classList.add("sticky");
    }else{
        tableHeader.classList.remove("sticky");
    }
}
