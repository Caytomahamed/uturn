import { View, Text, FlatList, SectionList, Image } from 'react-native';
import React, { useEffect } from 'react';
import NotificationCard from '../components/Notifications/NotificationCard';
import { useDispatch, useSelector } from 'react-redux';
import { appSelectNotify, getNotify } from '../store/slices/notify';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
const NotificationScreen = () => {
  const notifications = [
    {
      id: 4,
      title: 'Welcome to the app!',
      message: "Thanks for signing up. Here's a 10% discount code: ...",
      date: new Date(2023, 11, 15), // Earlier
      type: 'success',
    },
    {
      id: 1,
      title: 'New message from Manager',
      message: "Hey, how's it going?",
      date: new Date(2024, 1, 3), // Today
      type: 'update',
    },
    {
      id: 2,
      title: 'Your booking succefull',
      message: 'Your order is on its way! Track it here: ...',
      date: new Date(2024, 1, 2), // Yesterday
      type: 'success',
    },
    {
      id: 3,
      title: 'Car isnot avaliable!',
      message: 'Check out our latest collection now!',
      date: new Date(2024, 0, 29), // Last week
      type: 'warning',
    },

    {
      id: 5,
      title: 'Your are canlced your booking ',
      message: 'Your payment is uncompleted: ...',
      date: new Date(2023, 11, 15), // Earlier
      type: 'error',
    },
  ];

  const dispatch = useDispatch();

  const { notifyList, notifyLoading } = useSelector(appSelectNotify);



  useFocusEffect(
    React.useCallback(() => {
      dispatch(getNotify());
    }, [dispatch])
  );

  console.log('notkkdbbbabsdfbb', notifyList);

  const groupedNotifications =
    notifyList.length > 0 &&
    notifyList.reduce((groups, notification) => {
      console.log('notification', notification);
      const dateGroup = getFormattedDateGroup(new Date());
      groups[dateGroup] = groups[dateGroup] || [];
      groups[dateGroup].push(notification);
      return groups;
    }, {});

  function getFormattedDateGroup(date) {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekStart = new Date(today.getDate() - today.getDay());

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (
      weekStart.getTime() <= date.getTime() &&
      date.getTime() < weekStart.getTime() + 7 * 24 * 60 * 60 * 1000
    ) {
      return 'This Week';
    } else {
      return 'Earlier';
    }
  }

  return (
    <>
      {notifyList.length > 0 ? (
        <FlatList
          className="px-4"
          data={Object.entries(groupedNotifications)}
          renderItem={({ item: [dataGroup, notification] }) => (
            <SectionList
              sections={[
                {
                  title: dataGroup,
                  data: notification,
                },
              ]}
              renderItem={({ item }) => (
                <NotificationCard item={item} key={item.id} />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text>{title}</Text>
              )}
            />
          )}
        />
      ) : (
        <View className="justify-center items-center opacity-20 mt-40">
          {/* <Image src={require('../assets/noha.jpg')} className="w-20 h-20" /> */}
          <Ionicons
            name="notifications-circle-outline"
            size={130}
            color="#808080"
          />
          <Text>No notification yet</Text>
        </View>
      )}
      <View style={{ height: 130 }}></View>
    </>
  );
};

export default NotificationScreen;
