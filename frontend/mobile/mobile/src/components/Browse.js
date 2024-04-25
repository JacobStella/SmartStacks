import{View, Text, StyleSheet, FlatList, TouchableOpacity, LogBox} from 'react-native'
import React, {useState, useEffect, useRef} from 'react';
import {Ionicons} from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getClassFromData, fetchSetWithCards} from './CardUI';
import ViewCard from './ViewCard';
import { TextInput } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();


const Browse = ({navigation}) => {

    
    const [Stacks, setStacks] = useState([]);
    const [Cards, setCards] = useState([]);
    const [cardsReady, setCardsReady] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [BackArrowVisible, BackArrowSetVisible] = useState(false);
    const [viewCardIsVisible, setViewCardIsVisible] = useState(false);
    const [getSearchText, setSearchText] = useState(false);
    const [inSearch, setInSearch] = useState(false);
    const [getDescription, setDescription] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [publicStacks, setPublicStacks] = useState([]);
    const sheet = React.useRef();
    const scrollRef = useRef();

const updatePublicStacks = (newStacks) => {
        setPublicStacks(newStacks);
    };

const fetchPublicSearch = async (searchTerm) => {
    let obj = { searchTerm: searchTerm };
    let js = JSON.stringify(obj);

    try {
        const response = await fetch("https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/public-search", {
            method: 'POST',
            body: js,
            headers: {'Content-Type': 'application/json'}
        });

        let res = await response.json();

        if (res.error) {
            alert(res.error);
        } else {
            // Filter sets with public status true and update state
            const publicSets = res.sets.filter(set => set.public === true);
            const filteredSets2 = publicSets.map(field => ({Title:field.SetName, IsClass: false, Cards: field.Card, Id: field._id, Description: field.Description}));
            updatePublicStacks(filteredSets2);
            setStacks(filteredSets2);
        }
    } catch (e) {
        alert(e.toString());
    }
};

useEffect(() => {
    handleSearch(" ");
}, []);

const handleSearch = async (event) => {
    await fetchPublicSearch(searchInput);
};

React.useEffect(() => {
    const leavePage = navigation.addListener('focus', () => {
        handleSearch();
        setStacks(publicStacks);
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

const LoggedInNav = async (item) => {
    //Item contains the set data. Use it to display cards in ViewCard.
    setItemData(item);
    let filteredCards = await CardFilter(item.Id);
    setCards(filteredCards);
    BackArrowSetVisible(true);
    setViewCardIsVisible(true);
    setCardsReady(true);
    ScrollToTop();
 };

const CardFilter = async (setId) => {
    
    try{
        const temp = await fetchSetWithCards(setId);
        const filteredCards = temp.cards.map((field, index) => ({Title: field.Term, Definition: field.Definition, Index: index}));
        return filteredCards;
    }catch(error){
        console.log(error);
    }

};

const SearchData = (searchData) => {

    data.forEach(item =>{
        if(searchData == item.Title){
            BackArrowSetVisible(true);
            setInSearch(true);
            setItemData(item);
            setAllStacks([item]);
        }
        else{
            console.log("Error");
        }
    })

};

const ViewAll = () => {
    setInSearch(false);
    setAllStacks([]);
    setClasses([]);
    setViewCardIsVisible(false);
    BackArrowSetVisible(false);
    setCardsReady(false);
    handleSearch();    
};

const StackHeader = () => {
    item = itemData;
    if(viewCardIsVisible){
        return(
            <View style = {styles.header}>
            <Text style={styles.headerText}>Stack: {item.Title}</Text> 
            {BackArrowVisible && 
            <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "#D8DCFF"/></TouchableOpacity>}
            </View>
            )
    }
    else if(inSearch){
        return(
                <View style = {styles.header}>
                <Text style={styles.headerText}>Your Results</Text> 
                {BackArrowVisible && 
                <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "#D8DCFF"/></TouchableOpacity>}
                </View>
                )
    }
    else{  
        return(
                <View style = {styles.header}>
                <Text style={styles.headerText}>Browse Public Stacks</Text>
                </View>
        );
    }
};
    
    const data = [...Stacks];
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    let currentIndex = 0;
   
    const renderSetRow = ({item, index}) => {
        
        currentIndex = index;

        return(
            
                <View style={styles.stackContainer}>
                
                <TouchableOpacity onPress = {() => LoggedInNav(item)}>
                <View style={styles.stackBox}>
                    
                <View style = {styles.stackBoxInner}>
                    <Text></Text>
                <Ionicons name = "ellipsis-vertical" size = {20} color = "black" onPress = {() => openSheet(item)} style = {styles.stackBoxInnerLeft}/>
                
                </View>
                
                <Text style={styles.stackText}>
                    {item.Title}    
                </Text>
                <Text style={styles.stackText}>
                    {item.cardNumber}
                </Text>

                </View>
                </TouchableOpacity>
                

                </View>
                
        );
    
    };


    if(cardsReady){

        return(
            <View style ={styles.container}>
                <StackHeader data = {itemData}></StackHeader>
                <ViewCard cards = {Cards}></ViewCard>
            </View>
        )
    }else{

        return(
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
            


        );
}
};

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



export default Browse;