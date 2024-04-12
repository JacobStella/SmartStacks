import AsyncStorage from '@react-native-async-storage/async-storage';


export const setUserData = async (data) => {
    try{
        await AsyncStorage.setItem('userId', JSON.stringify(data));
        //console.log("hiiiiiiiiiiii");
        console.log(JSON.stringify(data));
    }
    catch(e){
        console.log("Couldn't store the user ID", e);
    }

    };

export const getUserData = async () => {
    try{
        const userId = await AsyncStorage.getItem('userId');
        //console.log(JSON.parse(userId));
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
            //console.log(dataJSON[value]);
            
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
        //console.log("User Classes and Stacks", resData);
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

        console.log(res);
      
          console.log(`Class added successfully ${res.classId}`);  
        
    }
    catch (e){
        console.log("Class couldn't be added", e);
        return null;
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
    console.log('Class and sets:', classAndSets);

    }
    catch(e){
        console.log("Error, couldn't fetch class and sets", e);
    }


};