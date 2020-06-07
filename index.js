import * as React from 'react';
import {useEffect, useState} from 'react';
import { Platform, View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput, Modal, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, Divider, Input, Overlay, CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Theme from './theme.style.js';
import Assets from './assets.manager.js';
import CustomIcon from './icons.js';

var styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
      padding: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  bullet: {
    width: 10
  },
  bulletText: {
    flex: 1,
    color: 'rgba(0, 0, 0, 0.7)'
  },
  boldText: {
    fontWeight: 'bold'
  },
  normalText: {
    color: 'rgba(0, 0, 0, 0.7)'
  },
    container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item: {
    backgroundColor: 'orange',
    width: Theme.screen.w / 2,
    height: Theme.screen.h / 2,
    margin: 5
  },
  image: {
    width: Theme.screen.w / 2,
    height: Theme.screen.h / 2
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000090',
    padding: 30
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: '#00000090',
    padding: 0
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20
  },
  modalTitle: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalText: {
    padding: 5,
    fontSize: 16,
    color: 'gray',
    marginTop: 10
  },
});

const ModalDialogContainer = (props) => {
  const Content = props.content;
  return (
    <View style={{flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 1, backgroundColor: '#00000060'}}>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1,backgroundColor: '#00000060'}}></TouchableOpacity>
        <View style={{flex: 10, backgroundColor: '#fff'}}>
          <Content props />
        </View>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
    </View>)
}

const ul = function(props){

  const [drop, setdrop] = useState(false);

  const renderlist = (dataset) => {
    return dataset.map((data, index) => {
      return (
      <View key={index} style={ styles.row }>
        <View style={ styles.bullet }>
          <Text>{'\u2022' + " "}</Text>
        </View>
        <View style={ styles.bulletText }>
          <Text>
            <Text style={ styles.normalText }>{data.label}</Text>
          </Text>
        </View>
      </View>)
    })
  }

  return (
  <View style={{backgroundColor: 'red'}}>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity activeOpacity={1} style={{flex: 1, flexDirection: 'row'}} onPress={() => {setdrop(!drop)}}>
        <Text style={{flex:3, marginTop: 15, fontWeight: 'bold'}}>{props.title}</Text>
        <View style={{flex: 1, flexDirection: 'column-reverse', alignItems: 'flex-end', fontWeight: 'normal'}}>
          <Icon name={drop ? "expand-more" : "chevron-right"} color="gray" />
        </View>
      </TouchableOpacity>
    </View>
    {drop ? <View style={ styles.column }>{renderlist(props.list || [])}</View> : null}
  </View>)
}

