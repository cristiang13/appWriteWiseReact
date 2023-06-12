
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const BASE_URL = process.env.REACT_APP_BASE_URL;


// const BASE_URL = 'http://127.0.0.1:8000';



export const submitDailyReport = async (token,rangeAgeDailyReport, date, activities) => {
 
  try {
    const response = await fetch(`${BASE_URL}/api/daily_report/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        date,
        rangeAgeDailyReport,
        activities,
      }),

    });

    const data = await response.json();
    // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const submitCriticalReflection = async(token,date,description)=>{
  try {
    const response = await fetch(`${BASE_URL}/api/critical_reflection/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          token,
          date,
          description
          
      }),
    });

    const data = await response.json();
  //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const submitGoal = async (token,date,name,age,goals) => {
    try {
      const response = await fetch(`${BASE_URL}/api/goal_report/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
            date,
            name,
            age,
            goals,
        }),
      });
  
      const data = await response.json();
    //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

export const submitObservations = async (token,date,name,age,goalObservations,descriptions) => {
    try {
      const response = await fetch(`${BASE_URL}/api/observations_report/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
            date,
            name,
            age,
            goalObservations,
            descriptions
          
         
        }),
      });
  
      const data = await response.json();
    //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

export const submitChat = async(message, messages)=>{

  try {
    const response = await fetch(`${BASE_URL}/api/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       message,
       messages,
      }),
    });

    const data = await response.json();
  //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

}

export const submitChatToAustralia = async(message, messages)=>{

  try {
    const response = await fetch(`${BASE_URL}/api/to_do_australia/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       message,
       messages,
      }),
    });

    const data = await response.json();
  //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error in submit to do australia');
    throw error;
  }

}

export const submitWeeklyReflection = async(token,date,description_reflection) =>{
  try {
    const response = await fetch(`${BASE_URL}/api/weekly_reflection/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        date,
        description_reflection
      }),

    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in submitWeeklyReflection');
    throw error;
  }
}
export const submitWeeklyPlanning  = async(token,date,range_age,goals) =>{
  try {
    const response = await fetch(`${BASE_URL}/api/weekly_planning/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        date,
        range_age,
        goals
      }),

    });

    const data = await response.json();
    // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


// request to log in and sign up
export const registerUser = async (username, email, password, phone,userType) => {
  try {

    const response = await fetch(`${BASE_URL}/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
        userType
      }),
    });

    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      // Lanza un error si el inicio de sesión no es exitoso
      const error = new Error(data.error);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUser = async (token)=>{
  try {

    const response = await fetch(`${BASE_URL}/users/get-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
      }),
    });

    const data = await response.json();
  
    if (response.ok) {
      return data;
    } else {
      // Lanza un error si el inicio de sesión no es exitoso
      const error = new Error(data.error);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
      // Verificar si el inicio de sesión es exitoso
      if (response.ok) {
        return data;
      } else {
        // Lanza un error si el inicio de sesión no es exitoso
        const error = new Error(data.error);
        error.response = response;
        throw error;
      }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


// request to historical reports
// export const submitSaveReport = async (token,typeReport,report,childName,childId,age,goalObservations) => {
export const submitSaveReport = async ( 
  token,
  typeReport,
  report,
  childName = null,
  childId = null,
  age = null,
  goalObservations = null,
  rangeAge = null,
  rangeAgeDailyReport = null,
  goalFollowUp = null,
) => {
  let body;
  switch (typeReport) {
      case 'Daily Report':
        body = { token, typeReport, report, rangeAgeDailyReport };
          break;
      case 'Weekly Planning':
          body = { token, typeReport, report, rangeAge };
          break;
      case 'Goal Report':
          body = { token, typeReport, report, childName, childId, age };
          break;
      case 'Follow up':
          body = { token, typeReport, report, childName, childId, age, goalFollowUp };
          break;
      case 'Descriptions Report':
          body = { token, typeReport, report, childName, childId, age, goalObservations };
          break;
      default:
          body = { token, typeReport, report };
          break;
  }

 
  try {
    const response = await fetch(`${BASE_URL}/api/save_report/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   token,
      //   typeReport,
      //   report,
      //   childName,
      //   childId,
      //   age,
      //   goalObservations
      // }),
      body: JSON.stringify(body),

    });

    const data = await response.json();
    // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const submitHistoricalReport = async(token,typeReport) =>{
      
      try {
        const response = await fetch(`${BASE_URL}/api/historical_report/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            typeReport,
            
          }),
    
        });
    
        const data = await response.json();
        // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const submitGetHistoricalReport = async(token) =>{
  try {
   
    const response = await fetch(`${BASE_URL}/api/get_historical_report/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
      }),

    });

    const data = await response.json();
    // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const submitGetVariablesReports = async(token,typeReport) =>{
  try {
    const response = await fetch(`${BASE_URL}/api/get_variables_reports/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        typeReport
      }),

    });

    const data = await response.json();
    // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }    
}

