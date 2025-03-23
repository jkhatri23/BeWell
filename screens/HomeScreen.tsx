import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, PhotoData } from '../App';
import { homeStyles } from '../styles/HomeScreen.styles';
import { colors, commonStyles } from '../styles/common.styles';
import NavigationBar from '../components/NavigationBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  photos: PhotoData[];
  hasPhotoForToday: () => boolean;
  onLogout: () => Promise<void>;
}

type CalendarDay = {
  date: Date;
  day: number;
  photo?: PhotoData;
  currentMonth: boolean;
};

export default function HomeScreen({ navigation, photos, hasPhotoForToday, onLogout }: Props) {
  // State for photo preview
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<PhotoData | null>(null);
  const [previewDate, setPreviewDate] = useState<Date | null>(null);

  // Opens photo preview
  const openPhotoPreview = (photo: PhotoData, date: Date) => {
    setPreviewPhoto(photo);
    setPreviewDate(date);
    setPreviewVisible(true);
  };

  // Redirect to camera if no photo taken today
  useEffect(() => {
    if (!hasPhotoForToday()) {
      navigation.navigate('Camera');
    }
  }, [navigation, hasPhotoForToday]);

  // Create photo lookup map by date string
  const photosByDate = photos.reduce((acc, photo) => {
    acc[photo.dateString] = photo;
    return acc;
  }, {} as Record<string, PhotoData>);

  // Format full date for preview
  const formatFullDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get calendar days grouped by month
  const getCalendarMonths = () => {
    const months: { month: Date; days: CalendarDay[][] }[] = [];
    
    // Find earliest photo date to determine how far back to show
    let earliestDate = new Date();
    if (photos.length > 0) {
      const timestamps = photos.map(photo => photo.timestamp);
      const earliestTimestamp = Math.min(...timestamps);
      earliestDate = new Date(earliestTimestamp);
    }
    earliestDate.setDate(1); // First day of the month

    // Only create months that have photos
    const photoMonths = new Set<string>();
    photos.forEach(photo => {
      const date = new Date(photo.timestamp);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      photoMonths.add(monthKey);
    });

    const today = new Date();
    
    // Format date to YYYY-MM-DD string for lookup
    const formatDateKey = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // For each month that has photos
    for (let year = earliestDate.getFullYear(); year <= today.getFullYear(); year++) {
      const startMonth = year === earliestDate.getFullYear() ? earliestDate.getMonth() : 0;
      const endMonth = year === today.getFullYear() ? today.getMonth() : 11;
      
      for (let month = startMonth; month <= endMonth; month++) {
        const monthKey = `${year}-${month}`;
        // Skip months with no photos
        if (!photoMonths.has(monthKey) && !(year === today.getFullYear() && month === today.getMonth())) {
          continue;
        }
        
        const currentMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Build weeks (rows) for this month
        const weeks: CalendarDay[][] = [];
        let week: CalendarDay[] = [];
        
        // Calculate how many blank days to add at start of month to align with weeks
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const dateKey = formatDateKey(date);
          
          // Start a new row for first day or when row is complete
          if (day === 1) {
            week = [];
            // Add empty slots for proper day alignment in first week
            for (let i = 0; i < firstDayOfMonth; i++) {
              week.push({
                date: new Date(0), // dummy date
                day: 0, // no day number shown
                currentMonth: false
              });
            }
          }
          
          week.push({
            date,
            day,
            photo: photosByDate[dateKey],
            currentMonth: true
          });
          
          // End of week or end of month
          if (week.length === 7 || day === daysInMonth) {
            weeks.push(week);
            week = [];
          }
        }
        
        months.push({
          month: currentMonth,
          days: weeks
        });
      }
    }
    
    return months.reverse(); // Newest months first
  };

  const calendarMonths = getCalendarMonths();
  const screenWidth = Dimensions.get('window').width;
  const daySize = (screenWidth - 32) / 7; // 7 days per week, minus padding

  const takeTodaysPhoto = () => {
    navigation.navigate('Camera');
  };

  return (
    <View style={[homeStyles.container, { paddingBottom: 60 }]}>
      <View style={homeStyles.titleContainer}>
        <Text style={homeStyles.title}>One day at a time</Text>
        <Image 
          source={require('../assets/sun.png')} 
          style={homeStyles.sunIcon}
        />
      </View>
      
      {photos.length === 0 ? (
        <View style={homeStyles.emptyContainer}>
          <Text style={homeStyles.noImagesText}>No photos yet. Take your first photo!</Text>
          <TouchableOpacity 
            style={commonStyles.button} 
            onPress={takeTodaysPhoto}
          >
            <Text style={commonStyles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={homeStyles.scrollView} contentContainerStyle={homeStyles.scrollContent}>
            {calendarMonths.map((monthData, monthIndex) => (
              <View key={monthIndex} style={homeStyles.monthContainer}>
                <Text style={homeStyles.monthText}>
                  {monthData.month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                
                <View style={homeStyles.weekdayLabels}>
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                    <Text 
                      key={day} 
                      style={[
                        homeStyles.weekdayText,
                        { width: daySize }
                      ]}
                    >
                      {day}
                    </Text>
                  ))}
                </View>
                
                {monthData.days.map((week, weekIndex) => (
                  <View key={weekIndex} style={homeStyles.weekContainer}>
                    {week.map((day, dayIndex) => {
                      // Check if this is today's date
                      const today = new Date();
                      const isToday = day.date.getDate() === today.getDate() && 
                                      day.date.getMonth() === today.getMonth() && 
                                      day.date.getFullYear() === today.getFullYear();
                      
                      return (
                        <View 
                          key={dayIndex} 
                          style={[
                            homeStyles.dayContainer, 
                            { width: daySize, height: daySize + 20 }
                          ]}
                        >
                          {day.day > 0 && (
                            <>
                              {day.photo ? (
                                // If there's a photo, place the date on top of it
                                <TouchableOpacity 
                                  style={homeStyles.dayWithPhotoContainer}
                                  onPress={() => openPhotoPreview(day.photo!, day.date)}
                                >
                                  <Image 
                                    source={{ uri: day.photo.uri }} 
                                    style={[homeStyles.thumbnail, { width: daySize - 8, height: daySize - 8 }]} 
                                  />
                                  <View style={[
                                    homeStyles.dateOverlay,
                                    isToday && homeStyles.todayOverlay
                                  ]}>
                                    <Text style={[
                                      homeStyles.dayText, 
                                      homeStyles.dayTextBold,
                                      isToday && homeStyles.todayText
                                    ]}>
                                      {day.day}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              ) : (
                                // Otherwise just show the date
                                <View style={isToday ? homeStyles.todayCircle : undefined}>
                                  <Text style={[
                                    homeStyles.dayText, 
                                    homeStyles.dayTextBold,
                                    isToday && homeStyles.todayText
                                  ]}>
                                    {day.day}
                                  </Text>
                                </View>
                              )}
                            </>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={[homeStyles.takePhotoButton, !hasPhotoForToday() && homeStyles.takePhotoButtonHighlighted]}
            onPress={() => navigation.navigate('Camera', {})}
          >
            <Text style={homeStyles.takePhotoButtonText}>
              {hasPhotoForToday() ? 'View Today\'s Photo' : 'Take Today\'s Photo'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Photo Preview Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPreviewVisible(false)}>
          <View style={homeStyles.previewModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={homeStyles.previewModalContent}>
                {previewPhoto && (
                  <>
                    <Text style={homeStyles.previewDate}>{formatFullDate(previewDate)}</Text>
                    <Image 
                      source={{ uri: previewPhoto.uri }} 
                      style={homeStyles.previewImage} 
                      resizeMode="cover"
                    />
                    <TouchableOpacity 
                      style={homeStyles.closeButton}
                      onPress={() => setPreviewVisible(false)}
                    >
                      <Text style={homeStyles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.navBarContainer}>
        <NavigationBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e9bff5',
  },
});