	var albumsArray = [];
	var newAlbum = {};
	var songUrlArray = [];
	var editBtnPressed;
	var ALBUM;
	setInterval(function() {
				
		getAjax();


	}, 5000);
	
	
// constructor

	function Album (albumName ,artistName, imageUrl) {

		this.albumName = albumName;
		this.artistName = artistName;
		this.imageUrl = imageUrl;
		this.songUrlArray = songUrlArray;
	}
	
	function SongsUrl (songURL) {

		this.songURL = songURL;
	}

//first function
	$(init);

	function init () {
		$("#secondDialog").hide();
		$("#dialog").hide();
		$("#playerSection").hide();
		createButton();
		getAjax();
	}
	
	function onOffAnimation(){
		var onOffAnimation = document.getElementById("checkId");
			
        if(onOffAnimation.checked == true) {
        console.log("Freeze Animation");
        document.body.style.background = "url(Images/bk.jpg) no-repeat";
		document.body.style.backgroundSize = "cover";
		
		} 
		else {
        console.log("Animation On");
		document.body.style.background = "url(Images/bk.gif) no-repeat";
		document.body.style.backgroundSize = "cover";
        }
    }
	
	function saveAlbum() {
	
		if(checkInputAlbum()) {	
			if(checkInputArtist()) {
				$( "#secondDialog" ).dialog({
					modal: true,
					closeOnEscape: false,
					width: 750,
					height: 450,
					show: { effect: "blind", duration: 800 },
					
				})
				$('.ui-widget-overlay').css('background', 'gray'); 
				
				var albumName = document.querySelector('#inputAlbum').value;
				var artistName = document.querySelector('#inputArtist').value;
				var imageUrl = document.querySelector('#inputImageURL').value;
								
				$( "#dialog" ).dialog("close");
			}	
		}
	}
	
	function resetFields(albumName, artistName, imageUrl) {
		var addAnotherSongBtn = document.getElementById("rstFldBtn");
		document.querySelector('#inputAlbum').value = '';
		document.querySelector('#inputArtist').value = '';
		document.querySelector('#inputImageURL').value = '';
	}
	
	function createButton() {
		var btn = document.getElementById("addBtn");
		btn.addEventListener("click", function() {
			
				
				$( "#dialog" ).dialog({
					modal: true,
					closeOnEscape: false,
					width: 500,					
					height: 425,
					show: { effect: "blind", duration: 800 }
				})
		});
	}
	
	function checkInputAlbum(){
		var check = document.getElementById('inputAlbum').checkValidity();
		document.getElementById('inputAlbum').reportValidity();
		return check;
	}
	
	function checkInputArtist(){
		var check = document.getElementById('inputArtist').checkValidity();
		document.getElementById('inputArtist').reportValidity();
		return check;
	}
	
	function checkInputSongURL1(){
		var check = document.getElementById("songURL1").checkValidity();
		document.getElementById("songURL1").reportValidity();
		return check;
	}
	
	function createElement(newAlbum) {

		var div = document.createElement("div");
		
		var albumText = document.getElementById('albumTextId');
						
		div.style.float = "left";
		div.style.width = "256px";
		div.style.height = "256px";
		div.style.background = "url(Images/discImage.png)";
		div.style.backgroundRepeat = "no-repeat";
		div.style.borderRadius = "100px";
		div.style.color = "black";
		div.style.fontFamily = "courier";
		div.style.fontSize = "24px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		div.style.position = "relative";
		div.style.top = "225px";
		div.style.marginRight = "50px";
		div.style.marginBottom = "50px";
		div.style.display = "block";
		div.style.opacity = "0.85";
		div.innerHTML = "<p1>Album & Artist Name</p1>" + newAlbum.albumName + ", " + newAlbum.artistName + '<img src="'+ newAlbum.imageUrl +'" style="width: 128px; height: 128px; border-radius: 100px; position: absolute; top: 60px; left: 60px" />';
		div.setAttribute('id', newAlbum.id);
		albumText.appendChild(div);
		removeButton(div,newAlbum);
		editButton(div, newAlbum);
		playAlbum(div, newAlbum);
		$(div).hide().fadeIn(750);
		
		$(div).hover(function() {
        $(this).fadeTo('slow', 0.5);
		},
		function() {
        $(this).fadeTo('slow', 1);
		}
		);
		
		$("p1").circleType({radius: -180});
		$("p1").css({position: 'absolute', top: 250, left: 130});
	}

	function removeButton(div,newAlbum) {
		var removeBtn = document.createElement('div');
		removeBtn.setAttribute('class', 'glyphicon glyphicon-trash');
		removeBtn.setAttribute('id', 'removeBtnId');
		removeBtn.setAttribute('title', 'Click to remove this Album');
		removeBtn.setAttribute('albumId', newAlbum.id);
		removeBtn.addEventListener('click', function(event){
		var nID = event.target.attributes.albumId.value;
		var filteredAlbumArray = albumsArray.filter(function(n) { return n.id == nID;  });
		var albumIndex = albumsArray.indexOf(filteredAlbumArray[0]);
		
		removeAlbum($(this).parent().attr('id'));
		
		var element = document.getElementById(nID);
		$(element).fadeOut(750, function() 
		{
			var albumText = document.getElementById('albumTextId');
			albumText.removeChild(element);
		});
		
		});
		div.appendChild(removeBtn);
		$(removeBtn).hide();
		$(div).hover(function() {
        $(this).find(removeBtn).show();
		},
		function () {
        $(this).find(removeBtn).hide();
		})
	}
	
	function editButton(div, newAlbum) {
		var editBtn = document.createElement('div');
		editBtn.setAttribute('class', 'glyphicon glyphicon-pencil');
		editBtn.setAttribute('id', 'editBtnId');
		editBtn.setAttribute('title', "You can add or remove MP3 URL's");
		editBtn.setAttribute('albumId', newAlbum.id);
		editBtn.addEventListener('click', function(event){
			editBtnPressed = true;
			console.log(editBtnPressed + " Edit BTN pressed");

					for(var i = 3; i < newAlbum.songUrlArray.length; i++) {
						if(newAlbum.songUrlArray.length > 3){
						var valueofURL = newAlbum.songUrlArray[i];
						addAnotherSong();
						var currentTextArea = document.getElementById(i + 1);
						currentTextArea.value = valueofURL;
					}
				}
				document.getElementById('songURL1').value = newAlbum.songUrlArray[0];
				document.getElementById('songURL2').value = newAlbum.songUrlArray[1];
				document.getElementById('songURL3').value = newAlbum.songUrlArray[2];

				$( '#secondDialog' ).dialog({
					width: 750,
					height: 450,
					closeOnEscape: false,
					modal: true,
					show: { effect: "blind", duration: 800 }
				})
				$('.ui-widget-overlay').css('background', 'gray');
		});
	
		div.appendChild(editBtn);
		$(editBtn).hide();
		$(div).hover(function() {
        $(this).find(editBtn).show();
		},
		function () {
        $(this).find(editBtn).hide();
		})
		
	}
	
	function playAlbum(div, newAlbum) {
		var playAlbumBtn = document.createElement('div');
		playAlbumBtn.setAttribute('class', 'glyphicon glyphicon-play');
		playAlbumBtn.setAttribute('id', 'playAlbumBtnId');
		playAlbumBtn.setAttribute('title', 'Click to Play Album songs');
			
			$(playAlbumBtn).click(function(){playurl2(newAlbum.songUrlArray)});
			
			var audio = document.getElementById("audioElement");
			var counter = 0;	
			function playurl2(playlist) {
							
				var audio = document.getElementById("audioElement");
				counter = 0;
				audio.src = playlist[counter];
				audio.play();
				$("#playerSection").fadeIn(2000);
				
				audio.addEventListener('ended', function(event) {
				if(counter < playlist.length)
				{
					counter++;
					audio.src = playlist[counter];
					console.log("Now Playing: ",playlist[counter]);
					audio.play();
				}
				}, false);
			}
			
			$("audio").on("pause", function() {
				$("#recordGif").fadeOut(250);
				$("h2").hide();
				$("#containerSongUrl").text("");
				
				document.body.style.background = "url(Images/bk.gif) no-repeat";
				document.body.style.backgroundSize = "cover";
				
				$("label").show();
			})
			
			$("audio").on("play", function() {
				$("#containerSongUrl").text(audio.src);
				$("#containerSongUrl").css({position: 'absolute', top: 125, left: 5});
				
				$("#recordGif").fadeIn(250);
				
				$("#playerSection").append('<h2>Now Playing:</h42');
				$("h2").css({position: 'absolute', top: 40, left: 225});
				
				document.body.style.background = "url(Images/eq.gif) no-repeat";
				document.body.style.backgroundSize = "cover";
				
				$("label").hide();
			})
			
			div.appendChild(playAlbumBtn);
			$(playAlbumBtn).hide();
			$(div).hover(function() {
			$(this).find(playAlbumBtn).show();
			},
			function () {
			$(this).find(playAlbumBtn).hide();
			})	
	}
		
	function finishAndSave(){	
			console.log(editBtnPressed);
			if(checkInputSongURL1()) {
					if(editBtnPressed != true) {
					var albumName = document.querySelector('#inputAlbum').value;
					var artistName = document.querySelector('#inputArtist').value;
					var imageUrl = document.querySelector('#inputImageURL').value;	
					newAlbum = new Album(albumName, artistName, imageUrl);
					$('.textAreaClass').each( function() {
						songUrlArray.push(this.value);
						});

					$( "#secondDialog" ).dialog("close");

					addAlbum(newAlbum);
					}
					else {

						songUrlArray = [];
							$('.textAreaClass').each( function() {
						songUrlArray.push(this.value);
						});
						
						newAlbum.songUrlArray = songUrlArray;
						editChanges(songUrlArray);

						$( "#secondDialog" ).dialog("close");
					}
			}
	}

	function addAnotherSong(){
		var addAnotherSongBtn = document.getElementById("addAntrSngBtn");
		var textAreaId = document.getElementsByClassName("textAreaClass").length + 1;
				elementAddAnotherSong = document.createElement("div");
				jQuery(elementAddAnotherSong).append('<H4>Song URL ' + textAreaId + '</h4>');
				jQuery(elementAddAnotherSong).append('<textarea id=' + textAreaId + ' class="textAreaClass" placeholder="Add Here MP3 URL" style="width:350px;"></textarea>');
				removeSongUrl();
	}
	
	function removeSongUrl() {
		var removeSongUrlBtn = document.createElement('div');
		removeSongUrlBtn.setAttribute('class', 'glyphicon glyphicon-remove');
		removeSongUrlBtn.setAttribute('id', 'removeSongUrlBtnId');	
		jQuery(elementAddAnotherSong).append(removeSongUrlBtn);
		jQuery('#secondDialog').append(elementAddAnotherSong);
		removeSongUrlBtn.addEventListener('click', function(event){
				
			jQuery(this).parent('div').remove();
		})
	}

	function checkUiAlbums(albumsArray)
	{
		
		console.log(albumsArray);
		$("#albumTextId").children().each(function( i, album ) {		
			var id = album.attributes.id.value;

			//look for the album id in the server array:
			var index = albumsArray.findIndex(function( obj ) {
				if(editBtnPressed == true) {

				}
				return obj.id == id;
			}); 

			//Found
			if(index >= 0)
			{
				//remove from the server array:
				albumsArray.splice(index,1);
			}
			//Not Found
			else
			{
				//remove from UI:
				console.log("Removing album number " + id);
				var element = document.getElementById(id);
				element.remove();
			}		
		});
		
		//foreach not founded server note array items add them:
		albumsArray.forEach(function(album) {
			createElement(album);

		});
	}

	function addAlbum(newAlbum) {

		$.ajax({
			type: "POST",
			url: 'https://musicrecordshop.herokuapp.com/addAlbum' ,
			data: newAlbum,
			dataType: "json",
			crossOrigin: true,	
			success: OnPostSuccessAddAlbum,
				error: function(xhr, status, error) {
				console.log('Error: ' + error.message);
				alert('Error connecting to the server.');
				},
		});
	}
	
	function OnPostSuccessAddAlbum(data) {

		createElement(data);
		data = newAlbum;
		return newAlbum;
	}
	
	function removeAlbum(albumIndex) {
		
		$.ajax({
			type: "POST",
			url: 'https://musicrecordshop.herokuapp.com/removeAlbum' ,
			data: {data: albumIndex},
			dataType: "json",
			crossOrigin: true,	
			success: OnPostSuccessRemoveAlbum,
				error: function(xhr, status, error) {
				console.log('Error: ' + error.message);
				alert('Error connecting to the server.');
				},
		});
	}
	
	function OnPostSuccessRemoveAlbum(data) {

	}

	function editChanges(songUrlArray) {

		$.ajax({
			type: "POST",
			url: 'https://musicrecordshop.herokuapp.com/editChanges' ,
			data: {array : newAlbum.songUrlArray},
			dataType: "json",
			crossOrigin: true,	
			success: OnPostSuccessEditChanges,
				error: function(xhr, status, error) {
				console.log('Error: ' + error.message);
				alert('Error connecting to the server.');
				},
		});
	}
	
	function OnPostSuccessEditChanges(data) {

		data = songUrlArray;
		songUrlArray = newAlbum.songUrlArray;
		return newAlbum;
	}

	function getAjax() {
		$.ajax({
		  type: "GET",
		  url: 'https://musicrecordshop.herokuapp.com/getAlbums' ,
		  dataType: "json",
		  crossOrigin: true,
		  success: OnGetSuccess,
		  error: function(xhr, status, error) {
			  console.log('Error: ' + error.message);
			  alert('Error connecting to the server.');
		  },
		});
	}

	function OnGetSuccess(data) {
		
		albumsArray = data;
		var res = [];
			for(var i=0; i<albumsArray.length; i++ ) {
				var temp = albumsArray[i];
				res.push(temp);
			}

		checkUiAlbums(res);
		return newAlbum;
	}	

