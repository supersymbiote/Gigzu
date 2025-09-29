import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, value, onChangeText, ...rest }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full py-3 px-4 w-full">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        {...rest}
      />
    </View>
  );
};

export default SearchBar;
