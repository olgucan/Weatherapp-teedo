import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Button,
  Image,
} from "react-native";

import { Link, Stack } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/redux/slices/counterSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/redux/slices/userSlice";
import styles from "@/assets/style";
export default function TabTwoScreen() {
  const count = useSelector((state: RootState) => state.counter.value);
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredUsers2, setFilteredUsers2] = useState<any>();
  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers2(filteredUsers);
  }, [searchQuery, users]);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredUsers2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            style={styles.item}
            //onPress={() => navigation.navigate("Details", { user: item })}
            href={`/detail?userId=${item.id}`}
          >
            <Text style={styles.name}>{item.name}</Text>
            {/* <Text style={styles.email}>{item.email}</Text> */}
          </Link>
        )}
      />

      <TouchableOpacity
        style={styles.searchButton}
        // onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.searchText}>🔍 Search Users</Text>
      </TouchableOpacity>
    </View>
  );
}
