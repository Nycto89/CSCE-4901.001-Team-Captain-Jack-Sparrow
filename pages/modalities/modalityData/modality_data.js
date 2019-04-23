var KidneyTransplant = [
    {
            heading: 'What Does it Mean to Have a Transplant?',
            text: 'A healthy kidney is placed inside your body to perform the work your own kidneys can no longer do. These kidneys can last between 12 to 15 years on average. During this time, dialysis isn’t needed.',
            photo: require('../../../images/stock_images/giving.jpg')
    },
    {
            heading: 'Where do the Kidneys Come From?',
            text: 'Donated kidneys may come from someone who passed away OR from a living donor. A healthy person who donates a kidney can live a normal life with the kidney they have left. The wait list for deceased donor kidneys is three to five years. Kidneys from living donors can be transplanted faster. The operations are done on the same day and can be scheduled at a convenient time for both the patient and the donor.',
            photo: require('../../../images/stock_images/long_queue_outdoors.jpg')
    },
    {
            heading: 'Getting a Transplant',
            text: '1) Ask your nephrologist or healthcare provider to refer you to a transplant center for evaluation OR contact a transplant center in your area.\n2) The transplant center professionals will provide a complete physical exam, review your health records and conduct testing and x-rays to evaluate your ability to receive surgery.\n3) Find a living donor or join the waiting list for a deceased donor kidney. If you are on the waitlist, you may have to be on dialysis during this time.\n4) Next step: Transplant \nSurgery!',
            photo: require('../../../images/stock_images/woman-doctor.jpg')
    },
    {
        data: [
            {
                name: 'Pro1',
                description: 'Fewer limits on what you can eat or drink',
                icon: require('../../../images/food_drink.png')
            },
            {
                name: 'Pro2',
                description: 'Possibility of living a longer life and the kind of life you were living before your kidney disease',
                icon: require('../../../images/healthy.png')
            }
        ],
        heading: "Benefits"      
    },
    {
        data: [
            {
                name: 'Con1',
                description: 'Risks of surgery'
            },
            {
                name: 'Con2',
                description: 'Need to take anti-rejection medications for the length of time your new kidney is working The medication may contain side effects and may cause a higher risk for infections/certain types of cancer',
                icon: require('../../../images/medicine.png')
            },
            {
                name: 'Con3',
                description: 'Transplant requires you to be healthy enough to receive the operation. You must also be free from cancer and any infections'
            },
            {
                name: 'Con4',
                description: 'Every person will get a full medical and psychosocial evaluation to ensure they are a good candidate',
                icon: require('../../../images/search.png')
            }
        ],
        heading: "Considerations"
    }
];

var PeritonealData = [
	{
		heading: 'What is Peritoneal Dialysis?',
        text: 'Peritoneal Dialysis or PD is a home dialysis option. In PD, the inside lining of your own belly acts as a natural filter. A cleansing fluid called Dialysate, washes in and out of your abdominal cavity in cycles, which removes fluids and waste products.',
        photo: require('../../../images/stock_images/dialysis_center.jpg')
    },
	{
		heading: 'How does Peritoneal Dialysis Work?',
        text: 'A soft plastic tube is placed in your belly through surgery. Dialysate is moved in and out of your belly through this catheter. When the solution is inside your body, it draws excess fluids and waste products from your system and then is drained out through the catheter.',
        photo: require('../../../images/stock_images/catheter.jpg')
    },
	{
		heading: 'Where to Start',
        text: 'Receiving a PD catheter requires outpatient surgery; patients usually go home on the same day. It may require healing within a few weeks, but the catheter may be used almost immediately.',
        photo: require('../../../images/stock_images/surgery_doc.jpg')
    },
    {
        type: [
            {
               name:  'Continuous Ambulatory Peritoneal Dialysis (CAPD)',
               description: 'A “continuous”, machine-free dialysis where exchanges of dialysate are done 4 to 5 times a day while the patient is awake and doing normal activities. Each exchange takes about 30 minutes. The fluid containing the wastes removed from your body is drained out and replaced by fresh dialysate.'
            },
            {
                name: 'Automated Peritoneal Dialysis (APD)',
                description: 'A machine called a Cycler delivers and then drains the solution for you. The treatment is usually done at night while you sleep. Your physician may order you to keep fluid dwelling during the day in addition to your cycles at night depending on how much dialysis you need.'
            }
        ],
        heading: 'Two Types of \nPeritoneal Dialysis'
    },
    {
        data: [
            {
                name: 'Pro1',
                description: 'PD is effective in cleaning the blood daily over hemodialysis, which usually cleans the blood 3 days a week.'
            },
            {
                name: 'Pro2',
                description: 'You can control extra fluid more easily. This may decrease stress on the heart and blood vessels'
            },
            {
                name: 'Pro3',
                description: 'You are able to eat more and take fewer medications',
                icon: require('../../../images/food_drink.png')
            },
            {
                name: 'Pro4',
                description: 'It is easier to work or travel with this type of dialysis',
                icon: require('../../../images/travel.png')
            },
            {
                name: 'Pro5',
                description: 'PD may help preserve whatever remaining kidney function you have when starting dialysis',
                icon: require('../../../images/healthy.png')
            },
            {
                name: 'Pro6',
                description: 'You have the flexibility of making your own schedule',
                icon: require('../../../images/calendar_1.png')
            },
            {
                name: 'Pro7',
                description: 'There are no needles used',
                icon: require('../../../images/no_needle.png')
            },
            {
                name: 'Pro8',
                description: 'You can contact a 24/7 on-call PD nurse via phone for any concerns or issues',
                icon: require('../../../images/nurse_call.png')
            },
            {
                name: 'Pro9',
                description: 'Once the catheter site is healed, patients will be allowed to take showers'
            }
        ],
        heading: "Benefits"      
    },
    {
        data: [
            {
                name: 'Con1',
                description: 'Not everyone can be a candidate for PD. It may not be possible if you’ve had multiple abdominal surgeries.',
                icon: require('../../../images/search.png')
            },
            {
                name: 'Con2',
                description: 'PD requires training and the ability to perform all the steps of the treatment on their own or with a partner. Your dialysis center will provide the training necessary for this treatment.'
            },
            {
                name: 'Con3',
                description: 'PD is generally done every day'
            },
            {
                name: 'Con4',
                description: 'This treatment requires a clean, dry and temperature controlled area to store your supplies in your home.'
            },
            {
                name: 'Con5',
                description: 'It’s important to keep your catheter area clean in order to prevent infection. Your PD nurse will offer training to educate you on how to prevent infections'
            }
        ],
        heading: "Considerations"
    }
];

