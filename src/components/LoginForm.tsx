import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import Input from "./Input";
import Button from "./Button";
import authService from "@services/authService";
import { COLORS, TEXT_STYLES } from "@constants/index";

const BG_COLOR = "#fff";
const BORDER_COLOR = "#eee";

type Props = {
  onSuccess?: () => void;
  mode?: "login" | "register";
};

export default function LoginForm({ onSuccess, mode = "login" }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // gender: 0 = male, 1 = female
  const [gender, setGender] = useState<number>(0);
  const [errors, setErrors] = useState<{
    phone?: string;
    displayName?: string;
    dateOfBirth?: string;
    password?: string;
    general?: string;
  }>({});

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickDay, setPickDay] = useState<number>(1);
  const [pickMonth, setPickMonth] = useState<number>(1);
  const [pickYear, setPickYear] = useState<number>(2000);

  type ServerErrorResp = {
    errors?: Record<string, string[] | string>;
    message?: string;
  };

  const handleSubmit = async () => {
    if (mode === "login") {
      setLoading(true);
      try {
        await authService.login({ username: email, password });
        if (onSuccess) onSuccess();
      } catch (err: unknown) {
        console.warn(err);
        const msg = (() => {
          if (!err) return undefined;
          if (typeof err === "string") return err;
          if (typeof err === "object" && err !== null && "message" in err)
            return (err as { message?: string }).message;
          return undefined;
        })();
        Alert.alert("Đăng nhập thất bại", msg || "Vui lòng thử lại");
      } finally {
        setLoading(false);
      }
    } else {
      // reset field errors
      setErrors({});

      // Basic client-side validation
      if (!email || !password || !confirmPassword) {
        setErrors({ general: "Vui lòng điền đủ các trường" });
        return;
      }

      // For registration we require a phone number (API expects register-by-phone)
      const phone = email.trim();
      const phoneRegex = /^[0-9]{9,12}$/;
      if (!phoneRegex.test(phone)) {
        Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập số điện thoại (9-12 chữ số)");
        return;
      }

      // Display name
      if (!displayName.trim()) {
        setErrors({ displayName: "Vui lòng nhập tên hiển thị" });
        return;
      }

      // Optional email validation if user entered one
      if (emailAddress.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress.trim())) {
          setErrors({ general: "Email không hợp lệ" });
          return;
        }
      }
      // Date of birth basic validation yyyy-mm-dd
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dobRegex.test(dateOfBirth)) {
        setErrors({ dateOfBirth: "Ngày sinh không hợp lệ (YYYY-MM-DD)" });
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Mật khẩu không khớp", "Vui lòng xác nhận đúng mật khẩu");
        return;
      }

      setLoading(true);
      try {
        // Build minimal payload expected by the API.
        // If user enters an email, use it. Otherwise treat input as phone.
        // Build payload for register-by-phone (server expects phone)
        const payload: Record<string, unknown> = {
          phone,
          password,
          displayName: displayName.trim(),
          email: emailAddress.trim() ? emailAddress.trim() : `${phone}@example.com`,
          dateOfBirth: dateOfBirth,
          gender,
          role: "CUSTOMER",
        };

        await authService.register(payload);

        // Auto-login after register using phone as username
        await authService.login({ username: phone, password });
        if (onSuccess) onSuccess();
      } catch (err: unknown) {
        console.warn(err);
        // Try to parse server validation errors and map to fields
        // Axios style: err.response.data = { message: '', errors: { field: ['msg'] } }
        const resp = (err as unknown as { response?: { data?: ServerErrorResp } })?.response?.data;
        if (resp) {
          const newErrors: typeof errors = {};
          if (resp && resp.errors && typeof resp.errors === "object") {
            for (const key of Object.keys(resp.errors)) {
              const val = resp.errors[key];
              const mappedKey = key === "birthDate" ? "dateOfBirth" : key;
              if (Array.isArray(val))
                newErrors[mappedKey as keyof typeof newErrors] = String(val[0]);
              else newErrors[mappedKey as keyof typeof newErrors] = String(val);
            }
          }
          if (resp && resp.message && !Object.keys(newErrors).length) {
            newErrors.general = String(resp.message);
          }
          if (Object.keys(newErrors).length) {
            setErrors(newErrors);
          } else {
            setErrors({ general: "Đăng ký thất bại. Vui lòng thử lại." });
          }
        } else {
          const msg = (() => {
            if (!err) return undefined;
            if (typeof err === "string") return err;
            if (typeof err === "object" && err !== null && "message" in err)
              return (err as { message?: string }).message;
            return undefined;
          })();
          setErrors({ general: msg || "Đăng ký thất bại" });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <View style={styles.inputBox}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder={mode === "register" ? "Số điện thoại..." : "Số điện thoại hoặc email..."}
        />
      </View>
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

      {mode === "register" && (
        <>
          <View style={styles.inputBox}>
            <Input value={displayName} onChangeText={setDisplayName} placeholder="Tên hiển thị" />
          </View>
          {errors.displayName ? <Text style={styles.errorText}>{errors.displayName}</Text> : null}
          <View style={styles.inputBox}>
            <Input
              value={emailAddress}
              onChangeText={setEmailAddress}
              placeholder="Email (tùy chọn)"
            />
          </View>
          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.inputTouchable} onPress={() => setShowDatePicker(true)}>
              <Input
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="Ngày sinh (YYYY-MM-DD)"
              />
            </TouchableOpacity>
          </View>
          {errors.dateOfBirth ? <Text style={styles.errorText}>{errors.dateOfBirth}</Text> : null}
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderBtn, gender === 0 && styles.genderBtnActive]}
              onPress={() => setGender(0)}
            >
              <Text style={styles.genderText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderBtn, gender === 1 && styles.genderBtnActive]}
              onPress={() => setGender(1)}
            >
              <Text style={styles.genderText}>Nữ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.inputBox}>
        <Input value={password} onChangeText={setPassword} placeholder="Mật khẩu" type="password" />
      </View>
      {mode === "register" && (
        <View style={styles.inputBox}>
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Xác nhận mật khẩu"
            type="password"
          />
        </View>
      )}
      {/* Date picker modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ngày sinh</Text>
            <View style={styles.pickerRow}>
              <ScrollView style={styles.pickerCol}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <Pressable key={d} onPress={() => setPickDay(d)} style={styles.pickerItem}>
                    <Text style={pickDay === d ? styles.pickerItemActive : styles.pickerItemText}>
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerCol}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <Pressable key={m} onPress={() => setPickMonth(m)} style={styles.pickerItem}>
                    <Text style={pickMonth === m ? styles.pickerItemActive : styles.pickerItemText}>
                      {m}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerCol}>
                {Array.from({ length: 100 }, (_, i) => 1925 + i).map((y) => (
                  <Pressable key={y} onPress={() => setPickYear(y)} style={styles.pickerItem}>
                    <Text style={pickYear === y ? styles.pickerItemActive : styles.pickerItemText}>
                      {y}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.modalBtn}>
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const mm = String(pickMonth).padStart(2, "0");
                  const dd = String(pickDay).padStart(2, "0");
                  setDateOfBirth(`${pickYear}-${mm}-${dd}`);
                  setShowDatePicker(false);
                }}
                style={[styles.modalBtn, { backgroundColor: COLORS.PRIMARY }]}
              >
                <Text style={{ color: COLORS.TEXT_WHITE }}>Xong</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title={mode === "login" ? "Đăng\u00A0nhập" : "Đăng\u00A0ký"}
        onPress={handleSubmit}
        loading={loading}
      />
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.ERROR,
    marginBottom: 6,
    marginTop: 6,
    textAlign: "left",
    width: "100%",
  },
  genderBtn: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
  },
  genderBtnActive: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderColor: COLORS.PRIMARY,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  genderText: {
    color: COLORS.TEXT_PRIMARY,
  },
  inputBox: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  inputTouchable: {
    flex: 1,
  },
  modalBtn: {
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  modalContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    padding: 16,
    width: "92%",
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: COLORS.OVERLAY,
    flex: 1,
    justifyContent: "center",
  },
  modalTitle: {
    ...TEXT_STYLES.H4,
    marginBottom: 12,
  },
  pickerCol: {
    maxHeight: 200,
    width: 80,
  },
  pickerItem: {
    alignItems: "center",
    paddingVertical: 8,
  },
  pickerItemActive: {
    color: COLORS.PRIMARY,
    fontWeight: "700",
  },
  pickerItemText: {
    color: COLORS.TEXT_PRIMARY,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
