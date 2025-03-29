import { View, Text, ActivityIndicator } from "react-native";

import React from "react";
import styles from "@/assets/style";
import { useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { fetchUsersId } from "@/redux/slices/userSlice";
type ProfileParams = {
  userId?: string;
};
export default function Detail() {
  const { userId } = useLocalSearchParams<ProfileParams>();
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const user = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();

  // const { user } = route.params;
  useEffect(() => {
    dispatch(fetchUsersId({ userId: userId }));
  }, [userId]);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  }
  return (
    <View style={styles.container2}>
      <Text style={styles.title}>User Details id: {userId}</Text>
      <Text style={styles.detailText}>📛 Name: {user?.name}</Text>
      <Text style={styles.detailText}>📧 Email: {user?.email}</Text>
      {/* <Text style={styles.detailText}>📍 Address: {user?.address.street}, {user?.address.city}</Text> */}
      <Text style={styles.detailText}>📞 Phone: {user?.phone}</Text>
      {/* <Text style={styles.detailText}>💼 Company: {user?.company.name}</Text> */}
    </View>
  );
}
