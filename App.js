import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      active: false,
      disabled:false,
    };
  }
  
  onChangedPass = (props => {this.props.onChangedPass(this.props.id)});

  letterClick = () => {
    this.setState({ 
      active: true,
      disabled: true,
    });

    var hit = false;
    for (let i = 0; i < this.props.pass.length; i++)
      if (this.props.pass.charAt(i) === String.fromCharCode(this.props.id + 65))
        hit = true;

    if (hit) {
      this.setState({ correct: true });
      this.props.onChangedPass(this.props.id)
    } else {
      this.setState({ correct: false });
      this.props.onChangedPass(-1);
    }
  };
  render() {
    return (
      <TouchableOpacity
       style={this.state.active ? this.state.correct ?  styles.letterButtonGreen   :   styles.letterButtonRed : styles.letterButton } 
      onPress={this.letterClick }
      disabled={this.state.disabled}
      >
        <Text style={styles.buttonText}>
          {String.fromCharCode(this.props.id + 65)}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default class App extends React.Component {
  state = {
    shouldDisplayGame: false,
    pass: '',
    passHash: '',
    amount: 0,
    end: false,
    win: false,
  };

  onChangeText = pass => this.setState({ pass });

  onPassAdd = () => {
    let temp = '';
    for (let i = 0; i < this.state.pass.length; i++) {
      if (this.state.pass.charAt(i) === ' ') temp = temp + ' ';
      else temp = temp + '_';
    }
    this.setState({
      shouldDisplayGame: true,
      passHash: temp,
      pass: this.state.pass.toUpperCase(),
    });

  };
  
   handleChangedPass = (index) => {
    let temp = this.state.passHash;
		for(let i=0; i<this.state.pass.length; i++)
			if (this.state.pass.charAt(i) === String.fromCharCode(index+65) ){
				temp = temp.substr(0, i) + String.fromCharCode(index+65) + temp.substr(i+1);
      }
    
      console.log(index);
    if(index===-1){
      const change = this.state.amount+1;
	  	this.setState({amount: change});
      if(this.state.amount>=4){
        this.setState({end: true});
      }
    }  
    
		this.setState({passHash: temp});
		if(this.state.pass===temp){
			this.setState({
				win: true,
				end:true,
			});
    }
	}

  createTable = () => {
    let table = [];
    for (let i = 0; i < 26; i++)
      table.push(<Letter key={i} id={i} pass={this.state.pass} onChangedPass={this.handleChangedPass}/>);
    return table;
  };

  renderGame = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.header}>
        {this.state.passHash}
      </Text>
      {this.state.end ? 
      this.state.win ?
      <Text style={styles.gameEnd}>Wygrana!</Text>
      : <Text style={styles.gameEnd}>Przegrana!</Text>
       : <View style={styles.letterContainer}>
       {this.createTable()}
       </View>}
       <Text style={styles.score}>{this.state.amount}/5</Text>
    </View>

  );

  renderForm = () => (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={this.onChangeText}
        value={this.state.pass}
      />
      <TouchableOpacity style={styles.inputButton} onPress={this.onPassAdd}>
        <Text style={styles.buttonText}>Wprowadź hasło</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { shouldDisplayGame } = this.state;
    return (
      <View style={styles.container}>
        {shouldDisplayGame ? this.renderGame() : this.renderForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
  },
  input: {
    backgroundColor: '#eee',
    height: 50,
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  inputButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  gameContainer: {
    paddingVertical: 50,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    color: '#000',
    textAlign: 'center',
    letterSpacing: 5,
  },
  gameEnd: {
    marginVertical: '50%',
    fontSize: 30,
  },
  letterContainer: {
    marginVertical:50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  letterButton: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    width:45,
    height:45,
  },
  letterButtonGreen: {
    backgroundColor: '#116f11',
    opacity: .7,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    width:45,
    height:45,
  },
  letterButtonRed: {
    backgroundColor: '#d51f1f',
    opacity: .7,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    width:45,
    height:45,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  score: {
    fontSize:50,
    color: '#000',
    textAlign: 'center',
  },
});
