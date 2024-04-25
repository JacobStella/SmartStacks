import{View, Text, LogBox, StyleSheet, ListRenderItem, FlatList, Button, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, {useState, useEffect, useRef, useNavigation, useRoute} from 'react';
import SliderHeader from './SliderHeader';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import { RotateInDownLeft } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getUserData, getJSONfield, getUserClassesAndStacks, addClass, getClassAndSets, getClass, getClassFromData, setClass, addStack, addCard, fetchSetWithCards} from './CardUI';
import Login from './Login';
import ViewCard from './ViewCard';
import {onLibrary} from '../../.././App';
import { setClassesAsync } from './CardUI';
import { TextInput } from 'react-native-gesture-handler';
import { filter, forEach, head } from 'lodash';

LogBox.ignoreAllLogs();

const Library = ({navigation}) => {
    const [allClassesAndStacks, setAllClassesAndStacks] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [allStacks, setAllStacks] = useState([]);

    const [Classes, setClasses] = useState([]);
    const [Stacks, setStacks] = useState([]);
    const [Cards, setCards] = useState([]);


    const [ClassOnly, setClassOnly] = useState(true);
    const [CardOnly, setCardOnly] = useState(false);
 
    const [itemData, setItemData] = useState();

    const [getClassCur, setClassCur] = useState();
    const [headerTextVisible, setHeaderTextVisible] = useState();


    const [getVisisble, setVisible] = useState(false);
    const [BackArrowVisible, BackArrowSetVisible] = useState(false);
    const [EmptyHeader, setEmptyHeader] = useState(true);
    const [classId, setClassId] = useState('');
    const sheet = React.useRef();
    const scrollRef = useRef();

    const [viewCardIsVisible, setViewCardIsVisible] = useState(false);

    const [getSearchText, setSearchText] = useState(false);

    const [curItem, setCurItem] = useState();

    const [inSearch, setInSearch] = useState();

    const [getDescription, setDescription] = useState();

    const [getClassName, setClassName] = useState();

    const fetchUserId = async () => {
        const userId = await getJSONfield(getUserData, "id");

        const classAndSets = await getClassAndSets(userId);
        setAllClassesAndStacks(classAndSets);
        let totalClasses = classAndSets.map(field => ({Title: field.className, IsClass: true, Cards: field.Card, Id: field._id}));
        setClasses(totalClasses);
        setClassesAsync(totalClasses);
        setAllClasses(totalClasses);
        let outerSets = classAndSets.map(field => (field.sets));
        let nestedSets = outerSets.flat();
        let finalSets = nestedSets.map(field => ({Title: field.SetName, IsPublic: field.public, Cards: field.Card, Description: field.Description, Id: field._id}));
        setAllStacks(finalSets);
        setStacks(finalSets);
        setInSearch(false);
        setHeaderTextVisible(true);
    };

    React.useEffect(() => {
        fetchUserId();
    }, []);

    React.useEffect(() => {
        const leavePage = navigation.addListener('focus', () => {
            fetchUserId();
            setCards([]);
            setClasses([]);
            setStacks([]);
            setEmptyHeader(true);
            setClassOnly(true);
            setViewCardIsVisible(false);
            BackArrowSetVisible(false);
            setItemData(null);
        });
    }, [navigation]);

    const openSheet = (item) => {
        let stackName = item.Title;
        for(let i = 0; i < Stacks.length; i++){
            if(Stacks[i].Title == stackName){
                setDescription(Stacks[i].Description);
            }
        }
        sheet.current.open();
    };
    const closeSheet = () => {
        sheet.current.close();
    };

    const ScrollToTop = () => {
        scrollRef.current?.scrollToOffset({
            y:0, animated: true
        });
    };

    const LoginNav = async (item) => {
        if(item.IsClass){
            setClassOnly(true);
            setClasses([]);
            setStacks([]);
            StackFilter(item.Title);
            setItemData(item);      
        }
        else{
            let filteredCards = await CardFilter(item.Id);
            setCards(filteredCards);
            setItemData(item);
            setViewCardIsVisible(true);
        }
        BackArrowSetVisible(true);
        setEmptyHeader(false);
        ScrollToTop();
    };

    const ViewAll = () => {
        setEmptyHeader(true);
        if(!item.IsClass && viewCardIsVisible){
            setViewCardIsVisible(false)
            setCards([]);
        }
        setInSearch(false);
        BackArrowSetVisible(false);
        setClassOnly(true);
        setClasses(allClasses);
        setStacks(allStacks);
        setCards([]);
        setViewCardIsVisible(false)
        setItemData(null);
    };

    const CardFilter = async (setId) => {
        try{
            let temp = await fetchSetWithCards(setId);
            const filteredCards = temp.cards.map((field, index) => ({Title: field.Term, Definition: field.Definition, Index: index}));
            return filteredCards;
        }catch(error){
            console.log(error);
        }
    };

    const StackFilter = async (className) => {
        const classCur = getClassFromData(allClassesAndStacks,className);
        const filteredSets = classCur.sets;
        const filteredSets2 = filteredSets.map(field => ({Title:field.SetName, IsClass: false, Cards: field.Card, Id: field._id, Description: field.Description}));
        setStacks(filteredSets2);
    };

    const filterDescription = (data,className) =>{
        data.forEach(item =>{
            if(item.Title == className){
                return item.Description;
            }
        })
    };

    const SearchData = (searchData) => {
        setCards([]);
        data.forEach(item =>{
            if(searchData == item.Title){
                BackArrowSetVisible(true);
                setItemData(item);
                setCurItem(item);
                setInSearch(true);
                setCards([]);
                setStacks([]);
                setClasses([]);
                if(item.IsClass){
                    setClasses([item]);
                    return;
                } else{
                    setStacks([item]);
                    return;
                }
            }
        })
    };

    const StackHeader = () => {
        item = itemData;
        if(item == undefined || inSearch){
            return(
                <View>
                    <Text style={styles.headerText}></Text> 
                    {BackArrowVisible &&
                    <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "#09BC8A"/></TouchableOpacity>}
                </View>
            )
        } else{
            if(item.IsClass || !viewCardIsVisible){
                return(
                    <View style = {styles.header}>
                        <Text style={styles.headerText}>Class: {item.Title}</Text> 
                        {BackArrowVisible && 
                        <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "#D8DCFF"/></TouchableOpacity>}
                    </View>
                );
            }
            else{
                setHeaderTextVisible(false);
                return(
                    <View style = {styles.header}>
                        <Text style={styles.headerText}>Stack: {item.Title}</Text>
                        {BackArrowVisible && 
                        <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "#09BC8A"/></TouchableOpacity>}
                    </View>
                );
            }
        }
    };

    const data = [...Classes, ...Stacks, ...Cards];
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    let currentIndex = 0;
   
    const renderSetRow = ({item, index, navigation}) => {
        currentIndex = index;
        if(currentIndex == Classes.length && Classes.length %2 != 0 ){
            return LineBreak();
        }
        return(
            <View style={styles.stackContainer}>
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == true && inSearch && curItem.IsClass && <Text style = {styles.stackTitleText}>Your Folder</Text>}
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == true && inSearch && curItem.IsPublic && <Text style = {styles.stackTitleText}>Your Stack</Text>}
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == true && !inSearch && <Text style = {styles.stackTitleText}>Folders</Text>}
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 0 && ClassOnly == false && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 1 && ClassOnly == false && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 1 && ClassOnly == true && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}

                <TouchableOpacity onPress = {() => LoginNav(item)}>
                    <View style={styles.stackBox}>
                        <View style = {styles.stackBoxInner}>
                            {item.IsClass && (<Ionicons name = "ellipsis-vertical" size = {20} color = "black" style = {item.IsClass && styles.iconIsVisible}/>)}
                            {!item.IsClass && (<Ionicons name = "ellipsis-vertical" size = {20} color = "black" onPress = {() => openSheet(item)}/>)}
                        </View>
                        <Text style={styles.stackText}>
                            {item.Title}
                            {item.classId}
                        </Text>
                        <Text style={styles.stackText}>
                            {item.cardNumber}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    if(viewCardIsVisible){
        return (
            <View style ={styles.container}>
                <StackHeader data = {itemData}></StackHeader>
                <ViewCard cards = {Cards}></ViewCard>
            </View>
        )
    } else{    
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style ={styles.container}>
                <StackHeader data = {itemData}></StackHeader>
                <TextInput style={styles.searchContainer}
                placeholder='Search' 
                clearButtonMode='always'
                placeholderTextColor={'#09BC8A'}
                onChangeText={(text) => setSearchText(text)} 
                onSubmitEditing={() => SearchData(getSearchText)}
                />
                <FlatList
                    ref={scrollRef} 
                    data = {data}
                    renderItem={renderSetRow}
                    keyExtractor={(item, index) => {
                        return index;
                    }} 
                    numColumns={2}
                    showsVerticalScrollIndicator = {false}
                    ItemSeparatorComponent={() => {
                        if(currentIndex == Classes.length && Classes.length %2 !== 0){
                            return StackBreak();
                        } else if(currentIndex == Classes.length-1 && Classes.length %2 == 0){
                            return StackBreak();
                        }
                        else{
                            return null;
                        }
                    }}
                /> 
                <RBSheet
                    customStyles={{container: styles.sheet}}
                    height ={380}
                    openDuration={250}
                    closeDuration={150}
                    ref = {sheet}
                >
                    <View>
                        <View style = {styles.innerSheet}>
                            <Ionicons style = {styles.icon} name = "book" size = {50} color = "#508991"/>
                            <Text style = {styles.sheetTitle}>
                                Stack Description
                                {'\n'}
                                {getDescription}
                            </Text>
                            <Text>{'\n'}</Text>
                            <TouchableOpacity style = {styles.sheetButton} title = "Close" onPress = {closeSheet}><Text style = {styles.sheetButtonText}>Close</Text></TouchableOpacity>
                        </View>
                    </View>
                </RBSheet>
            </View>
            </TouchableWithoutFeedback>
        );
    }
};

