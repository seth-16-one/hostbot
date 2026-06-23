import ModalHeader from "@/components/layout/ModalHeader";
import {
  Button,
  CountryPicker,
  Input,
  PhoneInput,
  Screen,
  Select,
} from "@/components/ui";
import { COLORS } from "@/constants";
import { account } from "@/data";
import { Ionicons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EditProfileScreen() {
  const [firstName, setFirstName] = useState(account.firstName);
  const [lastName, setLastName] = useState(account.lastName);
  const [username, setUsername] = useState(account.userName);

  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone);

  const [company, setCompany] = useState(account.company);
  const [website, setWebsite] = useState(account.website);

  const [country, setCountry] = useState(account.country);
  const TIMEZONES = Intl.supportedValuesOf("timeZone");
  const [timezone, setTimezone] = useState(
    Localization.getCalendars()[0].timeZone ?? "Africa/Nairobi",
  );

  const [bio, setBio] = useState(account.bio);
  const BIO_LIMIT = 250;

  const handleSave = () => {
    console.log("Profile Saved");
  };

  return (
    <Screen backgroundColor={COLORS.primary}>
      <ModalHeader
        title="Edit Profile"
        subtitle="Update your account information"
      />

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Ionicons name="person" size={60} color={COLORS.white} />
          </View>

          <Pressable style={styles.changePhoto}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </Pressable>
        </View>

        {/* Personal Information */}

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Input
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />

        <Input
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />

        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* Contact Information */}

        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Input
          label="Email Address"
          value={email}
          placeholder="hostbot@info.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PhoneInput value={phone} onChange={setPhone} />

        {/* Business Information */}

        <Text style={styles.sectionTitle}>Business Information</Text>

        <Input label="Company" value={company} onChangeText={setCompany} />

        <Input
          label="Website"
          value={website}
          placeholder="https://www.hostbot.com"
          onChangeText={setWebsite}
          autoCapitalize="none"
        />

        {/* Location */}

        <Text style={styles.sectionTitle}>Location</Text>

        <CountryPicker value={country} onChange={setCountry} />

        <Select
          label="Timezone"
          value={timezone}
          onChange={setTimezone}
          options={TIMEZONES}
        />

        {/* Bio */}

        <Text style={styles.sectionTitle}>Bio</Text>

        <Input
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={BIO_LIMIT}
        />

        <Text style={styles.characterCount}>
          {bio.length}/{BIO_LIMIT}
        </Text>

        {/* Save */}

        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  changePhoto: {
    marginTop: 10,
  },

  changePhotoText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 20,
    color: COLORS.text,
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    marginBottom: 6,
    color: COLORS.muted,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text,
  },

  bioInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    color: COLORS.text,
  },

  characterCount: {
    textAlign: "right",
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
});
