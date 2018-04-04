import React, { 
  Component 
} from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';

class StyleSheetFactory {
  static getBackgroundImageStyleSheet(givenWidth, givenHeight) {
    return StyleSheet.create({
      backgroundImage: {
        flex: 1, 
        resizeMode: 'repeat',
        width: givenWidth,
        height: givenHeight
      }
    });
  };
}

export default class DisplayBackgroundImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  updateWindowDimensions(event){
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  componentDidMount(){
    // called when component is being created/inserted into DOM
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentDidUpdate(){
    // called when component is being re-rendered
  }
  componentWillUnmount(){
    // called when component is being removed from DOM
    window.removeEventListener('resize', this.updateWindowDimensions); 
  }
  render() {
    return(
      <View>
        <Image 
          style={StyleSheetFactory.getBackgroundImageStyleSheet(this.state.width, this.state.height).backgroundImage}
          source={require('./brick-wall.jpg')
        } 
        />
      </View>
    );
  }
}

DisplayBackgroundImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

DisplayBackgroundImage.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
}


AppRegistry.registerComponent(
  'DisplayBackgroundImage', 
  () => DisplayBackgroundImage
);
