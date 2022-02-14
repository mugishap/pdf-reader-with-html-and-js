//show the state of our document
var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

pdfjsLib.getDocument('./my_document.pdf').then((pdf) => {

    myState.pdf = pdf;
    render();

});

function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {

        var canvas = document.querySelector("#pdf_renderer")
        var ctx = canvas.getContext("2d");

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width
        canvas.height = viewport.height

        page.render({
            CanvasContext: ctx,
            viewport: viewport
        });
    });
}

document.querySelector("#go_previous").addEventListener('click', (e) => {
    if (myState.pdf == null || myState.currentPage == 1)
        return;
    myState.currentPage -= 1;
    document.querySelector("#current_page").value = myState.currentPage;
    render();
})

document.querySelector("#go_next").addEventListener('click', (e) => {

if (myState.pdf == null || myState.currentPage > myState.pdf._pdfInfo.numPages) 
    return;

myState.currentPage += 1;
document.querySelector("#current_page").value = myState.currentPage

})

document.querySelector("#current_page").addEventListener("keypress",(e)=>{
    if (myState.pdf == null) return;

    //get the key code
    var code = (e.keyCode ? e.keyCode : e.which);
    //if key code matches that of the Enter key
    if (code == 13) {
        var desiredPage = document.querySelector("#current_page").valueAsNumber;
        
        if (desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
            myState.currentPage = desiredPage;
            document.querySelector("#current_page").value = desiredPage;
            render()
        }
    }
});
document.querySelector("#zoom_in").addEventListener("click",(e)=>{
    if (myState.pdf == null ) return; 
        myState.zoom += 0.5;
        render()
});

document.querySelector("#zoom-out").addEventListener("click",(e)=>{
    if (myState.pdf == null) return;
    myState.zoom -= 0.5;
    render();
})