var InCenterData = [
    {
        heading: 'What is In-Center Hemodialysis?',
        text: 'In-Center Hemodialysis is a procedure where you go to a dialysis clinic 3 days per week in order to have your blood cleaned of waste products and excess fluids. These treatments last anywhere from 3 to 5 hours for daytime hemodialysis or around 8 hours for nocturnal (night-time) hemodialysis.',
        photo: require('../../../images/stock_images/center.png')
    },
    {
        heading: 'How does it Work?',
        text: 'Before treatment can begin, you will need a surgical procedure that creates an access site under your skin. This site allows blood to flow from your body to the dialysis machine for filtering and then returns to your body cleaned. There are three types of hemodialysis access options: a fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood vessels and has less risk of infection and clotting issues.'
    },
    {
        heading: 'The Routine for Hemodialysis',
        text: '1) Go to dialysis center. Your weight will be checked to see how much fluid needs to be removed by dialysis.\n2) Wash access site to prevent infection.\n3) A dialysis center professional will take your blood pressure, pulse and temperature, then they’ll perform a physical assessment.\n4) A professional will place two needles in your access. Your access site is connected to the tubing on the hemodialysis machine and the treatment begins.\n\t You will be regularly monitored during your treatment to make sure you are tolerating it well.\n5) Sit back, relax, watch tv or do something else you enjoy while the professionals take care of you.\n6) At the end of treatment, your needles are removed and a pressure dressing is applied.\n7) Vitals are checked and weight recorded to determine how much fluid is removed.\n8) You’re now free to go home and resume your normal activities.\n',
        photo: require('../../../images/stock_images/incenter_help.jpg')
    },
    {
        data: [
            {
                name: 'Pro1',
                description: 'Different Scheduling Options: Includes evenings'
            },
            {
                name: 'Pro2',
                description: 'Going to the Dialysis Center can be a social activity where you can get to know people who relate to your experience',
                icon: require('../../../images/chat.png')
            },
            {
                name: 'Pro3',
                description: 'You will have regular visits from a nephrologist, dietician and social worker'
            }
        ],
        heading: "Benefits"      
    },
    {
        data: [
            {
                name: 'Con1',
                description: 'Hemodialysis requires needles',
                icon: require('../../../images/needle.png')
            },
            {
                name: 'Con2',
                description: 'Treatment is usually in a big room with other patients, meaning less privacy. This room is also kept in a cool temperature, which may be uncomfortable. You may want to bring a sweater or blanket.'
            },
            {
                name: 'Con3',
                description: 'Some common dialysis related symptoms are cramps, nausea and fatigue.'
            },
            {
                name: 'Con4',
                description: 'Traveling is more difficult as you will need to contact another dialysis facility and plan your schedule according to their availability.',
                icon: require('../../../images/travel.png')
            },
            {
                name: 'Con5',
                description: 'What you eat and drink is limited in order to maintain your health',
                icon: require('../../../images/no_food.png')
            },
            {
                name: 'Con6',
                description: 'It is important to complete your entire treatment session to receive the full benefits. Stopping even 5 minutes early can affect your health.',
                icon: require('../../../images/clock.png')
            }
        ],
        heading: "Considerations"
    }
];

