

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;


export     const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 3) return 'Name must be at least 3 characters long';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email address';
        break;
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!phoneRegex.test(value)) return 'Invalid phone number';
        break;
      case 'gender':
        if (!value) return 'Gender is required';
        break;
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        break;
      case 'location':
        if (!value) return 'District is required';
        break;
      case 'city':
        if (!value) return 'City is required';
        break;
      default:
        return '';
    }
    return '';
  };


  export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }


  export const  KERALA_DISTRICTS = {
    Kasaragod: {
      cities: ['Kasaragod', 'Nileshwar', 'Kanhangad', 'Cheruvathur']
    },
    Kannur: {
      cities: ['Kannur', 'Thalassery', 'Payyanur', 'Mattanur']
    },
    Wayanad: {
      cities: ['Kalpetta', 'Sultan Bathery', 'Mananthavady', 'Meenangadi']
    },
    Kozhikode: {
      cities: ['Kozhikode', 'Vadakara', 'Koyilandy', 'Ramanattukara']
    },
    Malappuram: {
      cities: ['Malappuram', 'Manjeri', 'Tirur', 'Ponnani']
    },
    Palakkad: {
      cities: ['Palakkad', 'Ottapalam', 'Shornur', 'Chittur']
    },
    Thrissur: {
      cities: ['Thrissur', 'Chalakudy', 'Kunnamkulam', 'Irinjalakuda']
    },
    Ernakulam: {
      cities: ['Kochi', 'Aluva', 'Angamaly', 'Perumbavoor']
    },
    Idukki: {
      cities: ['Painavu', 'Thodupuzha', 'Munnar', 'Adimali']
    },
    Kottayam: {
      cities: ['Kottayam', 'Pala', 'Changanassery', 'Vaikom']
    },
    Alappuzha: {
      cities: ['Alappuzha', 'Chengannur', 'Kayamkulam', 'Haripad']
    },
    Pathanamthitta: {
      cities: ['Pathanamthitta', 'Thiruvalla', 'Adoor', 'Ranni']
    },
    Kollam: {
      cities: ['Kollam', 'Karunagappally', 'Punalur', 'Kottarakkara']
    },
    Thiruvananthapuram: {
      cities: ['Thiruvananthapuram', 'Neyyattinkara', 'Attingal', 'Varkala']
    }
  }