const product = function(props){
  return (
    <TouchableOpacity onPress={props.onPress || null} style={{flexBasis: '45%', width: '45%', padding: 5, margin: '2.5%', borderRadius: 15, borderWidth: 0.08}}>
      <View style={{borderRadius: 15, height: props.height || 120, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={props.image || {uri: null}} style={{width: '90%', height: '90%', borderRadius: 15, resizeMode: 'contain'}} />
      </View>
      <Text style={{padding: 10, fontSize: 16, color: Theme.colors.textPrimary}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const loyaltycard = function(props){
  return (
    <TouchableOpacity onPress={props.onPress || null} style={{flexBasis: '45%', width: '45%', margin: '2.5%', borderRadius: 15, borderWidth: 0.08}}>
      <View style={{height: props.height || 120, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={props.image} style={{width: '100%', height: '100%', borderTopLeftRadius: 15,borderTopRighRadius: 15, resizeMode: 'stretch'}} />
      </View>
      <Text style={{padding: 10, color: Theme.colors.darkGray, fontSize: 16, textAlign: 'center'}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const card = function(props){

  let h = props.height ? props.height : 170

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={ props.disabled || 0} style={{flex: 1, height: h, margin: 5, borderRadius: 15, elevation: 0, borderTopLeftRadius: 15,
              borderTopRightRadius: 15}}>
      <View style={{flex: 1, height: h - 30}}>
        <Image 
          source={props.image} 
          style={
            {
              flex:1,
              alignSelf: 'stretch',
              resizeMode: 'stretch',
              width: undefined,
              height: undefined,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15
            }} 
        />
      </View>
      <Text style={{backgroundColor: '#fff', padding: 10, marginBottom: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, fontSize: 16, color: 'gray', textAlign: props.titlealign || 'center', elevation: 0}}>{props.title}</Text>
    </TouchableOpacity>)
}

const button = function(props){
  return (<Button title={props.title} type={props.type}/>)
}

const input = function(props){
  return (<Input
    leftIcon={props.leftIcon || {}}
    placeholder={props.placeholder}
    errorStyle={props.errorStyle || {}}
    errorMessage={props.errorMessage}
  />)
}

const icon = function(props){
  return (<Image source={Assets.icons[props.name]} style={{width: props.size || 20, height: props.size || 20, resizeMode: 'cover'}} />)
}

const transaction = function(Props){
  const props = Props.data
  return (
    <View style={{flex: 1, width: '95%', marginLeft: '2.5%', marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 0.1, borderRadius: 5, elevation: 0.3}}>
      <Text style={{fontFamily: 'Arial', color: Theme.colors.darkerGray}}>{props.date || '12 Feb 2020, 04:27 PM'}</Text>
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 3, paddingTop: 5, paddingBottom: 5}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontFamily: 'Arial', color: Theme.colors.darkerGray}}>{props.station || 'APP'}</Text>
            <View style={{flex: 4, flexDirection: 'row'}}>
              <CustomIcon.AntDesign name={props.rating >= 1 ? "star" : "staro"} color={Theme.colors.yellow} size={16} />
              <CustomIcon.AntDesign name={props.rating >= 2 ? "star" : "staro"} color={Theme.colors.yellow} size={16} />
              <CustomIcon.AntDesign name={props.rating >= 3 ? "star" : "staro"} color={Theme.colors.yellow} size={16} />
              <CustomIcon.AntDesign name={props.rating >= 4 ? "star" : "staro"} color={Theme.colors.yellow} size={16} />
              <CustomIcon.AntDesign name={props.rating >= 5 ? "star" : "staro"} color={Theme.colors.yellow} size={16} />
            </View>
          </View>
        </View>
        <View style={{flex: 5, paddingTop: 5, paddingLeft: 5, paddingBottom: 5}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontFamily: 'Arial', fontWeight: 'bold', color: Theme.colors.black}}>{"\u20B1"} {Theme.formatter.CRNCY(props.total_amount) || "0.00"}</Text>
            <Text style={{fontFamily: 'Arial', color: Theme.colors.darkerGray}}>Earned: {Theme.formatter.CRNCY(props.earned) || "0.00"} PTS</Text>
            <Text style={{fontFamily: 'Arial', color: Theme.colors.darkerGray}}>Redeemed: {Theme.formatter.CRNCY(props.redeemed) || "0.00"} PTS</Text>
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 5, paddingBottom: 5}}>
          <TouchableOpacity onPress={Props.onPress}><CustomIcon.Feather name="chevron-right" size={40} color={Theme.colors.primary} /></TouchableOpacity>
        </View>
      </View>
    </View>
    )
}

const transactiontable = function(Props){
  const transaction = Props.data;
  const items = Props.data.items || [];  
  const renderItem = () => {
    return items.map((item, index) => {
      return (
        <View key={index} style={{flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, paddingTop: 10, alignItems: 'center'}}>
          <Text style={{flex: 4,fontFamily: 'Arial', textAlign: 'left', fontSize: 13, color: "black"}}>{item.item}</Text>
          <Text style={{flex: 2,fontFamily: 'Arial', fontWeight: 'bold', textAlign: 'center', fontSize: 13}}>{item.quantity}</Text>
          <Text style={{flex: 2, fontFamily: 'Arial', fontWeight: 'bold',textAlign: 'right', fontSize: 13}}>{"\u20B1"} {Theme.formatter.CRNCY(item.price)}</Text>
        </View>)
    })
  }

  return (<View style={{width: '100%'}}>
          
          {/* TABLE HEADER */}
          <Divider />
            <View style={{flex: 1, flexDirection: 'row', padding: 15, alignItems: 'center'}}>
              <Text style={{flex: 4, height: 15, fontFamily: 'Arial', color: '#000', textAlign: 'center'}}>Products</Text>
              <Text style={{flex: 2, height: 15, fontFamily: 'Arial', color: '#000',textAlign: 'center'}}>Qty</Text>
              <Text style={{flex: 2, height: 15, fontFamily: 'Arial', color: '#000', textAlign: 'center'}}>Price</Text>
            </View>
          <Divider />
          {/* TABLE HEADER */}

          {/* TABLE CONTENT */}
          <ScrollView style={{ width: '100%', height: 170}}>
            {renderItem()}
            <View style={{padding: 10}}></View>
          </ScrollView>
          {/* TABLE CONTENT */}
          
          <Divider />
            <View style={{flex: 1, flexDirection: 'row', padding: 15, marginTop: 10, alignItems: 'center'}}>
              <Text style={{flex: 4, height: 30, fontFamily: 'Arial', fontWeight: 'bold', fontSize: 20, textAlign: 'left', color: Theme.colors.darkGray}}>Total</Text>
              <Text style={{flex: 2, height: 30, fontFamily: 'Arial', fontWeight: 'bold', fontSize: 20, textAlign: 'right'}}>{"\u20B1"} {Theme.formatter.CRNCY(transaction.total_amount)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 15, alignItems: 'center'}}>
              <Text style={{flex: 4, height: 30, fontFamily: 'Arial', textAlign: 'left', fontSize: 16, color: Theme.colors.darkGray}}>Earned</Text>
              <Text style={{flex: 2,height: 30, fontFamily: 'Arial', textAlign: 'right', fontSize: 16, color: "#000"}}>{Theme.formatter.CRNCY(transaction.earned)} PTS</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15, marginTop: 5, marginBottom: 20, alignItems: 'center'}}>
              <Text style={{flex: 4, height: 30, fontFamily: 'Arial', textAlign: 'left', fontSize: 16, color: Theme.colors.darkGray}}>Redeemed</Text>
              <Text style={{flex: 2, height: 30, fontFamily: 'Arial', textAlign: 'right', fontSize: 16, color: "#000"}}>{Theme.formatter.CRNCY(transaction.redeemed)} PTS</Text>
            </View>
          <Divider />

        </View>)
}

