import AsyncStorage from '@react-native-async-storage/async-storage';


export const setUserData = async (data) => {
    try{
        await AsyncStorage.setItem('userId', JSON.stringify(data));
       
    }
    catch(e){
        console.log("Couldn't store the user ID", e);
    }

    };

export const getUserData = async () => {
    try{
        const userId = await AsyncStorage.getItem('userId');
        return JSON.parse(userId);
    }
    catch(e){
        console.log("Couldn't get the userId", e);
        return null;
    }

};
//An efficient way to retrieve specific value data from a JSON
export const getJSONfield = async (key, value) => {
    try {
        const data = await getUserData(key);
        if(data){
            const dataJSON = JSON.parse(data);
            return dataJSON[value];
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log("Couldn't get the field data", e);
        return null;
    }
};

export const getUserClassesAndStacks = async(userId, searchTerm) => {
    try {
        const res = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/search?userId=${userId}&searchTerm=${encodeURIComponent(searchTerm)}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if(!res.ok){
            console.log("Not ok");
        }
        
        const resData = await res.json();
        return resData;
    }
    catch (e){
        console.log("Class and Set data couldn't be retrieved", e);
        return null;
    }
};

export const addClass = async(userId, className) => {
    
    let classObj = {userId: userId, className: className};
    let classJson = JSON.stringify(classObj);

    try {
        const response = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/addclass`,{
            method: 'POST',
            body: classJson,
            headers: {'Content-Type': 'application/json'}
        });
        
        let res = await response.json();      
        console.log(`Class added successfully ${res.classId}`);  
        
    }
    catch (e){
        console.log("Class couldn't be added", e);
        return null;
    }
};

export const addCard = async (userId, term, definition, setId) => {

    let cardObj = {
        userId: userId,
        term: term,
        definition: definition,
        setId: setId,
    }

    let js = JSON.stringify(cardObj);
    console.log(cardObj);
    try{
        const response = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/addcard`,{
        method: 'POST',
        body: js,
        headers: {'Content-Type': 'application/json'}
    });
    
    let res = await response.json();

    if(res.error){
        console.log("API Error: ", + res.error);
    }
    else{
        console.log(res);
        console.log('Card added');

    }
    }
    catch(e){
        console.log("Error, couldn't connect to API");
    }
    
};



export const getClassAndSets = async(classId) => {
    
    try{
        const response = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/getClassAndSets/${classId}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    if(!response.ok){
        console.log("Could not get class and sets");
    }
    const classAndSets = await response.json();
    classAndSets.forEach((stack, element) => {
    
     });
    return classAndSets;

    }
    catch(e){
        console.log("Error, couldn't fetch class and sets", e);
    }


};


export const getClassFromData = (classAndSets, className) => {
    
    
     let classToReturn = '';
     classAndSets.forEach((stack) => {
         if(stack.className == className){
           classToReturn = stack;
         }
         
    });
    if(classToReturn == ''){
        console.log("That class could not be found");
    }
    return classToReturn;


};


export const setClass = async (className, classData) => {
    try{
        await AsyncStorage.setItem(className, JSON.stringify(classData));
        console.log(JSON.stringify(classData)); 
    }
    catch(e){
        console.log("Couldn't store the class", e);
    }

    };

    export const addStack = async (userId, StackName, isPublic, classId, description) => {
        let stackTemp = {UserId: userId, SetName: StackName, public: isPublic, classId: classId, Description: description};
        let stackActual = JSON.stringify(stackTemp);
        try{
            const stackResponse = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/addset`, {
                method: 'POST',
                body: stackActual,
                headers: {'Content-Type': 'application/json'}
            });
            if(stackResponse){
                console.log("The stack was added!")
                return stackResponse;
            }

        }
        catch(e){
            console.log("Couldn't store the stack", e);
        }
    
    };

export const fetchSetWithCards = async (setId) => {
    
    try{
        const response = await fetch(`https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/getset/${setId}`);
            if(!response.ok){
                console.log("Response not ok");
            }
            else{
            const data = await response.json();
            console.log("Succesfully got the set with cards");
            return data;
            }
        }catch(e){
            console.log("The set couldn't be fetched.");
    }
};

export const setOnLibrary = async (data) => {
    try{
        await AsyncStorage.setItem('libraryState', JSON.stringify(data));
       
    }
    catch(e){
        console.log("Couldn't store the library state", e);
    }

    };

export const getOnLibrary = async () => {
    try{
        const libraryState = await AsyncStorage.getItem('libraryState');
        return JSON.parse(libraryState);
    }
    catch(e){
        console.log("Couldn't get the library state", e);
        return null;
    }


    
};

export const setClassesAsync = async (data) => {
    try{
        await AsyncStorage.setItem('Classes', JSON.stringify(data));
       
    }
    catch(e){
        console.log("Couldn't store the library state", e);
    }

};

export const getClassesAsync = async () => {
    try{
        const classes = await AsyncStorage.getItem('Classes');
        return JSON.parse(classes);
    }
    catch(e){
        console.log("Couldn't get the current classes", e);
        return null;
    }


    
};


