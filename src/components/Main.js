require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

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

console.log(imageDatas);


class AppComponent extends React.Component {
  render() {
    return (
      <section   className="stage">
      	<section   className="image-sec">
      	</section>
      	<nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