const custominput = function(props){
  let customstyle = props.style || {}
  let customtitlestyle = props.titlestyle || {}
  let fontsize = props.fontsize || 16
  let inactiveborderwidth = props.inactiveborderwidth || 0.75
  let activeborderwidth = props.activeborderwidth || 1.5
  const input = () => {
    return (
    <View style={{flex: 1, marginBottom: 15, ...customstyle}}>
      <Text style={{padding: 5, paddingLeft: 15, fontSize: 12, color: props.focused ? Theme.colors.accent : Theme.colors.darkGray, ...customtitlestyle}}>{props.title}</Text>
      <Input
        focused={props.focused|| false}
        disabled={props.disabled || false}
        keyboardType={props.keyboardType || 'default'}
        maxLength={props.maxLength || undefined}
        value={props.value || null}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        containerStyle={{padding: 0}}
        inputContainerStyle={{padding: 0, borderBottomWidth: props.focused ? 1.5 : 0.75, borderColor: props.focused ? Theme.colors.accent : props.disabled ? "lightgray" : "black" }}
        inputStyle={{padding: 5, fontFamily: 'Arial', fontSize: 16, borderWidth: 0}}
      />
      {props.bottomText ? <View><Text style={{paddingLeft: 15, marginTop: 5, fontSize: 14, color: Theme.colors.darkGray}}>{props.bottomText}</Text></View> : null}
      {props.bottomOption ? 
        <View><Text style={{paddingLeft: 15, marginTop: 5, fontSize: 14, color: Theme.colors.darkGray}}>If you wish to change this, please contact</Text>
        <TouchableOpacity onPress={props.onContact || null}>
          <Text style={{paddingLeft: 15, fontSize: 14, color: Theme.colors.accent}}>Unioil Customer Service</Text>
        </TouchableOpacity></View> : null }
    </View>)
  }
  const select = () => {
    return (
    <View style={{flex: 1, marginBottom: 15, ...customstyle}}>
      <Text style={{padding: 5, paddingLeft: 15, fontSize: fontsize, color: props.focused ? Theme.colors.accent : Theme.colors.darkGray,...customtitlestyle}}>{props.title}</Text>
      <TouchableOpacity onPress={props.onPress} style={{padding: 10, ...customstyle}}>
        <View style={{padding: 0, borderBottomWidth: props.focused ? activeborderwidth : inactiveborderwidth, borderColor: props.focused ? Theme.colors.accent : props.disabled ? "lightgray" : "black" }}>
          <Text style={{fontSize: fontsize, fontFamily: 'Arial', paddingLeft: 5, paddingBottom: 10}}>{props.value || ""}</Text>
        </View>
      </TouchableOpacity>
      {props.bottomText ? <View><Text style={{paddingLeft: 15, marginTop: 5, fontSize: 14, color: Theme.colors.darkGray}}>{props.bottomText}</Text></View> : null}
      {props.bottomOption ? 
        <View><Text style={{paddingLeft: 15, marginTop: 5, fontSize: 14, color: Theme.colors.darkGray}}>If you wish to change this, please contact</Text>
        <TouchableOpacity onPress={props.onContact || null}>
          <Text style={{paddingLeft: 15, fontSize: 14, color: Theme.colors.accent}}>Unioil Customer Service</Text>
        </TouchableOpacity></View> : null }
    </View>)
  }
  return props.type == "input" ? input() : select();
}