const StackBreak = () => {
    return(
    <>
        <View style={styles.line}></View>
        <Text style={styles.stackTitleText}>Stacks</Text>
    </>
    );
}
const LineBreak = () => {
    return(
        <>
            <View style={styles.line}></View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#508991',
    },
    stackContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        backgroundColor: '#508991',
    },
    stackBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',     
    },
    stackBoxHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'flex-end',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,  
    },
    stackBox: {
        flex: 1,
        backgroundColor: "#D8DCFF",
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 3,
    },
    stackBoxInner: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "#004346",
        padding : 1,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'flex-end',
    },
    stackText:{
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
    },
    stackTitleText:{
        fontSize: 25,
        fontWeight: '900',
    },
    stackTitleTextFiller:{
        color: 'transparent',
        fontSize: 25,
        fontWeight: '900',
    },
    stackTitleTextReset:{
        justifyContent: 'flex-end',
        fontSize: 25,
        fontWeight: '900',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20,
    },
    sheet:{
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: "#004346",
        borderColor: 'black',
        borderWidth: 5,
    },
    innerSheet:{
        padding: 24,
        alignItems: 'stretch',
    },
    sheetTitle: {
        fontSize: 25,
        color: 'black',
        marginTop: 15,
        textAlign: 'center',
        backgroundColor: "#508991",
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 5,
        fontWeight: '900',
        padding: 10,
    },
    sheetDescriptionText: {
        fontSize: 16,
        color: 'black',
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        backgroundColor: "#004346",
    },
    innerSheetText: {
        fontSize: 12,
        color: 'black',
        marginTop: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    sheetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'fff',
        borderColor: 'black',
        borderWidth: 5,
        backgroundColor: "#508991",
    },
    sheetButtonText: {
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
    },
    icon: {
        textAlign: 'center',
    },
    iconIsVisible: {
        color: 'transparent',
    },
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#004346',
        flexDirection: "row",
        borderWidth: 3,
        marginTop: 2,
    },
    headerIcon: {
        position: 'absolute',
        right: '90%',
        backgroundColor: "#09BC8A",
        borderRadius: 20,
    },
    headerText: {
        fontSize: 28,
        color: '#D8DCFF',
        fontWeight: 'bold',
    },
    searchContainer: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: '1%',
        paddingLeft: 10,
        height: '8%',
        marginRight: '5%',
        marginLeft: '5%',
        backgroundColor: '#172A3A',
        color: '#09BC8A',
    },
});

export default Library;