import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, TouchableHighlight, Image, TouchableOpacity} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants, WebBrowser } from 'expo';

const source = require('./articles.json')

class ListScreen extends Component { 

  constructor(props) {
    super(props);  
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({item}) {
    onPress = (item) => {
    this.props.navigation.navigate('ArticleScreen', {title: item.name, body: item});
  }
    return <TouchableHighlight onPress={() => onPress(item)} underlayColor='#e4e4e4' style= {styles.touchStyle} >
    <Text numberOfLines={1} style ={ styles.textStyle }>{item.title}</Text></TouchableHighlight>;
  
  }

  keyExtractor(item, index) {
    return `${index}`;
  }

  renderSeparator() {
    const style = { height: 1, backgroundColor: '#ddd' };
    return <View style={style} />;
  }

  render() {
    return <FlatList data={source} ItemSeparatorComponent={this.renderSeparator} 
    keyExtractor={this.keyExtractor} renderItem={this.renderItem} />;
  }
}

//...................................

class ArticleScreen extends Component {

  constructor(props) {
    super(props); 
  }
    
  render() {
    const article = this.props.navigation.getParam('body');
    return ( 
      <View>
        <Image style ={ styles.img }source = {{uri: article.urlToImage}}/>
        <Text style={ styles.title }>{article.title}</Text>
        <Text style={ styles.articleText }>{article.description}</Text>

        <TouchableOpacity style={styles.button} 
          onPress={() => WebBrowser.openBrowserAsync(article.url)}><Text style ={ styles.readmoreStyle }>Read More</Text>
        </TouchableOpacity>
      </View>

    )
  }
}


//....................................

StatusBar.setBarStyle('light-content');

const RootNavigator = createStackNavigator({
  ListScreen: ListScreen,
  ArticleScreen: ArticleScreen,
}, {
    navigationOptions: {
    headerBackTitle: 'Back',
    title: 'BBC News',
    headerStyle: {
      backgroundColor: '#d35400'
    },
    headerTintColor: '#ffffff'
  }
});




const styles = StyleSheet.create({

  articleText: {
    fontSize: 15,
    margin: 10,
  },

  readmoreStyle: {
    margin: 10,
    fontSize: 20,
    color: '#d35400',
  },

  textStyle: {
    fontSize: 18,
  },

  title: {
    fontSize: 20,
    margin: 10,
  },

  img: {
    width: '100%',
    height: 200,
  },

  profileText:{
    paddingLeft: 20,
    fontSize: 18,
    margin: 5,
  },

  touchStyle: {
    height: 50,
    marginLeft: 10,
    padding: 10,

  },

})



export default RootNavigator;
