require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require("../data/imageDatas.json");

//get image 
imageDatas = (
	function setImageDatas(datas){
		for(var i = 0,j=datas.length;i < j;i++){
			let data = datas[i];
			data.fileName="../images/"+data.fileName;
			data.title=data.title+"----"+i;
			data.desc=data.desc+"----"+i;
		}
		return datas;
	}
	)(imageDatas)

	class ImgFigure extends React.Component{
		render(){
			let styleObj = {};
			if(this.props.arrange.pos){
				styleObj = this.props.arrange.pos;
			}
			return(
				<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.fileName} alt={this.props.data.title}/>
				<figcaption className="figure-title">
				<h2>{this.props.data.title}</h2>
				</figcaption>
				</figure>
				);
		}
	}

	class AppComponent extends React.Component {
		constructor(props) {
			super(props);
			this.state = {imgArray:[],};
			this.imagePos = {
				borderStyle:{
					centerPos:{
						left:0,
						top:0,
					},
					leftPos:{
						lefts:[0,0],
						tops:[0,0],
					},
					rightPos:{
						lefts:[0,0],
						tops:[0,0],
					},
					topPos:{
						lefts:[0,0],
						tops:[0,0],
					},
				}
			};
		};
		componentDidMount(){
			let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);

			let imgFigDOM = ReactDOM.findDOMNode(this.refs.figImg0),
			imgFigW = imgFigDOM.scrollWidth,
			imgFigH = imgFigDOM.scrollHeight,
			halfImgFigW = Math.ceil(imgFigW/2),
			halfImgFigH = Math.ceil(imgFigH/2);

			this.imagePos.borderStyle.centerPos.left=halfStageW - halfImgFigW;
			this.imagePos.borderStyle.centerPos.top=halfStageH - halfImgFigH;

			this.imagePos.borderStyle.leftPos.lefts=[-halfImgFigW,halfStageW - halfImgFigW*3];
			this.imagePos.borderStyle.leftPos.tops=[-halfImgFigH,stageH - halfImgFigH];

			this.imagePos.borderStyle.rightPos.lefts=[halfStageW+halfImgFigW,stageW - halfImgFigW];
			this.imagePos.borderStyle.rightPos.tops=[-halfImgFigH,stageH - halfImgFigH];

			this.imagePos.borderStyle.topPos.lefts=[halfStageW - halfImgFigW,halfStageW + halfImgFigW];
			this.imagePos.borderStyle.topPos.tops=[-halfImgFigH,halfStageH - halfImgFigH*3];
			this.centerImage(0);
		};
		getRandom(low,high){
			return Math.ceil(Math.random()*(high-low)+low);
		};
		centerImage(index){
			let imgArray = this.state.imgArray,
			imagePos  = this.imagePos.borderStyle,
			topNum = Math.ceil(Math.random()*2),
			topNumIndex = 0,
			imgArrayTop = [],
			imgArrayCenter = imgArray.splice(index,1);
			imgArrayCenter[0].pos = imagePos.centerPos;
			topNumIndex = Math.ceil(imgArray.length  - topNum);			
			imgArrayTop = imgArray.splice(topNumIndex,1);
			imgArrayTop.forEach(function(value,index){
				imgArrayTop[index].pos = {
					left:this.getRandom(imagePos.topPos.lefts[0],imagePos.topPos.lefts[1]),
					top:this.getRandom(imagePos.topPos.tops[0],imagePos.topPos.tops[1]),
				}
			}.bind(this));

			for (let i = 0,j=imgArray.length,k=j/2;i<j; i++) {
				let tmp = null;
				if(i<k){
					tmp=imagePos.leftPos;
				}else{
					tmp=imagePos.rightPos;
				}
				imgArray[i].pos = {
					left:this.getRandom(tmp.lefts[0],tmp.lefts[1]),
					top:this.getRandom(tmp.tops[0],tmp.tops[1]),
				}
			}
			if(imgArrayTop && imgArrayTop[0]){
				imgArray.splice(topNumIndex,0,imgArrayTop[0]);
			}
			imgArray.splice(index,0,imgArrayCenter[0]);
			this.setState({
				imgArray:imgArray,
			})
		};
		render() {
			let controllerUnits = [],
			figcaptions = [];
			imageDatas.forEach(function(val,index){
				if(!this.state.imgArray[index]){
					this.state.imgArray[index] = {
						pos:{
							left:0,
							top:0,
						}
					};
				}
				figcaptions.push(<ImgFigure data={val} key={index}   arrange={this.state.imgArray[index]}  ref={"figImg"+index}/>);
			}.bind(this));
			return (
			<section   className="stage">
			<section   className="image-sec" ref="stage">
			{figcaptions}
			</section>
			<nav className="controller-nav">
			{controllerUnits}
			</nav>
			</section>
			);
		}
	}

	AppComponent.defaultProps = {
	};

	export default AppComponent;
