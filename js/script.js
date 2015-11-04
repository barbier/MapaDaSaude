var TYPES = {
	SEM_MEDICO:0,
	DEMORA_ATENDIMENTO:1,
	DEMORA_AMBULANCIA:2,
	HOSPITAL_SEM_ESTRUTURA:3,
	FALTA_MEDICACAO:4,
	NEGLIGENCIA:5
};
var TYPE_ICONS = [
	"images/1.png",
	"images/2.png",
	"images/3.png",
	"images/4.png",
	"images/5.png",
	"images/6.png"
];
var TYPE_LABELS = [
	"Sem M&eacute;dico",
	"Demora no Atendimento",
	"Demora na Ambul&acirc;ncia",
	"Hospital sem Estrutura",
	"Falta de Mediga&ccedil;&atilde;o",
	"Neglig&ecirc;ncia"
];

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -14.2392976, lng: -53.1805017},
		zoom: 4,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	});
}

var data;
var dataUrl = "data/data.json";
function loadData(){
	console.log("data loading: " + dataUrl);
	$.getJSON(dataUrl, function(json) {
		console.log("data loaded: " + json);
		data = json.data;
		initMarkers();
	})
	.fail(function(jqxhr, textStatus, error) {
		console.log( "loading data error" );
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	})
}

var markers = [];
function initMarkers(){
	for(var i = 0; i< data.length; i++){
		var marker = new google.maps.Marker({
			map: map,
			icon: TYPE_ICONS[data[i].type],
			position: data[i].position,
			index: i
		});
		marker.addListener('click', function(){makeWindow(this);});
		markers[i] = marker;
	}
}
	
function makeWindow(marker)
{
     var contentString = '<div id="infoWindow">'+
		'<h1><img src="' + TYPE_ICONS[data[marker.index].type] + '"/> ' + TYPE_LABELS[data[marker.index].type] + '</h1>'+
		'<h2>' + data[marker.index].date + '</h2>'+
		'<p>' + data[marker.index].description + '</p>'+
	  '</div>'; 
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	infowindow.open(map, marker);
}

function onload() {
	initMap();
	loadData();
}