var NightData = [
    { 
        heading: 'What is Nocturnal Dialysis?',
        text: 'Nocturnal or Overnight Dialysis is a slower, longer hemodialysis treatment that takes place at night while you sleep. This longer treatment is for six to eight hours, three times a week. This process requires that you sleep at the dialysis center overnight. Dialysis professionals who are skilled in performing hemodialysis, manage the treatments.',
        photo: require('../../../images/stock_images/moon.jpg')
    },
    {
        heading: 'How does it Work?',
        text: 'Before treatment can begin, you will need a surgical procedure that creates an access site under your skin. This site allows blood to flow from your body to the dialysis machine for filtering and then returns to your body cleaned. There are three types of hemodialysis access options: a fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood vessels and has less risk of infection and clotting issues.',
        photo: require('../../../images/stock_images/alarm_clock.jpg')
    },
    {
        data: [
            {
                name: 'Pro1',
                description: 'Treatment is slower and last a longer period of time, meaning the process is gentler on your body and easier to tolerate.',
                icon: require('../../../images/clock.png')
            },
            {
                name: 'Pro2',
                description: 'Overnight treatment allows for a freer daytime schedule',
                icon: require('../../../images/calendar_1.png')
            },
            {
                name: 'Pro3',
                description: 'There are less chances of side effects such as cramping or low blood pressure'
            },
            {
                name: 'Pro4',
                description: 'Diet is less strict',
                icon: require('../../../images/food_drink.png')
            },
            {
                name: 'Pro5',
                description: 'The environment is much quieter and relaxed than daytime hemodialysis'
            }
        ],
        heading: "Benefits"      
    },
    {
        data: [
            {
                name: 'Con1',
                description: 'Some people might find it difficult to sleep while being dialyzed. '
            },
            {
                name: 'Con2',
                description: 'Nocturnal dialysis programs are not available in every dialysis clinic.'
            },
            {
                name: 'Con3',
                description: 'Treatment requires needles',
                icon: require('../../../images/needle.png')
            },
            {
                name: 'Con4',
                description: 'Treatment is usually in a big room with other patients, meaning less privacy. This room is also kept in a cool temperature, which may be uncomfortable. You may want to bring a sweater or blanket'
            },
            {
                name: 'Con5',
                description: 'Traveling is more difficult as you will need to contact another dialysis facility and plan your schedule according to their availability',
                icon: require('../../../images/travel.png')
            },
            {
                name: 'Con6',
                description: 'You will need to stay at your dialysis center three times a week, meaning you cannot stay at home with your loved ones during treatment.'
            },
            {
                name: 'Con7',
                description: 'Your social worker and dietician will usually not be available during nocturnal treatment, so you will need to contact and plan to meet with them during daytime operations.'
            }
        ],
        heading: "Considerations"
    }
];

var HomeData = [
    {
        heading: 'What is Home Hemodialysis?',
        text: 'Home Hemodialysis is a home dialysis option. Hemodialysis is a treatment that replaces the work of your own kidneys to remove wastes and extra fluid from your bloodstream. This is done using a special filter called a dialyzer or artificial kidney. You can do hemodialysis at home by yourself or with a care partner. This allows you to fit your treatments within a schedule. You along with your care partner will receive training at your local dialysis center in order to safely perform these treatments at home.',
        photo: require('../../../images/stock_images/house.jpg')
    },
    {
        heading: 'How does it Work?',
        text: 'You will need surgery to create an access for hemodialysis. This access is quite literally, your lifeline; a way to reach your bloodstream and be able to clean your blood using the dialysis machine and return it safely back to your body. There are three types of access sites for home hemodialysis: fistula, graft or catheter. Fistula is considered the best option for people because it is your own blood vessels and has less risk of infection and clotting issues. Using a dialysis machine at home, you’ll perform treatments usually 4 to 5 times per week.'
    },
    {
        data: [
            {
                name: 'Pro1',
                description: 'You can perform this treatment in the comfort of your home'
            },
            {
                name: 'Pro2',
                description: 'The schedule is more frequent, making it gentler on your system. Side effects are more rare.',
                icon: require('../../../images/calendar_1.png')
            },
            {
                name: 'Pro3',
                description: 'Only need to visit your clinic a couple times a month to check with your nurse'
            },
            {
                name: 'Pro4',
                description: 'Diet is less strict',
                icon: require('../../../images/food_drink.png')
            },
            {
                name: 'Pro5',
                description: 'Travel easier by bringing your home hemodialysis machines',
                icon: require('../../../images/travel.png')
            },
            {
                name: 'Pro6',
                description: 'You can contact a 24/7 on-call home nurse via phone for any concerns or issues',
                icon: require('../../../images/nurse_call.png')
            }
        ],
        heading: "Benefits"      
    },
    {
        data: [
            {
                name: 'Con1',
                description: 'If you need a care partner, make sure they are reliable and willing to complete training with you'
            },
            {
                name: 'Con2',
                description: 'Either you or your care partner must be comfortable inserting needles in your access. You will receive training at how to perform this task safely by your dialysis center',
                icon: require('../../../images/needle.png')
            },
            {
                name: 'Con3',
                description: 'This treatment requires a clean, dry and temperature controlled area to store your supplies and perform hemodialysis.'
            }
        ],
        heading: "Considerations"
    }
];

export {KidneyTransplant};
export {PeritonealData};
export {NightData};
export {InCenterData};
export {HomeData};