const checkboxdialog = function(props){

  if(!props.shown) return null;
  let itemsCount = props.items.length;
  let size;

  if(itemsCount == 2) size = 1.1;
  else if (itemsCount == 4) size = 2.2;

  const renderItems = () => {
    return props.items.map((item, index) => {
      if(item.string == "") return null
      let color = props.selected == item.value ? Theme.colors.accent : Theme.colors.darkGray;
      let bullet = props.selected == item.value ? "radiobox-marked" : "radiobox-blank";
      return (
      <TouchableOpacity key={index} onPress={() => props.onSelect(item.value, item.string)} style={{flexDirection: 'row', alignItems: 'flex-start', padding:5, marginTop: 10}}>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', padding: 2.5}}>
            <CustomIcon.MaterialCommunityIcons color={color} name={bullet} size={25} />
          </Text>
        </View>
        <View style={{flex: 5}}><Text style={{padding: 5, color: Theme.colors.darkGray, fontSize: 16}}>{item.string}</Text></View>
      </TouchableOpacity>)
    })
  }

  return (
    <View style={{flex: 1, width: '100%', height: '100%', top: Platform.OS == 'ios' ?  45 : 0, position: 'absolute', zIndex: 1, backgroundColor: '#00000060'}}>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 35, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
      <View style={{flex: size, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
        <View style={{flex: 12, backgroundColor: '#fff'}}>


          <View style={{width: '100%', backgroundColor: '#fff', padding: 20}}>
            <View style={{padding: 10}}>
              <Text style={{fontWeight: 'bold', fontFamily: 'Arial', fontSize: 18, color: Theme.colors.darkerGray}}>{props.title}</Text>
            </View>
            <View style={{marginTop: 5}}>
              {props.items ? renderItems() : null}
            </View>
          </View>


        </View>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 35, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
    </View>
  )
}

const inputdialog = function(props){
  if(!props.shown) return null;
  let value = "";
  return (
    <View style={{flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 1, backgroundColor: '#00000060'}}>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 30, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
        <View style={{flex: 12, backgroundColor: '#fff'}}>


          <View style={{width: '100%', backgroundColor: '#fff', padding: 15}}>
            <View style={{padding: 10}}>
              <Text style={{fontWeight: 'bold', fontFamily: 'Arial', fontSize: 19, color: Theme.colors.darkerGray}}>{props.title}</Text>
            </View>
            <View style={{marginTop: 5, padding: 10}}>
              <TextInput 
                onChangeText={(val) => value = val} 
                placeholder={props.placeholder || ""} 
                style={{padding: 0, paddingTop: 15, paddingBottom: 0, fontSize:18, borderColor: 'gray',borderBottomWidth: 1}}
              />
            </View>
            <View style={{ marginTop: 15, marginBottom: 0, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={props.onCancel} style={{padding: 10, marginRight: 5}}>
                <Text style={{color: Theme.colors.accent, fontWeight: 'bold'}}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.onSubmit(value) } style={{padding: 10, marginLeft: 5}}>
                <Text style={{color: Theme.colors.accent, fontWeight: 'bold'}}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        
        
        </View>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 30, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
    </View>
  )
}

const confirmdialog = function(props){
  if(!props.shown) return null;
  let value = "";
  return (
    <View style={{flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 1, backgroundColor: '#00000060'}}>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 30, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
        <View style={{flex: 12, backgroundColor: '#fff'}}>

          <View style={{width: '100%', backgroundColor: '#fff', padding: 15}}>
            <View style={{padding: 10}}>
              <Text style={{fontWeight: 'bold', fontFamily: 'Arial', fontSize: 19, color: Theme.colors.darkerGray}}>{props.title}</Text>
            </View>
            <View style={{marginTop: 5, padding: 10}}>
              <Text style={{fontFamily: 'Arial', fontSize: 16, width: '90%', color: Theme.colors.darkGray}}>{props.message}</Text>
            </View>
            <View style={{ marginTop: 15, marginBottom: 0, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={props.onCancel} style={{padding: 10, marginRight: 5}}>
                <Text style={{color: Theme.colors.accent, fontWeight: 'bold'}}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.onSubmit(value) } style={{padding: 10, marginLeft: 5}}>
                <Text style={{color: Theme.colors.accent, fontWeight: 'bold'}}>{props.buttonConfirmText || "CONFIRM"}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 30, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
    </View>
  )
}

const infodialog = function(props){
  if(!props.shown) return null;
  let value = "";
  return (
    <View style={{flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 1, backgroundColor: '#00000060'}}>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 15, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
        <View style={{flex: 12, backgroundColor: '#fff'}}>

          <View style={{width: '100%', backgroundColor: '#fff', padding: 15}}>
            <View style={{padding: 10}}>
              <Text style={{fontWeight: 'bold', fontFamily: 'Arial', fontSize: 19, color: Theme.colors.darkerGray}}>{props.title}</Text>
            </View>
            <View style={{marginTop: 5, width: '100%', padding: 5}}>
              <Text style={{fontFamily: 'Arial', fontSize: 17, padding: 5, color: Theme.colors.darkGray}}>{props.message}</Text>
            </View>
            <View style={{ marginTop: 15, marginBottom: 0, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => props.onSubmit(value) } style={{padding: 10, marginLeft: 0}}>
                <Text style={{color: Theme.colors.accent, fontWeight: 'bold'}}>{props.buttonConfirmText || "OK"}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, backgroundColor: '#00000060'}}></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onCancel} activeOpacity={1} style={{flex: 1, padding: 15, width: '100%', backgroundColor: '#00000060'}}></TouchableOpacity>
    </View>
  )
}

const datepicker = function(props){
  if(!props.shown) return null;

  console.log("Triggered", Platform.OS)

  if(Platform.OS == 'ios'){
    return <datepickerIOS props />
  }

  return (
    <DateTimePicker
      testID={props.id}
      timeZoneOffsetInMinutes={0}
      value={props.value != null ? new Date(props.value) : null || new Date("Jan 01 1990")}
      mode={"date"}
      is24Hour={true}
      display="spinner"
      style={{width:'100%'}}
      onChange={(event, selectedDate) => props.onChange(selectedDate ? moment(selectedDate).format(props.returnFormat) : props.value != null ? props.value : null)}
    />
  )
}

const datepickerIOS = function(props){
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.shown}
    >
      <TouchableOpacity style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, width: '100%', ...props.style || {}}}>
        <DateTimePicker
          testID={props.id}
          timeZoneOffsetInMinutes={0}
          value={props.value != null ? new Date(props.value) : null || new Date("Jan 01 1990")}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          style={{flex: 1}}
          onChange={(event, selectedDate) => props.onChange(selectedDate ? moment(selectedDate).format(props.returnFormat) : props.value != null ? props.value : null)}
        />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const nointernet = function(props){
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', top: Platform.OS == 'ios' ? 50 : 0}}>
      <Text style={{padding: 10, fontSize: 16, textAlign: 'center', bottom: Platform.OS == 'ios' ? 50 : 0}}>{props.message}</Text>
      <TouchableOpacity onPress={props.onPress} style={{backgroundColor: Theme.colors.primary, borderRadius: 10, padding: 14.5, paddingHorizontal: 35, bottom: Platform.OS == 'ios' ? 50 : 0}}>
        <Text style={{color: "#fff", fontSize: 16}}>{props.buttonText}</Text>
      </TouchableOpacity>
    </View>)
}

