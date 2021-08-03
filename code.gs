function onOpen() {
  var UI = DocumentApp.getUi();
  UI.createAddonMenu()
    .addItem("Find & Highlight","sidebar")
    .addToUi();
  
};

//Custom Sidebar
function sidebar(){
  var ui = DocumentApp.getUi();
  var html = HtmlService
    .createTemplateFromFile("index")
    .evaluate();
  
  html.setTitle("Find & Highlight");
  ui.showSidebar(html);
 
};
 
// Creates an import or include function so files can be added
// inside the main index.
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
    .setTitle("Find & Highlight")
    .getContent();
};
 
//Receives data from prompt or sidebar and updates the first cell.
function receiveData(data,text){
  var selectedColor = data[0];
  var wordToFind = text;
  if(data[0].indexOf("Select") !== -1){
    DocumentApp.getUi().alert("You need to select a color!");
    return;
  };
  
  // DocumentApp.getUi().alert("You picked " + selectedColor + "and want to find " + wordToFind);

  var background = selectedColor;
  var doc = DocumentApp.getActiveDocument();
  var bodyElement = DocumentApp.getActiveDocument().getBody();
  var searchResult = bodyElement.findText(wordToFind);

  while (searchResult !== null) {
    var thisElement = searchResult.getElement();
    var thisElementText = thisElement.asText();

    //Logger.log(url);
    thisElementText.setBackgroundColor(searchResult.getStartOffset(), searchResult.getEndOffsetInclusive(),background);

    // search for next match
    searchResult = bodyElement.findText(wordToFind, searchResult);
  }
}
// function highlightText(target,background) {
  
//   // var ui = DocumentApp.getUi();
//   // var result = ui.prompt('Text Highlighter',
//   // 'Enter text to highlight:', ui.ButtonSet.OK_CANCEL);
//   // target = result.getResponseText();