export const submitWeeklyReflectionByDays = async(token,description) => {
      
      try {
       
        const response = await fetch(`${BASE_URL}/api/days_to_weekly_reflection/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            description
          }),
    
        });
        const data = await response.json();
        // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      } 
}

export const submitFollowUp = async(token,date,name,age,goalFollowUp,descriptionsFollowUp) => {
  try {
    const response = await fetch(`${BASE_URL}/api/follow_up/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          token,
          date,
          name,
          age,
          goalFollowUp,
          descriptionsFollowUp

      }),
    });

    const data = await response.json();
  //   await AsyncStorage.setItem('report', JSON.stringify(data['message']));
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } 
}


export const requestPasswordReset = async (email) => {
  const response = await fetch(`${BASE_URL}/users/request-password-reset/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${BASE_URL}/users/reset-password/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, new_password: newPassword }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};


export const fetchLastDocumentData = async (token, typeReport) => {
  try {
    const response = await fetch(`${BASE_URL}/api/get_last_variable/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        typeReport
      }),
    });
      const data = await response.json();
      // await AsyncStorage.setItem('report', JSON.stringify(data['message']));
       return data;    
  } catch (error) {
      console.error("Error getting last document:", error);
  }
};

// export const checkSubscription = async(token)=>{
//   try {
//     const response = await fetch(`${BASE_URL}/users/check_subscription/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token
//       }),
//     });

//     const data = await response.json();
    
//       // Verificar si el inicio de sesión es exitoso
//       if (response.ok) {
//         return data;
//       } else {
//         // Lanza un error si el inicio de sesión no es exitoso
//         const error = new Error(data.error);
//         error.response = response;
//         throw error;
//       }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

export const createStripeCheckoutSession = async (email) => {
  try {

    const response = await fetch(`${BASE_URL}/users/create_checkout_session/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, priceId: 'price_1N2MoBC0hQJYRjaPqWGGHKMo'  }),
    });

    const data = await response.json();
    return data.id; //
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const paymentSubscription= async(token,email,name)=>{
  try {
    const response = await fetch(`${BASE_URL}/users/payment-subscription/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name,token}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const updateHadSuccessfulSubscription = async(userId, hadSuccessfulSubscription)=> {
  const response = await fetch(`${BASE_URL}/users/had-subscription/`, {
      method: 'POST', // or 'PUT', depending on how your API handles updates
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          'token': userId,
          'had_successful_subscription': hadSuccessfulSubscription,
      }),
  });

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}


export const sendDiscountEmail = async(token)=>{
  try {
    const response = await fetch(`${BASE_URL}/users/send-discount-email/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const submitGetReferralLink = async(token)=>{
  try {
    const response = await fetch(`${BASE_URL}/users/get-referral-link/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const registerReferral = async(token,referralCode)=>{
  try {
    const response = await fetch(`${BASE_URL}/users/register-referral/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token,referralCode}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const addNewChild = async(token,childName,childAge,childCare)=>{ 
  try {
    const response = await fetch(`${BASE_URL}/childs/add-child/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token,childName,childAge,childCare }),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const getListChilds = async(token)=>{
  try {
    const response = await fetch(`${BASE_URL}/childs/get-childs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export const submitCreateWord = async(token,selectedReports)=>{
  try {
    const response = await fetch(`${BASE_URL}/api/create-word/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token,selectedReports}),
        });
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