const infomodaldialog = function(props){
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity onPress={props.onClose} style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, ...props.style || {}}}>
          <Text style={styles.modalTitle}>{props.title}</Text>
          <Text style={styles.modalText}>{props.message}</Text>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={{flex: 3}}></View>
            <TouchableOpacity style={{flex: 2, padding: 5}}>
              <Text style={{textAlign: 'right', fontWeight: 'bold', color: Theme.colors.accent}}></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onClose} style={{flex: 1, padding: 5}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', color: Theme.colors.accent}}>OK</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const popup = function(props){
  return props.visible ?
    <View style={{position: 'absolute', zIndex: 100, width: '100%', padding: 15, bottom: 0, backgroundColor: Theme.colors.darkerGray}}>
      <Text style={{padding: 0, color: "#fff"}}>{props.message}</Text>
    </View> : null
}

const loader = function(props){
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, width: '100%', ...props.style || {}}}>
          <Text style={{...styles.modalTitle, fontSize: 20}}>Connecting</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={50} color={Theme.colors.accent} />
            </View>
            <View style={{flex: 4}}>
              <Text style={{...styles.modalText}}>{props.message || "Please wait, connecting to server..."}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const logoutdialog = function(props){
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity onPress={props.onClose} style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, ...props.style || {}}}>
          <Text style={styles.modalTitle}>{props.title}</Text>
          <Text style={styles.modalText}>{props.message}</Text>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={{flex: 3}}></View>
            <TouchableOpacity onPress={props.onClose} style={{flex: 2, padding: 5}}>
              <Text style={{textAlign: 'right', fontWeight: 'bold', color: Theme.colors.accent}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onSubmit} style={{flex: 1, padding: 5}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', color: Theme.colors.accent}}>OK</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const nointernet2 = function(){
  Alert.alert(
    'Error',
    '\nSlow or no internet connection. Please check your internet connection.\n',
    [
      {
        text: 'OK'
      },
    ],
    {cancelable: true}
  );
}

