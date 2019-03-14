import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


export default class CalendarPage extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Calendar Page!</Text>
          <Button
            title="Back to home"
            onPress={() =>
              this.props.navigation.navigate('Home')
            }
          />
          {/* <Calendar
                // Specify style for calendar container element. Default = {}
            style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350
            }}
            // Collection of dates that have to be colored in a special way. Default = {}
            markedDates={
                {'2019-02-26': {textColor: 'green'},
            }} 
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                markingType={'period'}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
          /> */}

          {/* <CalendarList
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
                /> */}

            <Agenda
              // the list of items that have to be displayed in agenda. If you want to render item as empty date
              // the value of date key kas to be an empty array []. If there exists no value for date key it is
              // considered that the date in question is not yet loaded
              items={
                {'2012-05-22': [{text: 'item 1 - any js object'}],
                '2012-05-23': [{text: 'item 2 - any js object'}],
                '2012-05-24': [],
                '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                }}
              // callback that gets called when items for a certain month should be loaded (month became visible)
              loadItemsForMonth={(month) => {console.log('trigger items loading')}}
              // callback that fires when the calendar is opened or closed
              onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
              // callback that gets called on day press
              onDayPress={(day)=>{console.log('day pressed')}}
              // callback that gets called when day changes while scrolling agenda list
              onDayChange={(day)=>{console.log('day changed')}}
              // initially selected day
              selected={'2012-05-16'}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2012-05-30'}
              // Max amount of months allowed to scroll to the past. Default = 50
              pastScrollRange={50}
              // Max amount of months allowed to scroll to the future. Default = 50
              futureScrollRange={50}
              // specify how each item should be rendered in agenda
              renderItem={(item, firstItemInDay) => {return (<View />);}}
              // specify how each date should be rendered. day can be undefined if the item is not first in that day.
              renderDay={(day, item) => {return (<View />);}}
              // specify how empty date content with no items should be rendered
              renderEmptyDate={() => {return (<View />);}}
              // specify how agenda knob should look like
              renderKnob={() => {return (<View />);}}
              // specify what should be rendered instead of ActivityIndicator
              renderEmptyData = {() => {return (<View />);}}
              // specify your item comparison function for increased performance
              rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
              // Hide knob button. Default = false
              hideKnob={true}
              // By default, agenda dates are marked if they have at least one item, but you can override this if needed
              markedDates={{
                '2012-05-16': {selected: true, marked: true},
                '2012-05-17': {marked: true},
                '2012-05-18': {disabled: true}
              }}
              // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
              onRefresh={() => console.log('refreshing...')}
              // Set this true while waiting for new data from a refresh
              refreshing={false}
              // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
              refreshControl={null}
              // agenda theme
              theme={{
                //...calendarTheme,
                agendaDayTextColor: 'yellow',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: 'blue'
              }}
              // agenda container style
              style={{}}
            />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });
