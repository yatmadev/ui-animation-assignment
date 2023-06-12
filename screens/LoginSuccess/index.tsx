import { NavigationContext } from "@react-navigation/native";
import React, { Component, createRef } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  AuthLayout,
  BlueLink,
  FullScreenLoader,
  PrimaryButton,
} from "../../components";
import { useAuthStore, useLoginDetailsStore } from "../../stores";
import styles from "./styles";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";

const noOfInputsArr = [1, 2, 3, 4, 5, 6];

const noOfInputs = noOfInputsArr.length;

export class LoginSuccess extends Component {
  state = {
    otp: noOfInputsArr.reduce(
      (accumulator, currentElement) => ({
        ...accumulator,
        [`${currentElement}`]: "",
      }),
      {}
    ),
    isError: false,
    isLoading: false,
    errorString: "",
  };

  inputRef = noOfInputsArr.reduce(
    (accumulator, currentElement) => ({
      ...accumulator,
      [`${currentElement}`]: createRef(),
    }),
    {}
  );

  static contextType = NavigationContext;
  onInputChange = (key: number) => {
    return (input: string) => {
      this.setState({
        otp: { ...this.state.otp, [`${key}`]: input },
      });

      if (input) {
        this.inputRef[`${key + 1}`]?.current.focus();
      } else {
        this.inputRef[`${key - 1}`]?.current.focus();
      }
    };
  };

  onKeyPressed = (key: number) => {
    return ({ nativeEvent: { key: keyValue } }) => {
      if (!isNaN(keyValue)) {
        this.setState({
          otp: {
            ...this.state.otp,
            [`${key + (this.state.otp[`${key}`] ? 1 : 0)}`]: keyValue,
          },
        });
        this.inputRef[`${key + 1}`]?.current.focus();
        return;
      }

      if (keyValue === "Backspace") {
        if (this.state.otp[`${key}`]) {
          this.setState({
            otp: { ...this.state.otp, [`${key}`]: "" },
          });
        }
        this.inputRef[`${key - 1}`]?.current.focus();
        // }
        return;
      }

      if (keyValue === "Enter") {
        this.inputRef[`${key - 1}`]?.current.focus();
        return;
      }
    };
  };

  onFormSubmit = () => {
    // Keyboard.dismiss();
    const otpLength = (
      Object.values(this.state.otp).reduce(
        (accumulator: string, currentElement) =>
          (accumulator += currentElement),
        ""
      ) as string
    ).length;

    if (otpLength < 6) {
      this.setState({ errorString: "Please enter valid OTP", isError: true });
      return;
    }

    if (otpLength < 1) {
      this.setState({
        errorString: "Please enter the OTP sent to you",
        isError: true,
      });
      return;
    }

    this.setState({ errorString: "", isError: false, isLoading: true });

    setTimeout(() => {
      this.setState({ isLoading: false });
      // useAuthStore.setState({ isAuthenticated: true });
    }, 2000);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
      useAuthStore.setState({ isAuthenticated: true });
      this.props?.navigation?.navigate("BottomsTab");
    }, 2000);
  }

  render() {
    return (
      <AuthLayout
        headerHeight={styles.Header.height}
        headerText={
          <>
            <Animatable.Text
              duration={2000}
              animation="fadeIn"
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              Login Success !
            </Animatable.Text>
          </>
        }
      >
        <View style={styles.Container}>
          <LottieView
            autoPlay
            speed={0.3}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "transparent",
            }}
            source={require("../../assets/green-tick.json")}
          />
        </View>
      </AuthLayout>
    );
  }
}