const bottomselectmodal = function(props){
  let color = Theme.colors.textPrimary
  let items = props.items || []
  const renderContent = () => {
    return items.map((data, index) => {
      return (
        <TouchableOpacity onPress={data.onPress || null} key={index} style={{flexDirection: 'row', paddingBottom: index < items.length - 1 ? 30 : 0, bottom: Platform.OS == 'ios' ? 15 : 0,}}>
          {data.icon ? 
          <Text style={{flex: 0.4}}>
            <CustomIcon.MaterialCommunityIcons name={data.icon} size={25} color="#00000095" />
          </Text> : null}          
          <Text style={{flex: 3, color: color, fontSize: 14, padding: 5}}>{data.label}</Text>
        </TouchableOpacity>
      )
    })
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity onPress={props.onClose} style={styles.bottomView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, width: '100%', padding: 30, paddingHorizontal: 20, ...props.style || {}}}>
          <View style={{flexDirection: 'column'}}>
            {renderContent()}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const promoGPS = function(props){
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity onPress={props.onDismiss} style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{...styles.modalView, ...props.style || {}, padding: 0}}>
          <Image 
            source={props.image} 
            style={{width: Theme.screen.w - 60, height: Theme.screen.h / 3.5, resizeMode: "stretch"}}
          />
          <View style={{padding: 20}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'arial', color: Theme.colors.accent}}>
              {props.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 20, paddingTop: 15}}>
            <View style={{flex: 1}}></View>
            <TouchableOpacity onPress={props.onDismiss} activeOpacity={1} style={{flex: 1}}>
              <Text style={{color: Theme.colors.accent, fontWeight: 'normal', fontFamily: 'arial'}}>DISMISS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onOpen} activeOpacity={1} style={{flex: 1}}>
              <Text style={{color: Theme.colors.accent, fontWeight: 'normal', fontFamily: 'arial'}}>SEE DETAILS</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const notification = function(props){
  return (
    <Modal
      ref={props.ref}
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onDismiss}
    >
      <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} style={styles.centeredView}>
        <TouchableOpacity activeOpacity={1} style={{
          ...styles.modalView, 
          ...props.style || {},
          padding: 0, 
          width: Theme.screen.w - 60,
          borderRadius: 10
          }}>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'arial', color: Theme.colors.primary}}>
              {props.title}
            </Text>
          </View>
          <View style={{padding: 20, marginBottom: 20 }}>
            <Text style={{fontSize: 16, fontWeight: 'normal', textAlign: 'center', fontFamily: 'arial', color: Theme.colors.textPrimary}}>
              {props.message}
            </Text>
          </View>
          <TouchableOpacity onPress={props.onClose} activeOpacity={0.5} style={{padding: 15, height: 50, alignItems: 'center', backgroundColor: Theme.colors.primary, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View style={{flex: 1, padding: 0}}>
              <Text style={{color: "#fff", fontWeight: 'normal', fontFamily: 'arial'}}>CLOSE</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default {
  product,
  card,
  button,
  input,
  ul,
  loyaltycard,
  icon,
  transaction,
  transactiontable,
  custominput,
  checkboxdialog,
  inputdialog,
  confirmdialog,
  infodialog,
  datepicker,
  datepickerIOS,
  nointernet,
  infomodaldialog,
  popup,
  loader,
  logoutdialog,
  nointernet2,
  bottomselectmodal,
  promoGPS,
  notification
}
