//List for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('sitename').value;
	var siteUrl = document.getElementById('siteurl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		name : siteName,
		url : siteUrl 
	}

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks=[];
		//add to array
		bookmarks.push(bookmark);
		//Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}
	else{
		// Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add to array
		bookmarks.push(bookmark);
		//Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();

	//re-fetch bookmarks
	fetchBookmarks();

	//prevent form from subitting
	e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
	//get bookmarks from local stotage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for(var i=0; i<bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i,1);
		}
	}
	//Set to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();	
}

//Fetch bookmarks
function fetchBookmarks(){
	// Get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Get output id
	var bookmarkResults = document.getElementById('bookmarkResults');
	//Build output
	bookmarkResults.innerHTML = '';
	for(var i=0; i<bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarkResults.innerHTML += '<div class="well">'+
									'<h3>'+name+
									' <a class="btn btn-default" target=_blank" href="'+url+'">Visit</a> '+
									' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
									'</h3>'+
									'</div>';
	}
}

//validate Form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert("Please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}