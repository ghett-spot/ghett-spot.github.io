//ДОБАВИТЬ ЦЕНТРОВКУ ПО КУРСОРУ ПРИ ЗУМЕ С КЛАВЫ ИЛИ ВИДЖЕТА И ВООБЩЕ, СВЕСТИ ВСЁ К ОДНОЙ ФУНКЦИИ!!!!!!!1111
const createWidget = ()=>{

	//ADDING CSS INTO DOCUMENT HEAD
	//https://www.geeksforgeeks.org/how-to-create-a-style-tag-using-javascript/
	let css = document.createElement('style'); 
	css.type = 'text/css';
	css.id= 'widgetStyles'
	let styles = '#widget {position:fixed;top:0px;right:0px;width:12vw;height:12vw;} #zoomInCover,#switcherFieldCover {fill:white;stroke:none;} #widgetFieldColor,#switcherField {fill:#42386b;	stroke:none;} #actionThumbs {transition:transform ease-in-out 250ms; transform-origin:39.7px 39.7px; transform:translate(29px,-30px) scale(0); transition:transform ease-in-out 450ms;} #widgetField {transform-origin:39.7px 39.7px; transform:scale(0); transition:transform ease-in-out 450ms;} #switcher,#switchWidgetCondition {transform:translate(29px,-30px);	transition:transform ease-in-out 250ms;} .widgetActive {transform:scale(1) translate(0px,0px) !important;} #actionThumbs,#switchWidgetCondition {cursor:pointer; fill:rgba(0,0,0,0);}@media (min-width: 1281px) {#widget {width:14vw;height:14vw;}}@media (min-width: 1025px) and (max-width: 1280px) {#widget {width:14vw;height:14vw;}}@media (min-width: 768px) and (max-width: 1024px) {#widget {width:16vw;height:16vw;}}@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {#widget {width:18vw;height:18vw;}}@media (min-width: 481px) and (max-width: 767px) {#widget {width:20vw;height:20vw;}}@media (min-width: 320px) and (max-width: 480px) {#widget {width:20vw;height:20vw;}}';






	css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName('head')[0].appendChild(css);


	let tree = document.getElementById('wrapper');
	let root_style = getComputedStyle(document.documentElement);
	let overlay = document.getElementById('overlay');

	let widgetBox = document.createElement('div'),
			svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

	widgetBox.id = 'widget';
	svg.setAttribute('viewBox','1 -8 85 85');
	svg.setAttribute('preserveAspectRatio','xMidYMid meet');

	let	g = document.createElementNS("http://www.w3.org/2000/svg", 'g'),
			path = document.createElementNS("http://www.w3.org/2000/svg", 'path'),
			use = document.createElementNS("http://www.w3.org/2000/svg", 'use');

	let widgetStructure = {
		'widgetField': {
			'type':g,
			'childs': {
				'zoomInCover': {
					'type':path,
					'attrs': {
						'd':'m 26.481516,1.4e-4 v 4.663798 c -4.60055,3.01338 -6.74179,4.062382 -12.2132,9.580811 -5.02873,4.863821 -6.57334,7.584773 -9.5741,12.213726 H 0.023186 C -0.079524,23.597272 0.773096,10.929542 3.687046,3.663482 9.313166,1.476141 19.726376,-0.016397 26.481516,1.4e-4 Z'
					}
				},
				'zoomOutCover': {
					'type':use,
					'attrs':{
						'href':'#zoomInCover',
						'transform-origin':'39.7 39.7',
						'transform':'rotate(90)'
					}
				},
				'widgetFieldColor': {
					'type':path,
					'attrs':{
						'd':'M 26.481525,1.4284378e-4 V 4.6639408 C 21.880971,7.6773208 19.73973,8.7263228 14.268316,14.244753 9.239595,19.108574 7.694984,21.829526 4.694225,26.458475 H 0.023191 C -0.079523,23.597276 0.773097,10.929546 3.687051,3.6634848 9.313175,1.4761438 19.726382,-0.01639416 26.481525,1.4284378e-4 Z M 9.356472,5.2117108 c -1.24672,-0.0056 -2.442594,0.486854 -3.103169,1.04128 -0.510137,0.567679 -1.078851,1.94303 -1.03818,3.095935 -0.01198,0.9598572 0.324231,2.2507572 1.03818,3.1067892 0.463135,0.420589 1.725835,1.0617 3.103169,1.04128 1.101833,0.01746 2.391921,-0.431497 3.099551,-1.04128 0.498197,-0.537768 1.072492,-1.851453 1.041281,-3.1000712 0.01233,-1.247799 -0.521269,-2.523275 -1.041281,-3.102653 -0.554418,-0.466402 -1.752274,-1.04875 -3.099551,-1.04128 z M 6.71121,9.8863518 v -1.058333 h 5.291667 v 1.058333 z m 62.782795,-3.175 h 1.05834 v 2.116667 h 2.11666 v 1.058333 h -2.11666 v 2.1166692 h -1.05834 V 9.8863518 h -2.11666 v -1.058333 h 2.11666 z M 5.291666,39.687635 c 3.066938,6.91963 9.514297,14.41416 12.375989,17.55759 l 5.20485,-5.20485 c -2.110147,-3.76382 -3.233609,-8.01404 -3.240629,-12.35274 0.0018,-4.34152 1.121745,-8.59566 3.229777,-12.36358 L 17.668172,22.130057 C 14.811873,25.268819 8.382305,32.746365 5.291666,39.687635 Z m 68.791669,0 c -3.06694,6.91963 -9.5143,14.41416 -12.37599,17.55759 l -5.20485,-5.20485 c 2.11015,-3.76382 3.23361,-8.01404 3.24063,-12.35274 -0.002,-4.34152 -1.12175,-8.59566 -3.22978,-12.36358 l 5.19348,-5.193998 c 2.8563,3.138762 9.28587,10.616308 12.37651,17.557578 z M 52.916665,1.4284378e-4 V 4.6639408 c 4.60056,3.01338 6.7418,4.062382 12.21321,9.5808122 5.02872,4.863821 6.57333,7.584773 9.57409,12.213722 h 4.67104 C 79.477715,23.597276 78.625095,10.929546 75.711145,3.6634848 70.085015,1.4761438 59.671815,-0.01639416 52.916665,1.4284378e-4 Z M 70.041725,5.2117108 c 1.24672,-0.0056 2.44259,0.486854 3.10316,1.04128 0.51014,0.567679 1.07886,1.94303 1.03818,3.095935 0.012,0.9598572 -0.32423,2.2507572 -1.03818,3.1067892 -0.46313,0.420589 -1.72583,1.0617 -3.10316,1.04128 -1.10184,0.01746 -2.39192,-0.431497 -3.09956,-1.04128 -0.49819,-0.537768 -1.07249,-1.851453 -1.04128,-3.1000712 -0.0123,-1.247799 0.52127,-2.523275 1.04128,-3.102653 0.55442,-0.466402 1.75228,-1.04875 3.09956,-1.04128 z M 39.6875,74.083475 c -6.919622,-3.06694 -14.414157,-9.5143 -17.557585,-12.37599 l 5.20485,-5.20485 c 3.763817,2.11015 8.014037,3.23361 12.352735,3.24063 4.341527,-0.002 8.595667,-1.12174 12.363585,-3.22978 l 5.194,5.19349 c -3.13876,2.85629 -10.616313,9.28586 -17.557585,12.3765 z m 0,-68.7916662 C 32.767878,8.3587468 25.273343,14.806108 22.129915,17.6678 l 5.20485,5.20485 c 3.763817,-2.110147 8.014037,-3.233609 12.352735,-3.240629 4.341527,0.0018 8.595667,1.121745 12.363585,3.229777 l 5.194,-5.193481 C 54.106325,14.812018 46.628772,8.3824488 39.6875,5.2918088 Z',
						'transform-origin':'39.7 257.3'
					}
				}
			}
		},
		'switcher': {
			'type':g,
			'childs': {
				'switcherFieldCover': {
					'type':path,
					'attrs':{
						'd':'m 39.7,26.1 c -4.4,0 -8.4,1.9 -10.2,3.4 -1.7,1.9 -3.5,6.1 -3.4,10.2 -0.1,4.1 1.8,8.4 3.4,10.2 2.3,2 6.6,3.5 10.2,3.4 4.5,0 8.7,-2 10.2,-3.4 2.3,-2.8 3.5,-7.1 3.4,-10.2 0.1,-3.8 -1.7,-8.3 -3.4,-10.2 -2.2,-1.8 -6.1,-3.4 -10.2,-3.4 z'
					}
				},
				'switcherField': {
					'type':path,
					'attrs':{
						'd':'m 39.7,26.1 c -4.4,0 -8.4,1.9 -10.2,3.4 -1.7,1.9 -3.5,6.1 -3.4,10.2 -0.1,4.1 1.8,8.4 3.4,10.2 2.3,2 6.6,3.5 10.2,3.4 4.5,0.1 8.7,-2 10.2,-3.4 2.3,-2.8 3.5,-7 3.4,-10.2 0.1,-3.8 -1.7,-8.3 -3.4,-10.2 C 47.7,27.7 43.8,26.1 39.7,26.1 Z m 0,4.1 c 1.9,0.9 4,2.6 4.9,3.4 l -1.4,1.4 c -1,-0.6 -2.2,-0.9 -3.4,-0.9 -1.2,0 -2.4,0.3 -3.4,0.9 l -1.4,-1.4 c 0.9,-0.8 2.9,-2.6 4.9,-3.4 z m -6.1,4.7 1.4,1.4 c -0.6,1 -0.9,2.2 -0.9,3.4 0,1.2 0.3,2.4 0.9,3.4 l -1.4,1.4 c -0.8,-0.9 -2.6,-2.9 -3.4,-4.9 0.9,-1.9 2.6,-4 3.4,-4.9 z m 12.2,0 c 0.8,0.9 2.6,2.9 3.4,4.9 -0.9,1.9 -2.6,4 -3.4,4.9 l -1.4,-1.4 c 0.6,-1 0.9,-2.2 0.9,-3.4 -5.1e-4,-1.2 -0.3,-2.4 -0.9,-3.4 z M 39.7,37.8 c 0.6,0 1.1,0.2 1.4,0.5 0.2,0.3 0.5,0.7 0.5,1.4 0,0.4 -0.2,1 -0.5,1.4 -0.2,0.2 -0.8,0.5 -1.4,0.5 -0.5,0 -1.1,-0.2 -1.4,-0.5 -0.2,-0.2 -0.5,-0.8 -0.5,-1.4 0,-0.6 0.2,-1.1 0.5,-1.4 0.2,-0.2 0.8,-0.5 1.4,-0.5 z m -3.4,6.5 c 1,0.6 2.2,0.9 3.4,0.9 1.2,-5.1e-4 2.4,-0.3 3.4,-0.9 l 1.4,1.4 c -0.9,0.8 -2.9,2.6 -4.9,3.4 -1.9,-0.9 -4,-2.6 -4.9,-3.4 z'
					}
				}
			}
		},
		'switchWidgetConditionWrapp': {
			'type':g,
			'childs': {
				'switchWidgetCondition': {
					'type':path,
					'attrs':{
						'd':'m 39.7,26.1 c -4.4,0 -8.4,1.9 -10.2,3.4 -1.7,1.9 -3.5,6.1 -3.4,10.2 -0.1,4.1 1.8,8.4 3.4,10.2 2.3,2 6.6,3.5 10.2,3.4 4.5,0 8.7,-2 10.2,-3.4 2.3,-2.8 3.5,-7.1 3.4,-10.2 0.1,-3.8 -1.7,-8.3 -3.4,-10.2 -2.2,-1.8 -6.1,-3.4 -10.2,-3.4 z'
					}
				}
			}
		},
		'actionThumbs': {
			'type':g,
			'childs': {
				'zoomOut': {
					'type':path,
					'attrs': {
						'd':'m 26.5,1.4e-4 v 4.7 c -4.6,3 -6.7,4.1 -12.2,9.6 -5,4.9 -6.6,7.6 -9.6,12.2 H 0 C -0.1,23.6 0.8,10.9 3.7,3.7 9.3,1.5 19.7,0 26.5,1.4e-4 Z'
					}
				},
				'zoomIn': {
					'type':use,
					'attrs': {
						'href':'#zoomOut',
						'transform-origin':'39.7 39.7',
						'transform':'rotate(90)'
					}
				},
				'moveLeft': {
					'type':path,
					'attrs': {
						'd':'m 5.3,39.7 c 3.1,6.9 9.5,14.4 12.4,17.6 l 5.2,-5.2 c -2.1,-3.8 -3.2,-8 -3.2,-12.4 0,-4.3 1.1,-8.6 3.2,-12.4 l -5.2,-5.2 c -2.9,3.1 -9.3,10.6 -12.4,17.6 z'
					}
				},
				'moveTop': {
					'type':use,
					'attrs': {
						'href':'#moveLeft',
						'transform-origin':'39.7 39.7',
						'transform':'rotate(90)'
					}
				},
				'moveRight': {
					'type':use,
					'attrs': {
						'href':'#moveLeft',
						'transform-origin':'39.7 39.7',
						'transform':'rotate(180)'
					}
				},
				'moveBottom': {
					'type':use,
					'attrs': {
						'href':'#moveLeft',
						'transform-origin':'39.7 39.7',
						'transform':'rotate(270)'
					}
				}
			}
		}
	}
	for (let mainChildData in widgetStructure) {
		let childElem = widgetStructure[mainChildData].type.cloneNode();
		childElem.id = mainChildData;
		let childContent = widgetStructure[mainChildData];
		for (let widgetElData in childContent.childs) {
			let widgetEl = childContent.childs[widgetElData].type.cloneNode();
			for (const attr in childContent.childs[widgetElData].attrs) {
				widgetEl.setAttribute(attr,childContent.childs[widgetElData].attrs[attr]);
			}
			widgetEl.id = widgetElData;
			childElem.appendChild(widgetEl);
		}
		svg.appendChild(childElem);
	}
	widgetBox.appendChild(svg);
	document.getElementById('app').insertBefore(widgetBox,overlay);


	//EVENTS
	window.addEventListener('wheel',e => {
		if (overlay.style.display!='block') {
			let tree_scale = parseFloat(root_style.getPropertyValue('--tree-scale')),
					tree_x_pos = parseFloat(root_style.getPropertyValue('--tree-x-pos')),
					tree_y_pos = parseFloat(root_style.getPropertyValue('--tree-y-pos')),
					win_width = window.innerWidth,
					win_height = window.innerHeight,
					cursor_x = e.clientX,
					cursor_y = e.clientY;
			if (e.deltaY<0&&tree_scale<=5) {
				document.documentElement.style.setProperty('--tree-x-pos', (tree_x_pos-(cursor_x-win_width/2)/10));
				document.documentElement.style.setProperty('--tree-y-pos', (tree_y_pos-(cursor_y-win_height/2)/10));
				document.documentElement.style.setProperty('--tree-scale', tree_scale+.2);
			}
			else if (e.deltaY>0&&tree_scale>.2) {
				document.documentElement.style.setProperty('--tree-scale', tree_scale-.2);
			}
		}
	});

	window.addEventListener('mousedown',e => {
		let cursor_x_start = e.clientX,
				cursor_y_start = e.clientY;
				tree_x_pos = parseFloat(root_style.getPropertyValue('--tree-x-pos')),
				tree_y_pos = parseFloat(root_style.getPropertyValue('--tree-y-pos'));
		window.onmousemove = (e) => {
			document.documentElement.style.cursor='move';
			preventModal=true;
			let translation_x = e.clientX-cursor_x_start,
					translation_y = e.clientY-cursor_y_start;
			document.documentElement.style.setProperty('--tree-x-pos', (tree_x_pos+translation_x));
			document.documentElement.style.setProperty('--tree-y-pos', (tree_y_pos+translation_y));
		};
	});

	window.addEventListener('mouseup',e => {
		window.onmousemove = null;
		setTimeout(()=>{preventModal=false;},400);
		document.documentElement.style.cursor='default';
	});

	window.addEventListener('keydown',(e)=>{
		let overlayStatus = document.getElementById('overlay').style.display;
		if (overlayStatus!='block') {
			switch(e.keyCode) {
				case 38:
					widgetAction('moveTop');
					break;
				case 40:
					widgetAction('moveBottom');
					break;
				case 37:
					widgetAction('moveLeft');
					break;
				case 39:
					widgetAction('moveRight');
					break;
				case 32:
					widgetAction('zoomIn');
					break;
				case 107:
					widgetAction('zoomIn');
					break;
				case 109:
					widgetAction('zoomOut');
					break;
				default:
					break;
			}
		}
	},false);

	const widgetAction = (id) => {
		let tree_scale = parseFloat(root_style.getPropertyValue('--tree-scale')),
				tree_x_pos = parseFloat(root_style.getPropertyValue('--tree-x-pos')),
				tree_y_pos = parseFloat(root_style.getPropertyValue('--tree-y-pos'));
		switch(id) {
			case 'zoomOut':
				if (tree_scale>.2){
					document.documentElement.style.setProperty('--tree-scale', tree_scale-.2);
				}
				break;
			case 'zoomIn':
				if (tree_scale<5){
					document.documentElement.style.setProperty('--tree-scale', tree_scale+.2);
				}
				break;
			case 'moveLeft':
				document.documentElement.style.setProperty('--tree-x-pos', Math.round(tree_x_pos+200/tree_scale));
				break;
			case 'moveTop':
				document.documentElement.style.setProperty('--tree-y-pos', Math.round(tree_y_pos+200/tree_scale));
				break;
			case 'moveRight':
				document.documentElement.style.setProperty('--tree-x-pos', Math.round(tree_x_pos-200/tree_scale));
				break;
			case 'moveBottom':
				document.documentElement.style.setProperty('--tree-y-pos', Math.round(tree_y_pos-200/tree_scale));
				break;
			default:
				console.log('hm...something wrong...',id);
				break;
		}
	}
	window.onload = function () {
		document.getElementById('switchWidgetCondition').addEventListener('click',()=>{
			let widgetStatus = document.getElementById('switcher').classList.contains('widgetActive'),
					widgetActions = ['widgetField','actionThumbs'],
					switcherElmnts = ['switcher','switchWidgetCondition'];
			if (widgetStatus==true) {
				widgetActions.map(item => {
					document.getElementById(item).classList.toggle('widgetActive');
				});
				setTimeout(()=>{
					switcherElmnts.map(item => {
						document.getElementById(item).classList.toggle('widgetActive');
					});
				},250);
			}
			else {
					switcherElmnts.map(item => {
						document.getElementById(item).classList.toggle('widgetActive');
					});
				setTimeout(()=>{
				widgetActions.map(item => {
					document.getElementById(item).classList.toggle('widgetActive');
				});
				},250);
			}
		},false);

		document.getElementById('actionThumbs').addEventListener('click',(e)=>{
			widgetAction(e.target.id);
		},false);
	}
}