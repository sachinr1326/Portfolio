import React, { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import typingloader from "../image/loading.gif";
import chatbotlogo from "../image/chatbot.gif";
import EdCoo_Pink_BB from "../image/chatbot.gif";
import resume from "../image/Resume_24_05.pdf";
import { useToast } from "./ToastContext";

const UserMessage = ({ text, time, shouldFade }) => (
  // ... UserMessage component definition
  <div
    className={`chat-message-right pb-1 ${shouldFade ? "fade_animation" : ""}`}
  >
    <div className="flex-shrink-1  rounded py-2 px-3 chat-message-user">
      <span
        className="chat-message-mentor-message"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
    <div className="text-nowrap chat-message-time  text-end">{time}</div>
  </div>
);

const BotMessage = ({
  text,
  time,
  shouldFade,
  link,
  nameshow,
  handleNameChange,
  errors,
  formData,
  submit,
  phoneshow,
  showNameInput,
  showPhoneInput,
  countrycode,
}) => (
  // ... BotMessage component definition
  <div
    className={`chat-message-left pb-1 ${shouldFade ? "fade_animation" : ""}`}
  >
    <div className="flex-shrink-1 rounded py-2 px-3  chat-message-mentor">
      <span
        className="chat-message-mentor-message"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {link && (
        <div
          onClick={() => {
            link.text ? link.fxn(link.text) : link.fxn();
          }}
          className="link_chat"
        >
          <i class="fa-solid fa-share"></i> {link.title ? link.title : "Link"}
        </div>
      )}
      {nameshow && showNameInput && (
        <div className="chatbot-name mt-2">
          <div class="input-group  ">
            <input
              type="text"
              className={`form-control ${errors.name && "is-invalid"}`}
              name="name"
              onChange={handleNameChange}
              value={formData.name}
              placeholder="Enter your name"
              aria-label="Enter Name"
              aria-describedby={`basic-addon2 validationServername`}
            />
            <button
              className="input-group-text bg-success text-white rounded-end"
              onClick={() => submit("name")}
              id="basic-addon2"
            >
              Submit
            </button>
            <div id={`validationServername`} className="invalid-feedback">
              {errors.name}
            </div>
          </div>
        </div>
      )}
      {phoneshow && showPhoneInput && (
        <div className="chatbot-name mt-2">
          <div class="input-group">
            <select
              class="input-group-text"
              style={{ fontSize: "10px" }}
              name="country_code"
              aria-label="Small select example"
              onChange={handleNameChange}
            >
              {countrycode?.map((res, index) => (
                <option
                  key={index}
                  className="text-start border-bottom border-1 border-danger"
                  value={res?.phonecode}
                  selected={index === 0 ? true : false}
                >
                  {res?.name} ({res?.short_name}) {res?.phonecode}
                </option>
              ))}
              <option
                className="text-start border-bottom border-1 border-danger"
                style={{ fontSize: "8px" }}
                value="91"
                selected
              >
                (IN) +91
              </option>
            </select>
            <input
              type="text"
              id="input_phone"
              className={`form-control rounded-end ${
                errors.mobile_no && "is-invalid"
              }`}
              name="mobile_no"
              onChange={handleNameChange}
              value={formData.mobile_no}
              placeholder="Enter your phone"
              aria-label="Enter Name"
              aria-describedby={`basic-addon2 validationServermobile_no`}
            />
            <div
              id={`validationServermobile_no`}
              className="invalid-feedback mb-1"
            >
              {errors.mobile_no}
            </div>
          </div>
          {errors.mobile_no ? (
            ""
          ) : (
            <div className="text-end">
              <button onClick={() => submit("phone")} id="submit_btn">
                {" "}
                Submit <i class="fa-solid fa-play"></i>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    <div className="text-nowrap chat-message-time  text-start">{time}</div>
  </div>
);

const BotOption = ({ text, handleoptionclick }) => (
  <div className="opt_section" onClick={() => handleoptionclick(text)}>
    <span className="opt">{text}</span>
  </div>
);
function Chatbot({ tagname }) {
  const [showNameInput, setShowNameInput] = useState(true);
  const [showPhoneInput, setShowPhoneInput] = useState(true);
  const [mobileSubmit, setMobileSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    country_code: "91",
  });
  const [Errors, setErrors] = useState({
    name: "",
    mobile_no: "",
  });
  // =============country code================
  const [countrycode, setcountrycode] = useState(null);
  useEffect(() => {
    // get_country_code().then(res => {
    //     if (res.status) {
    //         setcountrycode(res?.response?.data)
    //     } else {
    //     }
    // })
  }, []);
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Validate mobile_no field
    if (name === "mobile_no") {
      // Check if value is not empty and contains only numbers
      if (!/^\d+$/.test(value)) {
        errorMessage = "Mobile number should contain only numbers";
      } else if (value.length < 10 || value.length > 12) {
        errorMessage = "Mobile number should be between 10 and 12 digits";
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...Errors,
      [name]: errorMessage, // Set error message for mobile_no field
    });
  };
  const { showToast } = useToast();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resume; // Adjust the path to your resume file
    link.download = "Sachin_Thakur_Resume.pdf"; // The filename you want to use
    link.click();
    showToast("Info", "Sachin Thakur Resume download successfully!");
  };
  const handleclickonlink = (url) => {
    window.open(url, "_blank");
  };
  const handlenamesubmit = (tagname) => {
    if (tagname === "name") {
      if (formData.name.trim()) {
        setShowNameInput(false);
        const userMessage = {
          text: formData.name,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          sender: "user",
          shouldFade: true,
          nickname: true,
        };
        setMessages([...messages, userMessage]);
        handleChatMessage("aftername", userMessage);
        setErrors({
          ...Errors,
          name: "",
        });
      } else {
        setErrors({
          ...Errors,
          name: "Name is required",
        });
        // toast.info("Name is required")
      }
    } else {
      if (formData.mobile_no.trim()) {
        setShowPhoneInput(false);
        // update_chatbot({ name: formData.name, mobile_no: formData.mobile_no, country_code: formData.country_code }).then(res => {
        //     if (res.status) {
        //         setMobileSubmit(true);
        //     }
        //     if(messages.length>3){
        //         const userMessage = { text: "+" + formData.country_code + " " + formData.mobile_no, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), sender: 'user', shouldFade: true, nickname: true };
        //         setMessages([...messages, userMessage]);
        //         handleChatMessage("phone", userMessage);
        //     }
        // })

        setErrors({
          ...Errors,
          mobile_no: "",
        });
      } else {
        setErrors({
          ...Errors,
          mobile_no: "Phone is required",
        });
        // toast.info("Phone is required")
      }
    }
  };
  const check_phone_submit = (url) => {
    if (mobileSubmit) {
      window.open(url, "_blank");
    } else {
      setErrors({
        ...Errors,
        mobile_no: "Please Enter phone number first",
      });
      if (document.getElementById("input_phone")) {
        document.getElementById("input_phone").focus();
      } else {
        window.open(url, "_blank");
      }
    }
  };

  const chatData = {
    chatinit: {
      title: ["Hello! I’m SachBot, your virtual assistant created by Sachin Thakur. How can I assist you today? 😊"],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],

      name: false,
    },
    // aftername: {
    //   title: [
    //     "Planning to upskill yourself? I can help!",
    //     "Check out our list of courses!",
    //     "What's your phone number?",
    //   ],
    //   link: {
    //     fxn: check_phone_submit,
    //     text: "",
    //   },
    //   phone: true,
    //   options: [],
    // },
    // phone: {
    //   title: [
    //     "Thank you for contacting us, we will reach back to you in a short time.<span class='emoji'> &#128250;</span>",
    //     "We also offers following list of services",
    //   ],
    //   options: [
    //     "List of cool projects",
    //     "Career Assistance Services",
    //     "Exclusive Jobs/Internship Assistance",
    //     "100% job guaranteed program",
    //   ],
    // },
    "Hire Sachin Thakur": {
      title: [
        "Go to profile section, click on Hire me",
        "after the click, form is open",
        "Send message to hire sachin",
      ],
      options: [
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "Download Sachin Thakur Resume": {
      title: [
        "Download Sachin Thakur Resume",
        "You can also download,Go to profile section, click on download resume button","Thank you for contacting us."
      ],
      link: {
        fxn: downloadResume,
        title: "Download",
      },
 
    },
    "Get Contact number of Sachin Thakur": {
      title: ["+91 9557587998"],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "List of Sachin provide Services": {
      title: [
        "These are the sachin provide services",
        "Full Stack Development",
        "Frontend Development",
        "Backend Development",
        "Mobile App Development",
      ],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "List of Sachin Skills": {
      title: ["Which skills you want?"],
      options: [
        "programming languages",
        "server technologies",
        "frameworks and libraries",
        "database management",
        "cloud services",
        "development tools",
        "Show All Skills",
      ],
    },
    "Show All Skills": {
      title: [
        "programming languages - React JS, Python, PHP, Java, HTML, CSS, JavaScript, XML",
        "server technologies - Apache Tomcat, nginx",
        "frameworks and libraries - Django, Django Rest Framework, Android, Electron, React JS, Bootstrap",
        "database management - MySQL, PostgreSQL",
        "cloud services - S3 bucket",
        "development tools - Visual Studio, Eclipse, NetBeans, Android Studio",
      ],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "programming languages": {
      title: [
        "Skill:-  Programming Languages",
        "React JS",
        "Python",
        "PHP",
        "Java",
        "HTML",
        "CSS",
        "JavaScript",
        "XML",
      ],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "server technologies": {
      title: ["Skill:- server technologies", "Apache Tomcat", "nginx"],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "frameworks and libraries": {
      title: [
        "Skill:- frameworks and libraries",
        "Django",
        "Django Rest Framework",
        "Android",
        "Electron",
        "React JS",
        "Bootstrap",
      ],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "database management": {
      title: ["Skill:- database management", "MySQL", "PostgreSQL"],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "cloud services": {
      title: ["Skill:- cloud services", "S3 bucket"],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
    "development tools": {
      title: [
        "Skill:- development tools",
        "Visual Studio",
        "Eclipse",
        "NetBeans",
        "Android Studio",
      ],
      options: [
        "how to Hire Sachin Thakur",
        "Download Sachin Thakur Resume",
        "Get Contact number of Sachin Thakur",
        "List of Sachin provide Services",
        "List of Sachin Skills",
        "List of Sachin Projects",
      ],
    },
"List of Sachin Projects":{
    title:["These are some project listed","EdCater.com- An e-learning platform (Live)","Homingle - Android App (Live)","Cryptone.in - An ecommerce drone selling website (Live)","One Trust Services-Web Application","Select project for More details"],
    options:["EdCater.com- An e-learning platform (Live)","Homingle - Android App (Live)","Cryptone.in - An ecommerce drone selling website (Live)","One Trust Services-Web Application","Show Details of All Projects"]
},
"EdCater.com- An e-learning platform (Live)":{
    title:[
    "Project name:- EdCater.com- An e-learning platform (Live)",
    "complted time:- Octuber 2022 - present 2024",
    "Technologies:- React JS, MySQL and Django",
    "company name:- Edcater Pvt Ltd",
    ],
    link: {
        fxn: handleclickonlink,
        text:"https://edcater.com/",
        title: "Go to Project",
      },
},
"Homingle - Android App (Live)":{
    title:[
        "Project name:- Homingle - Android App (Live)",
        "completed time:- December 2023 – January 2024",
        "Technologies:- Java, Django, Drf and PostgreSQL",
        "company name:- Rozitarang Pvt Ltd",
        ],
        link: {
            fxn: handleclickonlink,
            text:"https://play.google.com/store/apps/details?id=com.cryptone.homingle",
            title: "Go to Project",
          },
},
"Cryptone.in - An ecommerce drone selling website (Live)":{
    title:[
        "Project name:- Cryptone.in - An ecommerce drone selling website (Live)",
        "completed time:- January 2023 - May 2023",
        "Technologies:- Phython, Django and PostgreSQL",
        "company name:- Rozitarang Pvt Ltd",
        ],
        link: {
            fxn: handleclickonlink,
            text:"https://cryptone.in/",
            title: "Go to Project",
          },

},
"One Trust Services-Web Application":{
    title:[
        "Project name:- One Trust Services-Web Application",
        "completed time:- August 2022 - December 2022",
        "Technologies:- Java, Servley, Hibernate and MySQL",
        "company name:- College Project",
        ],
      
},
"Show Details of All Projects":{
title:[
    "Project name:- EdCater.com- An e-learning platform (Live)<br>completed time:- Octuber 2022 - present 2024<br>Technologies:- React JS MySQL and Django<br>company name:- Edcater Pvt Ltd",
    "Project name:- Homingle - Android App (Live)<br> completed time:- December 2023 – January 2024<br> Technologies:- Java Django Drf and PostgreSQL<br>company name:- Rozitarang Pvt Ltd",
    "Project name:- Cryptone.in - An ecommerce drone selling website (Live)<br> completed time:- January 2023 - May 2023<br> Technologies:- Phython Django and PostgreSQL<br>company name:- Rozitarang Pvt Ltd",
    "Project name:- One Trust Services-Web Application<br> completed time:- August 2022 - December 2022<br> Technologies:- Java Servley Hibernate and MySQL<br> company name:- College Project",
    "Thank you for contacting us."
]
},
    // "Career Assistance Services": {
    //   title: ["Career Assistance Service", "Thank you for contacting us."],
    //   link: {
    //     fxn: handleclickonlink,
    //     text: "",
    //   },
    //   options: [],
    // },
    // "List of cool projects": {
    //   title: ["List of cool projects", "Thank you for contacting us."],
    //   link: { fxn: handleclickonlink, text: "" },
    //   options: [],
    // },
    // "Exclusive Jobs/Internship Assistance": {
    //   title: [
    //     "Exclusive Jobs/Internship Assistance",
    //     "Thank you for contacting us.",
    //   ],
    //   link: {
    //     fxn: handleclickonlink,
    //     text: "",
    //   },
    //   options: [],
    // },
    // "100% job guaranteed program": {
    //   title: ["100% job gauranteed program", "Thank you for contacting us."],
    //   link: {
    //     fxn: handleclickonlink,
    //     text: "",
    //   },
    //   options: [],
    // },
    hello: {
      title: ["Hello! How can I help you?"],
      options: [],
    },
    "how are you": {
      title: ["I'm just a computer program, but thanks for asking!"],
      options: [],
    },
    default: {
      title: [
        "Oops, it looks like I don't have an answer for that just yet! 🙈",
        "But fear not! Your question is valuable, and I'm here to assist you personally",
        "Feel free to ask me anything else or explore more of my portfolio.",
        "Your curiosity is always welcome, and I'm eager to help you find what you're looking for! 💬✨"
      ],
      options: [],
      default: ["stop"],
    },
  };

  const [messages, setMessages] = useState([]);
  const [PlaceHolderText, setPlaceHolderText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [end_chat_msg, setend_chat_msg] = useState(false);
  const messagesEndRef = useRef(null);
  const handleUserInput = (event) => {
    if (event.key === "Enter") {
      if (inputValue) {
        // Add user's input message to the messages
        const userMessage = {
          text: inputValue,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          sender: "user",
          shouldFade: true,
          nickname: true,
        };
        setMessages([...messages, userMessage]);
        handleChatMessage(inputValue, userMessage);
        setInputValue("");
      } else {
        // toast.warning("Write something!");
      }
    }
  };

  const handleChatMessage = (val, usermsg) => {
    setPlaceHolderText("EdCater Robo is typing");
    setMessages([...messages, usermsg]);
    const matchedResponse = findMatchedResponse(val);
    // if (matchedResponse) {
    const botMessage = matchedResponse.title.map((text, index) => ({
      text: text,
      time:
        index === matchedResponse.title.length - 1
          ? new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "",
      sender: "bot",
      shouldFade: true,
      link:
        index ===
        (matchedResponse.title.indexOf("Check out our list of courses!") !== -1
          ? 1
          : 0)
          ? matchedResponse.link
          : false,
      options:
        index === matchedResponse.title.length - 1
          ? matchedResponse.options
          : [],
      name: matchedResponse.name,
      nickname: index === 0 ? true : false,
      phone: index === 2 && matchedResponse.phone ? true : false, // Show phone input for index 2 if matchedResponse.phone is true
    }));
    botMessage.forEach((res, index) => {
      let delay = index * 1500; // Adjust delay for subsequent messages
      const data = res;
      setTimeout(() => {
        const typingLoaderMessage = {
          text: "Typing...",
          sender: "bot",
          isTyping: true,
          shouldFade: true,
          nickname: index === 0 ? true : false,
        };
        setMessages((prevMessages) => [...prevMessages, typingLoaderMessage]);
        setTimeout(() => {
          setMessages((prevMessages) => {
            return prevMessages.filter(
              (message) => message !== typingLoaderMessage
            );
          });
          setMessages((prevMessages) => [...prevMessages, data]);
          setTimeout(() => {
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((message) => {
                return { ...message, shouldFade: false };
              });
              return updatedMessages;
            });
          }, 420);
          if (res.text === "Thank you for contacting us.") {
            setend_chat_msg(true);
          }
          if (index === botMessage.length - 1) {
            setPlaceHolderText("");
          }
        }, 1000);
      }, delay);
    });
    // } else {
    //     setTimeout(() => {
    //         const defaultBotResponse = { text: chatData.default.title, time: new Date().toLocaleTimeString(), sender: 'bot', shouldFade: true, nickname: true, };
    //         setMessages([...messages, usermsg, defaultBotResponse]);
    //     }, 2000);
    // }
  };

  // Function to find a matched response from chatData based on user input
  const findMatchedResponse = (inputValue) => {
    const matchedResponse = Object.entries(chatData).find(([key, value]) => {
      return inputValue.toLowerCase().includes(key.toLowerCase());
    });
    if (matchedResponse) {
      // Return the first matched key
      return chatData[matchedResponse[0]];
    } else {
      return chatData.default; // Return null if no match is found
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  const handleRestart = () => {
    setMessages([]); // Clear all messages immediately
    setTimeout(initChat, 0); // Start the chat initialization process after clearing messages
  };

  const initChat = () => {
    setPlaceHolderText("EdCater Robo is typing");
    const initialBotMessages = chatData.chatinit.title.map((text, index) => ({
      text,
      time:
        index === chatData.chatinit.title.length - 1
          ? new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "",
      sender: "bot",
      link: chatData.chatinit.link,
      options: chatData.chatinit.options,
      name: index === 1 ? chatData.chatinit.name : false,
      phone: false,
      shouldFade: true,
      nickname: index === 0 ? true : false,
    }));
    initialBotMessages.forEach((res, index) => {
      let delay = index * 1500; // Adjust delay for subsequent messages
      const data = res;
      setTimeout(() => {
        const typingLoaderMessage = {
          text: "Typing...",
          sender: "bot",
          isTyping: true,
          shouldFade: true,
          nickname: index === 0 ? true : false,
        };
        setMessages((prevMessages) => [...prevMessages, typingLoaderMessage]);
        setTimeout(() => {
          setMessages((prevMessages) => {
            return prevMessages.filter(
              (message) => message !== typingLoaderMessage
            );
          });
          setMessages((prevMessages) => [...prevMessages, data]);
          if (index === initialBotMessages.length - 1) {
            setPlaceHolderText("");
          }
        }, 1000);
      }, delay);
    });

    setShowNameInput(true);
    setShowPhoneInput(true);
    setend_chat_msg(false);
    setFormData({
      ...formData,
      name: "",
      mobile_no: "",
      country_code: "91",
    });
    setInputValue("");
    setMobileSubmit(false);
  };
  const handleoptionclick = (val) => {
    const userMessage = {
      text: val,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      sender: "user",
      shouldFade: true,
      nickname: true,
    };
    setMessages([...messages, userMessage]);
    handleChatMessage(val, userMessage);
    // update_chatbot({ name: formData.name, mobile_no: formData.mobile_no, country_code: formData.country_code, option: val });
  };
  // ==================================chatbpt show button=====
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const handleChatButtonClick = () => {
    setChatbotVisible(true);
    handleRestart();
    // You can call any initialization function here if needed
  };

  const handleChatCloseClick = () => {
    setMessages([]);
    setChatbotVisible(false);
  };
  return (
    <div className="chatbot-ed-28-03-23">
      <button
        id="chatButton"
        onClick={handleChatButtonClick}
        style={{ display: chatbotVisible ? "none" : "block" }}
      >
        <div class="chatbotImg">
          <img src={chatbotlogo} alt="EdCater" />
        </div>
      </button>
      
      <div
        id="chatbotContainer"
        className={`${
          chatbotVisible
            ? "container-animation-open"
            : "container-animation-close"
        }`}
      >
        <div id="chatbot">
          <div
            id="chatHeader"
            className={`${
              chatbotVisible
                ? "header-animation-open"
                : "header-animation-close"
            }`}
          >
            <div className="d-flex justify-content-center mb-2">
              <div className="chatbotImg-1 d-flex ms-auto ">
                <span className="ms-3">ThakurAI</span>
              </div>
              <span
                id="chatClose"
                class="ms-auto"
                onClick={handleChatCloseClick}
              >
               <i class="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div className="edcater_logo_chatbot">
              <img src={EdCoo_Pink_BB} alt="" style={{ width: "50px" }} />
            </div>
          </div>
          <div id="chatContent">
            <div id="chat-box">
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  {message.nickname && (
                    <div
                      className={`${
                        message.sender === "user" ? "text-end" : "text-start"
                      } message-user-name `}
                    >
                      {message.sender === "user" ? "You" : "SachBot"}
                    </div>
                  )}
                  {message.isTyping ? (
                    <BotMessage
                      key={index}
                      text={`<span class="typing-indicator"><img src=${typingloader} alt="" width="40"/></span>`}
                      time={message.time}
                      shouldFade={message.shouldFade}
                    />
                  ) : (
                    <>
                      {message.sender === "user" ? (
                        <UserMessage
                          key={index}
                          text={message.text}
                          time={message.time}
                          shouldFade={message.shouldFade}
                        />
                      ) : (
                        <BotMessage
                          key={index}
                          text={message.text}
                          time={message.time}
                          shouldFade={message.shouldFade}
                          link={message.link}
                          nameshow={message.name}
                          formData={formData} // Pass formData as a prop
                          handleNameChange={handleNameChange}
                          errors={Errors}
                          submit={handlenamesubmit}
                          phoneshow={message.phone}
                          showNameInput={showNameInput}
                          showPhoneInput={showPhoneInput}
                          countrycode={countrycode}
                        />
                      )}
                      {/* Render options if it's the last message and it has options */}
                      {index === messages.length - 1 &&
                        message.options &&
                        message.options.length > 0 &&
                        message.options.map((text, optionIndex) => (
                          <BotOption
                            text={text}
                            handleoptionclick={handleoptionclick}
                          />
                        ))}
                    </>
                  )}
                </React.Fragment>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="footer">
              <div
                id="end_chat_msg"
                style={{ display: end_chat_msg ? "block" : "none" }}
              >
                <span>
                SachBot session complete. Please rate your experience. Your feedback helps us improve.Thank you for chatting with SachBot!"
                </span>
              </div>
              <div className="button_section text-center bg-transparent">
                <button
                  className="card_button"
                  id="restart_button"
                  onClick={handleRestart}
                >
                  <i className="fa-solid fa-rotate-left"></i> Restart
                </button>
              </div>
              <div style={{ display: end_chat_msg ? "none" : "block" }}>
                <div className="typing_box">
                  <input
                    type="text"
                    id="user-input"
                    className="bot_input_message ps-3 me-2 "
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleUserInput}
                    readOnly={PlaceHolderText ? true : false}
                    placeholder={PlaceHolderText || "Type your message"}
                  />
                  <button
                    id="send-button"
                    onClick={() => handleUserInput({ key: "Enter" })}
                    className="border-0 bg-transparent"
                  >
                    <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <main className={`content chat-box-open-edcater `}>
    //     <div className="p-0">
    //         <div className="card">
    //             <div className="row g-0">

    //                 <div className="position-relative">
    //                     <div className="chat-messages p-3">

    //                         {messages.map((message, index) => (
    //                             <React.Fragment key={index}>
    //                                 {message.nickname && (

    //                                     <div className={`${message.sender === "user" ? "text-end" : "text-start"} message-user-name `}>{message.sender === "user" ? "You" : "Eddy"}</div>
    //                                 )}

    //                                 {message.isTyping ? (
    //                                     <BotMessage key={index} text={<img src=${typingloader} alt="" width="40">} time={message.time} shouldFade={message.shouldFade} />
    //                                 ) : (
    //                                     <>
    //                                         {message.sender === 'user' ? (
    //                                             <UserMessage key={index} text={message.text} time={message.time} shouldFade={message.shouldFade} />
    //                                         ) : (
    //                                             <BotMessage key={index} text={message.text} time={message.time} shouldFade={message.shouldFade} link={message.link}
    //                                                 nameshow={message.name}
    //                                                 formData={formData} // Pass formData as a prop
    //                                                 handleNameChange={handleNameChange}
    //                                                 errors={Errors}
    //                                                 submit={handlenamesubmit}
    //                                                 phoneshow={message.phone}
    //                                                 showNameInput={showNameInput}
    //                                                 showPhoneInput={showPhoneInput}
    //                                             />
    //                                         )}
    //                                         {/* Render options if it's the last message and it has options */}
    //                                         {index === messages.length - 1 && message.options && message.options.length > 0 && (
    //                                             message.options.map((text, optionIndex) => (
    //                                                 <BotOption text={text} handleoptionclick={handleoptionclick} />
    //                                             ))
    //                                         )}
    //                                     </>
    //                                 )}
    //                             </React.Fragment>
    //                         ))}

    //                         <div ref={messagesEndRef} />
    //                     </div>
    //                 </div>

    //                 <div className="flex-grow-0 py-2 px-2 border-top">
    //                     <div className="input-group">
    //                         <input type="text" className="form-control border border-end-0 rounded-start"
    //                             value={inputValue}
    //                             onChange={handleInputChange}
    //                             onKeyDown={handleUserInput}
    //                             placeholder={PlaceHolderText || "Type your message"}
    //                             aria-label="Recipient's username" aria-describedby="basic-addon2"
    //                             readOnly={PlaceHolderText ? true : false}
    //                         />
    //                         <span className="input-group-text bg-white border-start-0 message-send-btn" id="basic-addon2"><i className="fa-solid fa-paper-plane fs-4"></i> </span>
    //                     </div>

    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // </main >
  );
}

export default Chatbot;
